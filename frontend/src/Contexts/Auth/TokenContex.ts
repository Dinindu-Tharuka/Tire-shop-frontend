import React, { Dispatch, SetStateAction } from "react";


interface tokensType{
    access:string | null ;
    setAccess:Dispatch<SetStateAction<string | null>>;
    refresh:string;
    setRefresh:Dispatch<SetStateAction<string>>;
}

const TokenContext = React.createContext<tokensType>({} as tokensType)

export default TokenContext