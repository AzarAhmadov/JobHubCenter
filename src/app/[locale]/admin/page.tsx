import Login from '@/components/Login/Login'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    robots: {
        index: false,
        nocache: true,
    },
};

const page = () => {
    return (
        <Login />
    )
}

export default page
