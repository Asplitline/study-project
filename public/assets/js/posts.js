
// ANS>> 卡了很久,以为是函数导出的问题，实际上是单词写错


// TIPS>> 下次遇见这种先测试接口
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
// 展示文章
function showPosts() {
    $.ajax({
        type: 'get',
        url: '/posts',
        success: function (response) {
            // console.log(response);
            var html = template('postListTpl', { data: response });
            $("#postList").html(html);
            var page = template('postPageTpl', { data: response })
            // console.log(page);
            $("#postPage").html(page);
        },
        error: function () {
            alert("获取文章列表失败");
        }
    })
}

showPosts();
// 改变页码
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page
        },
        success: function (response) {
            var html = template('postListTpl', { data: response });
            $("#postList").html(html);
            var page = template('postPageTpl', { data: response })
            // console.log(page);
            $("#postPage").html(page);
        },
        error: function () {
            alert("改变页码失败");
        }
    })
}

