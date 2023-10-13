
import { Bill } from "../../../services/Billing/bill-page-service";
import { Service } from "../../../services/Registration/services-service";

const calculateSubTotal = (data:Bill, services:Service[])=>{    

    let total : number = data.bill_items.reduce((accumilator:number, item) => accumilator + (parseInt(item.customer_price + '') * parseInt(item.qty + '')) ,0)   
    console.log('total', total);
     
    const discount : number = data.bill_items.reduce((accumilator:number, item)=> accumilator + parseInt(item.customer_discount + ''), 0)
    console.log('discount', discount);
    
    const totalService = data.bill_services.reduce((accum, item)=> accum + parseInt(services.find(ser => ser.id == item.service)?.service_value + ''), 0)

    console.log('total Service', totalService);

    total = total + totalService - discount
    


    return {total, discount}

}

export default calculateSubTotal