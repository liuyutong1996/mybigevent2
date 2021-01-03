//这个函数会在ajax请求之前调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  //在发起真正的ajax请求之前，统一拼接请求的根路径
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // console.log(options.url);
  //统一为有权限的接口，设置headers请求头
  if (options.url.indexOf("/my") !== -1) {
    options.headers = { Authorization: localStorage.getItem("token") || "" };
  }
  //全局统一挂载complete这个函数
  options.complete = function (res) {
    console.log(res);
    if (
      res.responseJSON.status == 1 &&
      res.responseJSON.message == "身份认证失败！"
    ) {
      //强制清空本地存储里的token
      localStorage.removeItem("token");
      //强制跳转到登录页面
      location.href = "../../login.html";
    }
  };
});
