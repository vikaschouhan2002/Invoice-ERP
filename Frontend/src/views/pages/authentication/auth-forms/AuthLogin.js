import { useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect } from 'react';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { authenticate } from 'hooks/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginAPI } from 'hooks/postAPI';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [loginData, setLoginData] = useState({});
  const googleHandler = async () => {
    console.error('Login');
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange1 = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    console.log("login Data in handleChange : ", loginData);
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {

      const response = await loginAPI(loginData);

      if (response.status === 201) {
        const data = response.data.exist;   
        Cookies.set("Admin_Token", response.data.token, { expires: 1 });
        Cookies.set("Admin", JSON.stringify(data), { expires: 1 });
        Swal.fire({ icon: 'success', text: 'Login Successful', timer: 3000 });
        dispatch({ type: "@customization/SET_ADMIN_DATA", data });
        navigate("/dashboard/default");
      }
      else if (response.status === 203) {
        Swal.fire({ icon: 'error', text: 'You have not access of login', timer: 3000 });
      }
      else if (response.status === 204) {
        Swal.fire({ icon: 'error', text: 'Email not matched', timer: 3000 });
      }
      else if (response.status === 205) {
        Swal.fire({ icon: 'error', text: 'Password not matched', timer: 3000 });
      }
    } catch (error) {
      console.log("error : ", error);
      Swal.fire({
        icon: 'error',
        text: 'Error while Login',
        timer: 3000
      });
    }
  }

  useEffect(() => {
    const checkAuthentic = async () => {
      const response = await authenticate();
      console.log("response : ", response);
      if (!response) {
        navigate('/pages/login/login3');
      }
      else if (response.status === 201) {
        Cookies.set("Admin_Token", response.data.token, { expires: 1 });
        dispatch({ type: "@customization/SET_ADMIN_DATA", data });
        navigate("/dashboard/default");
      }
      else if (response.status === 203) {
        Swal.fire({ icon: 'error', text: 'Token is expired', timer: 3000 });
        navigate('/pages/login/login3');
      }
      else if (response.status === 206) {
        Swal.fire({ icon: 'error', text: 'your account not enabled', timer: 3000 });
        navigate('/pages/login/login3');
      }
    }
    checkAuthentic();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          email: 'info@codedthemes.com',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={submitLogin} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                // value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={(e) => { handleChange(e); handleChange1(e); }}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                // value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={(e) => { handleChange(e); handleChange1(e); }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
