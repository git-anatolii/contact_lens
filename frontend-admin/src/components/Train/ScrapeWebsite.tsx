"use client"

import React, { useState } from "react"
import useData from '@/hooks/useData';
import { LinkOutlined } from '@ant-design/icons';
import { Input } from "antd";
import { Button, message } from 'antd';

export default function ScrapeWebsite() {
    const [url, setUrl] = useState<string>("");
    console.log(url)
    const { data, error, loading, fetchData } = useData({
        method: 'post',
        url: '/train/scrape/start',
        requestBody: { url: url },
    });

    const startScrapeTrain = () => {
        if (url) {
            fetchData();
        } else {
            message.error("Please enter a valid URL.");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full p-4 mt-10 bg-gray-100 rounded-lg shadow-md">
            <div className="flex space-x-4 w-full justify-between">
                <p className="flex items-center"><LinkOutlined className="px-2" />Website URL</p>
                <Button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition duration-200"
                    onClick={startScrapeTrain}
                >
                    {loading ? 'Training...' : 'Start Training'}
                </Button>
            </div>
            <Input onChange={(e) => setUrl(e.target.value)} value={url} className="mt-5 mb-1 text-lg rounded-3xl" />
            {error && <p className="text-red-400">Error: {error.message}</p>}
            {data && <p className="text-green-400">{data.message}</p>}
        </div>
    );
}