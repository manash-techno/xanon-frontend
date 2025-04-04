import EmptyLeaderboard from '@/components/EmptyLeaderBoard'
import { ReactImage } from '@/components/ui/ReactImage'
import { ReactInput } from '@/components/ui/ReactInput'
import { AssetsConfig } from '@/config/assetsConfig'
import { ChangeEvent, JSX, useState } from 'react'

const LeaderboardsPage: () => JSX.Element = () => {
    const [search, setSearch] = useState<string>('')
    const handleSearchEvent = (e: ChangeEvent<HTMLInputElement>) => {
        // dispatch(setCurrentPage(1));
        // dispatch(setSearch(e.target.value));
    };
    return (
        <div className='w-full'>
            <div className="relative mb-4 w-60">
                <div className="absolute -translate-y-2/4 top-2/4 left-3">
                    <ReactImage
                        src={AssetsConfig.icons.search  .src}
                        width={16}
                        height={16}
                        alt={AssetsConfig.icons.search.alt}
                    />
                </div>
                <ReactInput
                    placeholder="Search group by name or ID"
                    value={search}
                    onChange={handleSearchEvent}
                    className="w-full h-10 pl-10 text-sm"
                />
            </div>

            <EmptyLeaderboard />
        </div>
    )
}

export default LeaderboardsPage