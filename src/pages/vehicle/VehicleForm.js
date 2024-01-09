import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import api from '../../services/axios-service';
import useAlert from '../../hooks/useAlert';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';


const VehicleForm = () => {
    // Refs for form fields
    const customerNameRef = useRef(null);
    const customerIdRef = useRef(null); 
    const brandRef = useRef(null); 
    const modelRef = useRef(null); 
    const plateNumberRef = useRef(null); 
    const fuelTypeRef = useRef(null); 
    const [id, setId] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    // State variables
    const [formTitle, setFormTitle] = useState('Nouveau Vehicule')
    const [buttonAction, setButtonAction] = useState('Ajouter');
    const [nameError, setNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [customersName, setCustomersName] = useState();
    // const [submit, setSubmit] = useState(true);
    const [emailError, setEmailError] = useState();
    const navigate = useNavigate();
    const {setAlert} = useAlert();
    const endPoint = 'vehicles';
    const endPointCustomer = 'customers';
    let {item} = useParams();
    


    useEffect(() => {
        // Populate form fields if editing an existing customer

        const fetchDataForm = async () => { 
            if(item != "new"){
                setButtonAction('Modifier');
                let vehicleData = JSON.parse(item);
                console.log(vehicleData);
                setId(vehicleData.id);
                setCustomerId(vehicleData.customerId);
                setFormTitle('Id Vehicule :'+ vehicleData.id);
                customerNameRef.current.value = vehicleData.customerName;
                brandRef.current.value = vehicleData.brand;
                modelRef.current.value = vehicleData.model;
                plateNumberRef.current.value = vehicleData.plateNumber;
                fuelTypeRef.current.value = vehicleData.fuelType;
            }else {
                try {
                 const response   = await api.get(`/${endPointCustomer}?pageSize=all`);
                 if(response.status == 200){
                    setCustomersName(response.data);
                 }

                }catch(error){
                    console.log(error);

                }
            }
        }

        fetchDataForm();
    },[])



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation checks before submitting the form
        // if(nameRef?.current?.value?.length < 3 ){
        //     setNameError(true);
        //     return;
        // }
        // if(phoneNumberRef?.current?.value?.length < 10){
        //     setPhoneNumberError(true);
        //     return;
        // }
        

            //const type = typeRef?.current?.checked  ? 'B' : 'I';
            let response;
            // Construct vehicle object

            const vehicle = {
                customerId : customerIdRef?.current?.value,
                customerName : customerNameRef?.current?.value,
                brand : brandRef?.current?.value,
                model : modelRef?.current?.value, 
                plateNumber : plateNumberRef?.current?.value, 
                fuelType : fuelTypeRef?.current?.value 
            };

            try {
                // Make API request based on whether it's a new vehicle or an update
                if(item != "new"){
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
                                            freeSolo
                                            disableClearable
                                            id="customer-name"
                                            options={customersName}
                                            renderInput={(params) => <TextField 
                                                                        {...params} 
                                                                        label="Client"
                                                                        InputProps={{
                                                                            ...params.InputProps,
                                                                            type: 'search',
                                                                          }} 
                                            
                                            />}
                                        />
                                        {/* <TextField 
                                            type="text" 
                                            required 
                                            error={nameError} 
                                            fullWidth 
                                            label="Client" 
                                            inputRef={customerNameRef} 
                                            variant="outlined" 
                                        /> */}
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <TextField  
                                            type="text"  
                                            fullWidth 
                                            label="Marque" 
                                            inputRef={brandRef} 
                                            variant="outlined" />
                                    </div>
                                </div>
                                <div className="flex ">
                                    <div className="flex-initial w-[45%]">
                                        <TextField 
                                            type="email" 
                                            error={emailError}  
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
                                            error={phoneNumberError} 
                                            inputRef={plateNumberRef} 
                                            variant="outlined" 
                                        />
                                    </div>
                                </div>
                                <div className="flex ">
                                        <div className=" flex-initial w-[45%] ">
                                            <TextField 
                                                type="text" 
                                                inputRef={fuelTypeRef}  
                                                required 
                                                fullWidth 
                                                label="Carburant" 
                                                variant="outlined" 
                                            />
                                        </div>
                                    <div className=" flex-initial w-[45%] ml-[10%] " >
                                       {/* <TextField 
                                            type="number" 
                                            inputRef={fuelTypeRef}  
                                            required 
                                            fullWidth 
                                            label="Carburant" 
                                            variant="outlined" 
                                       /> */}
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