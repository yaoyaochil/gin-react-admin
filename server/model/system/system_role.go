package system

import (
	"time"
)

type SysRole struct {
	CreatedAt     time.Time  // 创建时间
	UpdatedAt     time.Time  // 更新时间
	DeletedAt     *time.Time `sql:"index"`
	AuthorityId   uint       `json:"authorityId" gorm:"not null;unique;primary_key;comment:角色ID;size:90"` // 角色ID
	AuthorityName string     `json:"authorityName" gorm:"comment:角色名"`                                    // 角色名
	ParentId      *uint      `json:"parentId" gorm:"comment:父角色ID"`
}
