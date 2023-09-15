'use client';

import { axios_instance } from '@/utils/axios_instance';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Logout() {
  const router = useRouter();
  const logout = useMutation({
    mutationFn: () => {
      return axios_instance.post('api/users/logout');
    },
    onSuccess() {
      localStorage.removeItem('email');
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
        className='bg-blue-700 text-white px-4 py-2 rounded-lg'
      >
        {logout.isLoading ? 'Please wait' : 'Logout'}
      </button>
    </>
  );
}
