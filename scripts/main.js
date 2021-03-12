(function() {
    const openItem = item => {
        const container = item.closest(".team__item");
        const contentBlock = container.find(".team__content");
        const textBlock = contentBlock.find(".team__content-block");
        const reqHeight = textBlock.height();

        container.addClass("active");
        contentBlock.height(reqHeight);
    }

    const closeEveryItem = container => {
        const items = container.find('.team__content');
        const itemContainer = container.find(".team__item");

        itemContainer.removeClass("active");
        items.height(0);
    }

    $('.team__title').click(e => {
        const $this = $(e.currentTarget);
        const container = $this.closest(".team");
        const elemContainer = $this.closest(".team__item");

        if (elemContainer.hasClass("active")) {
            closeEveryItem(container);
        } else {
            closeEveryItem(container);
            openItem($this);
        }
    });

    const isMobile = window.matchMedia("(max-width: 480px)").matches;

    const calculateWidth = (item) => {
        let reqItemWidth = 0;

        const screenWidth = $(window).width();
        const container = item.closest(".menu-acco");
        const titlesBlocks = container.find(".menu-acco__trigger");
        const titlesWidth = titlesBlocks.width() * titlesBlocks.length;
        const maxWidth = 524;

        const textContainer = item.find(".menu-acco__container");

        const isTablets = window.matchMedia("(max-width: 768px)").matches;

        const isMobile = window.matchMedia("(max-width: 480px)").matches;

        if (isMobile) {
            reqItemWidth = screenWidth;
        } else if (isTablets) {
            reqItemWidth = screenWidth - titlesWidth;
        } else {
            reqItemWidth = maxWidth;
        }

        return {
            container: reqItemWidth,
            textContainer: reqItemWidth
        }
    };

    const openItemAcco = (item) => {
        const hiddenContent = item.find(".menu-acco__content");
        const reqWidth = calculateWidth(item);
        const textBlock = item.find(".menu-acco__container");

        item.addClass("active");
        hiddenContent.width(reqWidth.container);
        textBlock.width(reqWidth.textContainer);
    };

    const closeEveryItemInContainer = (container) => {
        const items = container.find(".menu-acco__item");
        const content = container.find(".menu-acco__content");

        items.removeClass("active");
        content.width(0);
    };

    const isMobileAcco = window.matchMedia("(max-width: 480px)").matches;

    if (isMobileAcco) {
        $(".menu-acco--trigger .menu-acco__trigger").on("click", e => {
            e.preventDefault();

            const $this = $(e.currentTarget);
            const item = $this.closest(".menu-acco__item");
            const itemNdx = item.index();

            const itemToOpen = $(".menu-acco--content .menu-acco__item").eq(itemNdx);

            item.addClass("hidden");
            openItemAcco(itemToOpen);
        });

        $(".menu-acco--content .menu-acco__trigger").on("click", e => {
            e.preventDefault();

            $(".menu-acco--trigger .menu-acco__item").removeClass("hidden");
            closeEveryItemInContainer($(".menu-acco--content"));
        });
    } else {
        $(".menu-acco__trigger").on("click", e => {
            e.preventDefault();

            const $this = $(e.currentTarget);
            const item = $this.closest(".menu-acco__item");
            const itemOpened = item.hasClass("active");
            const container = $this.closest(".menu-acco");

            if (itemOpened) {
                closeEveryItemInContainer(container);
            } else {
                closeEveryItemInContainer(container);
                openItemAcco(item);
            }
        });
    }

})();
(function() {
    const btn = document.getElementById('hamburger');

    btn.addEventListener('click', () => {
        const modal = document.getElementById('menu');
        modal.classList.add('modal_active');
    });



    const close = document.getElementById('modal__close');

    close.addEventListener('click', () => {
        const modal = document.getElementById('menu');
        modal.classList.remove('modal_active');
    });

    const closeModal = document.querySelectorAll('.modal-menu__link');

    closeModal.forEach((item) => {
        item.addEventListener('click', () => {
            const modal = document.getElementById('menu');
            modal.classList.remove('modal_active');
        });
    })

    const phone = document.querySelector('#phone');

    phone.addEventListener('keydown', function(event) {
        let isDigit = false;
        let isDash = false;
        let isControl = false;

        if (event.key >= 0 || event.key <= 9) {
            isDigit = true;
        }

        if (event.key == '-') {
            isDash = true;
        }

        if (event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace') {
            isControl = true;
        }

        if (!isDigit && !isDash && !isControl) {
            event.preventDefault();
        }
    });


    function validateForm(form) {
        let valid = true;

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.phone)) {
            valid = false;
        }

        if (!validateField(form.elements.comment)) {
            valid = false;
        }

        return valid;
    }

    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
    }
})();
(function() {
    let myMap;

    const init = () => {
        myMap = new ymaps.Map("map", {
            center: [55.75, 37.60],
            zoom: 14,
            controls: []
        });

        const coords = [
            [55.743455, 37.583656],
            [55.755799, 37.584804],
            [55.747812, 37.606940],
            [55.755103, 37.625051],
        ];

        const myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: './img/icons/marker.png',
            iconImageSize: [58, 73],
            iconImageOffset: [-3, -42]
        });

        coords.forEach(coord => {
            myCollection.add(new ymaps.Placemark(coord));
        });

        myMap.geoObjects.add(myCollection);

        myMap.behaviors.disable('scrollZoom');
    }

    ymaps.ready(init);
})();
(function() {
    const validateFields = (form, fieldsArray) => {
        fieldsArray.forEach((field) => {
            field.removeClass("input-error");
            if (field.val().trim() == "") {
                field.addClass("input-error");
            }
        });

        const errorFields = form.find(".input-error");

        return errorFields.length == 0;
    }

    $(".form").submit(e => {
        e.preventDefault();

        const form = $(e.currentTarget);
        const name = form.find("[name='name']");
        const phone = form.find("[name='phone']");
        const comment = form.find("[name='comment']");
        const to = form.find("[name='to']");

        const isValid = validateFields(form, [name, phone, comment, to])

        const modalForm = $("#modal-form");
        const content = modalForm.find(".modal-form__content");

        modalForm.removeClass("error-modal");

        if (isValid) {
            const request = $.ajax({
                url: "https://webdev-api.loftschool.com/sendmail",
                method: "post",
                data: {
                    name: name.val(),
                    phone: phone.val(),
                    comment: comment.val(),
                    to: to.val(),
                },
            });

            request.done(data => {
                content.text(data.message);
            });

            request.fail(data => {
                const message = data.responseJSON.message;
                content.text(message);
                modalForm.addClass("error-modal");
            });

            request.always(() => {
                $.fancybox.open({
                    src: "#modal-form",
                    type: "inline",
                });
            });
        }

    });


    $(".app-close-modal").click(e => {
        e.preventDefault();

        $.fancybox.close();
        form.reset();
    })
})();
(function() {
    const sections = $("section");
    const display = $(".maincontent");
    const sideMenu = $(".fixed-menu");
    const menuItems = sideMenu.find(".fixed-menu__item");

    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();

    let inScroll = false;

    sections.first().addClass("active");

    const countSectionPosition = sectionEq => {
        const position = sectionEq * -100;

        if (isNaN(position)) {
            console.error("передано не верное значение в countSectionPosition");
            return 0;

        }
        return position;
    }

    const changeMenuThemeForSection = sectionEq => {
        const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr("data-sidemenu-theme");
        const activeClass = "fixed-menu--shadowed";

        if (menuTheme == "black") {
            sideMenu.addClass(activeClass);
        } else {
            sideMenu.removeClass(activeClass);
        }
    };

    const resetActiveClassForItem = (items, itemEq, activeClass) => {
        items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
    }

    const performTransition = sectionEq => {
        if (inScroll) return;

        const transitionOver = 1000;
        const mouseInertiaOver = 300;

        inScroll = true;

        const position = countSectionPosition(sectionEq);

        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });

        resetActiveClassForItem(sections, sectionEq, "active");

        setTimeout(() => {
            inScroll = false;
            resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
        }, transitionOver + mouseInertiaOver);
    };

    const viewportScroller = () => {
        const activeSection = sections.filter(".active");
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();

        return {
            next() {
                if (nextSection.length) {
                    performTransition(nextSection.index())
                }
            },
            prev() {
                if (prevSection.length) {
                    performTransition(prevSection.index())
                }
            },
        };
    };

    $(window).on("wheel", e => {
        const deltaY = e.originalEvent.deltaY;
        const scroller = viewportScroller();

        if (deltaY > 0) {
            scroller.next();
        }

        if (deltaY < 0) {
            scroller.prev();
        }

    });

    $(window).on("keydown", e => {
        const tagName = e.target.tagName.toLowerCase();
        const userTypingInInputs = tagName == "input" || tagName == "textarea";
        const scroller = viewportScroller();

        if (userTypingInInputs) return;

        switch (e.keyCode) {
            case 38:
                scroller.prev();
                break;

            case 40:
                scroller.next();
                break;
        }
    });

    $(".wrapper").on("touchmove", e => e.preventDefault());

    $("[data-scroll-to").click(e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr("data-scroll-to");
        const reqSection = $(`[data-section-id=${target}]`);

        performTransition(reqSection.index());
    });

    if (isMobile) {
        // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

        $("body").swipe({
            swipe: function(event, direction) {
                const scroller = viewportScroller();
                let scrollDirection = "";

                if (direction == "up") scrollDirection = "next";
                if (direction == "down") scrollDirection = "prev";

                scroller[scrollDirection]();
            }
        });
    }
})();
let player;
const playerContainer = $('.player');

let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

        if (playerContainer.hasClass('paused')) {
            player.pauseVideo()
        } else {
            player.playVideo();
        }
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = (e.originalEvent.layerX);
        console.log(clickedPosition);
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);

    });

    $(".player__splash").click(e => {
        player.playVideo();
    });
};

const formatTime = timeSec => {
    const round = Math.round(timeSec);

    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime - minutes * 60;

    return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    if (typeof interval != "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        })
    }, 1000)

}

const onPlayerStateChange = event => {
    /* 
        -1 – воспроизведение видео не началось
        0 – воспроизведение видео завершено
        1 – воспроизведение
        2 – пауза
        3 – буферизация
        5 – видео находится в очереди
    */
    switch (event.data) {
        case 1:
            playerContainer.addClass('active');
            playerContainer.addClass("paused");
            $('#play').css("display", "none");
            $('#pause').css("display", "block");
            break;

        case 2:
            playerContainer.removeClass('active');
            playerContainer.removeClass("paused");
            $('#pause').css("display", "none");
            $('#play').css("display", "block");
            break;
    }
};

let dimensions = {
    height: "390",
    width: "660"
};

const isTablets = window.matchMedia("(max-width: 768px)").matches;
const isMobile = window.matchMedia("(max-width: 480px)").matches;

if (isTablets) {
    dimensions = {
        height: "351",
        width: "594"
    }
}

if (isMobile) {
    dimensions = {
        height: "233",
        width: "394"
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        ...dimensions,
        videoId: 'k_uIaRPaZEs',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showInfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0,
        }
    });
}

eventsInit();

let soundControl;
let soundLevel;

$().ready(function() {
    initVars();
    soundControl.min = 0;
    soundControl.max = 100;
    soundControl.value = soundControl.max;
});

function initVars() {
    player = document.getElementById('yt-player');
    soundControl = document.getElementById('micLevel');
}

$('#mic').on('click', function() {
    if (player.isMuted()) {
        soundControl.value = soundLevel * 100;
        player.unMute();
    } else {
        soundControl.value = 0;
        player.mute();
    }
});

$('#micLevel').on('change', function() {
    player.setVolume($(this).val());
});;
$('.slider__list').bxSlider({

});;
(function() {
    const findBlockByAlias = (alias) => {
        return $(".reviews__item").filter((ndx, item) => {
            return $(item).attr("data-linked-with") == alias;
        });
    };

    $(".interactive-avatar__link").click((e) => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr("data-open");
        const itemToShow = findBlockByAlias(target);
        const curItem = $this.closest(".interactive-avatar");

        itemToShow.addClass("active").siblings().removeClass("active");
        curItem.addClass("active").siblings().removeClass("active");
    });
})()