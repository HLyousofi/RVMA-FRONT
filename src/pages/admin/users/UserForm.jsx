import { useState, useEffect } from "react";
import InputField from "../../../components/ui/InpuField";
import { useForm } from "react-hook-form";
import useAlert from "../../../hooks/useAlert";
import { useQuery, useQueryClient  } from "react-query";
import { useUpdateUser, usePostUser } from "../../../services/UserService";





const UserForm = ({user, handleCloseDialog}) => {

    const {  handleSubmit, control, reset } = useForm();
    const [formTitle, setFormTitle] = useState('Nouveau Utilisateur ');
    const [userId, setUserId] = useState();
    const {setAlert} = useAlert();
    const queryClient = useQueryClient();
    const {mutateAsync : addUser} = usePostUser();
    const {mutateAsync : updateUser} = useUpdateUser();

    const fetchDataForm =  () => { 
        if(user?.id){
            setUserId(user.id);
             setFormTitle('Utilisateur :'+ user?.id);
            const userData = {
                email : user?.email,
                password : user?.password,
                firstName : user?.firstName, 
                lastName : user?.lastName,
                phoneNumber : user?.phoneNumber,
            }
            reset(userData);
        }
    }

    useEffect(() => {

        fetchDataForm();
    },[])


    const onSubmit = async (data) => {
        // Validation checks before submitting the form
        const userData = {
            email : data?.email,
            password : data?.password,
            firstName : data?.firstName, 
            lastName : data?.lastName,
            phoneNumber : data?.phoneNumber,
        };
  
            if(userId != null){
                    try{
                        await updateUser({userId, userData},{
                                                            onSuccess : async () => {
                                                                handleCloseDialog();
                                                                queryClient.invalidateQueries(["users"]); 
                                                                setAlert({
                                                                            active  : true, 
                                                                            type    : "success", 
                                                                            message : 'Utilisateur Modifier avec Succes !'
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
                    await addUser({ userData},{
                                                        onSuccess : async () => {
                                                            queryClient.invalidateQueries(["users"]); 
                                                            handleCloseDialog();
                                                            setAlert({
                                                                        active  : true, 
                                                                        type    : "success", 
                                                                        message : 'Utilisateur Ajouter avec Succes !'
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
        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ formTitle }</h3>
        <form className="max-w-md mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-5 group">
            <InputField name="email" label="Email"  variant="standard" type="email" control={control}
                                              rules={{
                                                pattern: {
                                                    value: /^\S+@\S+\.\S+$/,
                                                    message: 'Enter a valid email',
                                                    },
                                                }}  />
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <InputField name="password" label="Mot de passe"  variant="standard" type="password" control={control}
                                              rules={{
                                                // required: 'password is required',
                                                minLength: {
                                                value : 8,
                                                message: 'Enter a valid password',
                                                },}} 
                                                />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
            <InputField name="firstName" label="Prenom"  variant="standard" type="text" control={control}
                                              rules={{
                                                required: 'First Name is required',
                                                minLength: {
                                                value : 4,
                                                message: 'First Name password',
                                                },}} 
                                                />

            </div>
            <div className="relative z-0 w-full mb-5 group">
                <InputField name="lastName" label="Nom"  variant="standard" type="text" control={control}
                                              rules={{
                                                required: 'Last name is required',
                                                minLength: {
                                                value : 4,
                                                message: 'Enter a valid Last name',
                                                },}} 
                                                />
            </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
            <InputField
                                        name="phoneNumber"
                                        label="Numero de Telephone"
                                        variant="standard"
                                        type="text"
                                        control={control}
                                        rules={{
                                        // required: 'phone Number is required',
                                        minLength: {
                                        value : 10,
                                        message: 'Enter a valid phone number',
                                        },
                                        }} 
                                />
            </div>
            {/* <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
            </div> */}
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        </div>


    )
}

export default UserForm;