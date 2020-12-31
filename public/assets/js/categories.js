//显示分类
function showCateList() {
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            console.log(response);
            var html = template('cateListTpl', { data: response });
            // console.log(html);
            $("#cateList").html(html);
        },
        error: function () {
            alert("获取分类列表失败")
        }
    })
}

showCateList();
// QUES>> 无刷新更新数据
// 添加分类
$("#cateAddForm").on('submit', function () {

    var formdata = $(this).serialize();
    // alert(formdata);
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formdata,
        success: function (response) {
            console.log(response);
            location.reload();
        },
        error: function () {
            alert('添加分类失败');
        }

    })
    return false;
})

// 编辑分类 
// QUES>> 分类处理不合理,使用的类名,应该用图片
$('#cateList').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            var html = template('cateModifyTpl', { data: response });
            $("#cateForm").html(html);
        },
        error: function () {
            alert("编辑分类失败");
        }
    })
})

// 提交分类
$('#cateForm').on('submit', "#cateModifyForm", function () {
    var formdata = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formdata,
        success: function (response) {
            // console.log(response);
            location.reload();
        },
        error: function () {
            alert("分类修改失败");
        }
    }
    )
    return false;
})
// 删除分类
$('#cateList').on('click', '.delete', function () {
    // alert($(this).attr('data-id'));
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/categories/' + id,
        success: function (response) {
            // console.log();
            location.reload();
        },
        error: function () {
            alert("删除分类失败");
        }
    })
})




