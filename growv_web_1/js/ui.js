commonInit();

$(function() {
  dimLayerControl();
  formCommon();
  toggleFunc();
  layoutCommon();
});

$(window).on("load", function() {
  mainBanner();
});

function mainBanner() {
  var bottom_banner_wrap = $(".bottom_banner_wrap");
  var header_add_obj_group = $(".header_add_obj_group");
  var footer_wrap = $(".footer_wrap");

  $(window).on("scroll", function() {
    if ($(window).width() > 1550) {
      return;
    }
    if ($(window).scrollTop() > ($(document).height() - $(window).height()) - (footer_wrap.outerHeight() / 2)) {
      header_add_obj_group.fadeOut();
    } else {
      header_add_obj_group.fadeIn();
    }
  });

  $(window).on("resize", function() {
    action();
  }).resize();

  function action() {
    if (footer_wrap.length) {
      footer_wrap.css({
        "padding-bottom": bottom_banner_wrap.outerHeight()
      });
    } else {
      /*page_wrap.css({
        "padding-bottom": bottom_banner_wrap.outerHeight()
      });*/
    }
  }
}

function layoutCommon() {
  $(".family_toggle_bar").on("click", function() {
    $(this).toggleClass("active");
    $(".family_option_list_wrap").slideToggle();
  });

  $(window).on("scroll", function() {
    if ($(window).width() < 1920) {
      if ($(this).scrollTop() === 0) {
        $(".header_add_obj_group").removeClass("active");
      } else {
        $(".header_add_obj_group").addClass("active");
      }
    }
  });
}

function toggleFunc() {
  $("[data-toggleTarget]").on("click", function() {
    $($(this).attr("data-toggleTarget")).toggle();
    console.log($(this).attr("data-toggleTarget"));
  });
}

function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }


  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

function formCommon() {
  $(document).on("change", ".form_select", function() {
    if ($(this).find("option")[0].value === 0) {
      $(this).addClass("ready");
    } else {
      $(this).removeClass("ready");
    }
  });
}


/* layer popup event */
function dimLayerControl() {
  var $modal = $(".dimlayer_z");
  if ($modal.length === 0) {
    return;
  }


  var objThis = this;
  $modal.on("click", ".btn_layerclose,.closetrigger", function(e) {

    var $this = $(this),
        $t_p = $this.parents(".dimlayer_z");
    e.preventDefault();
    objThis.dimLayerHide({
      target: $t_p
    });
    $t_p.removeClass('active');
  });
};

$(document).on('click', '.closePopComplete', function (){
  gtag('event', 'click', {
    'event_category':'신청완료',
    'event_label':'사전예약이벤트step2'
  });
  var _nasa={};
  if(window.wcs) _nasa["cnv"] = wcs.cnv("4","10"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고
  wcs_do(_nasa);
  fbq('track', 'CompleteRegistration');

  $("#marketingIframe").attr("src",  "");
  $("#compelte_popup").removeClass('active');
  $("#pop-complete").removeClass("active");
  $("#pop-complete").hide();
  fnInitSumiForm();
});
/* layer popup show */
function dimLayerShow(option) {
  var touchIs = "ontouchstart" in window,
    $modal = null,
    $target = null,
    $t_box = null,
    $page_wrap = null,
    $fullpop_item = null,
    $fullpop_titlow = null,
    $fullpop_contlow = null,
    $page_wrap = null;

  $(function() {
    $modal = $(".dimlayer_z");

    $target = $(option.target);
    $t_box = $target.find(".norpop_modal");
    $t_box_cont = $target.find(".layer_cont");
    $page_wrap = $(".page_wrap");


    if ($modal.length === 0) {
      return;
    }
    $modal.removeClass("active");
    $target.addClass("active");

    var boxzoneHeight = $t_box.outerHeight();
    $t_box.css({
      "top": 0
    });


    $page_wrap.css({
      "z-index": 0
    });
    $page_wrap.append($target);
    heightcheck();


    normalCont();

    if ($target.hasClass("fulltype")) {
      $fullpop_titlow = $target.find(".fullpop_titlow");
      $fullpop_contlow = $target.find(".fullpop_contlow");
      $fullpop_item = $target.find(".fullpop_item");
    }

    if ("openCallback" in option) {
      option.openCallback();
    }

    function heightcheck() {
      if (touchIs) {
        if (option.scrollCheck == undefined) {
          $("body").data("data-scr", $(window).scrollTop()).css({
            "margin-top": -$(window).scrollTop()
          }).append($target);
        }
        $("html").addClass("touchDis");
      } else {
        normalCont();
      }
    }
    var $windowWid = 0;
    $(window).on("resize", function() {
      if ($windowWid == $(window).width() && touchIs) {
        return;
      }
      normalCont();
      $windowWid = $(window).width();
    });


    function normalCont() {
      boxzoneHeight = $t_box.outerHeight();
      if (boxzoneHeight > $(window).height()) {
        $("html").addClass("touchDis2");
        $target.addClass("atype2");
      } else {
        $target.removeClass("atype2");
      }
    }
  });
};
/* layer popup hide */
function dimLayerHide(option) {
  var touchIs = "ontouchstart" in window,
    $modal = null,
    $target = null,
    $t_box = null;

  $(function() {
    $modal = $(".dimlayer_z");

    $target = $(option.target);
    $t_box = $target.find(".layer_box");
    $t_td = $target.find(".dimlayer_td");
    $t_tpt = parseInt($t_td.css("padding-top"));
    $t_tpb = parseInt($t_td.css("padding-bottom"));

    if ($modal.length === 0) {
      return;
    }
    var boxzoneHeight = $t_box.outerHeight() + $t_tpt + $t_tpb;
    var varheight = 0;

    if (boxzoneHeight > $(window).height()) {
      varheight = boxzoneHeight;
    } else {
      varheight = $(window).height();
    }

    $target.removeClass("active");
    $(".page_wrap").css({
      "z-index": ""
    });
    $("html,body").removeClass("touchDis touchDis2");
    scrollEnd();

    if ("closeCallback" in option) {
      option.closeCallback();
    }

    function scrollEnd() {
      if (touchIs) {
        $("body").css({
          "margin-top": 0
        });
        window.scrollTo(0, Number($("body").data("data-scr")));
      }
    }
  });
  $('body').css('overflow','auto');
}