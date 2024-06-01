package v1

import (
	"github.com/yaoyaochil/gin-react-admin/api/v1/system"
)

type ApiGroup struct {
	SystemApiGroup system.ApiGroup // system 模块
}

var ApiGroupApp = new(ApiGroup)
