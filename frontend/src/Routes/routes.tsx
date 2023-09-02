import { createBrowserRouter } from "react-router-dom";
import GridSection from "../MainPages/GridSection";
import Inventory from "../componants/Inventory/Main Page/Inventory";
import MainImage from "../componants/MainImage";
import ItemTable from "../componants/Inventory/Item/ItemTable";
import CategoryTable from "../componants/Inventory/Category/CategoryTable";
import SupplierTable from "../Registration/Supplier/SupplierTable";
import RegistraionMainPage from "../Registration/MainPage/RegistrationMainPage";
import CustomerMainPage from "../Customer/MainPage/CustomerMainPage";
import EmployeeTable from "../Registration/Employee/EmployeeTable";
import ServicesTable from "../Registration/Services/ServicesTable";
import BillingMainPage from "../Billing/MainPage/BillingMainPage";
import BillTable from "../Billing/Bill/BillTable";
import StockInvoiceTable from "../Billing/StockInvoice/StockInvoiceTable";
import RebuiltMainPage from "../Billing/Rebuilt/MainPage/RebuiltMainPage";
import Login from "../Authentication/Login";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../Authentication/LoginPage";

const routes = createBrowserRouter([
  
  {
    path:"/login",
    element: <LoginPage/>
  },
  {
    element: <PrivateRoutes/>,
    children:[
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
              { path: "categories", element: <CategoryTable /> },
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
            children: [
              { path: "", element: <BillTable /> },
              { path: "rebuilt", element: <RebuiltMainPage /> },
              { path: "stock-invoice", element: <StockInvoiceTable /> },
            ],
          },
        ],
      },
    ]
  }
]);

export default routes;
