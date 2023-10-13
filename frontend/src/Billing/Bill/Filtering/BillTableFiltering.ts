export const onTypeBillIdFilter = (event: React.KeyboardEvent<HTMLInputElement>, setBillIdFilter:React.Dispatch<React.SetStateAction<string>>) => {
    setBillIdFilter(event.currentTarget.value);
};

export const onTypeCustomerFilter = (event: React.KeyboardEvent<HTMLInputElement>, setBillIdFilter:React.Dispatch<React.SetStateAction<string>>) => {
    setBillIdFilter(event.currentTarget.value);
};

export const onTypeVehicleFilter = (event: React.KeyboardEvent<HTMLInputElement>, setBillIdFilter:React.Dispatch<React.SetStateAction<string>>) => {
    setBillIdFilter(event.currentTarget.value);
};
