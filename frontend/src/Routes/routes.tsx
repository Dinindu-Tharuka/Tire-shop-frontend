import { createBrowserRouter } from "react-router-dom";
import GridSection from "../MainPages/GridSection";
import Inventory from "../componants/Inventory/Main Page/Inventory";
import MainImage from "../componants/MainImage";
import ItemTable from "../componants/Inventory/Item/ItemTable";
import ItemCategoryTable from "../componants/Inventory/Category/ItemCategoryTable";
import SupplierTable from "../componants/Inventory/Supplier/SupplierTable";
import RegistraionMainPage from "../Registration/MainPage/RegistrationMainPage";
import CustomerMainPage from "../Customer/MainPage/CustomerMainPage";

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
          { path: "suppliers", element: <SupplierTable /> },
        ],
      },
      {path: 'customer', element: <CustomerMainPage/>},
      { path: "registration", element: <RegistraionMainPage /> },
    ],
  },
]);

export default routes;
