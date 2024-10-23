"use client"

import { useRouter } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';

import SidebarNav from './SidebarNav';
import Logo from '../common/Logo';

export default function SideNav() {
    const router = useRouter()

    const signOut = () => {
        localStorage.setItem('token', '');
        router.push('/auth/login');
    }

    return (
        <div className="flex h-full w-full flex-col px-3 py-4 md:px-2">
            <div className="flex w-full justify-center rounded-lg h-[10%]">
                <Logo textSize='text-3xl'/>
            </div>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <SidebarNav />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <div onClick={() => signOut()}>
                    <button className="flex h-[48px] shadow-xl w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
