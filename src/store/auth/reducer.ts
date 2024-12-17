import { Action } from '../Actions';
import { UserRoles, Role, User, AuthActionTypes, AuthState } from './types';

export const roleInitialState: Role = {
    id: '',
    name: UserRoles.NULL,
    permission: [],
};

const userInitState: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    role: roleInitialState,
    company: [],
    assignedCompany: [],
    status: false,
};

const initialState: AuthState = {
    user: userInitState,
    loading: false,
    error: null,
};

export const authReducer = (
    state = initialState,
    action: AuthActionTypes
) => {
    switch (action.type) {
        case Action.LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case Action.LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        }
        case Action.LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case Action.LOGOUT: {
            return {
                ...state,
                user: userInitState,
                loading: false,
                error: null,
            };
        }
        default:
            return state;
    }
}
