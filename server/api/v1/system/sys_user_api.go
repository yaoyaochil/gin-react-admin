package system

import (
	"fmt"
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/model/common/response"
	"github.com/yaoyaochil/gin-react-admin/model/system"
	"github.com/yaoyaochil/gin-react-admin/model/system/request"
	systemReq "github.com/yaoyaochil/gin-react-admin/model/system/request"
	systemRes "github.com/yaoyaochil/gin-react-admin/model/system/response"
	"github.com/yaoyaochil/gin-react-admin/service"
	"github.com/yaoyaochil/gin-react-admin/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type SysUserApi struct {
}

// Login 登录
// @Tags 系统用户
// @Summary 用户登录
// @Produce  application/json
// @Param data body systemReq.Login true "用户名和密码"
// @Success 200 {string} string "{"code":200,"data":{},"msg":"登录成功"}"
// @Router /base/login [post]
func (a *SysUserApi) Login(c *gin.Context) {
	var L systemReq.Login
	_ = c.ShouldBindJSON(&L)

	var user system.SysUser
	if err := global.GraDBs["system"].Where("username = ?", L.Username).First(&user).Error; err != nil {
		response.FailWithMessage("用户不存在", c)
		return
	}

	if ok := utils.BcryptCheck(L.Password, user.Password); !ok {
		response.FailWithMessage("密码错误", c)
		return
	}

	a.TokenSet(c, user)
}

// TokenSet 签发token
func (a *SysUserApi) TokenSet(c *gin.Context, user system.SysUser) {
	j := &utils.JWT{SigningKey: []byte(global.GraConf.JWT.SigningKey)} // 唯一签名
	claims := j.CreateClaims(systemReq.BaseClaims{
		UUID:     user.UUID,
		ID:       user.ID,
		NickName: user.NickName,
		Username: user.Username,
	})
	token, err := j.CreateToken(claims)
	if err != nil {
		global.GraLog.Error("获取token失败!", zap.Error(err))
		response.FailWithMessage("获取token失败", c)
		return
	}
	response.OkWithDetailed(systemRes.LoginResponse{
		User: systemRes.LoginUserInfo{
			Username:  user.Username,
			HeaderImg: user.HeaderImg,
			NickName:  user.NickName,
			ID:        user.ID,
			UUID:      user.UUID.String(),
		},
		Token:     token,
		ExpiresAt: claims.ExpiresAt,
	}, fmt.Sprintf("%s,欢迎回来", user.NickName), c)
}

// GetUserInfo 获取用户信息
// @Tags 系统用户
// @Summary 获取用户信息
// @Produce  application/json
// @Security ApiKeyAuth
// @Success 200 {string} string "{"code":200,"data":{},"msg":"获取成功"}"
// @Router /user/getUserInfo [get]
func (a *SysUserApi) GetUserInfo(c *gin.Context) {
	uuid := utils.GetUserUuid(c)
	ReqUser, err := service.GroupServiceApp.SystemServiceGroup.SysUserService.GetUserInfo(uuid)
	if err != nil {
		response.FailWithMessage("获取失败", c)
		return
	}
	response.OkWithData(ReqUser, c)
}

// ChangePassword 修改密码
// @Tags 系统用户
// @Summary 修改密码
// @Produce  application/json
// @Security ApiKeyAuth
// @Param oldPassword query string true "旧密码"
// @Param newPassword query string true "新密码"
// @Success 200 {string} string "{"code":200,"data":{},"msg":"修改成功"}"
// @Router /user/changePassword [post]
func (a *SysUserApi) ChangePassword(c *gin.Context) {
	var user request.ChangePassword
	userID := utils.GetUserID(c)
	_ = c.ShouldBindJSON(&user)
	if err := service.GroupServiceApp.SystemServiceGroup.SysUserService.ChangePassword(userID, user); err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	response.OkWithMessage("修改成功", c)
}
