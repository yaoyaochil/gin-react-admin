package core

import (
	"fmt"
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/initialize"
	"github.com/yaoyaochil/gin-react-admin/service/system"
	"time"
)

type server interface {
	ListenAndServe() error
}

func RunWindowsServer() {
	// 初始化redis服务
	//initialize.RedisInit()

	// 从db加载jwt数据
	if global.GraDBs["system"] != nil {
		system.LoadAll()
	}

	Router := initialize.Routers()
	Router.Static("/form-generator", "./resource/page")

	address := fmt.Sprintf(":%s", global.GraConf.System.Addr)
	s := initServer(address, Router)
	// 保证文本顺序输出
	// In order to ensure that the text order output can be deleted
	time.Sleep(10 * time.Microsecond)

	fmt.Printf(`GRA服务启动成功%s 
`, address)
	global.GraLog.Error(s.ListenAndServe().Error())
}
