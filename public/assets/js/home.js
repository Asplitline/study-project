
// QUES>> 图片显示应该处理
function showIndex() {
    $.ajax({
        type: 'get',
        url: '/slides',
        success: function (response) {
            // console.log(response);
            var html = template('indexSlideTpl', { data: response });
            // console.log(html);
            $('.swipe-wrapper').html(html);
            showSlide();
        },
        error: function () {
            alert('展示轮播图失败')
        }
    })
    $.ajax({
        type: 'get',
        url: '/posts/lasted',
        success: function (response) {
            // console.log(response);
            var html = template('indexNewPostTpl', { data: response });
            // console.log(html);
            $(".content .new").html(html);
        },
        error: function () {
            alert("最新文章显示失败");
        }
    })
}

showIndex();

function showSlide() {
    // 
    var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 3000,
        transitionEnd: function (index) {
            // index++;
            $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
        }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
        var _this = $(this);

        if (_this.is('.prev')) {
            swiper.prev();
        } else if (_this.is('.next')) {
            swiper.next();
        }
    })
}