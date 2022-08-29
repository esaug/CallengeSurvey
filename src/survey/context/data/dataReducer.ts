
export default (state:any, action:any) => {
    const { payload, type } = action;

    switch (type) {
        case 'GET_BLOCKCHAIN':
            return {
                surveys: payload.surveys,

            };
        case 'GET_TOKENS':
            return {
                ...state,
                tokens: payload.tokens

            }
        default:
            return state;
    }
}