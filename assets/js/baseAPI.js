// 开发服务器的地址
var baseURL = "http://ajax.frontend.itheima.net"
// 拦截所有的Ajax请求：get / post / ajax
// 处理参数
$.ajaxPrefilter(function (params) {
    // 拼接对应环境的服务器地址
    params.url = baseURL + params.url;
    if (params.url.indexOf("/my/") !== 1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    params.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 删除本地的token
            localStorage.removeItem("token")
            // 跳转页面
            location.href = '/login.html'
        }
    }

})