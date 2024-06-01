import Login from "@/pages/login/login.tsx";
import {GithubOutlined} from "@ant-design/icons";


export default function LoginPage() {
    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div
                className={"bg-white rounded-md lg:p-10 md:p-6 sm:p-4 lg:w-1/4 sm:m-10 sm:w-full md:w-1/3 md:min-w-96 transition-all duration-200 flex-col justify-center items-center"}>
                <div className={"flex justify-center items-end gap-1 mt-5"}>
                    <span className={"text-sm font-bold"}>{
                        import.meta.env.VITE_APP_NAME
                    }</span>
                </div>

                <span className={"text-2xl font-bold text-blue-500 mt-10 flex justify-center items-center"}>
                    Hi, Welcome Back
                </span>

                <div className={"w-full flex justify-center items-center mt-12"}>
                    <Login/>
                </div>
                <div className={"flex justify-center items-center mt-auto"}>
                    <span className={"text-sm text-gray-400"}>© 2024 Eto</span>
                    <span className={"text-sm text-gray-400 ml-1 mr-1"}>All Rights Reserved</span>
                    <a href="https://github.com/yaoyaochil/eto-gateway" target="_blank" rel="noreferrer">
                        <GithubOutlined className={"text-gray-400"}/>
                        <span className={"text-sm text-gray-400 ml-1"}>Github @yaoyaochil</span>
                    </a>
                </div>
            </div>
        </div>
    )
}