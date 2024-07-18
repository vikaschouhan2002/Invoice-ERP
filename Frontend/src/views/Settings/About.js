import { Button, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { FaCircleExclamation } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function About() {
    return (
        <Card>
            <Grid container display="flex" alignItems="center" justifyContent="center" height="82vh">
                <Grid item>
                    <Card style={{ textAlign: 'center' }}>
                        <FaCircleExclamation style={{ color: 'blue', fontSize: '90px' }} />
                        <Typography style={{ marginTop: "5px" }} variant='h3'>Samyotech</Typography>
                        <Typography style={{ marginTop: "5px" }} variant='h5'>Do You Need Help On Customize Of This App</Typography>
                        <Typography style={{ marginTop: "15px" }} variant='h5'>Website : <a style={{ textDecoration: "none", color: "blue" }} href='https://samyotech.com/' target='_blank' rel="noreferrer"> https://samyotech.com/</a></Typography>
                        <Typography style={{ marginTop: "15px" }} variant='h5'>BitBucket : <a style={{ textDecoration: "none", color: "blue" }} href='https://bitbucket.org/amit_ujj/invoiceerp/src/master/' target='_blank' rel="noreferrer">https://bitbucket.org/amit_ujj/invoiceerp/src/master/</a></Typography>
                        <Button style={{ marginTop: "15px" }} variant='contained'>Contact Us</Button>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    )
}

export default About