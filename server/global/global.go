package global

import (
	"github.com/songzhibin97/gkit/cache/local_cache"
	"github.com/spf13/viper"
	"github.com/yaoyaochil/gin-react-admin/config"
	"go.uber.org/zap"
	"golang.org/x/sync/singleflight"
	"gorm.io/gorm"
)

var (
	GraLog                *zap.Logger
	GraCache              local_cache.Cache
	GraConf               config.Server
	GraVp                 *viper.Viper
	GraConcurrencyControl = &singleflight.Group{}
	GraDBs                map[string]*gorm.DB
)
