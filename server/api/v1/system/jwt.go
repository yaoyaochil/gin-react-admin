package system

import (
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/model/common/response"
	"github.com/yaoyaochil/gin-react-admin/model/system"
	"github.com/yaoyaochil/gin-react-admin/service"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type SysJwtApi struct{}

// JwtInBlacklist JWT加入黑名单
// @Tags System
// @Summary JWT鉴权
// @Security ApiKeyAuth
// @Produce  application/json
// @Param token query string true "token"
// @Success 200 {string} string "{"code":200,"data":{},"msg":"ok"}"
// @Router /jwt/jwtInBlacklist [post]
func (s *SysJwtApi) JwtInBlacklist(c *gin.Context) {
	token := c.Request.Header.Get("x-token")
	if token == "" {
		response.FailWithMessage("账户已注销 请勿重复操作", c)
		return
	}
	jwt := system.JwtBlacklist{Jwt: token}
	if err := service.GroupServiceApp.SystemServiceGroup.JwtService.JwtInBlacklist(jwt); err != nil {
		global.GraLog.Error("退出登陆失败!", zap.Error(err))
		response.FailWithMessage("退出登陆失败", c)
		return
	}
	response.OkWithMessage("账户退出登陆!", c)
}
