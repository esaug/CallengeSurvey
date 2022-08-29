import  TaskContext  from '../context/task/TaskContext';
import { useContext } from 'react';
import BlockchainContext from '../context/blockchain/blockchainContext'
import DataContext from '../context/data/dataContext';
//import BlockchainContext
//import dataContext
/**
 * Custom Hook
 */
const useTask = () => {
    const { surveyState, setResponse, getSurvey } = useContext( TaskContext );

    return {
        survey: surveyState.survey,
        response: surveyState.response,
        questions: surveyState.survey.questions,
        setResponse,
        getSurvey
    }
}

const useBlockchain = ()=>{
    const {BlockchainState, connectMetamask} = useContext(BlockchainContext)

    return {
        blockchain:BlockchainState,
        connectMetamask
    }
}

const useData = ()=>{
    const {DataState, validSurvey, submitSurvey, tokensAvailables} = useContext(DataContext)

    return{
        DataState: DataState,
        validSurvey,
        submitSurvey,
        tokensAvailables
    }

}
    
export {
    useTask,
    useBlockchain,
    useData
}