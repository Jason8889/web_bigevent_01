// 开发服务器的地址
var baseURL = "http://ajax.frontend.itheima.net"
// 拦截所有的Ajax请求：get / post / ajax
// 处理参数
$.ajaxPrefilter(function (params) {
    // 拼接对应环境的服务器地址
    params.url = baseURL + params.url;
})