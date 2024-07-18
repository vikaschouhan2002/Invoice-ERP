import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// third-party
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets

import Divider from '@mui/material/Divider';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const Payment = ({ isLoading }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={12}>
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                color: theme.palette.primary[500],
                                                textAlign: 'center',
                                                marginBottom: "10px"
                                            }}
                                        >
                                            Payment
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider style={{ border: '0.5px solid white' }} orientation="vertical" />
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography sx={{ marginTop: 1, color: "white" }} variant='h4'>This Month</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ marginTop: 1, color: "white" }} variant='h4'>$9600.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

Payment.propTypes = {
    isLoading: PropTypes.bool
};

export default Payment;
