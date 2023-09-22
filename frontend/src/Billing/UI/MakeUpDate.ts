export const makeUpdate = (date:string)=>{
    const dateValue = new Date(date)

    return `${dateValue.toLocaleDateString()} ${dateValue.toLocaleTimeString()}`
}