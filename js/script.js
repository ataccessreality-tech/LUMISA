(function($) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-top');
			if (windowpos >= 110) {
				siteHeader.addClass('fixed-header');
				scrollLink.addClass('open');
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.removeClass('open');
			}
		}
	}
	
	headerStyle();

	// dropdown menu
	var mobileWidth = 992;
	var navcollapse = $('.navigation li.dropdown');
	 
	$(window).on('resize', function(){
	    navcollapse.children('ul').hide();
	});

	navcollapse.hover(function() {
	if($(window).innerWidth() >= mobileWidth){
	      $(this).children('ul').stop(true, false, true).slideToggle(300);
	    }
	});	

	//Submenu Dropdown Toggle
	if($('.main-header .navigation li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');		
		
		//Dropdown Button
		$('.main-header .navigation li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
	}

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1000);
	
		});
	}

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW({
		mobile:       false
		});
		wow.init();
	}

	//Contact Form Validation
	if($("#contact-form").length){
		$("#contact-form").validate({
		    submitHandler: function(form) {
		      var form_btn = $(form).find('button[type="submit"]');
		      var form_result_div = '#form-result';
		      $(form_result_div).remove();
		      form_btn.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
		      var form_btn_old_msg = form_btn.html();
		      form_btn.html(form_btn.prop('disabled', true).data("loading-text"));
		      $(form).ajaxSubmit({
		        dataType:  'json',
		        success: function(data) {
		          if( data.status == 'true' ) {
		            $(form).find('.form-control').val('');
		          }
		          form_btn.prop('disabled', false).html(form_btn_old_msg);
		          $(form_result_div).html(data.message).fadeIn('slow');
		          setTimeout(function(){ $(form_result_div).fadeOut('slow') }, 6000);
		        }
		      });
		    }
		});
	}

	// Fact Counter
	function factCounter() {
		if($('.fact-counter').length){
			$('.fact-counter .column.animated').each(function() {
		
				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);
					
				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							$t.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function() {
							$t.find(".count-text").text(this.countNum);
						}
					});
				}
				
			});
		}
	}

	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'elastic',
			closeEffect : 'elastic',
			helpers : {
				media : {}
			}
		});
	}

	// tab-content
	function customTabProductPageTab () {
	    if ($('.custom-tab-title').length) {
	        var tabWrap = $('.tab-details-content');
	        var tabClicker = $('.custom-tab-title ul li');
	        
	        tabWrap.children('div').hide();
	        tabWrap.children('div').eq(0).show();
	        tabClicker.on('click', function() {
	            var tabName = $(this).data('tab-name');
	            tabClicker.removeClass('active');
	            $(this).addClass('active');
	            var id = '#'+ tabName;
	            tabWrap.children('div').not(id).hide();
	            tabWrap.children('div'+id).fadeIn('500');
	            return false;
	        });        
	    }
	}


	//three-column-carousel
	    if ($('.three-column-carousel').length) {
			$('.three-column-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 3000,
			autoplay: 4000,
			navText: [ '<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1024:{
					items:3
				}
			}
		});    		
	}


	// sponsors-slider
	if ($('.gallery-slider').length) {
		$('.gallery-slider').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 3000,
			autoplay: 4000,
			navText: [ '<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>' ],
			responsive:{
				0:{
					items:1
				},
				400:{
					items:2
				},
				600:{
					items:3
				},
				800:{
					items:4
				},
				1200:{
					items:5
				}
			}
		});    		
	}


	// single-item-carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 3000,
			autoplay: 4000,
			navText: [ '<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>' ],
			responsive:{
				0:{
					items:1
				},
				400:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}

	//Main Slider Carousel
	if ($('.main-slider-carousel').length) {
		$('.main-slider-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			animateOut: 'slideOutDown',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
			autoplay: 5000,
			navText: [ '<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}
	

	// Date picker - Prevent past dates for arrival
function datepicker () {
    if ($('#datepicker').length) {
        $('#datepicker').datepicker({
            minDate: 0,  // Today or future only
            dateFormat: "dd-mm-yy",
            onSelect: function(selectedDate) {
                // When arrival date selected, update departure min date
                var arrivalDate = $(this).datepicker("getDate");
                if (arrivalDate) {
                    var minDeparture = new Date(arrivalDate);
                    minDeparture.setDate(minDeparture.getDate() + 1);
                    $('#datepicker_1').datepicker("option", "minDate", minDeparture);
                }
            }
        });
    };
}

// Date picker - Prevent past dates for departure
function datepicker_1 () {
    if ($('#datepicker_1').length) {
        $('#datepicker_1').datepicker({
            minDate: 0,  // Today or future only
            dateFormat: "dd-mm-yy"
        });
    };
}

// Date picker - Additional date pickers (if any)
function datepicker_2 () {
    if ($('#datepicker_2').length) {
        $('#datepicker_2').datepicker({
            minDate: 0,
            dateFormat: "dd-mm-yy"
        });
    };
}

// Date picker
function datepicker_3 () {
    if ($('#datepicker_3').length) {
        $('#datepicker_3').datepicker({
            minDate: 0,
            dateFormat: "dd-mm-yy"
        });
    };
}

// Date picker
function datepicker_4 () {
    if ($('#datepicker_4').length) {
        $('#datepicker_4').datepicker({
            minDate: 0,
            dateFormat: "dd-mm-yy"
        });
    };
}

// Date picker
function datepicker_5 () {
    if ($('#datepicker_5').length) {
        $('#datepicker_5').datepicker({
            minDate: 0,
            dateFormat: "dd-mm-yy"
        });
    };
}

	//Custom Seclect Box
	if($('.custom-select-box').length){
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}


	//Sortable Masonary with Filters
	function enableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : 2 
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.bind('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}



	/*	=========================================================================
	When document is Scrollig, do
	========================================================================== */

	jQuery(document).on('ready', function () {
   (function ($) {
      // add your functions
      customTabProductPageTab ();
      datepicker ();
      datepicker_1 ();
      datepicker_2 ();
      datepicker_3 ();
      datepicker_4 ();
      datepicker_5 ();
      
      // Initialize EmailJS forms
      initEmailJS();
   })(jQuery);
});

// EmailJS Configuration for Lumis Hotels
function initEmailJS() {
    // Handle contact form submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            from_name: $(this).find('[name="form_name"]').val() + ' ' + $(this).find('[name="form_lastname"]').val(),
            from_email: $(this).find('[name="form_email"]').val(),
            phone: $(this).find('[name="form_phone"]').val(),
            message: $(this).find('[name="form_message"]').val(),
            form_type: 'Contact Form'
        };
        
        if (!formData.from_name || !formData.from_email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        emailjs.send("service_z1q7ase", "template_l9m5wg8", formData)
            .then(function(response) {
                alert('Thank you! Your message has been sent to our team at info@lumishotels.com. We will contact you soon.');
                $('#contact-form')[0].reset();
            })
            .catch(function(error) {
                alert('Sorry, there was an error sending your message. Please try again or contact us directly at info@lumishotels.com');
                console.log('Email error:', error);
            });
    });
    
    // Handle partner form submission
    $('#partner-form').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            from_name: $(this).find('[name="first_name"]').val() + ' ' + $(this).find('[name="last_name"]').val(),
            from_email: $(this).find('[name="form_email"]').val(),
            phone: $(this).find('[name="mobile"]').val(),
            message: 'PROPERTY INQUIRY DETAILS:\n\n' +
                     'Property Status: ' + $(this).find('[name="property_status"]').val() + '\n' +
                     'City: ' + $(this).find('[name="city"]').val() + '\n' +
                     'Location: ' + $(this).find('[name="location"]').val() + '\n' +
                     'Geo Link: ' + $(this).find('[name="geo_link"]').val() + '\n\n' +
                     'DESCRIPTION:\n' + $(this).find('[name="description"]').val(),
            form_type: 'Partner Inquiry'
        };
        
        if (!formData.from_name || !formData.from_email || !$(this).find('[name="description"]').val()) {
            alert('Please fill in all required fields.');
            return;
        }
        
        emailjs.send("service_z1q7ase", "template_l9m5wg8", formData)
            .then(function(response) {
                alert('Thank you! Your partnership proposal has been submitted. Our team will contact you within 24-48 hours.');
                $('#partner-form')[0].reset();
            })
            .catch(function(error) {
                alert('Sorry, there was an error submitting your proposal. Please try again or contact us directly.');
                console.log('Email error:', error);
            });
    });
}



	/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
		factCounter();
	});

	
	
	/* ==========================================================================
   When document is loaded, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		enableMasonry();
	});

	

})(window.jQuery);