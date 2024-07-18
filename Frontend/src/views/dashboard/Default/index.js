import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';
// project imports

import CustomerPreviewCard from './CustomerPreviewCard';
import Income from './Income';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
//import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AppTrafficBySite from './TrafficBySiteCard';
import Iconify from '../../../ui-component/iconify';
import AppTasks from './AppTask';
import Quote from './Quote';
import Payment from './Payment';
import DueBalance from './DueBalance';
import useFetch from '../../../hooks/useFetch';
import RecentInvoices from './RecentInvoices';
import RecentQuotes from './RecentQuotes';
import PreviewCard from './PreviewCard';
import { authenticate } from 'hooks/authAPI';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminData,setAdminData] = useState({});
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    const checkAuthentic = async()=>{
      const response = await authenticate();
      if(!response){
          navigate('/pages/login/login3');
      }
      else if(response.status === 201){
        Cookies.set("Admin_Token",response.data.token,{expires:7});
        setAdminData(response.data.data);
        console.log("response : ",response.data.data);
      }
      else if(response.status === 203){
          Swal.fire({
              icon:'error',
              text:'Token is expired',
              timer:3000
          });
          navigate('/pages/login/login3');
      }
      else if(response.status === 206){
          Swal.fire({
              icon:'error',
              text:'your account not enabled',
              timer:3000
          });
          navigate('/pages/login/login3');
      }
    }
    checkAuthentic();
  }, []);

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Income isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Quote isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <Payment isLoading={isLoading} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            {/* <EarningCard isLoading={isLoading} /> */}
            <DueBalance isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}  >
        <Grid container spacing={gridSpacing} style={{ objectFit: "contain" }}>
          <Grid item xs={12} md={12} lg={9} >
            {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
            <PreviewCard />
          </Grid>
          <Grid item xs={12} md={12} lg={3} spacing={gridSpacing}>
            <CustomerPreviewCard
              isLoading={clientLoading}
              activeCustomer={clientResult?.active}
              newCustomer={clientResult?.new}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={6}>
            <RecentInvoices />
          </Grid>
          <Grid item xs={12} md={4} lg={6}>
            <RecentQuotes />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={5}>
            {/* <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />
                }
              ]}
            /> */}
          </Grid>
          <Grid item xs={12} md={7}>
            {/* <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' }
              ]}
            /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
