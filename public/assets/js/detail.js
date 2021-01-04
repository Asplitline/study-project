
var articleId = getUrlParams('id');
var review;
showDetailPost();

function showDetailPost() {
    if (articleId != -1) {
        $.ajax({
            type: 'get',
            url: '/posts/' + articleId,
            success: function (response) {
                // console.log(response);
                var html = template("detailTpl", { data: response });
                // console.log(html);
                $('.content .article').html(html);
            },
            error: function () {
                alert("显示文章失败");
            }
        })
        // 获取配置信息
        $.ajax({
            type: 'get',
            url: '/settings',
            success: function (response) {
                // console.log(response);
                var html = template("commentTpl");
                review = response.review;
                $(".comment").html(html);
            },
            error: function () {
                alert("获取配置信息失败");
            }
        })
    }
}


$('.article').on('click', '#like', function () {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + articleId,
        success: function (response) {
            // console.log(response);
        },
        error: function () {
            alert("点赞失败");
        }

    })
})


$('.comment').on('submit', 'form', function () {
    var content = $(this).children('textarea').val();
    var state = review;
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content,
            post: articleId,
            state: state == true ? 1 : 0
        },
        success: function (response) {
            location.reload();
        },
        error: function () {
            alert('评论失败');
        }
    })
    console.log(obj);
    return false;
})