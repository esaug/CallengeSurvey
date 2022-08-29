import { SurveyState, Survey } from "../../interfaces/interfaces";

type TaskAction = { type: 'getSurvey', payload: Survey}
| { type: 'setResponse', payload: any};

export const taskReducer = ( state: SurveyState, action: TaskAction ): SurveyState => {

    switch (action.type) {
        case 'getSurvey':
            return {
                ...state,
                survey: action.payload
            }
        case 'setResponse': 
            return {
                ...state,
                response: action.payload
            }
        default: 
            return state;
    }

}