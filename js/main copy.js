  // SELECTOR

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  
  const onscroll = (el, listener) => {
	el.addEventListener('scroll', listener)
  }

  
  
// SLIDER */

  (function() {
	"use strict";
  
	var autoUpdate = true,
		timeTrans = 5000;
	
	  var cdSlider = document.querySelector('.cd-slider'),
		  item = cdSlider.querySelectorAll("li"),
		  nav = cdSlider.querySelector("nav");
  
	  item[0].className = "current_slide";
  
	  for (var i = 0, len = item.length; i < len; i++) {
		  var color = item[i].getAttribute("data-color");
		  item[i].style.backgroundColor=color;
	  }
  
	  // Detectar IE
	  // Esconder efecto en IE9
	  var ua = window.navigator.userAgent;
		  var msie = ua.indexOf("MSIE");
		  if ( msie > 0 ) {
			  var version = parseInt(ua.substring(msie+ 5, ua.indexOf(".", msie)));
			  if (version === 9) { cdSlider.className = "cd-slider ie9";}
	  }
  
	  if (item.length <= 1) {
		  nav.style.display = "none";
	  }
  
	  function prevSlide() {
		  var currentSlide = cdSlider.querySelector("li.current_slide"),
			  prevElement = currentSlide.previousElementSibling,
			  prevSlide = ( prevElement !== null) ? prevElement : item[item.length-1],
			  prevColor = prevSlide.getAttribute("data-color"),
			  el = document.createElement('span');
  
		  currentSlide.className = "";
		  prevSlide.className = "current_slide";
  
		  nav.children[0].appendChild(el);
  
		  var size = ( cdSlider.clientWidth >= cdSlider.clientHeight ) ? cdSlider.clientWidth*2 : cdSlider.clientHeight*2,
			  ripple = nav.children[0].querySelector("span");
  
		  ripple.style.height = size + 'px';
		  ripple.style.width = size + 'px';
		  ripple.style.backgroundColor = prevColor;
  
		  ripple.addEventListener("webkitTransitionEnd", function() {
			  if (this.parentNode) {
				  this.parentNode.removeChild(this);
			  }
		  });
  
		  ripple.addEventListener("transitionend", function() {
			  if (this.parentNode) {
				  this.parentNode.removeChild(this);
			  }
		  });
  
	  }
  
	  function nextSlide() {
		  var currentSlide = cdSlider.querySelector("li.current_slide"),
			  nextElement = currentSlide.nextElementSibling,
			  nextSlide = ( nextElement !== null ) ? nextElement : item[0],
			  nextColor = nextSlide.getAttribute("data-color"),
			  el = document.createElement('span');
  
		  currentSlide.className = "";
		  nextSlide.className = "current_slide";
  
		  nav.children[1].appendChild(el);
  
		  var size = ( cdSlider.clientWidth >= cdSlider.clientHeight ) ? cdSlider.clientWidth*2 : cdSlider.clientHeight*2,
				ripple = nav.children[1].querySelector("span");
  
		  ripple.style.height = size + 'px';
		  ripple.style.width = size + 'px';
		  ripple.style.backgroundColor = nextColor;
  
		  ripple.addEventListener("webkitTransitionEnd", function() {
			  if (this.parentNode) {
				  this.parentNode.removeChild(this);
			  }
		  });
  
		  ripple.addEventListener("transitionend", function() {
			  if (this.parentNode) {
				  this.parentNode.removeChild(this);
			  }
		  });
  
	  }
  
	  updateNavColor();
  
	  function updateNavColor () {
		  var currentSlide = cdSlider.querySelector("li.current_slide");
  
		  var nextColor = ( currentSlide.nextElementSibling !== null ) ? currentSlide.nextElementSibling.getAttribute("data-color") : item[0].getAttribute("data-color");
		  var	prevColor = ( currentSlide.previousElementSibling !== null ) ? currentSlide.previousElementSibling.getAttribute("data-color") : item[item.length-1].getAttribute("data-color");
  
		  
	  }
  
	  nav.querySelector(".next").addEventListener('click', function(event) {
		  event.preventDefault();
		  nextSlide();
		  updateNavColor();
	  });
  
	  nav.querySelector(".prev").addEventListener("click", function(event) {
		  event.preventDefault();
		  prevSlide();
		  updateNavColor();
	  });
	
	//autoUpdate
	setInterval(function() {
	  if (autoUpdate) {
		nextSlide();
		updateNavColor();
	  };
	  },timeTrans);
  
  })();



  (function() {;  
  
	//NAVBAR
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
	  let position = window.scrollY + 200
	  navbarlinks.forEach(navbarlink => {
		if (!navbarlink.hash) return
		let section = select(navbarlink.hash)
		if (!section) return
		if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
		  navbarlink.classList.add('active')
		} else {
		  navbarlink.classList.remove('active')
		}
	  })
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)
  
	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
	  let header = select('#header')
	  let offset = header.offsetHeight
  
	  let elementPos = select(el).offsetTop
	  window.scrollTo({
		top: elementPos - offset,
		behavior: 'smooth'
	  })
	}
  




	
	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
	let selectHeader = select('#header')
	if (selectHeader) {
	  const headerScrolled = () => {
		if (window.scrollY > 100) {
		  selectHeader.classList.add('header-scrolled')
		} else {
		  selectHeader.classList.remove('header-scrolled')
		}
	  }
	  window.addEventListener('load', headerScrolled)
	  onscroll(document, headerScrolled)
	}
  
	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top')
	if (backtotop) {
	  const toggleBacktotop = () => {
		if (window.scrollY > 100) {
		  backtotop.classList.add('active')
		} else {
		  backtotop.classList.remove('active')
		}
	  }
	  window.addEventListener('load', toggleBacktotop)
	  onscroll(document, toggleBacktotop)
	}
  
	/**
	 * Mobile nav toggle
	 */
	on('click', '.mobile-nav-toggle', function(e) {
	  select('#navbar').classList.toggle('navbar-mobile')
	  this.classList.toggle('bi-list')
	  this.classList.toggle('bi-x')
	})
  
	/**
	 * Mobile nav dropdowns activate
	 */
	on('click', '.navbar .dropdown > a', function(e) {
	  if (select('#navbar').classList.contains('navbar-mobile')) {
		e.preventDefault()
		this.nextElementSibling.classList.toggle('dropdown-active')
	  }
	}, true)
 

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on('click', '.scrollto', function(e) {
	  if (select(this.hash)) {
		e.preventDefault()
  
		let navbar = select('#navbar')
		if (navbar.classList.contains('navbar-mobile')) {
		  navbar.classList.remove('navbar-mobile')
		  let navbarToggle = select('.mobile-nav-toggle')
		  navbarToggle.classList.toggle('bi-list')
		  navbarToggle.classList.toggle('bi-x')
		}
		scrollto(this.hash)
	  }
	}, true)
  
	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener('load', () => {
	  if (window.location.hash) {
		if (select(window.location.hash)) {
		  scrollto(window.location.hash)
		}
	  }
	});
  
	/**
	 * Porfolio isotope and filter
	 */
	window.addEventListener('load', () => {
	  let portfolioContainer = select('.portfolio-container');
	  if (portfolioContainer) {
		let portfolioIsotope = new Isotope(portfolioContainer, {
		  itemSelector: '.portfolio-item',
		});
  
		let portfolioFilters = select('#portfolio-flters li', true);
  
		on('click', '#portfolio-flters li', function(e) {
		  e.preventDefault();
		  portfolioFilters.forEach(function(el) {
			el.classList.remove('filter-active');
		  });
		  this.classList.add('filter-active');
  
		  portfolioIsotope.arrange({
			filter: this.getAttribute('data-filter')
		  });
		  portfolioIsotope.on('arrangeComplete', function() {
			AOS.refresh()
		  });
		}, true);
	  }
  
	});
  
	/**
	 * Initiate portfolio lightbox 
	 */
	const portfolioLightbox = GLightbox({
	  selector: '.portfolio-lightbox'
	});
  
	/**
	 * Portfolio details slider
	 */
	new Swiper('.portfolio-details-slider', {
	  speed: 400,
	  loop: true,
	  autoplay: {
		delay: 5000,
		disableOnInteraction: false
	  },
	  pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	  }
	});
  
	/**
	 * Testimonials slider
	 */
	new Swiper('.testimonials-slider', {
	  speed: 600,
	  loop: true,
	  autoplay: {
		delay: 5000,
		disableOnInteraction: false
	  },
	  slidesPerView: 'auto',
	  pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	  },
	  breakpoints: {
		320: {
		  slidesPerView: 1,
		  spaceBetween: 20
		},
  
		1200: {
		  slidesPerView: 3,
		  spaceBetween: 20
		}
	  }
	});
  
	/**
	 * Animation on scroll
	 */
	window.addEventListener('load', () => {
	  AOS.init({
		duration: 1000,
		easing: 'ease-in-out',
		once: true,
		mirror: false
	  })
	});
  
  })()


  
  
// GLIGHTBOX */


	const glightbox = GLightbox({
		selector: '.glightbox'
	  });
	
	
	  /**
	   * Animation on scroll function and init
	   */
	  function aos_init() {
		AOS.init({
		  duration: 1000,
		  easing: 'ease-in-out',
		  once: true,
		  mirror: false
		});
	  }
	  window.addEventListener('load', () => {
		aos_init();
	  });

  


// SCROLLSPY 

(function($) {
    "use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    $('#navbar').affix({
        offset: {
            top: 200
        }
    });
    
    new WOW().init();
    
    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-collapse ul li a').click(function() {
             $('.navbar-toggle:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
    });

})(jQuery); 


 