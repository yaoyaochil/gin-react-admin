package system

import "github.com/yaoyaochil/gin-react-admin/global"

type Menu struct {
	global.GraMODEL
	Path      string `json:"path" gorm:"comment:路由path"` // 非根路由path不要加/
	Element   string `json:"element" gorm:"comment:路由组件"`
	Index     bool   `json:"index" gorm:"comment:是否首页"`
	Label     string `json:"label" gorm:"comment:路由名称"`
	Icon      string `json:"icon" gorm:"comment:路由图标"`
	ParentId  *uint  `json:"parentId" gorm:"comment:父菜单ID;default:0"`
	Parent    *Menu  `json:"parent" gorm:"foreignKey:ParentId"`
	Children  []Menu `json:"children" gorm:"foreignKey:ParentId"`
	KeepAlive bool   `json:"keepAlive" gorm:"comment:是否缓存;default:false"`
	OrderNum  int    `json:"orderNum" gorm:"comment:排序;default:0"`
}

func (m *Menu) TableName() string {
	return "system_menus"
}
