/*  ---------------------------------------------------
  Template Name: Dreams
  Description:  Dreams Car Driving HTML Template
  Author: Colorlib
  Author URI: https://colorlib.com
  Version: 1.0
  Created: Colorlib
---------------------------------------------------------  */

"use strict";
(function ($) {
  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").fadeOut("slow");
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  //Canvas Menu
  $(".canvas__open").on("click", function () {
    $(".offcanvas-menu-wrapper").addClass("active");
    $(".offcanvas-menu-overlay").addClass("active");
  });

  $(".offcanvas-menu-overlay").on("click", function () {
    $(".offcanvas-menu-wrapper").removeClass("active");
    $(".offcanvas-menu-overlay").removeClass("active");
  });

  //Search Switch
  $(".search-switch").on("click", function () {
    $(".search-model").fadeIn(400);
  });

  $(".search-close-switch").on("click", function () {
    $(".search-model").fadeOut(400, function () {
      $("#search-input").val("");
    });
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*------------------
        Accordin Active
    --------------------*/
  $(".collapse").on("shown.bs.collapse", function () {
    $(this).prev().addClass("active");
  });

  $(".collapse").on("hidden.bs.collapse", function () {
    $(this).prev().removeClass("active");
  });

  /*--------------------------
        Testimonial Slider
    ----------------------------*/
  var testimonialSlider = $(".testimonial__slider");
  testimonialSlider.owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    dots: true,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: false,
  });

  /*------------------
		Magnific
	--------------------*/
  $(".video-popup").magnificPopup({
    type: "iframe",
  });

  /*--------------------------
        Select
    ----------------------------*/
  $("select").niceSelect();

  /*--------------------------
        Datepicker
    ----------------------------*/
  $(".datepicker_pop").datepicker();
  // ----------------
  // ----------------
  var a = 0;
  $(window).scroll(function () {
    var oTop = $("#counter").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $(".counter-value").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 7000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            },
          }
        );
      });
      a = 1;
    }
  });
})(jQuery);
