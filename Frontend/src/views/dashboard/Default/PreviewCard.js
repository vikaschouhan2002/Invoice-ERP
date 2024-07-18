
import Grid from "@mui/material/Grid";
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card } from "@mui/material";


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function PreviewCard() {
    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px", padding: "10px" }} >
                <Grid container xs={12} spacing={3} className="whiteBox shadow" elevation={3}>
                    <Grid item xs={4}>
                        <Typography style={{ display: 'flex', justifyContent: "center", alignItems: "center" }} sx={{ marginBottom: "30px " }} variant="h5">Invoices Preview</Typography>



                        <Typography variant="p">Draft</Typography>
                        <LinearProgressWithLabel value={60} />
                        <Typography variant="p">Pending</Typography>
                        <LinearProgressWithLabel value={20} />
                        <Typography variant="p">Unpaid </Typography>
                        <LinearProgressWithLabel value={67} />
                        <Typography variant="p">Overdue</Typography>
                        <LinearProgressWithLabel value={18} />
                        <Typography variant="p">Partially </Typography>
                        <LinearProgressWithLabel value={11} />
                        <Typography variant="p">Paid</Typography>
                        <LinearProgressWithLabel value={21} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography style={{ display: 'flex', justifyContent: "center", alignItems: "center" }} sx={{ marginBottom: "30px " }} variant="h5">Quotes Preview</Typography>
                        <Typography variant="p">Draft</Typography>
                        <LinearProgressWithLabel value={60} />
                        <Typography variant="p">Pending</Typography>
                        <LinearProgressWithLabel value={20} />
                        <Typography variant="p">Sent </Typography>
                        <LinearProgressWithLabel value={67} />
                        <Typography variant="p">Declined</Typography>
                        <LinearProgressWithLabel value={18} />
                        <Typography variant="p">Accepted </Typography>
                        <LinearProgressWithLabel value={11} />
                        <Typography variant="p">Expired</Typography>
                        <LinearProgressWithLabel value={21} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography style={{ display: 'flex', justifyContent: "center", alignItems: "center" }} sx={{ marginBottom: "30px " }} variant="h5">Offers Preview</Typography>
                        <Typography variant="p">Draft</Typography>
                        <LinearProgressWithLabel value={60} />
                        <Typography variant="p">Pending</Typography>
                        <LinearProgressWithLabel value={20} />
                        <Typography variant="p">Sent </Typography>
                        <LinearProgressWithLabel value={67} />
                        <Typography variant="p">Declined</Typography>
                        <LinearProgressWithLabel value={18} />
                        <Typography variant="p">Accepted </Typography>
                        <LinearProgressWithLabel value={11} />
                        <Typography variant="p">Expired</Typography>
                        <LinearProgressWithLabel value={21} />
                    </Grid>
                </Grid>
            </div>
        </Card>

    )
}

export default PreviewCard