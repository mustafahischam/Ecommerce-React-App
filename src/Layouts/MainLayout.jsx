import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
export default function MainLayout() {
    return <>
        <Navbar />
     <div className='bg-gray-100 pt-4 min-h-screen'>
        <Outlet />
     </div>
        <Footer />
    </>
}