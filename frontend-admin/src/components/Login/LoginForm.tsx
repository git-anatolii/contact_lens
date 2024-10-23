/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import useAuth from '@/hooks/useAuth';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const { data, error, loading, fetchData } = useAuth({
    url: '/login',
    requestData: { email, password },
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data?.access_token);
      router.push('/admin/train');
    }
  }, [data]);

  useEffect(() => {
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <form className="space-y-3 bg-gray-100 pb-4 shadow-xl" onSubmit={handleSubmit}>
      <div className="flex-col flex justify-center items-center px-6 pb-4 pt-8">
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="username">
              Email
            </label>
            <div>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <div>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="flex h-10 mb-4 justify-center items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 mt-8 w-full" aria-disabled={loading}>
          {loading ? "Loading..." : "LOG IN"}
        </button>
        {error && <p className="text-red-400">Error: {error.message}</p>}
        {data && <p className="text-green-400">Logged in Successfully</p>}
      </div>
    </form>
  );
}
