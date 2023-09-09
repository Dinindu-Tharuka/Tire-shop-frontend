import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Supplier } from "../../services/Registration/supplier-service";
import SupplierContext from "../../Contexts/Registration/SupplierContext";
import useSupplier from "../../hooks/Registration/useSupplier";

interface Props {
  selectedSupplier: (supplier: Supplier) => void;
}

const SupplierFilter = ({ selectedSupplier }: Props) => {
  const [currentSupplierFilterValue, setCurrentSupplierValue] = useState("");
  const { suppliers, setSuppliers } = useSupplier();
  const [sup, setSup] = useState<Supplier | null>(null);

  const onCategoryType = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;
    setCurrentSupplierValue(currentValue)
  };
  return <div>
  <Menu>
        <MenuButton as={Button} rightIcon={<AiOutlineDown />} width='100%'>
          {sup === null? "Select Supplier":sup?.name}
        </MenuButton>
        <MenuList>
          <Input    onKeyUp={onCategoryType} placeholder="Search"/>
          {suppliers
            .filter((sup) =>
              currentSupplierFilterValue
                ? sup.name
                    .toLowerCase()
                    .startsWith(currentSupplierFilterValue.toLowerCase())
                : true
            )
            .map((supplier) => (
                <MenuItem onClick={()=> {
                  selectedSupplier(supplier)
                  setSup(supplier)
                  }} className="dropdown-item">
                  {supplier.name}
                </MenuItem>                   
            ))}
          
        </MenuList>
      </Menu>
</div>
};

export default SupplierFilter;
