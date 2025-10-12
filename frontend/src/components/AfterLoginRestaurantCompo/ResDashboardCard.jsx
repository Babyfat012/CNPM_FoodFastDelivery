import React from 'react'

const ResDashboardCard = (props) => {

  return (
    <>
    <div className='flex flex-col items-center border border-neutral-300 shadow-md rounded-md px-28 py-4 gap-3  w-full'>
        <p className='text-green-500 text-4xl '>
            {props.number}
        </p>
        <p className='text-xl font-medium w-44 text-center'>
            {props.description}
        </p>
        
    </div>
    </>
  )
}

export default ResDashboardCard