import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel, TextField, Switch } from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { AiOutlineLock } from "react-icons/ai";
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backendURL } from 'assets/url/url';


export default function AdminDrawer(props) {
    const { handleClickOpen , handleSetMode , open, handleClose, setRowData, fetchData , mode , data } = props;
    const [data1,setData1] = useState({});
    const [showPassword, setShowPassword] = React.useState(false);
    const [Password , setPassword] = useState('');
    const Roles = ["SuperAdmin","Staff Admin Crud","Staff CRU","Create and Read Only","Read Only"];

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const getData = (e)=>{
        console.log("event : ",e.target.value);
        if(e.target.files){
            setData1({...data1,[e.target.name]:e.target.files[0]}); 
        }
        else if(e.target.name === 'Enabled'){
            setData1({...data1,[e.target.name]:!e.target.defaultChecked});
            document.getElementById("enable").defaultChecked=!e.target.defaultChecked;
        }
        else{
            setData1({...data1,[e.target.name]:e.target.value});
        }
    }

    const getData2 = (e)=>{
        if(e.target.files){
            setRowData({...data,[e.target.name]:e.target.files[0]}); 
        }
        else if(e.target.name === 'Enabled'){
            setRowData({...data,[e.target.name]:!e.target.defaultChecked});
            document.getElementById("enable").defaultChecked=!e.target.defaultChecked;
        }
        else{
            setRowData({...data,[e.target.name]:e.target.value});
        }
    }

    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            const formData = new FormData();
            for(var key in data1){
                console.log("key in loop : ",data1[key]);
                formData.append(key,data1[key]);
                console.log("formData : ",formData);
            }
            const response = await axios.post(`${backendURL}/admin/addNewAdmin`,formData);
            if(response.status === 201){
                Swal.fire({icon:'success',text:'Admin added',timer:3000});
                fetchData();
                handleClose();
            }
            else if(response.status === 203){
                Swal.fire({icon:'error',text:'add with another email',timer:3000});
            }
        }catch(error){
            console.log("error ",error);
            Swal.fire({icon:'error',text:'Error while adding admin',timer:3000});
        }
    }
    
    const handleSubmit2 = async(e)=>{
        try{
            e.preventDefault();
            const formData = new FormData();
            for(var key in data){
                console.log("key in loop : ",data[key]);
                formData.append(key,data[key]);
                console.log("formData : ",formData);
            }
            const response = await axios.put(`${backendURL}/admin/updateAdmin/${data._id}`,formData);
            if(response.status === 200){
                Swal.fire({icon:'success',text:'admin data updated',timer:3000});
                fetchData();
                handleClose();
            }
            else if(response.status === 204){
                Swal.fire({icon:'error',text:'data not found',timer:3000});
            }
        }catch(error){
            console.log("error ",error);
            Swal.fire({icon:'error',text:'Error while adding admin',timer:3000});
        }
    }

    const handleSubmit3 = async(e)=>{
        try{
            e.preventDefault();         
              console.log("Password : ",Password);   
                const response = await axios.put(`${backendURL}/admin/updatePassword/${data._id}`,{Password});
                if(response.status === 200){
                    Swal.fire({icon:'success',text:'Password Updated',timer:3000});
                    fetchData();
                    handleClose();
                }
                else if(response.status === 204){
                    Swal.fire({icon:'error',text:'data not found',timer:3000});
                }
        }catch(error){
            console.log("error ",error);
            Swal.fire({icon:'error',text:'Error while update Password ',timer:3000});
        }
    }
    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={open}
                        onClose={handleClose}

                    >
                        <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '10px' }}>
                            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                            <Typography variant='h3' style={{ marginLeft: '10px' }}>Admin</Typography>
                        </Grid>
                        <Divider orientation='horizontal' style={{ marginTop: '10px' }} />
                        <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px" }}>
                            {/* <TextField variant='outlined' placeholder='Enter a search ' /> */}
                            <FormControl fullWidth style={{ margin: "10px", width: "200px" }}>
                                <Select
                                    id="search"
                                    name="search"
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem value="Website Referrals">Website Referrals</MenuItem>
                                    <MenuItem value="Advertising">Advertising </MenuItem>
                                    <MenuItem value="Social Media">Social Media </MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant='outlined' style={{ margin: "10px" }}>+</Button>
                        </Grid>
                        {mode === "show" ? <Grid style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: '15px', padding: "5px" }}>
                            <Button variant='text' style={{ margin: "10px" }}><AiOutlineDelete style={{ margin: "5px" }} /> Remove</Button>
                            <Button variant='text' onClick={()=>{handleSetMode('edit')}} style={{ margin: "10px" }}><AiTwotoneEdit style={{ margin: "5px" }} /> Edit</Button>
                            <Button variant='text' onClick={()=>{handleClickOpen()}} style={{ margin: "10px" }}><AiOutlineLock style={{ margin: "5px" }} /> Update Password</Button>
                        </Grid> : null}
                        <Divider orientation='horizontal' style={{ marginTop: '10px' }} />
                        {mode === "show" ? <>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>First Name: {data.First_Name}</Typography>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Last Name: {data.Last_Name}</Typography>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Email:  {data.Email}</Typography>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Role:  {data.Role}</Typography>
                            </Grid>
                        </> : null}
                        <Button variant='outlined' style={{ margin: "10px" }} >ADD NEW ADMIN</Button>
                        {mode === "add" ?
                            <form method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>First Name</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField
                                        id="firstName"
                                        name="First_Name"
                                        label=""
                                        size="small"
                                        maxRows={10}
                                        fullWidth
                                        required
                                        onChange={(e)=>{getData(e)}}
                                    />
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Last Name</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField
                                        id="lastName"
                                        name="Last_Name"
                                        label=""
                                        size="small"
                                        maxRows={10}
                                        fullWidth
                                        required
                                        onChange={(e)=>{getData(e)}}
                                    />
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Email</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField
                                        id="email"
                                        name="Email"
                                        label=""
                                        size="small"
                                        maxRows={10}
                                        fullWidth
                                        required
                                        onChange={(e)=>{getData(e)}}
                                    />
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Password</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <FormControl fullWidth>
                                        <OutlinedInput
                                            name='Password'
                                            id="outlined-adornment-password"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            required
                                            onChange={(e)=>{getData(e)}}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <FormLabel style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Enabled</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Switch defaultChecked={false} name='Enabled' id='enable' onChange={(e)=>{getData(e)}}/>
                                </Grid>
                                <FormLabel style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Role</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <FormControl fullWidth>
                                        <Select
                                            id="role"
                                            name="Role"
                                            size="small"
                                            fullWidth
                                            onChange={(e)=>{getData(e)}}
                                        >
                                         {
                                            Roles.map((role,index)=>{
                                                return(
                                                    <MenuItem value={role} key={index}>{role}</MenuItem>
                                                )
                                            })
                                         }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Photo</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="outlined"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        style={{ margin: 10 }}
                                    >
                                        Click To Upload
                                        <VisuallyHiddenInput type="file" name='adminProfile' onChange={(e)=>{getData(e)}} />
                                    </Button>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Submit</Button>
                                </Grid>
                            </form> : null}
                        {mode === "edit" ?
                            <>
                                <Grid style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: '15px', padding: "5px" }}>
                                    <Button variant='text' style={{ margin: "10px" }}><AiOutlineDelete style={{ margin: "5px" }} /> Remove</Button>
                                    <Button variant='text' onClick={()=>{handleSetMode('show')}} style={{ margin: "10px" }}><AiTwotoneEdit style={{ margin: "5px" }} /> Show</Button>
                                    <Button variant='text' onClick={()=>{handleClickOpen()}} style={{ margin: "10px" }}><AiOutlineLock style={{ margin: "5px" }} /> Update Password</Button>
                                </Grid>
                                <form method='post' onSubmit={handleSubmit2} encType='multipart/form-data'>
                                    <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>First Name</FormLabel>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <TextField
                                            id="firstName"
                                            name="First_Name"
                                            label=""
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            required
                                            defaultValue={data.First_Name}
                                            onChange={(e)=>{getData2(e)}}
                                        />
                                    </Grid>
                                    <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Last Name</FormLabel>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <TextField
                                            id="lastName"
                                            name="Last_Name"
                                            label=""
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            required
                                            defaultValue={data.Last_Name}
                                            onChange={(e)=>{getData2(e)}}
                                        />
                                    </Grid>
                                    <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Email</FormLabel>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label=""
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            required
                                            onChange={(e)=>{getData2(e)}}
                                            defaultValue={data.Email}
                                        />
                                    </Grid>
                                    {/* <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Password</FormLabel>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                name='password'
                                                id="outlined-adornment-password"
                                                size="small"
                                                maxRows={10}
                                                fullWidth
                                                required
                                                defaultValue={data.Password}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid> */}
                                    <FormLabel style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Enabled</FormLabel>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <Switch defaultChecked={data.Enabled} name='Enabled' id='enabled' />
                                    </Grid>
                                    <FormLabel style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Role</FormLabel>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <FormControl fullWidth>
                                            <Select id="role" name="Role" size="small" fullWidth defaultValue={data.Role} onChange={(e)=>{getData2(e)}}>
                                            {
                                                Roles.map((role,index)=>{
                                                    return(
                                                        <MenuItem value={role} key={index}>{role}</MenuItem>
                                                    )
                                                })
                                            }

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Photo</FormLabel>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="outlined"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                            style={{ margin: 10 }}
                                            onChange={(e)=>{getData2(e)}}
                                        >
                                            Click To Upload
                                            <VisuallyHiddenInput type="file" name='adminProfile' onChange={(e)=>{getData(e)}} />
                                        </Button>
                                        <Typography sx={{padding:'10px 0'}}>{data.Profile}</Typography>
                                    </Grid>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <Button variant='contained' type='submit' style={{ margin: "10px" }}>Save</Button>
                                        <Button variant='outlined' type='submit' style={{ margin: "10px" }}>Cancel</Button>
                                    </Grid>
                                </form>
                            </> : null}

                        {
                            mode === "updatePassword" ? <>
                                <Grid style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: '15px', padding: "5px" }}>
                                    <Button variant='text' style={{ margin: "10px" }}><AiOutlineDelete style={{ margin: "5px" }} /> Remove</Button>
                                    <Button variant='text' style={{ margin: "10px" }}><AiTwotoneEdit style={{ margin: "5px" }} /> Edit</Button>
                                    <Button variant='text' style={{ margin: "10px" }}><AiOutlineLock style={{ margin: "5px" }} /> Update Password</Button>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "5px" }}>
                                    <Typography variant='h4' style={{ margin: "10px", }}>Update Password</Typography>
                                </Grid>
                                <form method='post' onSubmit={handleSubmit3}>
                                    <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>New Password</FormLabel>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                name='Password'
                                                id="outlined-adornment-password"
                                                size="small"
                                                maxRows={10}
                                                fullWidth
                                                required
                                                type={showPassword ? 'text' : 'password'}
                                                onChange={(e)=>{setPassword(e.target.value);}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <Button variant='contained' type='submit' style={{ margin: "10px" }}>Save</Button>
                                        <Button variant='outlined' type='submit' style={{ margin: "10px" }}>Cancel</Button>
                                    </Grid>
                                </form>

                            </> : null
                        }
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}