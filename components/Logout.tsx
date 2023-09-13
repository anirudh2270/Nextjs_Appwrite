'use client';

import { PostRequest } from '@/utils/axios_instance';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Logout() {
  const router = useRouter();
  const logout = useMutation({
    mutationFn: () => {
      return PostRequest('api/users/logout');
    },
    onSuccess() {
      router.push('/login');
    },
  });
  return (
    <>
      <button
        disabled={logout.isLoading}
        onClick={() => {
          logout.mutate();
        }}
        className='bg-blue-200 px-4 py-2 rounded-lg font-bold'
      >
        Logout
      </button>
    </>
  );
}
