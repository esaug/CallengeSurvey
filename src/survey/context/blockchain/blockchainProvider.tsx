import { useReducer } from "react";
import ContractAbi from "../../../blockchain/contract.json"
import BlockchainContext from "./blockchainContext";
import BlockchainReducer from "./blockchainReducer";
import {ethers} from "ethers"
import {BlockchainStateInter} from '../../interfaces/interfaces'

declare var window: any

 // Initial State.
 const INITIAL_STATE:BlockchainStateInter = {
    Contract : null,
    userAddress: "",
    netWorkId : 0
};

interface BlockchainProviderProps {
    children: JSX.Element | JSX.Element[];
}



export const BlockchainProvider = ({ children }: BlockchainProviderProps) => {

   
    //State and Dispatch.
    const [BlockchainState, dispatch] = useReducer(BlockchainReducer, INITIAL_STATE);

    //Get Survey.
    const connectMetamask = async () => {
        
        const networkId = await window.ethereum.request({
            method: "net_version"
        })

        const conection = async ()=>{

            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                await provider.send("eth_requestAccounts", []);

            const signer = provider.getSigner();
            let _userAddress = await signer.getAddress();

            const contractAddress:any = process.env.REACT_APP_CONTRACT

            let _Contract = await new ethers.Contract(contractAddress, ContractAbi, signer)

            dispatch({
                type: 'GET_BLOCKCHAIN',
                payload: {
                    Contrato: _Contract,
                    userAddress: _userAddress,
                    networkId: networkId
                }
            })
        }

        // NETWORK VALIDATION
        if(networkId == 3){
            
            conection()

        } else {
            
            //SWITH METAMASK NETWORK OR ADD NETWORK
            
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{
                    "chainId": "0x3"
                    }]
                }).then(()=>{
                    conection()
                })
            } catch (error) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        "chainId": "0x3",
                        "chainName": "Ropsten",
                        "nativeCurrency": {
                        "name": "Rospten",
                        "symbol": "RosETH",
                        "decimals": 18
                        },
                        "rpcUrls": ["https://ropsten.infura.io/v3/"],
                        "blockExplorerUrls": ["https://ropsten.etherscan.io"]
                    }]
                }).then(()=>{
                    conection()
                })
            }
        }
        
    }

    return (
        <BlockchainContext.Provider value={{
            BlockchainState,
            connectMetamask

        }}>
            {children}
        </BlockchainContext.Provider>
    )

};
