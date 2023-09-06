import {
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
  } from "@chakra-ui/react";
import { useContext } from "react";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
import VehicleService, { Vehicle } from "../../services/Customer/vehicle-service";
import UpdateVehicleDrawer from "./UpdateVehicleDrawer";
import VehicleDelete from "./VehicleDelete";

interface Props{
  customer_id:number
}


const VehicleTable = ({customer_id}:Props) => {
    let {vehicles, setVehicles} = useContext(VehicleContext)
    const toastDelete = useToast()
    

    vehicles = vehicles.filter(veh => veh.customer === customer_id)

    const onDeleteVehicle = (vehicle:Vehicle)=>{
      const originalCustomers = [...vehicles]
      setVehicles(vehicles.filter(ve => ve.vehical_no !== vehicle.vehical_no))
      
      VehicleService
        .delete(`${vehicle.vehical_no}`)
        .then(res => {
          if (res.status === 204){
            toastDelete({
            title: 'Delete Successfull.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            })
          }
        })
        .catch(err => {
          setVehicles([...originalCustomers])
          toastDelete({
            title: 'Delete not Successfull.',
            status: 'error',
            duration: 9000,
            isClosable: true,
            })
        })
      }

      const defaultTable = <TableContainer>
                              <Table>
                                <Thead>
                                  <Tr>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>Customer Id</Th>
                                    <Th>Vehicle No</Th>
                                    <Th>Brand</Th>
                                    <Th>Type</Th>
                                    <Th>Madal</Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {vehicles?.map((vehicle, index) => (
                                    <Tr key={index}>
                                      <Td>
                                        <UpdateVehicleDrawer onSelectedVehicle={vehicle}/>
                                      </Td>
                                      <Td>
                                       <VehicleDelete selectedDeleteVehicle={vehicle}/>
                                      </Td>
                                      <Td>{vehicle.customer}</Td>
                                      <Td>{vehicle.vehical_no}</Td>
                                      <Td>{vehicle.brand}</Td>
                                      <Td>{vehicle.type}</Td>
                                      <Td>{vehicle.madal}</Td>

                                    </Tr>
                                  ))}
                                </Tbody>
                              </Table>
                           </TableContainer>
      const NoContenTable = <TableContainer>
                              <Table>
                                  <Tr>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>No Vehicles</Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                  </Tr>
                              </Table>
                            </TableContainer>
  return (
    <>
    {defaultTable}      
    </>
  )
}

export default VehicleTable