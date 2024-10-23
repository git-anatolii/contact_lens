/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from 'react';

import UserTable from "./UserTable";
import Pagination from "../common/Pagination";

import useData from '@/hooks/useData';
import { useNotification } from '@/context/NotificationContext';
import { UsersProps } from '@/type';

export default function User() {
    const [page, setPage] = useState<number>(1);
    const [per_page, setPerPage] = useState<number>(20);
    const [users, setUsers] = useState<UsersProps[]>([]);

    const { setSuccessMessage, setErrorMessage } = useNotification();

    const { data, error, loading, fetchData } = useData({
        method: "get",
        url: `/user/get_all?page=${page}&per_page=${per_page}`
    });

    useEffect(() => {
        fetchData()
    }, [page, per_page]);

    useEffect(() => {
        setUsers(data?.users)
    }, [data]);

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const pageControl = ({ page, per_page }: { page: number, per_page: number }) => {
        setPage(page);
        setPerPage(per_page);
    };

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl pl-6 font-bold">Users</h1>
            </div>
            <div className="mt-4">
                <span className="font-bold text-sm">Total Users:</span> {' '} <span className="text-sm">{data?.totalCount}</span>
            </div>
            <UserTable users={users} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={1} pageControl={pageControl} />
            </div>
        </div>
    );
}
