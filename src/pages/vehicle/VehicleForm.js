import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import api from '../../services/axios-service';
import useAlert from '../../hooks/useAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery  } from "react-query";



const VehicleForm = () => {
    // Refs for form fields
    const customerNameRef = useRef(null);
    const customerIdRef = useRef(null); 
    const brandRef = useRef(null); 
    const modelRef = useRef(null); 
    const plateNumberRef = useRef(null); 
    const fuelTypeRef = useRef(null); 
    
    // State variables
    const [formTitle, setFormTitle] = useState('Nouveau Vehicule')
    const [buttonAction, setButtonAction] = useState('Ajouter');
    const [nameError, setNameError] = useState(false);
    const [modelError, setModelError] = useState();
    const [brandError, setBrandError] = useState();
    const [plateNumberError, setPlateNumberError] = useState();
    const [fuelTypeError, setFuelTypeError] = useState();
    const [customerId, setCustomerId] = useState(null);
    const [id, setId] = useState(null);



    const navigate = useNavigate();
    const location = useLocation();
    const {setAlert} = useAlert();
    const endPoint = 'vehicles';
    const endPointCustomer = 'customers';
    const fuelTypes = ['Essance', 'Gazoil', 'Hybrid'];
    


    const fetchCustomersName  =  async () =>  await api.get(`/${endPointCustomer}?pageSize=all`);

     // Use React Query to fetch customer  and manage the state
    const result = useQuery({
        queryKey: ['customersName'],
        queryFn: () => fetchCustomersName(),
        keepPreviousData : true
    });
    const { data, isLoading, isError } = result;
   
    


    


    useEffect(() => {
        
        // Populate form fields if editing an existing customer
        const fetchDataForm =  () => { 
            if(location.state){
                setButtonAction('Modifier');;
                setId(location.state?.id);
                setCustomerId(location.state?.customerId);
                setFormTitle('Id Vehicule :'+ location.state?.id);
                customerIdRef.current.value = location.state?.customerName;
                brandRef.current.value = location.state?.brand;
                modelRef.current.value = location.state?.model;
                plateNumberRef.current.value = location.state?.plateNumber;
                fuelTypeRef.current.value = location.state?.fuelType;
            }
        }

        fetchDataForm();
    },[])



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation checks before submitting the form

        
         if(customerId == null ){
            setNameError(true);
            return;
        }
        if(brandRef?.current?.value?.length < 3){
            setBrandError(true);
            return;
        }
        if(modelRef?.current?.value?.length < 2){
            setModelError(true);
            return;
        } 
        if(fuelTypeRef?.current?.value?.length < 3){
            setFuelTypeError(true);
            return;
        }
        if(plateNumberRef?.current?.value?.length < 3){
            setPlateNumberError(true);
            return;
        }
       
        let response;
           

        const vehicle = {
            customerId : customerId,
            customerName : customerNameRef?.current?.value,
            brand : brandRef?.current?.value,
            model : modelRef?.current?.value, 
            plateNumber : plateNumberRef?.current?.value, 
            fuelType : fuelTypeRef?.current?.value 
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
                    message : 'Client Ajouté avec Succes !'});
            }if(response.status === 200){ 
                navigate(`/${endPoint}`);
                setAlert({
                    active : true, 
                    type : "success", 
                    message : 'Client Modifier avec Succes !'
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
                            <form className="space-y-16" onSubmit={handleSubmit}>
                                <div className="flex  ">
                                    <div className="flex-initial w-[45%]">
                                        <Autocomplete
                                            fullWidth
                                            autoHighlight
                                            disabled={isLoading}
                                            disableClearable
                                            id="customer-name"
                                            options={data?.data}
                                            getOptionKey={(option) => setCustomerId(option.id)}
                                            inputValue={location?.state?.customerName}
                                            renderInput={(params) => <TextField
                                                                        inputRef={customerIdRef} 
                                                                        {...params} 
                                                                        label="Client"
                                                                        required
                                                                        error={nameError}
                                                                        InputProps={{
                                                                            ...params.InputProps,
                                                                            type: 'search',
                                                                          }} 
                                            
                                            />}
                                        />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <TextField  
                                            type="text"  
                                            fullWidth 
                                            required
                                            label="Marque" 
                                            error={brandError}
                                            inputRef={brandRef} 
                                            variant="outlined" />
                                    </div>
                                </div>
                                <div className="flex ">
                                    <div className="flex-initial w-[45%]">
                                        <TextField 
                                            type="text" 
                                            error={modelError} 
                                            required 
                                            fullWidth 
                                            label="Model" 
                                            inputRef={modelRef} 
                                            variant="outlined" />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <TextField  
                                            type="text" 
                                            required 
                                            fullWidth 
                                            label="Matricule" 
                                            error={plateNumberError} 
                                            inputRef={plateNumberRef} 
                                            variant="outlined" 
                                        />
                                    </div>
                                </div>
                                <div className="flex ">
                                        <div className=" flex-initial w-[45%] ">
                                            <Autocomplete
                                                fullWidth
                                                autoHighlight
                                                disableClearable
                                                defaultValue={location.state?.fuelType }
                                                id="fuel-type"
                                                options={fuelTypes}
                                                renderInput={(params) => <TextField 
                                                                            {...params} 
                                                                            label="Carburant"
                                                                            required
                                                                            inputRef={fuelTypeRef}
                                                                            error={fuelTypeError}
                                                                            InputProps={{
                                                                                ...params.InputProps,
                                                                                type: 'search',
                                                                            }} 
                                                
                                                />}
                                            />
                                        </div>
                                    <div className=" flex-initial w-[45%] ml-[10%] " >
                                     
                                    </div>
                                </div>
                                <div className=" flex justify-end mt-4 ">
                                    <Button variant="outlined" type="reset" color="secondary" sx={{marginRight: 4 }} >annuler</Button>
                                    <Button variant="outlined" type="submit" color="success" >{buttonAction}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
    )
};

export default VehicleForm;