import { useReducer } from "react";
import DataContext from "./dataContext";
import dataReducer from "./dataReducer";
import { ethers } from "ethers";
import { DataState } from "../../interfaces/interfaces";

const arrSurvey: any[] = []


declare var window: any

    // Initial State.
    const INITIAL_STATE:DataState = {
        surveys: "",
        tokens: ""
    };

interface DataProviderProps {
    children: JSX.Element | JSX.Element[];
}


export const DataProvider = ({ children }: DataProviderProps) => {


    //State and Dispatch.
    const [DataState, dispatch] = useReducer(dataReducer, INITIAL_STATE);

    const validSurvey = async (arr:any)=>{

        let ids:number []  = []
    
        arr.forEach((survey:any)=>{
            ids.push(survey.id)
        })
    
        let min = 1000;
        let max = 9000;
        let idSurvey = Math.floor(Math.random() * min) + max;
    
        arrSurvey.push({surveyId: idSurvey,surveysIds: ids})
    
        const [surveyId] =arrSurvey

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        let _userAddress = await signer.getAddress();
    

        dispatch({
            type: 'GET_BLOCKCHAIN',
            payload: {
                surveys:surveyId,
                userAddress: _userAddress
            }
        })
    }
    
    
      // Blockchain Transaction
    
    const submitSurvey = async (_address:string , _surveys:any, _Contract:any)=>{

        let dataTx = {
            from: _address
        }

        const {surveys} = _surveys

        
        const tx = await _Contract.submit(surveys.surveyId, surveys.surveysIds, dataTx)
        await tx.wait().then((res:any)=>{console.log(res)})
    } 


    const tokensAvailables = async (Contract:any)=>{

        if(Contract){

            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                await provider.send("eth_requestAccounts", []);

            const signer = provider.getSigner();
            let _userAddress = await signer.getAddress();
          
            const tx = Contract.balanceOf(_userAddress).then((resp:any)=>{
            const resultado = parseInt(resp._hex)
            let division = ethers.utils.formatEther(resultado.toString());
            
            dispatch({
                type:'GET_TOKENS',
                payload: {
                    tokens:division
                }
            })
        })
        }

        return true
    }
    

    return (
        <DataContext.Provider value={{
            DataState,
            validSurvey,
            submitSurvey,
            tokensAvailables

        }}>
            {children}
        </DataContext.Provider>
    )

};
