import * as types from '../actions/ActionTypes';


const initialState = {
    keyword: "전체"
}

function CategoryReducer(state = initialState, action) {
    switch(action.type) {
        case types.CAT_CHANGE:
            return {
                keyword: action.keyword
            }
        default:
            return state;
    }
}

export default CategoryReducer;