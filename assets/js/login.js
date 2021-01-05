$(function () {
  //点击去注册账号的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //点击去登录的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  //从layui中获取form对象
  var form = layui.form;
  var layer = layui.layer;
  //通过form.verify函数自定义校验规则

  form.verify({
    //校验一个叫pwd校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      //通过形参拿到是确认密码框的值
      //还需要拿到密码框中的内容
      //然后进行一次等于的判断
      //如果失败return一个错误的提示
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });
  //监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    //阻止默认行为
    e.preventDefault();
    //发起ajax post请求
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          layer.msg("注册成功，请登录！");
          //模拟人的点击行为
          $("#link_login").click();
        }
      },
    });
  });
  //监听登录表单的提交事件
  $("#form_login").submit(function (e) {
    //阻止表单的默认行为
    e.preventDefault();
    //发起ajax post请求
    $.ajax({
      type: "post",
      url: "/api/login",
      data: {
        username: $(".login-box [name=username]").val(),
        password: $(".login-box [name=password]").val(),
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("登录失败！");
        } else {
          layer.msg("登录成功！");
          //将登录成功得到的token值存到本地存储里
          localStorage.setItem("token", res.token);
          //跳转到首页
          location.href = "/index.html";
        }
      },
    });
  });
});
