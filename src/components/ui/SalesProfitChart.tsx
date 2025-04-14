import { Card } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { CardBody } from './Card';

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
    <Card className={`w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg p-4 md:p-6`}>
      <CardBody>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Sales & Profit</h2>
          <button className='text-[#0077E5] font-semibold cursor-pointer text-right'>Compare</button>
        </div>

        <LineChart
          dataset={dataset}
          xAxis={[
            {
              id: 'Days',
              dataKey: 'day',
              scaleType: 'band',
            },
          ]}
          series={[
            {
              id: 'Sales',
              label: 'Sales',
              dataKey: 'sales',
              stack: 'total',
              area: true,
              color: '#42A5F5', // light blue
              showMark: false,
            },
            {
              id: 'Profit',
              label: 'Profit',
              dataKey: 'profit',
              stack: 'total',
              area: true,
              color: '#EF9A9A', // light red
              showMark: false,
            },
          ]}
          width={800}
          height={400}
          margin={{ left: 50, right: 20, top: 40, bottom: 50 }}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            p: 2,
            boxShadow: 1,
          }}
        />
      </CardBody>
    </Card>
  );
}

export default SalesProfitChart;