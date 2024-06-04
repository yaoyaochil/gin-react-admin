import {Spin} from "antd";
import {useEffect, useState} from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function LoadingPage() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {

        const timer = setTimeout(() => {
            NProgress.start();
            setVisible(true);
        }, 100);


        return () => {
            NProgress.done();
            clearTimeout(timer);
        }
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div className={"w-screen h-screen flex justify-center items-center"}>
            <Spin size={"large"}/>
        </div>
    )
}