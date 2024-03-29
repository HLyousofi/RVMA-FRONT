import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePostCustomer, useUpdateCustomer} from '../../services/CustomerService';


const CustomerForm = () => {
    // Refs for form fields
    const nameRef = useRef(null);
    const adressRef = useRef(null); 
    const emailRef = useRef(null); 
    const phoneNumberRef = useRef(null); 
    const typeRef = useRef(null); 
    const iceRef = useRef(null); 
    const [id, setId] = useState(null);
    // State variables
    const [formTitle, setFormTitle] = useState('Nouveau Client')
    const [hiddenIce, setHiddenIce] = useState(true);
    const [buttonAction, setButtonAction] = useState('Ajouter');
    const [nameError, setNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState();
    const navigate = useNavigate();
    const {setAlert} = useAlert();
    const location = useLocation();
    const {mutateAsync : addCustomer} = usePostCustomer();
    const {mutateAsync : updateCustomer} = useUpdateCustomer();


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    useEffect(() => {
        // Populate form fields if editing an existing customer
        if(location.state){
            setButtonAction('Modifier');
            setId(location.state?.id);
            setFormTitle('Id Client :'+ location.state?.id);
            nameRef.current.value = location.state?.name;
            adressRef.current.value = location.state?.adress;
            emailRef.current.value = location.state?.email;
            phoneNumberRef.current.value = location.state?.phoneNumber;
            typeRef.current.checked = location.state?.type == "B" ? true : false ;

            if(typeRef.current.checked){
                iceRef.current.value = location.state?.ice;
            }
            else {
                setHiddenIce(false);
            }
        }else {
            setHiddenIce(false);
        }

    },[])



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation checks before submitting the form
        if(nameRef?.current?.value?.length < 3 ){
            setNameError(true);
            return;
        }
        if(phoneNumberRef?.current?.value?.length < 10){
            setPhoneNumberError(true);
            return;
        }
        if(emailRef?.current?.value ){
            if(!emailRegex.test(emailRef?.current?.value)){
                setEmailError(true);
                return;
            }

        }

            const type = typeRef?.current?.checked  ? 'B' : 'I';
            // Construct customer object
            const customer = {
                name : nameRef?.current?.value,
                adress : adressRef?.current?.value,
                email : emailRef?.current?.value, 
                phoneNumber : phoneNumberRef?.current?.value, 
                type : type, 
                ice : iceRef?.current?.value 
            };

                if(location.state){
                     try{
                       
                        await updateCustomer({id, customer},{
                                                            onSuccess : async () => {
                                                                navigate('/customers');
                                                                setAlert({
                                                                            active  : true, 
                                                                            type    : "success", 
                                                                            message : 'Client Modifier avec Succes !'
                                                                        });
                                                            }

                        });
                     }catch(error){
                        console.error(error);
                        setAlert({
                                    active : true, 
                                    type : "error", 
                                    message : error.message
                                });
                     }
                }else {

                    try{
                        await addCustomer(customer,{
                            onSuccess : async () => {
                                                            navigate('/customers');
                                                            setAlert({
                                                            active  : true, 
                                                            type    : "success", 
                                                            message : 'Client Ajouter avec Succes !'
                                                                    });
                                                        }
                                                   
                       } );
                    }catch(error){
                                    setAlert({
                                        active  : true, 
                                        type    : "error", 
                                        message : error.message
                                    });
                                     console.error(error);
                    }
                }  
                
    }

  
    

    


    return (
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ formTitle }</h3>
                            <form className="space-y-16" onSubmit={handleSubmit}>
                                <div className="flex  ">
                                    <div className="flex-initial w-[45%]">
                                        <TextField type="text" required error={nameError} fullWidth label="Nom" inputRef={nameRef} variant="outlined" />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <TextField  type="text"  fullWidth label="Adresse" inputRef={adressRef} variant="outlined" />
                                    </div>
                                </div>
                                <div className="flex ">
                                    <div className="flex-initial w-[45%]">
                                        <TextField type="email" error={emailError}  fullWidth label="Email" inputRef={emailRef} variant="outlined" />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <TextField  type="tel" required fullWidth label="Telephone" error={phoneNumberError} inputRef={phoneNumberRef} variant="outlined" />
                                    </div>
                                </div>
                                <div className="flex ">
                                    <div className="flex-initial w-[45%] ">
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox"    ref={typeRef} onChange={() => setHiddenIce(!hiddenIce)} className="sr-only peer"  />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3 ml-8 text-sm font-medium text-gray-900  dark:text-gray-300">Societé</span>
                                        </label>
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%] " >
                                       {hiddenIce && <TextField type="number" inputRef={iceRef}  required fullWidth label="ICE" variant="outlined" />}
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

export default CustomerForm;