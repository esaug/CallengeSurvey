

export interface Options {
    text: string
}

export interface Questions {
    text?: string,
    image?: string,
    lifetimeSeconds?: number,
    options: Options[]
}

export interface Survey {
    title: string,
    image: string,
    questions: Questions[]
}

export interface Response {
    question: string,
    response: string
}

export interface SurveyState {
    survey: Survey,
    response: any
}

export interface BlockchainStateInter{
    Contract : any,
    userAddress: string,
    netWorkId : number
}

export interface DataState{
    surveys: any,
    tokens: string
}

