import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormLabel, Grid } from '@mui/material'

function LogoSettingForm() {
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
    return (
        <form encType="multipart/form-data">
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Logo File:
                    </FormLabel>
                    <Button
                        component="label"
                        role={undefined}
                        variant="text"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        style={{ margin: 10 }}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >

                    <Button style={{ margin: "5px" }} variant="contained" color="primary" type="submit">Save</Button>
                    <Button style={{ margin: "5px" }} variant="outlined" color="primary" >Cancel</Button>

                </Grid>
            </Grid>
        </form>
    )
}

export default LogoSettingForm