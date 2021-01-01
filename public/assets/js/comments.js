

function createComment() {
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: 'test3333333',
            post: '5fede0efb84a2e46d4da7481',
            state: 0,
        },
        success: function () {
            alert('ok');
        },
        error: function () {
            alert('no');
        }
    })
}

// createComment();

function showComments() {
    // 渲染评论
    $.ajax({
        type: 'get',
        url: '/comments',
        success: function (response) {
            // console.log(response);
            var html = template('commentsTpl', { data: response });
            $("#commentList").html(html);
            var page = template('commentPageTpl', response);
            $("#commentPage").html(page);
        },
        error: function () {
            alert("显示评论失败");
        }
    })
}

showComments();
function changePage(id) {
    // alert(id);
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: id
        },
        success: function (response) {
            var html = template('commentsTpl', { data: response });
            $("#commentList").html(html);
            var page = template('commentPageTpl', response);
            $("#commentPage").html(page);
        },
        error: function () {
            alert("切换页码失败");
        }
    })
}


$("#commentList").on("click", ".verify", function () {
    var id = $(this).attr('data-id');
    var state = $(this).attr('data-state');
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function (response) {
            location.reload();
        },
        error: function () {
            alert("更改评论状态失败");
        }
    })
    return false;
})
// QUES>> 在第二页删除用户后,不应该跳回第一页
$("#commentList").on("click", ".delete", function () {
    if (confirm("你确定要删除评论吗?")) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function (response) {
                // console.log(response);
                location.reload();
            },
            error: function () {
                alert("删除评论失败");
            }
        })
    }
    return false;
})


