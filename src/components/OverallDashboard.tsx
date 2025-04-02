import {FC, JSX} from "react";
import { Card, CardBody } from "@/components/ui/Card";

interface MetricProps {
    label: string;
    value: string | number;
    percentage: number;
    color?: string;
    progress?: number;
}

const CircularMetric: FC<MetricProps> = ({
                                             label,
                                             value,
                                             percentage,
                                             color = "#3b82f6",
                                             progress = 75,
                                         }) => {
    return (
        <div className="relative flex flex-col items-center justify-center w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                    className="stroke-current text-gray-300 dark:text-gray-700"
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    strokeWidth="2"
                />
                <circle
                    className="stroke-current"
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    strokeWidth="3"
                    stroke={color}
                    strokeDasharray="100, 100"
                    strokeDashoffset={100 - progress}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{value}</span>
                <div className="flex items-center text-xs font-medium text-green-500">
                    <img src="/assets/arrow-up-right-green.svg" width={16} height={16} alt="arrow" />
                    {percentage}%
                </div>
            </div>
        </div>
    );
};

const SmallMetric: FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="text-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 w-full shadow-sm">
        <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white block">{value}</span>
    </div>
);

interface iOverallDashboardProps {
    className?: string;
}

const OverallDashboard = ({ className }: iOverallDashboardProps): JSX.Element => {
    return (
        <Card className={`w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg p-4 md:p-6 ${className}`}>
            <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Overall</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-between mb-4 md:mb-6">
                    <CircularMetric label="Profit" value="£72.41" percentage={117.5} color="#3b82f6" />
                    <CircularMetric label="Sales" value="£539.50" percentage={133.1} color="#3b82f6" />
                    <CircularMetric label="Units" value="45" percentage={173.1} color="#3b82f6" />
                    <CircularMetric label="ROI" value="25%" percentage={86.2} color="#3b82f6" progress={25} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <SmallMetric label="Reimbursements" value="0" />
                    <SmallMetric label="Refunds" value="1 (2.70%)" />
                    <SmallMetric label="Orders" value="37" />
                    <SmallMetric label="Margin" value="13.42%" />
                    <SmallMetric label="Other FBA fees" value="£59.35" />
                </div>
            </CardBody>
        </Card>
    );
};

export default OverallDashboard;
