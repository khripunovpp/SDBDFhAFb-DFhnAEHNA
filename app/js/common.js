$.fn.isOnScreen = function(shift) {
    if (!shift) {
        shift = 0;
    }
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top + shift;
    bounds.bottom = bounds.top + this.outerHeight() - shift;
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

var _bxInnit = function(elem, opt) {

    if (!$(elem).length) return false;

    var defaultOptions = {
        view: 'all'
    }
    var currentOpt = $.extend(defaultOptions, opt);
    var init = {
        breakPoint: 992,
        sliderActive: false,
        initBreakpoint: null,
        resizeBreakpointMore: null,
        resizeBreakpointLess: null,
        windowWidht: window.innerWidth
    }


    var flag = false;

    var slider;


    var sliderClone = $(elem).clone();


    // Объект с параметрами для слайдера
    var options = opt;

    // Создаем слайдер
    function createSlider() {
        slider = $(elem).bxSlider(options);
        return true;
    }

    if (flag) {
        createSlider();
        init.sliderActive = true;
    }


    function createBreakpoints() {
        switch (currentOpt.view) {
            case 'mobile':
                init.initBreakpoint = init.windowWidht < init.breakPoint;
                init.resizeBreakpointMore = init.windowWidht >= init.breakPoint;
                init.resizeBreakpointLess = init.windowWidht < init.breakPoint;
                break;

            case 'desktop':
                init.initBreakpoint = init.windowWidht >= init.breakPoint;
                init.resizeBreakpointMore = init.windowWidht < init.breakPoint;
                init.resizeBreakpointLess = init.windowWidht >= init.breakPoint;
                init.resizeBreakpointLess;
                break;

            case 'all':
                init.initBreakpoint = true;
                init.resizeBreakpointMore = false;
                init.resizeBreakpointLess = false;
                break;
        }
    }

    createBreakpoints();


    // Загрузка страницы
    if (init.initBreakpoint) {
        createSlider();
        init.sliderActive = true;
    }
    // Отслеживаем события при ресайзе

    $(window).resize(function() {
        // Если окно больше или равено breakPoint
        // Вырубаем слайдер и ставим ФЛАГ в false
        // Вставляем начальный вариант html разметки (без лишнего кода от слайдера)
        init.windowWidht = window.innerWidth;

        createBreakpoints();

        if (init.resizeBreakpointMore) {
            if (init.sliderActive) {
                slider.destroySlider();
                init.sliderActive = false;
                slider.replaceWith(sliderClone.clone());
            }
        }

        // Если окно меньше breakPoint
        // Вырубаем слайдер и ставим ФЛАГ в true
        if (init.resizeBreakpointLess) {
            if (!init.sliderActive) {
                createSlider();
                init.sliderActive = true;
            }
        }
    });

    var a, b;
    a = 1;
    b = 0;

    $(window).on('scroll', function() {
        if (init.sliderActive == true) {
            if (slider.isOnScreen()) {
                b = 1;
            } else {
                b = 0;
            }

            if (a == b) {
                slider.startAuto();
            } else {
                slider.stopAuto();
            }
        }

    });

    return slider;
}

var parallax = function() {
    $(window).on('scroll', function() {
        var st = $(this).scrollTop();
        $('.js-parallax').each(function() {
            var speed = $(this).data('speed') || 10,
                shift = st / speed;
            $(this).css({
                "transform": "translate(0%, " + shift + "%"
            })
        });
    });
}

var scrollDetection = function() {

    $('.js-scroll-detection').each(function() {
        var that = this;
        var shift = $(that).data('scroll-shift') || 20;

        if ($(that).isOnScreen(shift)) {
            $(that).addClass('js-isonscreen');
        }
    });

}

$(function() {

    parallax()

    scrollDetection();

    $(window).on('scroll', function() {
        scrollDetection();
    });

    var reasonsSlider = _bxInnit('.b-reasons__list', {
        view: 'mobile',
        adaptiveHeight: true,
        swipeThreshold: 40,
        controls: false,
        pager: true,
        auto: true,
        pause: 10000,
        autoHover: true,
        infiniteLoop: true,
        slideMargin: 3
    });

    $('.b-reasons__next').on('click', function(event) {
        event.preventDefault();
        reasonsSlider.goToNextSlide()
    });


});