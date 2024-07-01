// Importing necessary modules and resources
import accueilImage from '../../assets/images/accueil-photo.png';
import { useRef, useState } from 'react';
import api  from '../../services/axios-service';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAlert from '../../hooks/useAlert';
import { Button } from '@mui/material';
import RelativeAlertComponent from '../../components/ui/RelativeAlertComponent';
import { useForm } from "react-hook-form";

// Functional component definition for the login page
function Login() {


    const { register, 
            handleSubmit,
            setError, 
            formState : { errors } } = useForm();
    // Custom hook for displaying alerts
    const {setAlert} = useAlert();

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


    // const onSubmit = ( e, data ) => {
    //     e.eventDefault();
    //     console.log(data);

    // }

    const onSubmit = async (data) => {
            try {
                const response = await api.post('/login', data );
                if(response.data.success){
                        setApiToken(response.data.accessToken); 
                        navigate('/customers');
                        setAlert({active : true, type : "success", message : 'Connexion réussie !'});
                }else {
                    setError("email", { message : response?.data?.error})
                    setApiToken();
                }
            }catch(err) {
                console.log(err)
                if(err?.response?.status < 500){
                    setError("email",{message : "Désolé, le service est actuellement indisponible pour maintenance. Revenez bientôt !"});
                }
            }
        // }
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
                            <TextField id="outlined-basic" 
                                       fullWidth 
                                       label="Login" 
                                       {...register("email",{
                                        required : "email is required",
                                        validate : (value) => {
                                            if(!value.includes('@')){
                                                return "email must inlcude @";
                                            }
                                            return true;
                                        } 
                                       })}
                                       variant="outlined" />
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