

$('#psdForm').on('submit', function () {

    var formdata = $(this).serialize();
    // alert(formdata);
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formdata,
        success:function(response){
            location.href ="/admin/login.html";
        },
        error:function(){
            alert("密码修改失败");
        }
    })
    return false;
})