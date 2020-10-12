$(function () {

    template.defaults.imports.dataFormat = function (daStr) {
        var dt = new Date(daStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth())
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    var q = {
        pagenum: 1,// 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: "", // 文章分类的 Id
        state: "",// 文章的发布状态

    }
    var layer = layui.layer
    var form = layui.form
    initTable()
    initCate()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 渲染文章列表同时渲染分页
                renderPage(res.total)
            }
        })
    }
    // 初始化分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    // 筛选功能
    $("#form-search").on("submit", function (e) {
        e.preventDefault()

        var cate_id = $("[name=cate_id]").val()
        var state = $("[name=state]").val()


        q.state = state
        q.cate_id = cate_id
        initTable()
    })

    // 分页
    var laypage = layui.laypage
    function renderPage(totol) {
        laypage.render({
            elem: "pageBox",
            count: totol,
            limit: q.pagesize,
            curr: q.pagenum,

            // 分页模块设置  显示那些子模块
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 8, 10],
            jump: function (obj, first) {
                // obj: 所有参数所在的对象
                // first： 是否是第一次初始化页面
                q.pagenum = obj.curr
                // q.paresize = obj.limit
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }


    // 删除
    $("tbody").on("click", ".btn-delete", function () {
        var Id = $(this).attr("data-id")
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + Id,
                // data: ,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("删除成功")
                    if ($(".btn-delete").length == 1 && q.pagenum > 1) q.pagenum--;
                    initTable()
                }
            })

            layer.close(index);
        })
    })

})