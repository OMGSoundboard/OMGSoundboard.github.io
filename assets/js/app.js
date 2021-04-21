(function($) {
    "use strict";
    /* owl-carousel */
    if ((".banner-slider").length > 0) {
        $(".banner-slider").owlCarousel({
            autoplay: true,
            dots: false,
            nav: true, 
            loop: true,
            margin: 30,
            lazyLoad: true,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }
    /* highlight js */
    if (('pre code').length > 0) {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
    /* slimmenu */

    if (('.main-menu').length > 0) {
        $('.main-menu').slimmenu({
			resizeWidth: "991",
			animSpeed:500,
            easingEffect: 'easeOutElastic',
			
		});


    }  
	/* testimonial slider */

    if (('.testimonial-slider').length > 0) {
       $('.testimonial-slider').owlCarousel({
			thumbs: true,
			thumbsPrerendered: true,
			autoplay: true,
            dots: false,
            mouseDrag:false, 
			stagePadding:30,
			margin:60,
            loop: false,
            lazyLoad: true,
			responsive: {
                0: {
                    items: 1,
					dots: true,
					stagePadding:15,
                },
                768: {
                    items: 1,
					dots: true,
					stagePadding:15,
                },
                1200: {
                    items: 1
                }
            }
		  });

    }  
	if (('.latest-slider').length > 0) {
       $('.latest-slider').owlCarousel({
			autoplay: true,
            dots: false,
			margin:30,
            nav: true,
            loop: false,
            lazyLoad: true,
			responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
		  });

    }

    //scrollUp//

	  var visible = false;
	  $(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		if (!visible && scrollTop > 100) {
		  $(".scrollToTop").fadeIn();
		  visible = true;
		} else if (visible && scrollTop <= 100) {
		  $(".scrollToTop").fadeOut();
		  visible = false;
		}
	  });
	  $(".scrollToTop").click(function() {
		$("html, body").animate({
		  scrollTop: 0
		}, 800);
		return false;
	  });

    /*  aos js*/
	
	if (('.swiper-container').length > 0) {
    var swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
	  loop: true,
      centeredSlides: true,
	slidesPerView: 2,
	initialSlide: 2,
	   breakpoints: {  
      991: {       
         slidesPerView: 1 ,
		 initialSlide: 2        
      }  
  
   },
	
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 600,
        modifier: 1,
        slideShadows : false,
      },
	    navigation: false,
    });	
	}
	
    /*  aos js*/
    AOS.init({
        offset: 120, 
        delay: 0, 
        duration: 400, 
        easing: 'ease', 
        once: true, 
        mirror: false,
        anchorPlacement: 'top-bottom',

    });
    $(window).on('load', function() {

        /*  Preloader js*/
        var preLoder = $(".overlay-loader");
        preLoder.fadeOut(1000);

    });

 $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });


}(jQuery));