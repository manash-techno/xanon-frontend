import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ReactButton } from './ui/ReactButton';
import { Copy, MoreVertical } from 'lucide-react';
import { ReactImage } from './ui/ReactImage';
import { Avatar } from '@mui/material';
import { AssetsConfig } from '@/config/assetsConfig';

export interface GroupCardProps {
    name: string
    memberCount: number
    id: string
    isPrivate?: boolean
    onLeave?: () => void
}

const GroupCard: FC<GroupCardProps> = ({ name, memberCount, id, isPrivate, onLeave}) => {
    const copyId = () => {
        navigator.clipboard.writeText(id)
    }

    return (
        <Link to={"/leaderboard/detail/1"}>
            <Card className="w-full max-w-[360px] pb-5 pt-2 shadow-none rounded-lg">
                <div className="relative">
                    {/* Top Actions */}
                    <div className="absolute right-0 top-0 flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <ReactButton variant="ghost" size="icon"  className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </ReactButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-red-600 gap-1 hover:!text-red-600">
                                    <ReactImage
                                        src={AssetsConfig.icons.leave.src}
                                        width={20}
                                        height={20}
                                        alt={AssetsConfig.icons.leave.alt}
                                    />
                                    Leave
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Group Info */}
                    <div className="flex flex-col items-center text-center pt-4">
                        <Avatar className="h-20 w-20 mb-4">
                            {/* <AvatarFallback className="bg-gray-100 font-bold text-xl"> */}
                                GN
                            {/* </AvatarFallback> */}
                        </Avatar>

                        <h3 className="font-bold text-xl">{name}</h3>
                        <div className="flex gap-4">
                            <div className="flex gap-1.5 items-center">
                                <ReactImage
                                    src={isPrivate ? AssetsConfig.icons.private.src : AssetsConfig.icons.public.src}
                                    width={16}
                                    height={16}
                                    alt="profile"
                                    className="w-4 h-4"
                                />
                                <p className="text-sm text-[#6E8091]">
                                    {isPrivate ? "Private" : "Public"} Group
                                </p>
                            </div>
                            <div className="flex gap-1.5 items-center">
                                <ReactImage
                                    src={AssetsConfig.icons.profile.src}
                                    width={16}
                                    height={16}
                                    alt={AssetsConfig.icons.profile.alt}
                                />
                                <p className="text-sm text-[#6E8091]">
                                    {memberCount} members
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-[#6E8091] mt-1">
                            <span>ID: {id}</span>
                            <ReactButton
                                variant="ghost"
                                // size="icon"
                                className="h-6 w-6"
                                onClick={copyId}
                            >
                                <Copy className="h-3 w-3 text-[]" />
                            </ReactButton>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default GroupCard