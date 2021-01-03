$(function () {
  //调用getUserInfo()这个函数获取基本信息
  getUserInfo();
});

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    headers: { Authorization: localStorage.getItem("token") || "" },
    success: function (res) {
      console.log(res);
    },
  });
}
