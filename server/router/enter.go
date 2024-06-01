package router

import (
	"github.com/yaoyaochil/gin-react-admin/router/base"
	"github.com/yaoyaochil/gin-react-admin/router/system"
)

type RouterGroup struct {
	System system.RouterGroup
	Base   base.RouterGroup
}

var RouterGroupApp = new(RouterGroup)
