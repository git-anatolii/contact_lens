import { Metadata } from 'next';

import TrainLogPage from '@/components/TrainLog/TrainLogPage';

export const metadata: Metadata = {
    title: "Train Logs"
}

export default function LoginPage() {
    return (
        <TrainLogPage />
    );
}