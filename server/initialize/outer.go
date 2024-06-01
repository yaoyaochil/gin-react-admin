package initialize

import (
	"github.com/yaoyaochil/gin-react-admin/global"
	"github.com/yaoyaochil/gin-react-admin/utils"

	"github.com/songzhibin97/gkit/cache/local_cache"
)

func OtherInit() {
	dr, err := utils.ParseDuration(global.GraConf.JWT.ExpiresTime)
	if err != nil {
		panic(err)
	}
	_, err = utils.ParseDuration(global.GraConf.JWT.BufferTime)
	if err != nil {
		panic(err)
	}

	global.GraCache = local_cache.NewCache(
		local_cache.SetDefaultExpire(dr),
	)
}
