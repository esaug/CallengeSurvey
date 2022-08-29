import { createContext } from 'react';
import { SurveyState } from '../../interfaces/interfaces';

export type SurveyContextProps = {
    surveyState: SurveyState,
    setResponse: (res: any) => void,
    getSurvey: () => void
}

const TaskContext = createContext<SurveyContextProps>({} as SurveyContextProps);

export default TaskContext;
