import { AssetsConfig } from "@/config/assetsConfig"
import { ReactImage } from "./ui/ReactImage"

const EmptyLeaderboard = () => {
    return (
        <div className="flex flex-col justify-center items-center w-[360px] py-16">
            <ReactImage
                src={AssetsConfig.icons.leaderboard_big.src}
                width={60}
                height={60}
                alt={AssetsConfig.icons.leaderboard_big.alt}
            />
            <p className="text-xl font-semibold mt-2 mb-1">Empty Leaderboard Group</p>
            <p className="text-sm text-[#858585]">Greate a new group or join one and get rewards!</p>
        </div>
    )
}

export default EmptyLeaderboard