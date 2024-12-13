import { loginApi, logoutApi } from "../../api/auth";
import { Action } from "../Actions";
import { LoginData } from "./types";

export const loginUserAction = async (userData: LoginData) => {
    let user;
    try {
        user = await loginApi(userData)
        console.log('USER:', user)
    } catch {
        console.log('Invalid login')
    }

    return {
        type: Action.LOGIN,
        payload: user.data.data
    }
}

export const logoutUserAction = async () => {
    try {
        await logoutApi()
    } catch {
        console.log('Invalid logout')
    }
    //TODO: FIX LOGIC
    return {
        type: Action.LOGOUT
    }
}