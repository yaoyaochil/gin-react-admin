package initialize

import (
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/yaoyaochil/gin-react-admin/docs"
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/middleware"
	"github.com/yaoyaochil/gin-react-admin/model/common/response"
	"github.com/yaoyaochil/gin-react-admin/router"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routers() *gin.Engine {
	Router := gin.Default()

	// 自定义404
	Router.NoRoute(func(c *gin.Context) {
		response.NotFound(c)
	})

	//systemRouter := router.RouterGroupApp.System
	systemRouter := router.RouterGroupApp.System
	baseRouter := router.RouterGroupApp.Base

	// 注册swagger 文档
	docs.SwaggerInfo.BasePath = global.GraConf.System.RouterPrefix
	Router.GET(global.GraConf.System.RouterPrefix+"/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	global.GraLog.Info("register swagger handler")

	// 方便统一添加路由组前缀 多服务器上线使用
	PrivateGroup := Router.Group("")
	PrivateGroup.Use(middleware.JWTAuth())
	PublicGroup := Router.Group("")

	BasePublicGroup := Router.Group("base") // 基础功能路由 不做鉴权
	{
		// 健康监测
		PublicGroup.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, "ok")
		})
	}
	{
		// 不需要鉴权的路由
		baseRouter.SystemBaseRouter.InitSystemBaseRouter(BasePublicGroup) // 注册基础功能路由 不做鉴权
		systemRouter.SysJwtRouter.InitJwtRouter(PublicGroup)              // 注册jwt相关路由
	}
	{
		// 需要鉴权的路由
		systemRouter.SysUserRouter.InitSysUserRouter(PrivateGroup) // 注册用户路由
		systemRouter.SysMenuRouter.InitSysMenuRouter(PrivateGroup) // 注册menu路由
	}

	return Router
}
