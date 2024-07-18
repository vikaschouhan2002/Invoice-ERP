import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, useMediaQuery } from '@mui/material';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FirebaseRegister = ({ ...others }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();


  const validationSchema = Yup.object({
    firstName: Yup.string().matches(/^[A-Za-z\s'-]{1,50}$/, "First Name contains only alphabets").required("First Name is Required"),
    lastName: Yup.string().matches(/^[A-Za-z\s\-']{1,50}$/, "Last Name contains only alphabets").required("Last Name is Required"),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('values:- ', values);
        const response = await axios.post(`${backendURL}/admin/register`, values);
        if (response.status === 201) {
          const data = response.data.data;
          Cookies.set("Admin_Token", response.data.token, { expires: 1 });
          Cookies.set("Admin", JSON.stringify(data), { expires: 1 });
          Swal.fire({ icon: 'success', text: response.data.message, timer: 3000 });
          dispatch({ type: "@customization/SET_ADMIN_DATA", data });
          navigate("/dashboard/default");
        }
        else {
          Swal.fire({ icon: 'error', text: response.data.message, timer: 3000 });
        }
      } catch (error) {
        console.log("error : ", error);
        Swal.fire({ icon: 'error', text: 'error while registering', timer: 3000 });
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  const getData = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
    console.log("admin Data : ", adminData);
  }
  return (
    <>
      <form method='post' onSubmit={formik.handleSubmit} >
        <Grid container>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth error={Boolean(formik.touched.firstName && formik.errors.firstName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">First Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                fullWidth
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {formik.errors.firstName}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth error={Boolean(formik.touched.lastName && formik.errors.lastName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Last Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {formik.errors.lastName}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(formik.touched.email && formik.errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(formik.touched.password && formik.errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  changePassword(e.target.value);
                }}
                onBlur={formik.handleBlur}
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
                fullWidth
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        {strength !== 0 && (
          <FormControl fullWidth>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        )}

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
              }
              label={
                <Typography variant="subtitle1">
                  Agree with &nbsp;
                  <Typography variant="subtitle1" component={Link} to="#">
                    Terms & Condition.
                  </Typography>
                </Typography>
              }
            />
          </Grid>
        </Grid>
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button disableElevation disabled={!checked || formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
              Sign up
            </Button>
          </AnimateButton>
        </Box>
      </form>

    </>
  );
};

export default FirebaseRegister;
