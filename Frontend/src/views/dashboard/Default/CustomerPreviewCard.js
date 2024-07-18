import React from 'react';
import { Grid, Paper, Typography, CircularProgress, LinearProgress, Divider, Card } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useEffect } from 'react';
import ApexCharts from 'apexcharts';

export default function CustomerPreviewCard({
  isLoading = false,
  activeCustomer = 56,
  newCustomer = 29,
}) {


  useEffect(() => {
    const options = {
      series: [newCustomer],
      chart: {
        height: 250,
        type: 'radialBar',
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Percent'],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    
    return () => {
      chart.destroy();
    };
  }, [])


  return (
    <Card  >
      <Grid container className="gutter-row whiteBox shadow" elevation={3} style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <div id="chart" style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
          {/* Chart will be rendered here */}
        </div>
      </Grid >
      <Typography style={{ display: 'flex', justifyContent: "center", alignItems: "center" }} variant='h5'>New Customer This Month</Typography>
      <Divider style={{ margin: "10px" }} orientation="horizontal" />
      <Typography style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px" }} variant='h5'>Active Customer</Typography>
      <Typography style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px", color: "green" }} variant='h5'>{activeCustomer > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} {activeCustomer}.00</Typography>

    </Card >
  );
}
