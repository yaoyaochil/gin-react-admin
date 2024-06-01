package system

import "github.com/yaoyaochil/gin-react-admin/global"

type JwtBlacklist struct {
	global.GraMODEL
	Jwt string `gorm:"type:text;comment:jwt"`
}
