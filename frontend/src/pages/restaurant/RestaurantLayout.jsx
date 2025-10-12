import React ,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import RestaurantNavbar from '../../components/AfterLoginRestaurantCompo/RestaurantNavbar'
import RestaurantSidebar from '../../components/AfterLoginRestaurantCompo/RestaurantSidebar'

const RestaurantLayout = () => {
 
  return (
    <>
      <RestaurantNavbar />
      <div className='flex'>
        <RestaurantSidebar />
        <Outlet />
      </div>
    </>
  )
}

export default RestaurantLayout