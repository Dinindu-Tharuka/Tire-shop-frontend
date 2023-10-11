export const makeUpDate = (date:string)=>{
    const dateValue = new Date(date)

    return `${dateValue.toLocaleDateString()}`
}