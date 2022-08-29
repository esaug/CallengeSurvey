import { SurveyState, Response } from "../../interfaces/interfaces";
import { useReducer } from "react";
import { taskReducer } from "./TaskReducer";
import TaskContext from "./TaskContext";


/**
 * Initial State
 */
const INITIAL_STATE: SurveyState = {
  survey: {
    title: "",
    image: "",
    questions: [
      {
        text: "",
        image:
          "",
        lifetimeSeconds: 0,
        options: [
          {
            text: "",
          },
        
        ],
      }
    ],
  },
  response: [],
};

interface SurveyProviderProps {
  children: JSX.Element | JSX.Element[];
}

/**
 * Provider
 * @returns Context
 */
export const SurveyProvider = ({ children }: SurveyProviderProps) => {

  const [surveyState, dispatch] = useReducer(taskReducer, INITIAL_STATE);

  /**
   * Set Response
   * @param res 
   */
  const setResponse = (res: Response) => {
    dispatch({
      type: "setResponse",
      payload: res,
    });
  };

  /**
   * Get Survey
   */
  const getSurvey = async() => {
    const req = await fetch('https://raw.githubusercontent.com/rather-labs/blockchain-challenge-utils/b6187fcf4eb6690542e6cd0f488694a482a4f9f2/survey-sample.json');
    const res = await req.json();

    dispatch({
      type: 'getSurvey',
      payload: res
    })
  }

  return (
    <TaskContext.Provider
      value={{
        surveyState,
        setResponse,
        getSurvey
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
