import { createBrowserRouter } from 'react-router-dom'
import GridSection from '../pages/GridSection'
import Inventory from '../componants/Inventory/Main Page/Inventory'
import MainImage from '../componants/MainImage'

const routes = createBrowserRouter([
    {
        path:'/',
        element:<GridSection/>,
        children:[
            {index:true, element:<MainImage/>},
            {path:'inventory', element:<Inventory/>}
        ]
    }
])

export default routes;
