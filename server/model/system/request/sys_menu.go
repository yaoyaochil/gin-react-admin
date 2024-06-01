package request

import (
	"github.com/yaoyaochil/gin-react-admin/model/common/request"
	"github.com/yaoyaochil/gin-react-admin/model/system"
)

type GetMenuList struct {
	request.PageInfo
	system.Menu
}
