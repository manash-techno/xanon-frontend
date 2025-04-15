import React from 'react'

const Accounts: React.FC = () => {
    return (
        <div className='w-full flex flex-col gap-4'>
            <p className="font-semibold">Account</p>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='text-xs'>Email</label>
                <input
                    type="text"
                    placeholder='Enter Email'
                    id='email'
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                                    bg-white dark:bg-[#242424]
                                                border-[#EEEEEE] dark:border-[#373737]
                                                text-[#1E1E1E] dark:text-[#fff]" />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="oldPassword" className='text-xs'>Old Password</label>
                <input
                    type="text"
                    placeholder='Enter Old Password'
                    id='oldPassword'
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                                    bg-white dark:bg-[#242424]
                                                border-[#EEEEEE] dark:border-[#373737]
                                                text-[#1E1E1E] dark:text-[#fff]" />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="newPassword" className='text-xs'>New Password</label>
                <input
                    type="text"
                    placeholder='Enter New Password'
                    id='newPassword'
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                                    bg-white dark:bg-[#242424]
                                                border-[#EEEEEE] dark:border-[#373737]
                                                text-[#1E1E1E] dark:text-[#fff]" />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="conNewPassword" className='text-xs'>Confirm New Password</label>
                <input
                    type="text"
                    placeholder='Enter Confirm New Password'
                    id='conNewPassword'
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                                    bg-white dark:bg-[#242424]
                                                border-[#EEEEEE] dark:border-[#373737]
                                                text-[#1E1E1E] dark:text-[#fff]" />
            </div>
            <div className="flex gap-2 mb-6">
                <button className='py-2 px-6 text-base cursor-pointer bg-[#F5F5F5] rounded-[6px]'>Update</button>
                <button className='py-2 px-6 text-base cursor-pointer'>Cancel</button>
            </div>
        </div>
    )
}

export default Accounts