export class GenerateBillNumber {
    section : string

    constructor(section:string){
        this.section = section

    }

    generate(){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
        const day = currentDate.getDate().toString().padStart(2, '0');
        
        // Generation 
        const uniqueIdentifier = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // bill number
        const billNumber = `${this.section}${year}${month}${day}${uniqueIdentifier}`;
    
    return billNumber;
    }
}