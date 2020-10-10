$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "新旧密码不能一致"
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次密码不一致"
            }
        }


    });


    // 表单提交
    $(".layui-form").on("submit", function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // 调用ajax
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("修改成功")
                $(".layui-form")[0].reset()
            }
        })
    })


})