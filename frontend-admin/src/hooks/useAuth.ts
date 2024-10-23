import { useState } from 'react';
import axios from 'axios';
interface UseAuthProps {
    url: string;
    requestData: any;
}

const useAuth = ({ url, requestData }: UseAuthProps) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            setError('');
            const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + url, requestData);
            setData(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // `err` is an AxiosError here
                if (err.response && err.response.status === 400) {
                    setError(err.response.data.detail);
                } else {
                    setError('Register Failed');
                }
            } else {
                // `err` is not an AxiosError here
                setError('Register Failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useAuth;
