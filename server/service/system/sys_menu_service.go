package system

import (
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/model/system"
	"github.com/yaoyaochil/gin-react-admin/model/system/request"
)

type MenuService struct {
}

// CreateMenu 创建菜单
func (m *MenuService) CreateMenu(menu system.Menu) (err error) {
	err = global.GraDBs["system"].Create(&menu).Error
	return err
}

// UpdateMenuById 根据id更新菜单
func (m *MenuService) UpdateMenuById(menu system.Menu) (err error) {
	upDateMap := make(map[string]interface{})
	upDateMap["path"] = menu.Path
	upDateMap["element"] = menu.Element
	upDateMap["index"] = menu.Index
	upDateMap["label"] = menu.Label
	upDateMap["icon"] = menu.Icon
	upDateMap["parent_id"] = menu.ParentId
	upDateMap["keep_alive"] = menu.KeepAlive
	upDateMap["order_num"] = menu.OrderNum
	upDateMap["hidden"] = menu.Hidden
	err = global.GraDBs["system"].Model(&menu).Where("id = ?", menu.ID).Updates(upDateMap).Error
	return err
}

// DeleteMenuById 根据id删除菜单
func (m *MenuService) DeleteMenuById(menu system.Menu) (err error) {
	err = global.GraDBs["system"].Where("id = ?", menu.ID).Delete(&menu).Error
	return err
}

// DeleteMenuByIds 批量删除菜单
func (m *MenuService) DeleteMenuByIds(ids []uint) (err error) {
	err = global.GraDBs["system"].Where("id in (?)", ids).Delete(&system.Menu{}).Error
	return err
}

// GetMenu 获取菜单
func (m *MenuService) GetMenu(menu system.Menu) (data system.Menu, err error) {
	err = global.GraDBs["system"].First(&menu).Error
	return menu, err
}

// GetMenuList 分页获取菜单
func (m *MenuService) GetMenuList(info request.GetMenuList) (list []system.Menu, total int64, err error) {
	limit := info.PageSize
	offset := info.PageSize * (info.Page - 1)
	db := global.GraDBs["system"]
	err = db.Preload("Children.Children.Children").Where("parent_id = 0").Limit(limit).Offset(offset).Find(&list).Error
	db.Model(&system.Menu{}).Count(&total)
	return list, total, err
}
