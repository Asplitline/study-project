var keys = getUrlParams('keys');
console.log(keys);
if (keys != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/search/' + keys,
        success: function (response) {
            // console.log(response);
            response.keys = keys;
            var html = template('searchTpl', { data: response });
            // console.log(html);
            $(".content .new").html(html);
        },
        error: function () {
            alert("搜索文章失败");
        }
    })
}
