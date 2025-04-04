import {Card, CardBody} from "@/components/ui/Card";
import { CircularMetric } from "@/components/ui/CircularMetric";
import { JSX } from "react";

const RepriceOverview: () => JSX.Element = () => {
    return (
        <Card className="rounded-xl border text-card-foreground w-full bg-[#FAFAFA] border-none shadow-none mb-6">
            <CardBody className="flex justify-between p-4">
                    <CircularMetric label="Repricing" value="12" color="#3b82f6" progress={100} />
                    <CircularMetric label="At Minimum" value="7" color="#3b82f6" progress={58.3} />
                    <CircularMetric label="At Maximum" value="0" color="#3b82f6" progress={0} />
                    <CircularMetric label="Buy Box Win" value="0" color="#3b82f6" progress={0} />
                    <CircularMetric label="Matching Buy Box" value="0" color="#3b82f6" progress={0} />
            </CardBody>
        </Card>
    )
}

export default RepriceOverview