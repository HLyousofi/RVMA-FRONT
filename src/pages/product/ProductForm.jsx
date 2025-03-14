import { useEffect, useState } from 'react';
import api from '../../services/axios-service';
import useAlert from '../../hooks/useAlert';
import { useQuery, useQueryClient  } from "react-query";
import SaveButton from '../../components/ui/SaveButton';
import ResetButton from '../../components/ui/ResetButton';
import InputField from '../../components/ui/InpuField';
import AutocompleteField from '../../components/ui/AutocompleteField';
import { useForm } from "react-hook-form";
import { usePostProduct, useUpdateProduct } from '../../services/ProductService';


const ProductForm = ({product, handleCloseDialog}) => {

    // State variables
    const [formTitle, setFormTitle] = useState('Nouveau Produite');
    const [productId,setProductId] =useState(null);

    const {mutateAsync : addProduct} = usePostProduct();
    const {mutateAsync : updateProduct} = useUpdateProduct();
    const {  
        handleSubmit,
        control,
        reset, watch } = useForm();

    const queryClient = useQueryClient();
    const {setAlert} = useAlert();
    const endPointCategories = 'categories';
    const fetchCategoriesName  =  async () =>  {
        const response = await api.get(`/${endPointCategories}?pageSize=all`);
        return response.data;
    }
     // Populate form fields if editing an existing customer
     const fetchDataForm =  () => { 
        if(product.id){
            setProductId(product.id);
            setFormTitle('Id Product :'+ product?.id);
            const ProductData = {
                name : product?.name,
                brand: product?.brand,
                model : product?.model,
                category : product?.category,
                oemReference : product?.oemReference,
                manufacturerReference : product?.manufacturerReference,
                description : product?.description,
                fuelType : product?.fuelType
            }
            reset(ProductData);
        }
    }


    useEffect(() => {

        fetchDataForm();
    },[])
     // Fetch customer data
     const { data: Categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery({
        queryKey: ['CategoriesName'],
        queryFn: fetchCategoriesName, // Pass the function reference
        keepPreviousData: true,
    });
    const onSubmit = async (data) => {
        // Validation checks before submitting the form
        const productData = {
            name : data?.name,
            categoryId : data?.category?.id,
            brand : data?.brand,
            model : data?.model, 
            oemReference : data?.oemReference,
            manufacturerReference : data?.manufacturerReference,
            description : data?.description, 
        };
  
            if(productId != null){
                    try{
                        await updateProduct({productId, productData},{
                                                            onSuccess : async () => {
                                                                handleCloseDialog();
                                                                queryClient.invalidateQueries(["products"]); 
                                                                setAlert({
                                                                            active  : true, 
                                                                            type    : "success", 
                                                                            message : 'Produit Modifier avec Succes !'
                                                                        });
                                                            },onError : async (error) => {
                                                                setAlert({
                                                                            active  : true, 
                                                                            type    : "error", 
                                                                            message : error.response?.data?.message
                                                                        });
                                }
                            }
                );
                        }catch(error){
                        setAlert({
                                    active : true, 
                                    type : "error", 
                                    message : error.response?.data?.message
                                });
                        }
            }else {
                try{
                    await addProduct({ productData},{
                                                        onSuccess : async () => {
                                                            queryClient.invalidateQueries(["products"]); 
                                                            handleCloseDialog();
                                                            setAlert({
                                                                        active  : true, 
                                                                        type    : "success", 
                                                                        message : 'Produit Ajouter avec Succes !'
                                                                    });
                                                        }
    
                    });
                    }catch(error){
                    setAlert({
                                active : true, 
                                type : "error", 
                                message : error.response?.data?.message
                            });
                    }
                    
            }  
}


    return (
                    <div className="w-full h-full   bg-white dark:bg-gray-800 rounded">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ formTitle }</h3>
                            <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-6 grid-cols-2 md:grid-cols-2 ">
                                        <InputField 
                                                name="name"
                                                label="Nom"
                                                type="text"
                                                control={control}
                                                rules={{
                                                        required: 'name is required',
                                                        minLength: {
                                                                value : 2,
                                                                message: 'Enter a valid name',
                                                                },
                                                        }}
                                        />
                                        <InputField 
                                                name="brand"
                                                label="Marque"
                                                type="text"
                                                control={control}
                                                // rules={{
                                                //         required: 'name is required',
                                                //         minLength: {
                                                //                 value : 2,
                                                //                 message: 'Enter a valid brand',
                                                //                 },
                                                //         }}
                                        />
                                        <InputField 
                                            name="model"
                                            label="Model"
                                            type="text"
                                            control={control}
                                            rules={{
                                                minLength: {
                                                        value : 5,
                                                        message: 'Enter a valid model',
                                                        },
                                                }}
                                        />
                                         <AutocompleteField
                                            name="category" 
                                            options={Categories} 
                                            control={control}
                                            isLoading={isLoadingCategories.toString()} 
                                            label="Categorie"
                                            // rules={{
                                            //     required: ' Categorie is required',
                                            //     minLength: {
                                            //             value : 2,
                                            //             message: 'Enter a valid name',
                                            //             },
                                            //     }}
                                        />
                                        <InputField 
                                                name="oemReference"
                                                label="Référence constructeur"
                                                type="text"
                                                control={control}
                                                // rules={{
                                                //         required: 'Referance is required',
                                                //         minLength: {
                                                //                 value : 2,
                                                //                 message: 'Enter a valid Referance',
                                                //                 },
                                                //         }}
                                        />
                                        <InputField 
                                                name="manufacturerReference"
                                                label="Référence fabricant"
                                                type="text"
                                                control={control}
                                                // rules={{
                                                //         required: 'Referance is required',
                                                //         minLength: {
                                                //                 value : 2,
                                                //                 message: 'Enter a valid Referance',
                                                //                 },
                                                //         }}
                                        />
                                        {/* <InputField 
                                            name="purchasePrice"
                                            label="Prix d'Achat"
                                            type="text"
                                            disabled="true"
                                            control={control}
                                            rules={{
                                                    required: 'price Number is required',
                                                    minLength: {
                                                            value : 2,
                                                            message: 'Enter a valid price',
                                                            },
                                                    }}
                                        /> */}
                                        {/* <InputField 
                                            name="sellingPrice"
                                            label="Prix De Vente"
                                            disabled="true"
                                            type="text"
                                            control={control}
                                            rules={{
                                                minLength: {
                                                        value : 8,
                                                        message: 'Enter a valid name',
                                                        },
                                                }}
                                        /> */}
                                        
                                        {/* <InputField 
                                            name="totalStock"
                                            label="Stock"
                                            type="number"
                                            disabled="true"
                                            control={control}
                                            rules={{
                                                    required: 'price Number is required',
                                                    minLength: {
                                                            value : 2,
                                                            message: 'Enter a valid price',
                                                            },
                                                    }}
                                        /> */}
                                        <InputField 
                                            name="description"
                                            label="Description"
                                            type="text"
                                            multiline="true"
                                            control={control}
                                            rules={{
                                                minLength: {
                                                        value : 8,
                                                        message: 'Enter a valid name',
                                                        },
                                                }}
                                        />
                                        
                                    
                                </div>
                                <div className=" flex justify-end mt-4 gap-2">
                                    <ResetButton  />
                                    <SaveButton />
                                </div>
                            </form>
                         </div>
                     </div>
    )
};

export default ProductForm;