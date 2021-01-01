// 展示文章
// QUES>> 分类应该提取成公共部分
function showPosts() {
    // 展示文章
    $.ajax({
        type: 'get',
        url: '/posts',
        success: function (response) {
            console.log(response);
            var html = template('postListTpl', { data: response });
            $("#postList").html(html);
            var page = template('postPageTpl', { data: response })
            $("#postPage").html(page);
        },
        error: function () {
            alert("获取文章列表失败");
        }
    })
    // 展示分类
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            var html = template('postCateTpl', { data: response });
            $("#postCate").html(html);
        },
        error: function () {
            // 获取分类失败
            alert("文章分类显示失败");
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
            $("#postPage").html(page);
        },
        error: function () {
            alert("改变页码失败");
        }
    })
}

// QUES>> 筛选有问题,全部列表无法显示
// QUES>> 文章类别，分页，分类。3个条件能不能整合
$("#postFilter").on("submit", function () {
    var formdata = $(this).serialize();
    // console.log(formdata);
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formdata,
        success: function (response) {
            console.log(response);
            var html = template('postListTpl', { data: response });
            $('#postList').html(html);
            var page = template('postPageTpl', { data: response });
            $('#postPage').html(page);
        },
        error: function () {
            alert("筛选文章失败");
        }

    })
    return false;
})

// 文章删除
$("#postList").on('click', '.delete', function () {
    if (confirm("确定要删除文章?")) {
        var id = $(this).attr("data-id");
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function (response) {
                // console.log(response);
                location.reload();
            },
            error: function () {
                alert("文章删除失败")
            }
        })
    }
    return false;
})