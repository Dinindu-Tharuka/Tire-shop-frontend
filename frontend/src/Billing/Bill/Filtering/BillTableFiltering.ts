export const onTypeBillIdFilter = (event: React.KeyboardEvent<HTMLInputElement>, setBillIdFilter:React.Dispatch<React.SetStateAction<string>>, setAllBillIdFilter:React.Dispatch<React.SetStateAction<string>>) => {
    setBillIdFilter(event.currentTarget.value);
    setAllBillIdFilter(event.currentTarget.value)
};

export const onTypeCustomerFilter = (event: React.KeyboardEvent<HTMLInputElement>, setBillFilterCustomer:React.Dispatch<React.SetStateAction<string>>, setAllBillFilterCustomer:React.Dispatch<React.SetStateAction<string>>) => {
    setBillFilterCustomer(event.currentTarget.value);
    setAllBillFilterCustomer(event.currentTarget.value)
};

export const onTypeVehicleFilter = (event: React.KeyboardEvent<HTMLInputElement>, setBillVehicleFilter:React.Dispatch<React.SetStateAction<string>>, setAllBillVehicleFilter:React.Dispatch<React.SetStateAction<string>>) => {
    setBillVehicleFilter(event.currentTarget.value);
    setAllBillVehicleFilter(event.currentTarget.value)
};

export const onTypeStartDateFilter = (event: React.ChangeEvent<HTMLInputElement>, setBillStartDateFilter:React.Dispatch<React.SetStateAction<string>>, setAllBillStartDateFilter:React.Dispatch<React.SetStateAction<string>>) => {
    setBillStartDateFilter(event.currentTarget.value);
    setAllBillStartDateFilter(event.currentTarget.value)
};

export const onTypeEndDateFilter = (event: React.ChangeEvent<HTMLInputElement>, setBillEndDateFilter:React.Dispatch<React.SetStateAction<string>>, setAllBillEndDateFilter:React.Dispatch<React.SetStateAction<string>>) => {
    setBillEndDateFilter(event.currentTarget.value);
    setAllBillEndDateFilter(event.currentTarget.value)
};