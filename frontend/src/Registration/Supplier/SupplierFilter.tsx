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
import { Supplier } from "../../services/Registration/supplier-service";
import SupplierContext from "../../Contexts/Registration/SupplierContext";

interface Props {
  selectedSupplier: (supplier: Supplier) => void;
  defaultSupplier?: Supplier
}

const SupplierFilter = ({ selectedSupplier, defaultSupplier }: Props) => {
  const { suppliers, setSupplierNameFilter } = useContext(SupplierContext);

  const [sup, setSup] = useState<Supplier | null>(null);

  const onCategoryType = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;
    setSupplierNameFilter(currentValue);
  };
  return (
    <div>
      <Menu>
        <MenuButton as={Button} rightIcon={<AiOutlineDown />} width="15vw">
          {sup === null ? "Select Supplier" : sup?.name || (defaultSupplier && defaultSupplier?.name)}
        </MenuButton>
        <MenuList>
          {suppliers
            .map((supplier) => (
              <MenuItem
                onClick={() => {
                  selectedSupplier(supplier);
                  setSup(supplier);
                }}
                className="dropdown-item"
              >
                {supplier.name}
              </MenuItem>
            ))}
          <Input onKeyUp={onCategoryType} placeholder="Search" />
        </MenuList>
      </Menu>
    </div>
  );
};

export default SupplierFilter;
