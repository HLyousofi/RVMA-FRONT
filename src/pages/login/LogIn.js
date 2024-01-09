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



function Login() {
    const refLogin = useRef('');
    const refPwd = useRef('');
    const refSubmit = useRef('');
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState();
    const { setUser, setApiToken, user} = useAuth();


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(refLogin.current.value.length > 0 && refPwd.current.value.length > 0 ){
            const login = {email : refLogin.current.value, password : refPwd.current.value};
            try {
                const response = await api.post('/login', login );
                if(response.data.succes){
                        setApiToken(response.data.accessToken); 
                        navigate('/customers');
                        setAlert({active : true, type : "success", message : 'Connexion réussie !'});
                }else {
                    setError(true);
                    setApiToken();
                }
            }catch(error) {
                console.log(error)
            }
        }
        
    }

   
    return (
                <div className="bg-white flex justify-center items-center h-screen">
                        {/* <!-- Left: Image --> */}
                    <div className="w-1/2 h-screen hidden lg:block">
                        <img src={accueilImage} alt="Placeholder Image" className="object-cover  h-full" />
                    </div>
                    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                        <form onSubmit={handleSubmit}>
                            {/* <!-- Username Input --> */}
                            <div className="mb-4">
                            <TextField id="outlined-basic" error={error} fullWidth label="Login" inputRef={refLogin} variant="outlined" />
                            </div>
                            {/* <!-- Password Input --> */}
                            <div className="mb-4">
                            <FormControl  fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                <OutlinedInput
                                    error={error}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    inputRef={refPwd}
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
                                <Button  type="submit"   fullWidth variant="contained" size="large"  ref={ refSubmit }   >Login</Button>
                            </div>
                        </form>
                    </div>
                </div>
    );
}

export default Login;