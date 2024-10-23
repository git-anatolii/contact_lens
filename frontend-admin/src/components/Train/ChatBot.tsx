"use client"

import React, { useState, useEffect } from 'react';
import useData from '@/hooks/useData';
import { Input } from 'antd';
import { OpenAIOutlined, SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function ChatBot() {
    const [message, setMessage] = useState<string>("");
    const [usermessage, setUserMessage] = useState<string>("");
    const [responses, setResponses] = useState<string>("");
    const [source, setSource] = useState<string>('');
    const [start, setStart] = useState<number>(0);
    const chunk = 50;

    const { data, error, loading, fetchData } = useData({
        method: 'post',
        url: '/test/bot',
        requestBody: { message: message },
    });

    const test_bot = async (e: React.FormEvent) => {
        if (!message) return;

        e.preventDefault();
        setUserMessage(message);
        setResponses("");
        setSource("");
        setStart(0);
        await fetchData();
    };

    useEffect(() => {
        if (data) {
            // Find the source index for '(Source:'
            const sourceIndex = data.indexOf('(Source:');
            const sourceIndex2 = data.indexOf('Source:');

            if (sourceIndex !== -1) {
                // Extract the source text and set it
                setSource(data.slice(sourceIndex).trim().match(/https?:\/\/[^\s)]+/));

                // Remove the source text from the original message
                const messageWithoutSource = data.slice(0, sourceIndex).trim();

                // Function to display text in chunks
                const displayChunks = () => {
                    if (start < messageWithoutSource.length) {
                        const currentChunk = messageWithoutSource.slice(start, start + chunk);
                        setResponses((prevResponses) => prevResponses + currentChunk);

                        // Update the start index for the next chunk
                        setStart((prevStart) => prevStart + chunk);
                    }
                };

                // Start displaying chunks with an interval
                const interval = setInterval(displayChunks, 100); // Adjust the delay as needed

                return () => clearInterval(interval); // Cleanup on unmount
            } else if (sourceIndex2 !== -1) {
                setSource(data.slice(sourceIndex2).trim().slice(8));

                // Remove the source text from the original message
                const messageWithoutSource = data.slice(0, sourceIndex2).trim();

                // Function to display text in chunks
                const displayChunks = () => {
                    if (start < messageWithoutSource.length) {
                        const currentChunk = messageWithoutSource.slice(start, start + chunk);
                        setResponses((prevResponses) => prevResponses + currentChunk);

                        // Update the start index for the next chunk
                        setStart((prevStart) => prevStart + chunk);
                    }
                };

                // Start displaying chunks with an interval
                const interval = setInterval(displayChunks, 100); // Adjust the delay as needed

                return () => clearInterval(interval); // Cleanup on unmount
            } else {
                const displayChunks = () => {
                    const currentChunk = data.slice(start, start + chunk);
                    setResponses((prevResponses) => prevResponses + currentChunk);

                    // Update the start index for the next chunk
                    setStart((prevStart) => prevStart + chunk);
                }
                // Start displaying chunks with an interval
                const interval = setInterval(displayChunks, 100); // Adjust the delay as needed

                return () => clearInterval(interval); // Cleanup on unmount
            }
        }
    }, [data, start]);

    useEffect(() => {
        if (error) {
            console.error("Error fetching data:", error);
        }
    }, [error]);

    return (
        <div className="flex relative flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-inner p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900"><OpenAIOutlined className='px-2' />Test Model</h1>

            <div className="flex-grow mb-6 w-full text-gray-600 overflow-auto p-20 bg-gray-50 rounded-lg shadow-inner">
                {usermessage && (
                    <div className='mb-4'>
                        <div className='flex'>
                            <div className="bg-blue-500 h-full text-white p-2 rounded-lg shadow-md mr-2">
                                User
                            </div>
                            <div className="bg-blue-100 text-gray-800 p-3 rounded-lg shadow-md">
                                {usermessage}
                                <div className="text-sm text-gray-500 mt-1">{new Date().toLocaleTimeString()}</div>
                            </div>
                        </div>
                    </div>
                )}
                {responses && (
                    <div className='mb-4'>
                        <div className='flex'>
                            <div className="bg-green-500 h-full text-white p-2 rounded-lg shadow-md mr-2">
                                Bot
                            </div>
                            <div className="bg-green-100 text-gray-800 p-3 rounded-lg shadow-md">
                                {responses}
                                {source && <><br /><br /><div className="text-sm text-gray-500 mt-1">
                                    <span className='mr-2'>Source:</span>
                                    <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        {source}
                                    </a>
                                </div></>}
                                <div className="text-sm text-gray-500 mt-1">{new Date().toLocaleTimeString()}</div>
                            </div>
                        </div>
                    </div>
                )}
                {loading && <p className="text-gray-600">Loading...</p>}
            </div>

            <form className="flex absolute bottom-6 w-11/12 max-w-4xl p-4 bg-white shadow-md rounded-full justify-center items-center space-x-4" onSubmit={test_bot}>
                <TextArea
                    className="w-full text-lg px-6 py-4 h-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            test_bot(e);
                        }
                    }}
                    value={message}
                    autoSize
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    disabled={message ? false : true}
                    className="flex-shrink-0 h-full bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                >
                    <SendOutlined />
                </button>
            </form>
        </div>
    );
}
