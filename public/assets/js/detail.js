var articleId = getUrlParams('id');
showDetailPost();

function showDetailPost() {
    if (articleId != -1) {
        $.ajax({
            type: 'get',
            url: '/posts/' + articleId,
            success: function (response) {
                console.log(response);
                var html = template("detailTpl", { data: response });
                // console.log(html);
                $('.content .article').html(html);
            },
            error: function () {
                alert("显示文章失败");
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