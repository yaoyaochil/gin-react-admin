import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";


export type userInfoType = {
    id: number,
    uuid: string,
    username: string,
    nick_name: string,
    header_img: string,
}


type userStoreType = {
    userInfo: userInfoType,
    token: string,
    setUserInfo: (info: userInfoType) => void,
    setToken: (val: string) => void,
}



export const useUserStore = () => create(
    persist<userStoreType> (set => ({
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : {} as userInfoType,
        token: localStorage.getItem('token') || '',
        setUserInfo: (info: userInfoType) => set({userInfo: info}),
        setToken: (val: string) => set({token: val}),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useUserStore