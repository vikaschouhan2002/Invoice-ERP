import { Typography } from "@mui/material"
import React, { useState } from "react"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import GeneralSettingForm from "./GeneralSettingForm";
import CompanySettingForm from "./CompanySettingForm";
import LogoSettingForm from "./LogoSettingForm";
import CurrencySettingForm from "./CurrencySettingForm";
import FinanceSettingForm from "./FinanceSettingForm";
import { CiSettings } from "react-icons/ci";
import { CiTrophy } from "react-icons/ci";
import { AiOutlineFileImage } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { AiOutlineCreditCard } from "react-icons/ai";
import { useEffect } from "react";
import { useLocation } from "react-router";
const GeneralSettings = () => {
    const [openForm, setOpenForm] = useState('general');
    const location = useLocation();
    useEffect(()=>{
        if(location.state){
            setOpenForm(location.state.openForm);
        }
    },[]);
    return (
        <Grid container xs={12}>
            <Grid xs={9}>
                <Card>
                    <Grid xs={12} style={{ margin: "10px", padding: "10px", textAlign: "start" }}>
                        <Typography variant="h2">{openForm === "general" ? "General Settings" : openForm === "company" ? "Company Settings" : openForm === 'logo' ? "General Settings" : openForm === "currency" ? "Money Format Settings" : openForm === "finance" ? "Finance Settings" : null}</Typography>
                    </Grid>
                    <Grid xs={12} style={{ margin: "10px", padding: "10px", textAlign: "start" }}>
                        <Typography variant="h4">{openForm === "general" ? "Company" : openForm === "company" ? "Company Settings" : openForm === "logo" ? "Company Logo" : openForm === "currency" ? "Currency Format" : openForm === "finance" ? "Finance Settings" : null}</Typography>
                    </Grid>
                    <Grid xs={12} style={{ margin: "10px", padding: "10px", textAlign: "start" }}>
                        <Typography variant="h5" style={{ color: "#949494" }}>{openForm === "logo" ? "Update Company Logo" : openForm === 'currency' ? "Update Currency Format" : openForm === "finance" ? "Update Company Finance Settings" : "Update Your Company Informations"}</Typography>
                    </Grid>

                    <Grid xs={12} style={{ margin: "10px", padding: "10px", textAlign: "start" }}>
                        {openForm === "general" ? <GeneralSettingForm /> : openForm === "company" ? <CompanySettingForm /> : openForm === "logo" ? <LogoSettingForm /> : openForm === "currency" ? <CurrencySettingForm /> : openForm === "finance" ? <FinanceSettingForm /> : null}
                    </Grid>
                </Card>
            </Grid>
            <Grid xs={3}>
                <Grid xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                    <Card style={{ paddingBottom: "25px", paddingTop: "25px", paddingLeft: "100px", paddingRight: "100px" }} >
                        <Typography variant="h2">Settings</Typography>
                    </Card>
                </Grid>

                <Grid xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "start" }}>
                    <Card style={{ paddingBottom: "25px", paddingTop: "25px", paddingLeft: "65px", paddingRight: "65px" }}>
                        <span style={{ display: 'flex', justifyContent: "start", alignItems: "flex-start", cursor: "pointer" }}>
                            <Typography style={{ margin: "5px" }} onClick={() => {
                                setOpenForm('general')
                            }} variant="h5" ><CiSettings /> General Settings</Typography>
                        </span>
                        <span style={{ display: 'flex', justifyContent: "start", alignItems: "flex-start", cursor: "pointer" }}>
                            <Typography style={{ margin: "5px" }} onClick={() => {
                                setOpenForm('company')
                            }} variant="h5"><CiTrophy /> Company Settings</Typography>
                        </span>
                        <span style={{ display: 'flex', justifyContent: "start", alignItems: "flex-start", cursor: "pointer" }}>
                            <Typography style={{ margin: "5px" }} onClick={() => {
                                setOpenForm('logo')
                            }} variant="h5"><AiOutlineFileImage /> Company Logo</Typography>
                        </span>
                        <span style={{ display: 'flex', justifyContent: "start", alignItems: "flex-start", cursor: "pointer" }}>
                            <Typography style={{ margin: "5px" }} onClick={() => {
                                setOpenForm('currency')
                            }} variant="h5"><AiOutlineDollarCircle /> Currency Settings</Typography>
                        </span>
                        <span style={{ display: 'flex', justifyContent: "start", alignItems: "flex-start", cursor: "pointer" }}>
                            <Typography style={{ margin: "5px" }} onClick={() => {
                                setOpenForm('finance')
                            }} variant="h5"><AiOutlineCreditCard /> Finance Settings</Typography>
                        </span>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default GeneralSettings