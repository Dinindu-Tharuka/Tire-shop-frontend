import { createBrowserRouter } from "react-router-dom";
import GridSection from "../MainPages/GridSection";
import Inventory from "../componants/Inventory/Main Page/Inventory";
import MainImage from "../componants/MainImage";
import ItemTable from "../componants/Inventory/Item/ItemTable";
import ItemCategoryTable from "../componants/Inventory/Category/ItemCategoryTable";
import SupplierTable from "../Registration/Supplier/SupplierTable";
import RegistraionMainPage from "../Registration/MainPage/RegistrationMainPage";
import CustomerMainPage from "../Customer/MainPage/CustomerMainPage";
import EmployeeTable from "../Registration/Employee/EmployeeTable";
import ServicesTable from "../Registration/Services/ServicesTable";
import BillingMainPage from "../Billing/MainPage/BillingMainPage";
import BillTable from "../Billing/Bill/BillTable";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <GridSection />,
    children: [
      { index: true, element: <MainImage /> },
      {
        path: "inventory",
        element: <Inventory />,
        children: [
          { path: "", element: <ItemTable /> },
          { path: "categories", element: <ItemCategoryTable /> },
        ],
      },
      { path: "customer", element: <CustomerMainPage /> },
      {
        path: "registration",
        element: <RegistraionMainPage />,
        children: [
          { path: "suppliers", element: <SupplierTable /> },
          { path: "employees", element: <EmployeeTable /> },
          { path: "services", element: <ServicesTable /> },
        ],
      },
      {
        path: "billing",
        element: <BillingMainPage />,
        children: [{ path: "", element: <BillTable /> }],
      },
    ],
  },
]);

export default routes;
