import React from 'react'

interface MetricProps {
    label: string
    value: string | number
    percentage?: number
    color?: string
    progress?: number
}

const CircularMetric: React.FC<MetricProps> = ({
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
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 text-wrap break-words">{label}</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{value}</span>

                {percentage && (
                    <div className="flex items-center text-xs font-medium text-green-500">
                        <img src="/assets/arrow-up-right-green.svg" width={16} height={16} alt="arrow" />
                        {percentage}%
                    </div>
                )}
                {
                    progress && (
                        <div className="text-xs text-[#6E8091] flex items-center justify-center">
                            {progress}%
                        </div>
                    )
                }

            </div>
        </div>
    );
};


export default CircularMetric