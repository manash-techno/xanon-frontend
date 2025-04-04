import {JSX} from "react";

interface MetricProps {
    label: string
    value: string | number
    color?: string
    progress?: number
}

export const CircularMetric: ({label, value, color, progress}: MetricProps) => JSX.Element = ({
    label,
    value,
    color = "bg-blue-500",
    progress = 75,
}) => {
    return (
        <div className={`relative w-40 h-40 flex items-center justify-center`} style={{borderColor: color}}>
            <svg className="w-36" viewBox="0 0 36 36">
                <path
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                />
                <path
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    strokeDasharray="100, 100"
                    strokeDashoffset={100 - progress}
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-sm text-[#6E8091]">{label}</div>
                <div className="font-semibold">{value}</div>
                <div className="text-xs text-[#6E8091] flex items-center justify-center">
                    {progress}%
                </div>
            </div>
        </div>
    );
};