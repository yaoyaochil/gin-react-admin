import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";


export default function Page404() {

    const navigate = useNavigate()

    return (
        <div className={"w-full h-full flex justify-center items-center"}>
            <Result
                status="404"
                title="404"
                subTitle="页面不存在"
                extra={<Button type="primary" onClick={
                    () => {
                        navigate(-1) // 返回上一页
                    }
                }>返回上一页</Button>}
            />
        </div>
    )
}