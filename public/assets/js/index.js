
//  文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (response) {
        $("#postCount").html(`<strong>${response.postCount}</strong>篇文章(<strong>${response.draftCount}</strong>篇草稿)`);
    }
})
//  分类数量

$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function (response) {
        $("#cateCount").html(`<strong>${response.categoryCount}</strong>个分类`);
    }
})

//  评论数量

$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function (response) {
        // console.log(response);
        // QUES>> 服务器端只能返回数量
        $("#commentCount").html(`<strong>${response.commentCount}</strong>条评论(<strong>1</strong>条待审核)`);
    }
})