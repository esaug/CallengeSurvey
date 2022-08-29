import { createContext } from "react";
import { DataState } from "../../interfaces/interfaces";

export type DataContextProps = {
    DataState: DataState,
    validSurvey: (arr:any)=> void
    submitSurvey: (_address:string , _surveys:any, _Contract:any)=> any
    tokensAvailables: (Contract:any)=>void
}

const DataContext = createContext<DataContextProps>({} as DataContextProps );


export default DataContext;