package system

import (
	"github.com/gin-gonic/gin"
	"github.com/yaoyaochil/gin-react-admin/model/common/response"
	"github.com/yaoyaochil/gin-react-admin/model/system"
	"github.com/yaoyaochil/gin-react-admin/model/system/request"
	"github.com/yaoyaochil/gin-react-admin/service"
)

type SysMenuApi struct {
}

var sysMenuService = service.GroupServiceApp.SystemServiceGroup.MenuService

// GetMenuById
// @Tags      sys_menu
// @Summary   获取单个菜单
// @Security  ApiKeyAuth
// @accept    application/json
// @Produce   application/json
// @Param     data  body system.Menu true  "ID"
// @Success   200   {object}  response.Response{msg=string}  "获取成功"
// @Router    /menu/getMenuById [post]
func (s *SysMenuApi) GetMenuById(c *gin.Context) {
	var info system.Menu
	err := c.ShouldBindJSON(&info)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	result, err := sysMenuService.GetMenu(info)
	if err != nil {
		response.FailWithMessage("获取失败", c)
		return
	}
	response.OkWithData(result, c)
}

// GetMenuList
// @Tags      sys_menu
// @Summary   分页获取菜单
// @Security  ApiKeyAuth
// @accept    application/json
// @Produce   application/json
// @Param     data  body request.GetMenuList true  "PageSize,Page"
// @Success   200   {object}  response.PageResult{List=[]interface{}, Total=int64, Page=int, PageSize=int}  "获取成功"
// @Router    /menu/getMenuList [post]
func (s *SysMenuApi) GetMenuList(c *gin.Context) {
	var pageInfo request.GetMenuList
	err := c.ShouldBindJSON(&pageInfo)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	result, total, err := sysMenuService.GetMenuList(pageInfo)
	if err != nil {
		response.FailWithMessage("获取失败", c)
		return
	}
	response.OkWithDetailed(response.PageResult{
		List:     result,
		Total:    total,
		Page:     pageInfo.Page,
		PageSize: pageInfo.PageSize,
	}, "获取成功", c)
}

// CreateMenu
// @Tags      sys_menu
// @Summary   创建菜单
// @Security  ApiKeyAuth
// @accept    application/json
// @Produce   application/json
// @Param     data  body system.Menu true  "ID,路由path,路由组件,是否首页,路由名称,路由图标,父菜单ID,是否缓存,排序"
// @Success   200   {object}  response.Response{msg=string}  "创建成功"
// @Router    /menu/createMenu [post]
func (s *SysMenuApi) CreateMenu(c *gin.Context) {
	var info system.Menu
	err := c.ShouldBindJSON(&info)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	err = sysMenuService.CreateMenu(info)
	if err != nil {
		response.FailWithMessage("创建失败", c)
		return
	}
	response.OkWithMessage("创建成功", c)
}

// UpdateMenuById
// @Tags      sys_menu
// @Summary   根据id更新菜单
// @Security  ApiKeyAuth
// @accept    application/json
// @Produce   application/json
// @Param     data  body system.Menu true  "ID,路由path,路由组件,是否首页,路由名称,路由图标,父菜单ID,是否缓存,排序"
// @Success   200   {object}  response.Response{msg=string}  "更新成功"
// @Router    /menu/updateMenuById [post]
func (s *SysMenuApi) UpdateMenuById(c *gin.Context) {
	var info system.Menu
	err := c.ShouldBindJSON(&info)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	err = sysMenuService.UpdateMenuById(info)
	if err != nil {
		response.FailWithMessage("更新失败", c)
		return
	}
	response.OkWithMessage("更新成功", c)
}

// DeleteMenuById
// @Tags      sys_menu
// @Summary   根据id删除菜单
// @Security  ApiKeyAuth
// @accept    application/json
// @Produce   application/json
// @Param     data  body system.Menu true  "ID"
// @Success   200   {object}  response.Response{msg=string}  "删除成功"
// @Router    /menu/deleteMenuById [post]
func (s *SysMenuApi) DeleteMenuById(c *gin.Context) {
	var info system.Menu
	err := c.ShouldBindJSON(&info)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	err = sysMenuService.DeleteMenuById(info)
	if err != nil {
		response.FailWithMessage("删除失败", c)
		return
	}
	response.OkWithMessage("删除成功", c)
}

// DeleteMenuByIds
// @Tags      sys_menu
// @Summary   批量删除菜单
// @Security  ApiKeyAuth
// @accept    application/json
// @Produce   application/json
// @Param     data  body []uint true  "提供的id数组"
// @Success   200   {object}  response.Response{msg=string}  "删除成功"
// @Router    /menu/deleteMenuByIds [post]
func (s *SysMenuApi) DeleteMenuByIds(c *gin.Context) {
	var ids []uint
	err := c.ShouldBindJSON(&ids)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	err = sysMenuService.DeleteMenuByIds(ids)
	if err != nil {
		response.FailWithMessage("删除失败", c)
		return
	}
	response.OkWithMessage("删除成功", c)
}
