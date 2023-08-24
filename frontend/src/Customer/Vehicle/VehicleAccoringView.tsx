import React from 'react'
import VehicleTable from './VehicleTable'
import VehicleAddDrawer from './VehicleAddDrawer'

interface Props{
    customer_id:number
}

const VehicleAccoringView = ({customer_id}:Props) => {
  return (
    <>
        <VehicleTable customer_id={customer_id}/>
        <VehicleAddDrawer/>
    </>
  )
}

export default VehicleAccoringView