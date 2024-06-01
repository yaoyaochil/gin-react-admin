import {Spin} from "antd";

export default function LoadingPage() {
    return (
        <div className={"w-screen h-screen flex justify-center items-center"}>
            <Spin size={"large"}/>
        </div>
    )
}