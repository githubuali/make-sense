import { Action } from "../Actions";

export enum UserRoles {
    PILOT = 'pilot',
    ADMIN = 'admin',
    OPMNG = 'operations manager',
    ACMNG = 'account manager',
    MNGER = 'manager',
    MMBER = 'member',
    NULL = '',
}

export interface Role {
    id: string;
    name: UserRoles;
    permission: string[];
}

export interface Company {
    id: string;
    name: string;
    isPrimary: boolean;
    timezone: string;
    country: string;
}

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    company: Company[];
    assignedCompany?: Company[];
    role: Role;
    status: boolean;
}

export interface AuthState {
    user: User;
    loading: boolean;
    error: null | string;
}

interface LoginRequest {
    type: typeof Action.LOGIN_REQUEST;
}

interface LoginSuccess {
    type: typeof Action.LOGIN_SUCCESS;
    payload: User; // Payload will be the user object after successful login
}

interface LoginFailure {
    type: typeof Action.LOGIN_FAILURE;
    payload: string; // Payload will be the error message from failed login
}

interface Logout {
    type: typeof Action.LOGOUT;
    payload: null; // No payload for logout
}

// Combined Auth Action Types (LoginRequest, LoginSuccess, LoginFailure, Logout)
export type AuthActionTypes = LoginRequest | LoginSuccess | LoginFailure | Logout;