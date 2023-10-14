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
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";
import RebuildReportsPageContext from "../../Contexts/Rebuild/Reports/RebuildReortsContext";
import AllRebuildReportsContext from "../../Contexts/Rebuild/Reports/AllRebuildReportsContext";

const FilterCustomer = () => {
  const { setAllCustomerNameFilter, allCustomers } =
    useContext(AllCustomerContext);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [buttoneName, setButtoneName] = useState("All Customer");
  const { setErrorFetchRebuildPageReports, setPageReportsCustomerFilter } =
    useContext(RebuildReportsPageContext);
  const { setReportsCustomerFilter } = useContext(AllRebuildReportsContext);

  const onCustomerType = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;
    setAllCustomerNameFilter(currentValue);
  };
  return (
    <div>
      <Menu>
        <MenuButton
          minWidth={180}
          as={Button}
          rightIcon={<AiOutlineDown />}
          width="100%"
        >
          {buttoneName}
        </MenuButton>
        <MenuList>
          <Input onKeyUp={onCustomerType} placeholder="Search" />
          <MenuItem
            onClick={() => {
              setCustomer(null);
              setButtoneName("All Customers");
              setErrorFetchRebuildPageReports("");
              setPageReportsCustomerFilter("");
              setReportsCustomerFilter("");
            }}
            className="dropdown-item"
          >
            All Customers
          </MenuItem>
          {allCustomers
            .filter((cus, index) => index < 10)
            .map((customer) => (
              <MenuItem
                key={customer.id}
                onClick={() => {
                  setCustomer(customer);
                  setButtoneName(customer.name);
                  setErrorFetchRebuildPageReports("");
                  setPageReportsCustomerFilter(customer.id + "");
                  setReportsCustomerFilter(customer.id + "");
                }}
                className="dropdown-item"
              >
                {customer.name}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default FilterCustomer;
