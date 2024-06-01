package source

import (
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/model/system"
	"github.com/yaoyaochil/gin-react-admin/utils"

	uuid "github.com/satori/go.uuid"
)

func InitSystemDB() {
	db, exists := global.GraDBs["system"]
	if !exists || db == nil {
		global.GraLog.Error("GormMysqlSystem DB is nil")
		return
	}

	var menuList system.Menu
	db.Where("path = ?", "/layout").First(&menuList)
	if menuList.ID != 0 {
		global.GraLog.Info("系统菜单已存在 本次无需初始化菜单!")
		return
	}

	menu := system.Menu{
		Path:    "/layout",
		Label:   "根布局",
		Element: "pages/layout/page.tsx",
		Children: []system.Menu{
			{
				Path:    "dashboard", // 非根路由path不要加/
				Label:   "仪表盘",
				Icon:    "PieChartOutlined",
				Element: "pages/dashboard/page.tsx",
				Index:   true,
			},
			{
				Path:  "system",
				Label: "系统管理",
				Icon:  "SettingOutlined",
				Children: []system.Menu{
					{
						Path:    "user",
						Label:   "用户管理",
						Icon:    "UserOutlined",
						Element: "pages/system/user/page.tsx",
					},
					{
						Path:    "role",
						Label:   "角色管理",
						Icon:    "TeamOutlined",
						Element: "pages/system/role/page.tsx",
					},
					{
						Path:    "menu",
						Label:   "菜单管理",
						Icon:    "MenuOutlined",
						Element: "pages/system/menu/page.tsx",
					},
				},
			},
			{
				Path:    "userInfo",
				Label:   "个人中心",
				Icon:    "UserOutlined",
				Element: "pages/userInfo/page.tsx",
			},
		},
	}
	db.Create(&menu)

	var userList system.SysUser
	db.Where("username = ?", "admin").First(&userList)
	if userList.ID != 0 {
		global.GraLog.Info("系统用户admin已存在 本次无需初始化用户!")
		return
	}

	// Init system db
	user := system.SysUser{
		UUID:      uuid.NewV4(),
		Username:  "admin",
		Password:  utils.BcryptHash("123456"),
		NickName:  "系统管理员",
		HeaderImg: "https://img.imdodo.com/openapitest/upload/cdn/4A301072DEC6B6A49050E5B294CD7983_1707877949352.png",
	}

	db.Create(&user)
}
