import UserTable from '@/components/User/UserTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Users"
}

export default function LoginPage() {
    return <UserTable />
}