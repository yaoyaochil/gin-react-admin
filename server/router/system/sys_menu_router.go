package system

import (
	"github.com/gin-gonic/gin"
	v1 "github.com/yaoyaochil/gin-react-admin/api/v1"
)

type SysMenuRouter struct{}

func (s *SysMenuRouter) InitSysMenuRouter(router *gin.RouterGroup) {
	router = router.Group("menu")
	var sysMenuApi = v1.ApiGroupApp.SystemApiGroup.SysMenuApi
	{
		router.POST("getMenuById", sysMenuApi.GetMenuById)
		router.POST("getMenuList", sysMenuApi.GetMenuList)
		router.POST("createMenu", sysMenuApi.CreateMenu)
		router.POST("updateMenu", sysMenuApi.UpdateMenuById)
		router.POST("deleteMenu", sysMenuApi.DeleteMenuById)
		router.POST("deleteMenus", sysMenuApi.DeleteMenuByIds)
	}
}
