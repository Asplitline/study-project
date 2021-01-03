
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
$("#postForm").on('change', '#feature', function () {
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
            console.log(response);
            $("#thumbnail").val(response[0].cover);
        },
        error: function () {
            alert("封面上传失败");
        }
    })
    return false;
})



var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    response.categories = categories;
                    // console.log(response);
                    var html = template('editPostTpl', { data: response });
                    // console.log(html);
                    $("#postForm").html(html);
                },
                error: function () {
                    alert("修改文章渲染失败")
                }
            })
        },
        error: function () {
            alert("修改文章获取失败");
        }
    })
}


// #QUES>> 未考虑传图片的情况

$('#postForm').on('submit', '#editPostForm', function () {
    var formdata = $(this).serialize();
    // alert(formdata);
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formdata,
        success: function (response) {
            console.log(response);
            location.href = "/admin/posts.html";
        },
        error: function () {
            alert("文章修改失败");
        }
    })
    return false;
})