import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from 'react';
import api from '../../services/axios-service';
import useAlert from '../../hooks/useAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery  } from "react-query";
import SaveButton from '../../components/ui/SaveButton';
import ResetButton from '../../components/ui/ResetButton';
import InputField from '../../components/ui/InpuField';
import AutocompleteField from '../../components/ui/AutocompleteField';
import { useForm } from "react-hook-form";




const VehicleForm = () => {
    // Refs for form fields
    const customerNameRef = useRef(null);
    const customerIdRef = useRef(null); 
    const brandRef = useRef(null); 
    const modelRef = useRef(null); 
    const plateNumberRef = useRef(null); 
    const fuelTypeRef = useRef(null);
    const chassisNumberRef = useRef(null);
    
    // State variables
    const [formTitle, setFormTitle] = useState('Nouveau Vehicule')
    const [buttonAction, setButtonAction] = useState('Ajouter');
    const [nameError, setNameError] = useState(false);
    const [modelError, setModelError] = useState();
    const [brandError, setBrandError] = useState();
    const [plateNumberError, setPlateNumberError] = useState();
    const [fuelTypeError, setFuelTypeError] = useState();
    const [chassisNumberError, setChassisNumberError] = useState();
    const [customerId, setCustomerId] = useState(null);
    const [fuelTypeId, setFuelTypeId] = useState(null);
    const [id, setId] = useState(null);

    const {  
        handleSubmit,
        control,
        reset } = useForm();



    const navigate = useNavigate();
    const location = useLocation();
    const {setAlert} = useAlert();
    const endPoint = 'vehicles';
    const endPointCustomer = 'customers';
    const fuelTypes = [{id : 1, label :'Essance'}, {id : 2, label :'diesel'}, {id : 3, label :'Hybrid'}];

    const vehicle = {
        customerId : "",
        customerName : "",
        brand : "",
        model : "", 
        plateNumber : "", 
        fuelType : "",
        chassisNumber : ""
    }
    


    const fetchCustomersName  =  async () =>  await api.get(`/${endPointCustomer}?pageSize=all`);

     // Use React Query to fetch customer  and manage the state
    const result = useQuery({
        queryKey: ['customersName'],
        queryFn: () => fetchCustomersName(),
        keepPreviousData : true
    });
    const { data, isLoading, isError } = result;

    function getIdByLabel(data, label) {
        const item = data.find(obj => obj.label === label);
        return item ? item.id : null;
    }
    
  
    useEffect(() => {
        
        // Populate form fields if editing an existing customer
        const fetchDataForm =  () => { 
            if(location.state){
                setButtonAction('Modifier');;
                setId(location.state?.id);
                setCustomerId(location.state?.customerId);
                setFormTitle('Id Vehicule :'+ location.state?.id);
                const vehicleData = {
                    customerId : location.state?.customerName,
                    brand : location.state?.brand || '',
                    model: location.state?.model || '',
                    plateNumber : location.state?.plateNumber || '',
                    fuelType : getIdByLabel(fuelTypes, location.state?.fuelType) || ''
                }
                reset(vehicleData);
            }
        }

        fetchDataForm();
    },[])



    const onSubmit = async (data) => {
        // Validation checks before submitting the form

        let response;
        const vehicle = {
            customerId : customerId,
            customerName : data.customerName,
            brand : data.brand,
            model : data.model, 
            plateNumber : data.plateNumber, 
            fuelType : data.fuelType.label,
        };
    
    

        

        try {
            // Make API request based on whether it's a new vehicle or an update
            if(id != null){
                    response = await api.patch(`/${endPoint}/${id}`, vehicle);
            }else {
                    response = await api.post(`/${endPoint}`, vehicle);
            }  
            // Check response status and navigate accordingly
            if(response.status === 201){ 
                navigate(`/${endPoint}`);
                setAlert({
                    active : true, 
                    type : "success", 
                    message : 'Voiture Ajouté avec Succes !'});
            }if(response.status === 200){ 
                navigate(`/${endPoint}`);
                setAlert({
                    active : true, 
                    type : "success", 
                    message : 'voiture Modifier avec Succes !'
                });
            }
        }catch(error){
            setAlert({
                active : true, 
                type : "error", 
                message : error.message
            });
                
        }
}


    return (
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ formTitle }</h3>
                            <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex  ">
                                    <div className="flex-initial w-[45%]">
                                        <AutocompleteField
                                            name="customerName" 
                                            options={data?.data} 
                                            control={control}
                                            onSelect={setCustomerId} 
                                            isLoading={isLoading} 
                                            label="Client"
                                        />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <InputField 
                                            name="brand"
                                            label="Marque"
                                            type="text"
                                            control={control}
                                            rules={{
                                                    required: 'Brand is required',
                                                    minLength: {
                                                            value : 2,
                                                            message: 'Enter a valid name',
                                                            },
                                                    }}
                                        />
                                    </div>
                                </div>
                                <div className="flex ">
                                    <div className="flex-initial w-[45%]">
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
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
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
                                    </div>
                                </div>
                                <div className="flex ">
                                        <div className=" flex-initial w-[45%] ">
                                            <AutocompleteField 
                                                    name="fuelType"
                                                    options={fuelTypes} 
                                                    control={control}
                                                    onSelect={setFuelTypeId} 
                                                    label="Carburant"
                                            />
                                        </div>
                                    {/* <div className=" flex-initial w-[45%] ml-[10%] " >
                                        <InputField 
                                            name="chassisNumber"
                                            label="NUMERO DE CHASSIS"
                                            type="text"
                                            control={control}
                                            rules={{
                                                minLength: {
                                                        value : 8,
                                                        message: 'Enter a valid name',
                                                        },
                                                }}
                                        />
                                    </div> */}
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