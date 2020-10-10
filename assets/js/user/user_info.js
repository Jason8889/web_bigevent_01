$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度在1~6之间"
            }
        }
    });


    // 用户渲染
    initUserInfo();
    // 封装函数
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val("formUserInfo", res.data)
            }
        })
    }
    // 表单重置
    $("#btnReset").on("click", function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 重新渲染
        initUserInfo()
    })

    // 修改用户信息
    $(".layui-form").on("submit", function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 发送AJAX
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("修改成功")
                // 调用父框架的全局方法
                window.parent.getUserInfo()
            }
        })
    })
})