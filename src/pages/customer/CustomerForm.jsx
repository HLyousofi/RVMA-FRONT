import { useEffect, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePostCustomer, useUpdateCustomer} from '../../services/CustomerService';
import SaveButton from '../../components/ui/SaveButton';
import ResetButton from '../../components/ui/ResetButton';
import InputField from '../../components/ui/InpuField';
import { useForm } from "react-hook-form";
import CheckboxField from '../../components/ui/CheckboxField';



const CustomerForm = () => {
    const [id, setId] = useState(null);
    // State variables
    const [formTitle, setFormTitle] = useState('Nouveau Client')
    const [hiddenIce, setHiddenIce] = useState(true);
    const [buttonAction, setButtonAction] = useState('Ajouter');
    const navigate = useNavigate();
    const {setAlert} = useAlert();
    const location = useLocation();
    const {mutateAsync : addCustomer} = usePostCustomer();
    const {mutateAsync : updateCustomer} = useUpdateCustomer();
    const customer = {
        name : "",
        adress : "",
        email : "", 
        phoneNumber : "", 
        type : "", 
        ice : ""

    }
    const {  
        handleSubmit,
        control,
        reset } = useForm();




    useEffect(() => {
        // Populate form fields if editing an existing customer
        if(location.state){
            setButtonAction('Modifier');
            setId(location.state?.id);
            setFormTitle('Id Client :'+ location.state?.id);
            customer.name = location.state?.name;
            customer.adress = location.state?.adress;
            customer.email = location.state?.email; 
            customer.phoneNumber = location.state?.phoneNumber; 
            customer.type = location.state?.type == "B" ? true : false; 
            customer.iceNumber = location.state?.ice;
            setHiddenIce(customer.type)
            reset(customer);
        }else {
            setHiddenIce(false);
        }

    },[])


    const changeStat = () => {
        setHiddenIce(!hiddenIce);
    }

    const onSubmit = async (data) => {
      
        const type = data?.type  ? 'B' : 'I';
        customer.name = data.name;
        customer.adress = data.adress;
        customer.email = data.email; 
        customer.phoneNumber = data.phoneNumber; 
        customer.type = type; 
        customer.ice = data.iceNumber;
                
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
                    <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex  ">
                            <div className="flex-initial w-[45%]">
                                <InputField
                                        name="name"
                                        label="Nom Complet"
                                        type="text"
                                        control={control}
                                        rules={{
                                        required: 'Name is required',
                                        minLength: {
                                        value : 5,
                                        message: 'Enter a valid name',
                                        },
                                        }} 
                                />
                            </div>
                            <div className=" flex-initial w-[45%] ml-[10%]">
                            <InputField
                                        name="adress"
                                        label="Adress"
                                        type="text"
                                        control={control}
                                        rules={{
                                        required: 'Adress is required',
                                        minLength: {
                                        value : 10,
                                        message: 'Enter a valid Adresse',
                                        },
                                        }} 
                                />
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="flex-initial w-[45%]">
                            <InputField
                                        name="email"
                                        label="Adresse Mail"
                                        type="text"
                                        control={control}
                                        rules={{
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: 'Enter a valid email',
                                            },
                                        }} 
                            />

                                {/* <TextField type="email" error={emailError}  fullWidth label="Email" inputRef={emailRef} variant="outlined" /> */}
                            </div>
                            <div className=" flex-initial w-[45%] ml-[10%]">
                            <InputField
                                        name="phoneNumber"
                                        label="Numero de Telephone"
                                        type="text"
                                        control={control}
                                        rules={{
                                        required: 'phone Number is required',
                                        minLength: {
                                        value : 10,
                                        message: 'Enter a valid phone number',
                                        },
                                        }} 
                                />
                                {/* <TextField  type="tel" required fullWidth label="Telephone" error={phoneNumberError} inputRef={phoneNumberRef} variant="outlined" /> */}
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="flex-initial w-[45%] ">
                                <CheckboxField 
                                    name="type"
                                    onChangeCallback={changeStat}
                                    label="Societé"
                                    control={control}
                                />
                            </div>

                            <div className=" flex-initial w-[45%] ml-[10%] " >
                            {hiddenIce && <InputField
                                        name="iceNumber"
                                        label="ICE"
                                        type="number"
                                        control={control}
                                        rules={{
                                        required: 'ICE is required',
                                        minLength: {
                                        value : 10,
                                        message: 'Enter a valid ICE',
                                        },
                                        }} 
                                />
                            }
                            </div>
                        </div>
                        <div className=" flex justify-end mt-4 gap-2 ">
                            <ResetButton  />
                            <SaveButton />
                        </div>
                    </form>
                </div>
            </div>
    )
};

export default CustomerForm;