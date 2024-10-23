"use client"

import React from "react"
import useData from '@/hooks/useData';
import { LinkOutlined } from '@ant-design/icons';
import { Input } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import ScrapeWebsite from "./ScrapeWebsite";

const props: UploadProps = {
    name: 'files',
    action: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/pdf`,
    multiple: true,
    onChange({ file, fileList }) {
        if (file.status === 'done') {
            message.success(`${file.name} file uploaded successfully.`);
        } else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
        console.log(file, fileList);
    },
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent) => percent ? `${parseFloat(percent.toFixed(2))}%` : '0%',
    },
    beforeUpload: (file: RcFile) => {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
            message.error(`${file.name} is not a PDF file`);
        }
        return isPDF || Upload.LIST_IGNORE;
    },
};

export default function UploadFile() {
    const { data, error, loading, fetchData } = useData({
        method: 'get',
        url: '/train/pdf/start',
    });

    const startPdfTrain = () => {
        fetchData();
    }

    return (
        <>
            <div className="flex flex-col w-full p-4 justify-center items-center bg-gray-100 rounded-lg shadow-md">
                <div className="flex w-full space-x-4 justify-between">
                    <Upload {...props}>
                        <Button
                            icon={<UploadOutlined />}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-200"
                        >
                            Upload PDF
                        </Button>
                    </Upload>
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition duration-200"
                        onClick={startPdfTrain}
                    >
                        {loading ? 'Training...' : 'Start Training'}
                    </Button>
                </div>
                {error && <p className="text-red-400">Error: {error.message}</p>}
                {data && <p className="text-green-400">{data.message}</p>}
            </div>
            <ScrapeWebsite />
        </>
    );
}