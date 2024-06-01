package main

import (
	"github.com/yaoyaochil/gin-react-admin/core"
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/initialize"
	"github.com/yaoyaochil/gin-react-admin/source"
)

// @title                       Gin-React-Admin Swagger API接口文档
// @version                     v1.0.0
// @description                 使用gin+react进行极速开发的全栈开发基础平台
// @securityDefinitions.apikey  ApiKeyAuth
// @in                          header
// @name                        x-token
// @BasePath
func main() {
	global.GraVp = core.Viper() // 初始化Viper
	initialize.OtherInit()      // 初始化其他
	global.GraLog = core.Zap()  // 初始化zap日志库
	global.GraDBs = initialize.Gorm()
	for _, db := range global.GraDBs {
		if db != nil {
			initialize.RegisterDBTables(db) // 初始化表
			sqlDB, _ := db.DB()
			defer sqlDB.Close()
		}
	}

	source.InitSystemDB() // 初始化系统用户

	core.RunWindowsServer()
}
