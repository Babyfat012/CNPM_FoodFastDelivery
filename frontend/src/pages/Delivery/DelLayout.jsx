import React from 'react'
import { Outlet } from 'react-router-dom'
import DelNav from '../../components/AfterLoginDeliveryPartnersCompo/DelNav'
import DelSidebar from '../../components/AfterLoginDeliveryPartnersCompo/DelSideBar'

const DelLayout = () => {
  return (
    <>
      <DelNav />
      <div className='flex'>
        <DelSidebar />
        <Outlet />
      </div>
    </>
  )
}

export default DelLayout