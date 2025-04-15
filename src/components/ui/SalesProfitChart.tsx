import { LineChart } from '@mui/x-charts/LineChart';

const dataset = [
  { day: 'Mon', sales: 160, profit: 50 },
  { day: 'Tue', sales: 165, profit: 52 },
  { day: 'Wed', sales: 172, profit: 55 },
  { day: 'Thu', sales: 185, profit: 58 },
  { day: 'Fri', sales: 182, profit: 60 },
  { day: 'Sat', sales: 195, profit: 70 },
  { day: 'Sun', sales: 215, profit: 80 },
];

function SalesProfitChart() {
  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        {
          id: 'Days',
          dataKey: 'day',
          scaleType: 'point',
          label: '',
        },
      ]}
      series={[
        {
          id: 'Sales',
          label: 'Sales',
          dataKey: 'sales',
          area: true,
          color: 'rgba(66, 165, 245, 0.5)', // semi-transparent light blue
          showMark: false,
        },
        {
          id: 'Profit',
          label: 'Profit',
          dataKey: 'profit',
          area: true,
          color: 'rgba(239, 154, 154, 0.5)', // semi-transparent light red
          showMark: false,
        },
      ]}
      // width={}
      height={300}
      margin={{ left: 40, right: 30, top: 20, bottom: 40 }}
      grid={{ vertical: false }}
      sx={{
        backgroundColor: 'inherit',
        borderRadius: 2,
        width: '100%',
        '& .MuiChartsAxis-left .MuiChartsAxis-line': {
          stroke: '#E0E0E0',
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
          ".dark &": {
            fill: 'white',
          },
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-tick': {
          stroke: 'transparent',
        },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
          stroke: 'transparent',
        },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-tick': {
          stroke: 'transparent',
        },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
          textAnchor: 'start', // center align
          dominantBaseline: 'hanging',
          transform: 'translateY(6px)',
          ".dark &": {
            fill: 'white',
          },
        },
      }}
    />
  );
}

export default SalesProfitChart;
