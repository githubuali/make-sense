import { store } from "../..";
import { User } from "../auth/types";

export class AuthSelector {
    public static selectUser(): User {
        return store.getState().auth.user
    }

    public static isUserLoading(): boolean {
        return store.getState().auth.loading
    }

    public static userError(): null | string {
        return store.getState().auth.error
    }
}