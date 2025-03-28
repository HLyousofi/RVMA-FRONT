// Importing necessary modules and resources
import accueilImage from '../../assets/images/accueil-photo.png';
import { useState } from 'react';
import api  from '../../services/axios-service';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAlert from '../../hooks/useAlert';
import { Button } from '@mui/material';
import RelativeAlertComponent from '../../components/ui/RelativeAlertComponent';
import { useForm } from "react-hook-form";
import InputField from '../../components/ui/InpuField';
import useLogin from '../../services/LogService';

// Functional component definition for the login page
function Login() {
    const { register, handleSubmit,setError,control, formState : { errors } } = useForm();
    // Custom hook for displaying alerts
    const {setAlert} = useAlert();

    const {mutateAsync : login} = useLogin();

    // React router navigation hook
    const navigate = useNavigate();

    // State for password visibility
    const [showPassword, setShowPassword] = useState();

    // Custom hook for authentication
    const { setUser, setApiToken, user} = useAuth();


    // Function to toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }


    const onSubmit = async (data) => {

        try{
            await login( data,{
                                                onSuccess : async (response) => {
                                                    setApiToken(response.accessToken);
                                                    navigate('/customers');
                                                    setAlert({
                                                                active  : true, 
                                                                type    : "success", 
                                                                message : 'Connexion réussie !'
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


    // JSX structure for rendering the component
    return (
                <div className="bg-white flex justify-center items-center h-screen">
                        {/* <!-- Left: Image --> */}
                    <div className="w-1/2 h-screen hidden lg:block">
                        <img src={accueilImage} alt="Placeholder Image" className="object-cover  h-full" />
                    </div>
                    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                        { errors.email && <RelativeAlertComponent 
                            props={{severity:"error",msg : errors.email.message}}
                        />
                        }
                        { errors.password && <RelativeAlertComponent 
                            props={{severity:"error",msg : errors.password.message}}
                        />
                        }
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <!-- Username Input --> */}
                            <div className="mb-4">

                            <InputField
                             name="email"
                             label="Email"
                             type="text"
                             control={control}
                             rules={{
                               required: 'Email is required',
                               pattern: {
                                 value: /^\S+@\S+\.\S+$/,
                                 message: 'Enter a valid email',
                               },
                             }}
                            />
                            </div>

                            {/* <!-- Password Input --> */}
                            <div className="mb-4">
                            <FormControl  fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password",{
                                        required : "password is required",
                                        minLength : {value : 8,
                                                     message : "password must have least 8 caracters"
                                        }
                                    })}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Mot de passe"
                                />
                                </FormControl>
                            </div>
                            {/* <!-- Login Button --> */}
                            <div className='mt-12'>
                                <Button  
                                    type="submit"   
                                    fullWidth 
                                    variant="contained" 
                                    size="large"  
                                    >Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
    );
}
// Exporting the Login component as the default export
export default Login;