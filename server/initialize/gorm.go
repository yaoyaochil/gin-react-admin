package initialize

import (
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/model/system"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"os"
)

// Gorm 初始化数据库并产生数据库全局变量
func Gorm() map[string]*gorm.DB {
	return GormMysql()
}

// RegisterDBTables 注册数据库表专用
func RegisterDBTables(db *gorm.DB) {
	db = global.GraDBs["system"]
	err := db.AutoMigrate(
		// 系统模块表
		system.SysUser{},
		system.JwtBlacklist{},
		system.Menu{},
	)
	if err != nil {
		global.GraLog.Error("register table failed", zap.Error(err))
		os.Exit(0)
	}
	global.GraLog.Info("register table success")
}
