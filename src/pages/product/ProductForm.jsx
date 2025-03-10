import { useEffect, useState } from 'react';
import api from '../../services/axios-service';
import useAlert from '../../hooks/useAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery  } from "react-query";
import SaveButton from '../../components/ui/SaveButton';
import ResetButton from '../../components/ui/ResetButton';
import InputField from '../../components/ui/InpuField';
import AutocompleteField from '../../components/ui/AutocompleteField';
import { useForm } from "react-hook-form";





const ProductForm = () => {

    // State variables
    const [formTitle, setFormTitle] = useState('Nouveau Produite')
    const [id, setId] = useState(null);

    const {  
        handleSubmit,
        control,
        reset, watch } = useForm();


    const navigate = useNavigate();
    const location = useLocation();
    const {setAlert} = useAlert();
    const endPoint = 'products';
    const endPointCategories = 'categories';
    // const endPointFuelTypes = "fueltypes";
    // const endPointCarBrands = "carBrands";




    const fetchCategoriesName  =  async () =>  {
        const response = await api.get(`/${endPointCategories}?pageSize=all`);
        return response.data;
    }
   


     // Populate form fields if editing an existing customer
     const fetchDataForm =  () => { 
        console.log(location.state);
        if(location.state){
            // setButtonAction('Modifier');;
            setId(location.state?.id);
            // setCustomerId(location.state?.customerId);
            setFormTitle('Id Product :'+ location.state?.id);
            // console.log(location.state);
            const ProductData = {
                name : location.state?.name,
                // referance: location.state?.referance,
                category : location.state?.category,
                description : location.state?.description || '',
                fuelType : location.state?.fuelType
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

    // // Fetch fuel types data
    // const { data: fuelTypes, isLoading: isLoadingFuelTypes, isError: isErrorFuelTypes } = useQuery({
    //     queryKey: ['fuelTypes'],
    //     queryFn: fetchFuelTypes, // Pass the function reference
    //     keepPreviousData: true,
    // });

    // const { data: carBrands, isLoading: isLoadingCarBrands, isError: isErrorCarBrands } = useQuery({
    //     queryKey: ['carBrands'],
    //     queryFn: fetchCarBrands, // Pass the function reference
    //     keepPreviousData: true,
    // });
    
   



    const onSubmit = async (data) => {
        // Validation checks before submitting the form
       
        
        let response;
        const product = {
            name : data?.name,
            categoryId : data?.category?.id,
            brand : data?.brand,
            model : data?.model, 
            oemReference : data?.oemReference,
            manufacturerReference : data?.manufacturerReference,
            description : data?.description, 
        };
    

        try {
            // Make API request based on whether it's a new vehicle or an update
            if(id != null){
                    response = await api.patch(`/${endPoint}/${id}`, product);
            }else {
                    response = await api.post(`/${endPoint}`, product);
            }  
            // Check response status and navigate accordingly
            if(response.status === 201){ 
                navigate(`/${endPoint}`);
                console.log(response)
                setAlert({
                    active : true, 
                    type : "success", 
                    message : 'Produite Ajouté avec Succes !'});
            }if(response.status === 200){ 
                navigate(`/${endPoint}`);
                
                setAlert({
                    active : true, 
                    type : "success", 
                    message : 'Produite Modifier avec Succes !'
                });
            }
        }catch(error){
            setAlert({
                active : true, 
                type : "error", 
                message : error?.response?.data?.message
            });
                
        }
}


    return (
                    <div className="w-full h-full   bg-white dark:bg-gray-800 rounded">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ formTitle }</h3>
                            <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 ">
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