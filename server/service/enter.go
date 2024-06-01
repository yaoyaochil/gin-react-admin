package service

import (
	"github.com/yaoyaochil/gin-react-admin/service/system"
)

type GroupService struct {
	SystemServiceGroup system.ServiceGroup
}

var GroupServiceApp = new(GroupService)
