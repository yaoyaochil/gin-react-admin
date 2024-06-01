// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/base/login": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "系统用户"
                ],
                "summary": "用户登录",
                "parameters": [
                    {
                        "description": "用户名和密码",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/request.Login"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "{\"code\":200,\"data\":{},\"msg\":\"登录成功\"}",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/jwt/jwtInBlacklist": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "System"
                ],
                "summary": "JWT鉴权",
                "parameters": [
                    {
                        "type": "string",
                        "description": "token",
                        "name": "token",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "{\"code\":200,\"data\":{},\"msg\":\"ok\"}",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/menu/createMenu": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sys_menu"
                ],
                "summary": "创建菜单",
                "parameters": [
                    {
                        "description": "api路径, api中文描述, api组, 方法",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/system.Menu"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "创建成功",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/response.Response"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "msg": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/menu/deleteMenuById": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sys_menu"
                ],
                "summary": "根据id删除菜单",
                "parameters": [
                    {
                        "description": "api路径, api中文描述, api组, 方法",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/system.Menu"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "删除成功",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/response.Response"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "msg": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/menu/deleteMenuByIds": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sys_menu"
                ],
                "summary": "批量删除菜单",
                "parameters": [
                    {
                        "description": "api路径, api中文描述, api组, 方法",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "integer"
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "删除成功",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/response.Response"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "msg": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/menu/getMenuById": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sys_menu"
                ],
                "summary": "获取单个菜单",
                "parameters": [
                    {
                        "description": "api路径, api中文描述, api组, 方法",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/system.Menu"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "获取成功",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/response.Response"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "msg": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/menu/getMenuList": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sys_menu"
                ],
                "summary": "分页获取菜单",
                "parameters": [
                    {
                        "description": "api路径, api中文描述, api组, 方法",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/request.GetMenuList"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "获取成功",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/response.PageResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        " Page": {
                                            "type": "integer"
                                        },
                                        " PageSize": {
                                            "type": "integer"
                                        },
                                        " Total": {
                                            "type": "integer"
                                        },
                                        "List": {
                                            "type": "array",
                                            "items": {
                                                "type": "object"
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/menu/updateMenuById": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sys_menu"
                ],
                "summary": "根据id更新菜单",
                "parameters": [
                    {
                        "description": "api路径, api中文描述, api组, 方法",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/system.Menu"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "更新成功",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/response.Response"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "msg": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/user/changePassword": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "系统用户"
                ],
                "summary": "修改密码",
                "parameters": [
                    {
                        "type": "string",
                        "description": "旧密码",
                        "name": "oldPassword",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "新密码",
                        "name": "newPassword",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "{\"code\":200,\"data\":{},\"msg\":\"修改成功\"}",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/user/getUserInfo": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "系统用户"
                ],
                "summary": "获取用户信息",
                "responses": {
                    "200": {
                        "description": "{\"code\":200,\"data\":{},\"msg\":\"获取成功\"}",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "request.GetMenuList": {
            "type": "object",
            "properties": {
                "children": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/system.Menu"
                    }
                },
                "createdAt": {
                    "description": "创建时间",
                    "type": "string"
                },
                "element": {
                    "type": "string"
                },
                "icon": {
                    "type": "string"
                },
                "id": {
                    "description": "主键ID",
                    "type": "integer"
                },
                "index": {
                    "type": "boolean"
                },
                "keyword": {
                    "description": "关键字",
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "page": {
                    "description": "页码",
                    "type": "integer"
                },
                "pageSize": {
                    "description": "每页大小",
                    "type": "integer"
                },
                "parent": {
                    "$ref": "#/definitions/system.Menu"
                },
                "parentId": {
                    "type": "integer"
                },
                "path": {
                    "description": "非根路由path不要加/",
                    "type": "string"
                },
                "updatedAt": {
                    "description": "更新时间",
                    "type": "string"
                },
                "updatedBy": {
                    "description": "更新操作人 关联用户表",
                    "type": "string"
                }
            }
        },
        "request.Login": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "response.PageResult": {
            "type": "object",
            "properties": {
                "list": {},
                "page": {
                    "type": "integer"
                },
                "pageSize": {
                    "type": "integer"
                },
                "total": {
                    "type": "integer"
                }
            }
        },
        "response.Response": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "data": {},
                "msg": {
                    "type": "string"
                }
            }
        },
        "system.Menu": {
            "type": "object",
            "properties": {
                "children": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/system.Menu"
                    }
                },
                "createdAt": {
                    "description": "创建时间",
                    "type": "string"
                },
                "element": {
                    "type": "string"
                },
                "icon": {
                    "type": "string"
                },
                "id": {
                    "description": "主键ID",
                    "type": "integer"
                },
                "index": {
                    "type": "boolean"
                },
                "label": {
                    "type": "string"
                },
                "parent": {
                    "$ref": "#/definitions/system.Menu"
                },
                "parentId": {
                    "type": "integer"
                },
                "path": {
                    "description": "非根路由path不要加/",
                    "type": "string"
                },
                "updatedAt": {
                    "description": "更新时间",
                    "type": "string"
                },
                "updatedBy": {
                    "description": "更新操作人 关联用户表",
                    "type": "string"
                }
            }
        }
    },
    "securityDefinitions": {
        "ApiKeyAuth": {
            "type": "apiKey",
            "name": "x-token",
            "in": "header"
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "v1.0.0",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "Gin-React-Admin Swagger API接口文档",
	Description:      "使用gin+react进行极速开发的全栈开发基础平台",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}