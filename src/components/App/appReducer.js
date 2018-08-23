import * as constants from './appConstants';

export default (state = constants.INITIAL_STATE, action) => {
    switch(action.type) {
        case constants.START_GAME:
            return {
                ...state,
                numPlayers: action.payload,
            };
        default:
            return state;
    }
}