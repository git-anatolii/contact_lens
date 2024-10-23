import { useState } from 'react';
import { axiosInstance } from '@/lib/utils';

interface UseDataProps {
    method: string;
    url: string;
    requestBody?: any;
}

const useData = ({ method, url, requestBody }: UseDataProps) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        setData(null);
        setError(null);
        try {
            if (method === "get") {
                const response = await axiosInstance.get(process.env.NEXT_PUBLIC_BASE_URL + url);
                setData(response.data);
            } else if (method = "post") {
                const response = await axiosInstance.post(process.env.NEXT_PUBLIC_BASE_URL + url, requestBody);
                setData(response.data);
            }
            
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useData;
