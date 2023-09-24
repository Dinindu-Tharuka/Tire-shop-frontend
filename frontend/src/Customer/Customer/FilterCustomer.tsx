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
import { Customer } from "../../services/Customer/customer-service";
import CustomerContext from "../../Contexts/Customer/CustomerContext";

interface Props {
  selectedCustomer: (customer: Customer) => void;
}

const FilterCustomer = ({ selectedCustomer }: Props) => {
  const { setCustomerNameFilter, customers } = useContext(CustomerContext);
  const [customer, setCustomer] = useState<Customer>();

  const onCategoryType = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;
    setCustomerNameFilter(currentValue);
  };
  return (
    <div>
      <Menu>
        <MenuButton as={Button} rightIcon={<AiOutlineDown />} width="100%">
          {customer === null ? "Select Category" : customer?.name}
        </MenuButton>
        <MenuList>
          {customers.map((customer) => (
            <MenuItem
              onClick={() => {
                selectedCustomer(customer);
                setCustomer(customer);
              }}
              className="dropdown-item"
            >
              {customer.name}
            </MenuItem>
          ))}
          <Input onKeyUp={onCategoryType} placeholder="Search" />
        </MenuList>
      </Menu>
    </div>
  );
};

export default FilterCustomer;
