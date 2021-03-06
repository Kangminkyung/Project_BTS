import * as types from '../actions/Authentication';
 
const initialState = { // state.auth => initialState
    signin: {
        status: 'INIT',
        token: ''
    },
    signup: {
        status: 'INIT',
    },
    status: {
        isAuth: false, 
        currentUser: {
            user_id: 0,
            username: '',
            nickname: '',
            point: '',
            grade: '',
        }
    }
};
 
function authentication(state = initialState, action) {
    switch(action.type) {
      // signin
        case types.SIGNIN:
            return {
                ...state,
                signin:{
                    status: 'SIGNIN',
                }
            }
        case types.SIGNIN_SUCCESS:
            return {
                ...state,
                signin:{
                    status: 'SUCCESS',
                    token: action.token
                }
            }
      case types.SIGNIN_FAILURE:
            return {
                ...state,
                signin:{
                    status: 'FAILURE',
                }
            }
    // signup
    case types.SIGNUP:
        return {
            ...state,
            signup: {
                status: 'WAITING',
            }
        }
    case types.SIGNUP_SUCCESS:
        return {
            ...state,
            signup: {
                status: 'SUCCESS'
            }
        }
    case types.SIGNUP_FAILURE:
        return {
            ...state,
            signup:{
                status: 'FAILURE',
            }
        }
    case types.SIGNUP_CHECK_SUCCESS:
        return {
            ...state,
            signup:{
                status: 'CHECK_SUCCESS',
            }
        }
    case types.SIGNUP_CHECK_FAILURE:
        return {
            ...state,
            signup:{
                status: 'CHECK_FAILURE',
            }
        }
    // status
    case types.GET_STATUS:
        return {
            ...state,
            status:{
                ...state.status
            }
        }
    case types.GET_STATUS_SUCCESS:
        return {
            ...state,
            status:{
                isAuth: true,
                currentUser: {
                    user_id: action.user_id,
                    username: action.username,
                    nickname: action.nickname,
                    point: action.point,
                    grade: action.grade,
                }
            }
        }
    case types.GET_STATUS_CLEAR:
        return {
            ...state,
            status:{
                isAuth: false,
                currentUser: {
                    user_id: '',
                    username: '',
                    nickname: ''
                }
            }
        }
        
    default:
      return state;
  }
};

export default authentication;