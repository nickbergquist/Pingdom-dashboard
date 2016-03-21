// script loaded in all pages

// enable CSS selectors dependent on scripting
$('html').addClass('js');

// main control block, on DOM-ready..
$(function () {
	// correct the viewport meta entry when gestures available - safari re-orientation bug. See: http://adactio.com/journal/4470/
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		var viewportmeta = document.querySelector('meta[name="viewport"]');
		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
			document.body.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
			}, false);
		}
	}
	
	//
	if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style");
		msViewportStyle.appendChild(
			document.createTextNode("@-ms-viewport{width:auto!important}")
		);
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
	}
	
	// viewport size dependent function calls: ranges should match those in the CSS media queries..
	enquire.register('screen and (max-width: 767px)', {
		match : function() {
			
		}
	}).register('screen and (min-width: 768px)', {
		match : function() {
			
		}
	}).register('screen and (min-width: 899px)', {
		match : function() {
           
		}
	}).register('screen and (min-width: 900px)', {
		match : function() {
			
		}
	}).register('screen and (min-width: 1024px)', {
		match : function() {
			
		},
		unmatch : function() {
			
		}
	}).register('screen and (min-width: 1920px)', {
		match : function() {
			
		}
	}).listen(50); // milliseconds


	// non viewport size dependent function calls..

	// add the Informa top ribbon behaviour
	//if ($('#iribbon-container').length){
	//	showHideInformaTopRibbon();
	//}

	// add the cookie-consent panel
	//showHideInformaCookieNotice();

	$('.line').peity('line', {
		fill: 'transparent',
		stroke: '#fff',
		strokeWidth: '2',
		width: 250,
		height: 48
	})

	$('a[href^="mailto"]').on('click', function(){
		alert("Demo only");
		return false;
	});

});


// METHODS

// Informa top ribbon behaviour. Note that #ribbon-detail visibility is CSS controlled by adding/removing HTML classes.
var showHideInformaTopRibbon = function(){
	
	// cache the DOM elements
	var $this = $('#iribbon-container');
	var $that = $('#iribbon-detail');

	$that.css('max-height', '0');

	// add the control button
	$this.prepend('<button id="iribbon-title" title="show/hide">Informa</button>');
	var $ribbonButton = $this.find('#iribbon-title');
 
    // set the tabindex so that hidden links can't receive focus until visible
	$that.find('a').attr('tabindex', -1);
	
	$ribbonButton.on('click', function(){
		if (!$that.hasClass('show')){
			$(this).addClass('active');
			$that.addClass('show').find('a').attr('tabindex', 0);
		} else {
			$(this).removeClass('active');
			$that.removeClass('show').find('a').attr('tabindex', -1);
		}
	});
}

// Informa cookie policy notice, dependency: /javascript/js.cookie.js
var showHideInformaCookieNotice = function() {
	
	if ($.cookie('cookiePolicyViewed') === undefined) {
		//ToDo: HTML fragment is script-written into the DOM as the cookie functionality is as yet script-driven only.. 
		$('body').append('<div id="notice-cookie"><p>We use cookies to help provide you with the best possible online experience. Please read our <a href="http://www.informa.com/Generic-content/Privacy-Policy/">Privacy Policy</a> and <a href="http://www.informa.com/Generic-content/Terms--conditions/">Terms & Conditions</a> for information about which cookies we use and what information we collect on our site. By continuing to use this site, you agree that we may store and access cookies on your device. <button id="btn-cookies-accept" class="btn-def inline" title="Accept cookies">OK</button></p></div>')

		var $container = $('#notice-cookie');
		var $buttonAccept = $('#btn-cookies-accept');

		$buttonAccept.on('click', function(){
			$.cookie('cookiePolicyViewed', '', { expires: 365 });
			//$.removeCookie('cookiePolicyViewed');
			$container.remove();
		});
	}
}
