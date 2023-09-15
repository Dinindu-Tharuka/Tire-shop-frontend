export const BillNumberGenerate = ()=>{
  const billPrefix = "TYRE";
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
  const day = currentDate.getDate().toString().padStart(2, '0');
  
  // Generation 
  const uniqueIdentifier = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  // bill number
  const billNumber = `${billPrefix}${year}${month}${day}${uniqueIdentifier}`;
  
  return billNumber;
}