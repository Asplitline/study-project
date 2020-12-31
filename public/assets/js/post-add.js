
function showPostCate() {
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            // console.log(response);
            var html = template('postCateSelectTpl', { data: response });
            $("#category").html(html);
        },
        error: function () {
            alert("获取分类失败");
        }
    })
}

showPostCate();
// ANS>> 用户未处在登录状态，导致文章上传失败
$("#postAddForm").on('submit', function () {
    var formdata = $(this).serialize();
    // alert(1231);
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formdata,
        success: function (response) {
            // console.log(response);
            location.href = "/admin/posts.html";
        },
        error: function () {
            alert("添加文章失败");
        }
    })
    return false;
})

// QUES>> 添加封面时显示有误
$("#feature").on('change', function () {
    // alert(1231);
    // console.log(this.files[0]);
    var formdata = new FormData();
    formdata.append('cover', this.files[0]);
    // console.log(formdata);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            $("#thumbnail").val(response[0].cover);
        },
        error: function () {
            alert("封面上传失败");
        }
    })
    return false;
})

