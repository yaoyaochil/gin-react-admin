package config

type System struct {
	Addr         string `mapstructure:"addr" json:"addr" yaml:"addr"`
	RouterPrefix string `mapstructure:"router-prefix" json:"router-prefix" yaml:"router-prefix"`
}
