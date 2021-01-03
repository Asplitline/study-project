

// ANS>> 卡了很久,以为是函数导出的问题，实际上是单词写错
// TIPS>> 下次遇见这种先测试接口
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}


function getUrlParams(key) {
    var params = location.search.substr(1).split('&');
    for (let i = 0; i < params.length; i++) {
        let param = params[i].split("=");
        if (param[0] == key)
            return param[1];
    }
    return -1;
}

// 退出
$('#logoutBtn').on('click', function () {
    if (confirm("你真的要退出吗?")) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function (respose) {
                location.href = "login.html";
            },
            error: function () {
                alert("退出失败");
            }
        })
    }

})

function showProfile() {
    $.ajax({
        type: 'get',
        url: '/users/' + userId,
        success: function (response) {
            console.log(response);
            $('.profile .avatar').attr('src', response.avatar);
            $('.profile .name').text(response.nickName);
        },
        error: function () {
            alert("渲染用户信息失败");
        }
    })
}

showProfile();