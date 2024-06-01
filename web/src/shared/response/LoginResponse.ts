import {userInfoType} from "@/store/userStore.ts";


export interface LoginResponse {
    expiresAt: number;
    token: string;
    user: userInfoType
}