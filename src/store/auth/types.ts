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

export interface LoginData {
    email: string,
    password: string
}

interface Login {
    type: typeof Action.LOGIN,
    payload: User;

}

interface Logout {
    type: typeof Action.LOGOUT,
    payload: {
        userData: User;
    }
}

export type AuthActionTypes = Login | Logout