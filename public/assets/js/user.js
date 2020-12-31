
function showUsers() {
    $.ajax({
        url: '/users',
        type: 'get',
        success: function (response) {
            // console.log(response);
            var html = template('userTpl', { data: response });
            // console.log(html);
            $('#userList').html(html);
        },
        error: function () {
            console.log("获取列表失败");
            // alert("")
        }
    })
}


showUsers();

$("#userForm").on("submit", function () {
    var userinfo = $(this).serialize();
    $.ajax({
        url: '/users',
        type: 'post',
        data: userinfo,
        success: function (response) {
            // console.log(respose);
            location.reload();
        },
        error: function (err) {
            alert("用户添加失败");
        }
    })
    return false;
})

// QUES>> 每次选择都会上传文件
$("#formBox").on("change", "#avatar", function () {
    var formdata = new FormData();
    // console.log(this.files[0]);
    formdata.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        processData: false, // 不要解析参数
        contentType: false, // 不设值请求参数类型
        success: function (response) {
            console.log(response);
            $('#preView').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        },
        error: function () {
            alert("图片上传失败");
        }
    })
})

$("#userList").on("click", ".edit", function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl', { data: response });
            $("#formBox").html(html);

        },
        error: function () {
            alert("获取用户失败");
        }
    })
})

$("#userList").on("click", ".delete", function () {
    // alert($(this).attr('data-id'));
    var id = $(this).attr('data-id');
    if (confirm('确认删除用户')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                console.log(response);
                location.reload();
            },
            error: function () {
                alert("删除用户失败");
            }
        })
    }

})

// 用户修改
$('#formBox').on('submit', "#userModify", function () {
    var id = $(this).attr('data-id');
    var formdata = $(this).serialize();
    // console.log(formdata);
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formdata,
        success: function (response) {
            // console.log(response);
            location.reload();
        },
        error: function () {
            alert("用户修改失败");
        }
    })
    return false;
})

var userList = $("#userList");
var checkAll = $("#checkAll");
var deleteUsers = $("#deleteUsers");

// 全选
checkAll.on("change", function () {
    var status = $(this).prop("checked");
    userList.find("input").prop("checked", status);
    if (status == true) {
        deleteUsers.show();
    } else {
        deleteUsers.hide();
    }
})

// 单选

userList.on("change", "#checkOne", function () {
    var ipts = userList.find("input");
    var iptsFilter = ipts.filter(":checked");
    // filter 选择符合条件的元素集合
    if (ipts.length == iptsFilter.length) {
        // alert("全选状态");
        checkAll.prop("checked", true);
    } else {
        checkAll.prop("checked", false);
        // alert("不是全选状态");
    }
    if (iptsFilter.length > 0) {
        deleteUsers.show();
    } else {
        deleteUsers.hide();
    }
})

// QUES>> 删除用户后,文件还在
deleteUsers.on('click', function () {
    if (confirm("你确定要删除这么多用户")) {
        var arr = userList.find('input').filter(":checked");
        var ids = [];
        // each 遍历一个jQuery对象，为每个匹配元素执行一个函数
        arr.each((index, element) => {
            // console.log(element);
            ids.push($(element).attr('data-id'));
        });
        // for (const val in arr) {
        //     console.log(val.dataset.id);
        // }
        ids = ids.join('-');
        $.ajax({
            type: 'delete',
            url: '/users/' + ids,
            success: function (response) {
                location.reload();
            },
            error: function () {
                alert('批量删除用户失败');
            }
        })
    }

})

