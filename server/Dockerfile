FROM golang:alpine as builder

WORKDIR /go/src/github.com/yaoyaochi/eto-github.com/yaoyaochil/gin-react-adminservice

COPY . .

RUN go env -w GO111MODULE=on \
    && go env -w GOPROXY=https://goproxy.cn,direct \
    && go env -w CGO_ENABLED=0 \
    && go env \
    && go mod tidy \
    && go build -o server .

FROM alpine:latest

LABEL MAINTAINER="wangrui19970405@gmail.com"

WORKDIR /go/src/github.com/yaoyaochi/eto-github.com/yaoyaochil/gin-react-adminservice

COPY --from=builder /go/src/github.com/yaoyaochi/eto-github.com/yaoyaochil/gin-react-adminservice/server /go/src/github.com/yaoyaochi/eto-github.com/yaoyaochil/gin-react-adminservice/server
COPY --from=builder /go/src/github.com/yaoyaochi/eto-github.com/yaoyaochil/gin-react-adminservice/config.yaml /go/src/github.com/yaoyaochi/eto-github.com/yaoyaochil/gin-react-adminservice/config.yaml

EXPOSE 8080

ENTRYPOINT ["./server", "-c", "config.yaml"]