import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";


export type UserInfoType = {
    id: number,
    uuid: string,
    username: string,
    nickName: string,
    headerImg: string,
}


type UserStoreType = {
    userInfo: UserInfoType;
    token: string;
    setUserInfo: (info: UserInfoType) => void;
    setToken: (val: string) => void;
};



export const useUserStore = create<UserStoreType>()(
    persist(
        (set) => ({
            userInfo: {} as UserInfoType,
            token: '',
            setUserInfo: (info: UserInfoType) => set({ userInfo: info }),
            setToken: (val: string) => set({ token: val }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore