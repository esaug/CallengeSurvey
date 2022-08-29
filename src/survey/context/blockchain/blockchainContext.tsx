import { createContext } from "react";
import {BlockchainStateInter} from '../../interfaces/interfaces'


export type BlockchainContextProps = {
    BlockchainState: BlockchainStateInter,
    connectMetamask:()=> any,
}

const BlockchainContext = createContext<BlockchainContextProps>({} as BlockchainContextProps );

export default BlockchainContext;