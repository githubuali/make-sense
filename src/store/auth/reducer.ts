import { Action } from '../Actions';
import { UserRoles, Role, User, AuthActionTypes } from './types'

export const roleInitialState: Role = {
    id: '',
    name: UserRoles.NULL,
    permission: [],
};

const initialState: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    role: roleInitialState,
    company: [],
    assignedCompany: [],
    status: false,
}

export const authReducer = (
    state = initialState,
    action: AuthActionTypes
): User => {
    switch (action.type) {
        case Action.LOGIN: {
            return action.payload
        }
        case Action.LOGOUT: {
            return initialState
        }
        default:
            return state;
    }
}
