import { store } from "../..";
import { User } from "../auth/types";

export class AuthSelector {
    public static selectUser(): User {
        return store.getState().auth
    }
}