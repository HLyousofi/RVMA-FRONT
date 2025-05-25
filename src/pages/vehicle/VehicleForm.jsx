import { useEffect, useState } from 'react';
import api from '../../services/axios-service';
import useAlert from '../../hooks/useAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import SaveButton from '../../components/ui/SaveButton';
import ResetButton from '../../components/ui/ResetButton';
import InputField from '../../components/ui/InpuField';
import AutocompleteField from '../../components/ui/AutocompleteField';
import { useForm } from "react-hook-form";
import { usePostVehicle, useUpdateVehicle } from '../../services/VehicleService';
import { useQuery, useQueryClient  } from "react-query";
import { useGetCustomersNames } from '../../services/CustomerService';
import useGetFuelTypes from '../../services/FuelTypeService';

const VehicleForm = () => {

    // State variables
    const [formTitle, setFormTitle] = useState('Nouveau Vehicule')
    const [id, setId] = useState(null);

    const {mutateAsync : addVehicle} = usePostVehicle();
    const {mutateAsync : updateVehicle} = useUpdateVehicle();

    const queryClient = useQueryClient();
    const { handleSubmit, control, reset, watch } = useForm();
    
    const { data : customers, isLoading : isLoadingCustomers, isError } = useGetCustomersNames();
    const { data : fuelTypes, isLoading : isLoadingFuelTypes, isError : fuelTypesError } = useGetFuelTypes();



    const navigate = useNavigate();
    const location = useLocation();
    const {setAlert} = useAlert();
    const endPointCarBrands = "carBrands";


  
    const fetchCarBrands  =  async () =>{  
        const response = await api.get(`/${endPointCarBrands}`);
        return response.data;
    }


     // Populate form fields if editing an existing customer
     const fetchDataForm =  () => { 
        if(location.state){
            // setButtonAction('Modifier');;
            setId(location.state?.id);
            // setCustomerId(location.state?.customerId);
            setFormTitle('Id Vehicule :'+ location.state?.id);
            // console.log(location.state);
            const vehicleData = {
                customer : {id : location.state?.customerId, label :location.state?.customerName},
                brand : location.state?.brand ,
                model: location.state?.model || '',
                plateNumber : location.state?.plateNumber || '',
                fuelType : location.state?.fuelType
            }
            reset(vehicleData);
        }
    }


    useEffect(() => {


        fetchDataForm();
    },[])


    const { data: carBrands, isLoading: isLoadingCarBrands, isError: isErrorCarBrands } = useQuery({
        queryKey: ['carBrands'],
        queryFn: fetchCarBrands, // Pass the function reference
        keepPreviousData: true,
    });


    const onSubmit = async (data) => {
        // Validation checks before submitting the form
        const vehicle = {
            customerId : data?.customer?.id,
            brand : data?.brand.id,
            model : data?.model, 
            plateNumber : data?.plateNumber, 
            fuelType : data?.fuelType.id,
        };
            // Make API request based on whether it's a new vehicle or an update
            if(id != null){
                try{
                    await updateVehicle({id, vehicle},{
                                                        onSuccess : async () => {
                                                            // handleCloseDialog();
                                                            navigate('/vehicles');
                                                            queryClient.invalidateQueries(["vehicles"]); 
                                                            setAlert({
                                                                        active  : true, 
                                                                        type    : "success", 
                                                                        message : 'vehicle Modifier avec Succes !'
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
                        await addVehicle({ vehicle},{
                                                            onSuccess : async () => {
                                                                queryClient.invalidateQueries(["vehicles"]); 
                                                                // handleCloseDialog();
                                                                navigate('/vehicles');
                                                                setAlert({
                                                                            active  : true, 
                                                                            type    : "success", 
                                                                            message : 'vehicle Ajouter avec Succes !'
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
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ formTitle }</h3>
                            <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-2 ">
                                            <AutocompleteField
                                                name="customer" 
                                                options={customers?.data} 
                                                control={control}
                                                isLoading={isLoadingCustomers.toString()} 
                                                label="Client"
                                                rules={{
                                                    required: 'Customer is required',
                                                    // minLength: {
                                                    //         value : 2,
                                                    //         message: 'Enter a valid name',
                                                    //         },
                                                    }}
                                            />
                                            <AutocompleteField
                                                name="brand" 
                                                options={carBrands?.data} 
                                                control={control}
                                                isLoading={isLoadingCarBrands.toString()} 
                                                label="Marque"
                                                rules={{
                                                    required: ' Brand is required',
                                                    // minLength: {
                                                    //         value : 2,
                                                    //         message: 'Enter a valid name',
                                                    //         },
                                                    }}
                                            />
                                            <InputField 
                                                    name="model"
                                                    label="Model"
                                                    type="text"
                                                    control={control}
                                                    rules={{
                                                            required: 'Model is required',
                                                            minLength: {
                                                                    value : 2,
                                                                    message: 'Enter a valid name',
                                                                    },
                                                            }}
                                            />
                                            <InputField 
                                                name="plateNumber"
                                                label="Matricule"
                                                type="text"
                                                control={control}
                                                rules={{
                                                        required: 'Plate Number is required',
                                                        minLength: {
                                                                value : 2,
                                                                message: 'Enter a valid name',
                                                                },
                                                        }}
                                            />
                                                <AutocompleteField 
                                                        name="fuelType"
                                                        options={fuelTypes?.data} 
                                                        control={control}
                                                        // onSelect={setFuelTypeId} 
                                                        isLoading={isLoadingFuelTypes.toString()} 
                                                        label="Carburant"
                                                        rules={{
                                                            required: 'fuel Type is required',
                                                            // minLength: {
                                                            //         value : 2,
                                                            //         message: 'Enter a valid name',
                                                            //         },
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

export default VehicleForm;