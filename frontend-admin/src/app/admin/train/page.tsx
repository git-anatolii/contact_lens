import { Metadata } from 'next';

import TrainPage from '@/components/Train/TrainPage';

export const metadata: Metadata = {
    title: "Train"
}

export default function LoginPage() {
    return (
        <TrainPage />
    );
}