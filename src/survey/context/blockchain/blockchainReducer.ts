

export default (state:any, action:any) => {
    const { payload, type } = action;

    switch (type) {
        case 'GET_BLOCKCHAIN':
            return {
                Contract: payload.Contrato,
                userAddress: payload.userAddress,
                networkId: payload.networkId

            };
        default:
            return state;
    }
}