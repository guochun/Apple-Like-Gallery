(function () {

    var $gallery = $('#gallery')
    var $buttons = $('#menu>ul>li')
    var $slides = $('#slides')
    var $images = $slides.children('img')
    var imageLen = $images.length
    var currentIndex = 0
    var swipeValue = -920
    var timer = -1
    function init() {
        $.fn.extend({
            translateX: function (offset) {
                this.css({
                    transform: 'translateX(' + offset + 'px)'
                })
                return this
            }
        })
        var $firstImgClo = $images.eq(0).clone(true)
        var $lastImgClo = $images.eq(imageLen - 1).clone(true)
        $slides.append($firstImgClo)
        $slides.prepend($lastImgClo)
        $slides.translateX(swipeValue)
        registryEvent()
        autoPlay()

    }

    function registryEvent() {

        $buttons.on('click', function (e) {
            var $button = $(this);
            var index = $button.index()
            swipe(index)
        })
  
        document.addEventListener('visibilitychange', function(){
            if(document.hidden) {
                clearTimeout(timer)
            }else {
                autoPlay()
            }
        })

        $gallery.on('mouseenter', function() {
            clearTimeout(timer)
        })

        $gallery.on('mouseleave', function() {
            autoPlay()
        })


    }

    function swipe(index) {
        if (index === currentIndex) return;
        $buttons.eq(currentIndex).removeClass('active')
        $buttons.eq(index).addClass('active')
        if (currentIndex === imageLen - 1 && index === 0) {

            swipEndToStart()
        }
        else if (currentIndex === 0 && index === imageLen - 1) {

            swipStartToEnd()
           

        } else {

            $slides.translateX(swipeValue * (index + 1))

        }
        currentIndex = index
    }

    function swipeLeft() {
        var index = currentIndex - 1
        index = index < 0 ? imageLen - 1 : index;
        swipe(index)
    }

    function swipeRight() {
        index = currentIndex + 1
        index = index >= imageLen ? 0 : index;
        swipe(index)

    }

    function swipStartToEnd() {
        $slides.translateX(0).one('transitionend', function () {
            $(this).hide().offset()
            $(this).translateX(swipeValue * imageLen).show()
           
        })
    }

    function swipEndToStart() {

        $slides.translateX((imageLen + 1) * swipeValue).one('transitionend', function () {
            $(this).hide().offset()
            $(this).translateX(swipeValue).show()
        })
    }
    
    function autoPlay() {

        timer = setTimeout(function play() {
            swipeRight()
            timer = setTimeout(play,5000)
        }, 3000)
    }

    init()

})();
