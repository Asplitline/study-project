
function showSLides() {

    $.ajax({
        type: 'get',
        url: '/slides',
        success: function (response) {
            var html = template('slidesTpl', { data: response });
            $("#slideList").html(html);

        },
        error: function () {
            alert("获取轮播图列表失败");
        }

    })

}

showSLides();

$('#addSlideForm').on('submit', function () {
    var formdata = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formdata,
        success: function (response) {
            console.log(response);
            location.reload();
        },
        error: function () {
            alert('添加轮播图失败');
        }
    })
    return false;
})

// 上传轮播图

$("#slideImg").on("change", function () {
    // console.log(this.files[0]);
    var formdata = new FormData();
    formdata.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response[0].avatar);
            $("#sliderImgPath").val(response[0].avatar)
        },
        error: function () {
            alert("添加轮播失败");
        }
    })
    return false;
})


// 删除轮播图

$("#slideList").on("click", ".delete", function () {
    if (confirm("确定要删除轮播图吗?")) {
        var id = $(this).attr("data-id");
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload();
            },
            error: function () {
                alert("删除轮播图失败");
            }
        })
    }
    return false;
})