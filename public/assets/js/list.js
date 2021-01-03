
showCatePost();

function showCatePost() {
    var id = getUrlParams('id');
    // alert(id);
    if (id != -1) {
        $.ajax({
            type: 'get',
            url: '/posts/category/' + id,
            success: function (response) {
                response.cateName = response[0].category.title;
                var html = template('listTpl', { data: response });
                // console.log(html);
                $('.content .new').html(html);
            },
            error: function () {
                alert("分类获取列表失败");
            }   
        })
    }
}
