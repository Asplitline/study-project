showRecommend();
function showRecommend() {
    $.ajax({
        type: 'get',
        url: '/posts/recommend',
        success: function (response) {
            var recommendHotTpl = `
            {{each data}}
            <li>
              <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="{{$value.title}}">
                <span>{{$value.title}}</span>
              </a>
            </li>
            {{/each}}
            `;
            var html = template.render(recommendHotTpl, { data: response });
            $(".hots>ul").html(html);
        },
        error: function () {
            alert("展示热门推荐失败");
        }
    })
}

showRandArticle();
function showRandArticle() {
    $.ajax({
        type: 'get',
        url: '/posts/random',
        success: function (response) {
            var randArticleTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
                </a>
            </li>
            {{/each}}
            `;
            var html = template.render(randArticleTpl, { data: response });
            $(".widgets>.random").html(html);
        },
        error: function () {
            alert("获取随机文章失败");
        }
    })
}

showNewComment();
function showNewComment() {
    $.ajax({
        type: 'get',
        url: '/comments/lasted',
        success: function (response) {
            // console.log(response);
            var newCommentTpl = `
            {{each data}}
            <li>
                <a href="javascript:;">
                <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                    <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                </div>
                </a>
            </li>
            {{/each}}
            `;
            var html = template.render(newCommentTpl, { data: response });
            // console.log(html);
            $(".widgets .discuz").html(html);
        },
        error: function () {
            alert("获取最新评论失败");
        }
    })
}

showCateGory();
function showCateGory() {
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            var categoryTpl = `
                {{each data}}
                <li><a href="list.html?id={{$value._id}}"><i class="{{$value.className}}"></i>{{$value.title}}</a></li>
                {{/each}}
            `;
            var html = template.render(categoryTpl, { data: response });
            // console.log(html);
            $('#category').html(html);
            $('#topcategory').html(html);
        },
        error: function () {
            alert("获取分类列表");
        }
    })

}

function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}


function getUrlParams(key) {
    var params = location.search.substr(1).split('&');
    for (let i = 0; i < params.length; i++) {
        let param = params[i].split("=");
        if (param[0] == key)
            return param[1];
    }
    return -1;
}