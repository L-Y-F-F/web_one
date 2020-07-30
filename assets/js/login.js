$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 定义layUI 表单效验规则
    var form = layui.form

    form.verify({
        //自定义了一个规则
        pwd: [/^\S{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次码是密否一致
        re: function (value) {
            if ($('#reg-pwd').val() !== value) {
                return '两次密码不一致'
            }
        }

    })
    //注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        console.log($('form_reg').serialize());
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })

    })
    //4.登录
    $('#form_login').on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                //注册失败效验
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //注册成功，提示
                layer.msg(res.message)
                //保存token
                localStorage.setItem("token", res.token)
                //页面跳转
                location.href = '/index.html'
            }
        })

    })

})
