$(function () {
  //调用getUserInfo()这个函数获取基本信息
  getUserInfo();
  var layer = layui.layer;
  //点击按钮，实现退出功能
  $("#btnLogout").on("click", function () {
    // console.log("ok");
    //提示用户是否确认退出
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // console.log("ok");
        // 1、清空本地存储里面的token
        localStorage.removeItem("token");
        //2、跳转到登录页面
        location.href = "../../login.html";
        //关闭confirm弹出层
        layer.close(index);
      }
    );
  });
});

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    // headers: { Authorization: localStorage.getItem("token") || "" },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      renderAvatar(res.data);
    },
    //不论成功还是失败，都会调complete这个回调函数
    // complete: function (res) {
    //   console.log(res);
    //   if (
    //     res.responseJSON.status == 1 &&
    //     res.responseJSON.message == "身份认证失败！"
    //   ) {
    //     //强制清空本地存储里的token
    //     localStorage.removeItem("token");
    //     //强制跳转到登录页面
    //     location.href = "../../login.html";
    //   }
    // },
  });
}
//渲染用户的头像
function renderAvatar(user) {
  //获取用户的名称
  var username = user.nickname || user.username;
  //设置欢迎的文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + username);
  //按需渲染头像
  if (user.user_pic !== null) {
    //渲染用户的头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    //渲染文本头像
    $(".layui-nav-img").hide();
    var first = username[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
