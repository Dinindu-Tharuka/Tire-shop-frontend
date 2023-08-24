import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
import { useContext } from "react";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
import VehicleService, { Vehicle } from "../../services/Customer/vehicle-service";
import UpdateVehicleDrawer from "./UpdateVehicleDrawer";



const VehicleTable = () => {
    const {vehicles, setVehicles} = useContext(VehicleContext)

    const onDeleteVehicle = (vehicle:Vehicle)=>{
      const originalCustomers = [...vehicles]
      setVehicles(vehicles.filter(ve => ve.vehical_no !== vehicle.vehical_no))
      
      VehicleService
        .delete(`${vehicle.vehical_no}`)
        .catch(err => setVehicles([...originalCustomers]))
    }
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Customer</Th>
              <Th>Vehicle No</Th>
              <Th>Brand</Th>
              <Th>Type</Th>
              <Th>Madal</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {vehicles?.map((vehicle, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{vehicle.customer}</Td>
                <Td>{vehicle.vehical_no}</Td>
                <Td>{vehicle.brand}</Td>
                <Td>{vehicle.type}</Td>
                <Td>{vehicle.madal}</Td>

                <Td>
                  <UpdateVehicleDrawer onSelectedVehicle={vehicle}/>
                </Td>
                <Td>
                  <Button                  
                    onClick={()=>onDeleteVehicle(vehicle)}
                    padding={4}
                    bg="#f87454"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default VehicleTable