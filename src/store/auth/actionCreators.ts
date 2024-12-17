/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from "../Actions";

export const loginRequestAction = () => ({
    type: Action.LOGIN_REQUEST
});

export const loginSuccessAction = (user: any) => ({
    type: Action.LOGIN_SUCCESS,
    payload: user
});

export const loginFailureAction = (error: string) => ({
    type: Action.LOGIN_FAILURE,
    payload: error
});

export const logoutAction = () => ({
    type: Action.LOGOUT
})
