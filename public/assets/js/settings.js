
// QUES>> 使用serialize有问题，无法改变checked value值
$('#webSetting').on('submit', function () {
    // alert($(this).serialize());
    var title = $('#settingTitle').val();
    var logo = $('#settingLogo').val();
    var comment = $('#settingComment').prop("checked");
    var review = $('#settingReview').prop("checked");
    $.ajax({
        type: 'post',
        url: '/settings',
        data: {
            title,
            logo,
            comment,
            review,
        },
        success: function (response) {
            // console.log(response);
            alert('修改成功');
        },
        error: function () {
            alert("设置网站失败");
        }
    })
    return false;
})

function showSetting() {
    $.ajax({
        type: 'get',
        url: '/settings',
        success: function (response) {
            console.log(response);
            $('#settingTitle').val(response.title);
            $('#preViewLogo').attr('src', response.logo);
            // $('#settingComment').val(response.comment);
            $('#settingComment').prop("checked", response.comment);
            // $('#settingReview').val(response.review);
            $('#settingReview').prop("checked", response.review);
        },
        error: function () {
            alert("获取网站配置失败");
        }
    })
}

showSetting();


// 上传logo

$("#logoFile").on('change', function () {
    var formdata = new FormData();
    formdata.append('logo', this.files[0]);
    // alert(2131);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#preViewLogo').attr('src', response[0].logo);
            $('#settingLogo').val(response[0].logo);
        },
        error: function () {
            alert("修改网站logo失败");
        }
    })
    return false;
})