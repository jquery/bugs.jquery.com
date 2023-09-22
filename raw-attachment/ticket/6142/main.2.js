/* ----------------------------------------------------------------------------------------- 
____________________________________________________________________

Author - Tony Skurat
____________________________________________________________________

----------------------------------------------------------------------------------------- */
// when the DOM is ready...(initialization)
// ------ You can make all your customizations here. ---------- \\
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});
jQuery(function () {
    // ------ This function is used to open links in external window/tab without relying on the deprecated target attribute. So, whenever you want to open links in a new window. just add class="external"
    jQuery("a.external").click(function () {
        return !window.open(jQuery(this).attr("href"));
    }); // ------ This function selects the current nav and adds a class of "active"


    function selectNav() {
        jQuery(this).parents('#mainNav:first').find('a').removeClass('active').end().end().addClass('active');
    }
    jQuery('#mainNav').find('a').click(selectNav); // go find the navigation link that has this target and select the nav


    function trigger(data) {
        var el = jQuery('#mainNav').find('a[href$="' + data.id + '"]').get(0);
        selectNav.call(el);
    }
    if (window.location.hash) {
        trigger({
            id: window.location.hash.substr(1)
        });
    } else {
        jQuery('#mainNav a:first').click();
    }
    // ------ The settings for tooltip using the qtip plugin
    jQuery.fn.qtip.styles.custom = {
        // Last part is the name of the style
        width: 'auto',
        background: 'none',
        color: '#888',
        textAlign: 'center',
        border: {
            width: 0,
            radius: 0,
            color: '#eee'
        },
        tip: false
    }
    // settings for the vCard tootlip
    jQuery('a.vcard[title]').qtip({
        style: 'custom',
        prerender: true,
        show: {
            delay: 100,
            effect: {
                length: 600
            }
        },
        position: {
            adjust: {
                x: 0,
                y: 26
            },
            corner: {
                target: 'bottomMiddle',
                tooltip: 'bottomMiddle'
            }
        }
    }); // Links Section - Links hover animation
    jQuery('#links a').hover(function () {
        jQuery('img', this).stop().animate({
            'marginLeft': 4
        },
        250);
    },


    function () {
        jQuery('img', this).stop().animate({
            'marginLeft': 10
        },
        250);
    }).find('img').css('marginLeft', 10);
});
$(document).ready(function () {
    // login form
    var wrapperId = "#wrapper"; // main container
    var waitId = "#wait"; // wait message container
    var formId = "#login-form"; // submit button identifier
    var userId = "#u"; // user input identifier
    var passId = "#p"; // password input identifier
    var confirmId = "#c"; // confirm password input identifier
    var waitNote = "Loading..."; // loading message
    var jsErrMsg = "<span class=\"warning\"><b>*Your username or password is not valid.</b></span>"; // clientside error message
    var jsErrMsg1 = "<span class=\"warning\"><b>*Your password must be at least eight characters long.</b></span>"; // clientside error message
    var jsErrMsg2 = "<span class=\"warning\"><b>*Your passwords do not match.</b></span>"; // clientside error message
    var postFile = "php/login.post.php"; // post handler
    var changeFile = "php/login.change.php"; // post handler
    var autoRedir = true; // auto redirect on success
    // hide first
    $(waitId).hide();
   // $(wrapperId).hide(); // FirstLoad
    initForm(); // init form function	
     
	  function initForm() {
        // get request to load form
       $.ajax({url: "php/login.post.php",
            dataType: "text",
            success: function(data) {
            json = eval("(" + data + ")");
            if (data.status == true) {
                $(waitId).fadeOut("slow", function () {
                    $(wrapperId).fadeOut("slow", function () {
                        $(this).html(data.message).fadeIn();
                        $("a#changeP").click(function () {
                            $(wrapperId).html(data.message).fadeOut();
                            initPassForm();
                            return false;
                        });
                    });
                }).html();
            } else {
                // show form
                $(wrapperId).html(data.message).fadeIn("slow", function () {
                    // hide message
                    $(waitId).fadeOut("fast", function () {
                        // submit handler
                        $("#login-form").submit(function () {
                            var _u = $(userId).val(); // form user
                            var _p = $(passId).val(); // form id
                            //@ valid user ( modify as needed )
                            if (_u.length < 4) {
                                $(waitId).html(jsErrMsg).fadeIn("fast", function () {
                                    $(userId).focus();
                                });
                            } else {
                                //@ valid password ( modify as needed )
                                if (_p.length < 4) {
                                    $(waitId).html(jsErrMsg).fadeIn("fast", function () {
                                        $(passId).focus();
                                    });
                                } else {
                                    $.post(postFile, {
                                        u: _u,
                                        p: _p
                                    }, function (data) {
                                        if (data.status == true) {
                                            if (autoRedir) {
                                                window.location = data.url;
                                            } else {
                                                $(waitId).fadeOut("slow", function () {
                                                    $(wrapperId).fadeOut("slow", function () {
                                                        $(this).html(data.message).fadeIn();
                                                        $("a#changeP").click(function () {
                                                            $(wrapperId).html(data.message).fadeOut();
                                                            initPassForm();
                                                            return false;
                                                        });
                                                    });
                                                }).html();
                                            }
                                        } else {
                                            $(waitId).html(data.message).fadeIn("fast", function () {																									
                                                $(userId).focus();
                                            });
                                        }
                                    }, "json");
                                }
                            }
                            return false;
                        }); 
                        $(userId).focus();
                    }).html();
                });
            }
			}
        });
    }
    /*function initForm() {
        // get request to load form
        $.getJSON(postFile, function (data) {
            if (data.status == true) {
                $(waitId).fadeOut("slow", function () {
                    $(wrapperId).fadeOut("slow", function () {
                        $(this).html(data.message).fadeIn();
                        $("a#changeP").click(function () {
                            $(wrapperId).html(data.message).fadeOut();
                            initPassForm();
                            return false;
                        });
                    });
                }).html();
            } else {
                // show form
                $(wrapperId).html(data.message).fadeIn("slow", function () {
                    // hide message
                    $(waitId).fadeOut("fast", function () {
                        // submit handler
                        $("#login-form").submit(function () {
                            var _u = $(userId).val(); // form user
                            var _p = $(passId).val(); // form id
                            //@ valid user ( modify as needed )
                            if (_u.length < 4) {
                                $(waitId).html(jsErrMsg).fadeIn("fast", function () {
                                    $(userId).focus();
                                });
                            } else {
                                //@ valid password ( modify as needed )
                                if (_p.length < 4) {
                                    $(waitId).html(jsErrMsg).fadeIn("fast", function () {
                                        $(passId).focus();
                                    });
                                } else {
                                    $.post(postFile, {
                                        u: _u,
                                        p: _p
                                    }, function (data) {
                                        if (data.status == true) {
                                            if (autoRedir) {
                                                window.location = data.url;
                                            } else {
                                                $(waitId).fadeOut("slow", function () {
                                                    $(wrapperId).fadeOut("slow", function () {
                                                        $(this).html(data.message).fadeIn();
                                                        $("a#changeP").click(function () {
                                                            $(wrapperId).html(data.message).fadeOut();
                                                            initPassForm();
                                                            return false;
                                                        });
                                                    });
                                                }).html();
                                            }
                                        } else {
                                            $(waitId).html(data.message).fadeIn("fast", function () {																									
                                                $(userId).focus();
                                            });
                                        }
                                    }, "json");
                                }
                            }
                            return false;
                        }); 
                        $(userId).focus();
                    }).html();
                });
            }
        });
    }

    function initPassForm() {
        // get request to load form
        $.getJSON(changeFile, function (data) {
            // show form			
            setTimeout(function () {
                $(wrapperId).html(data.message).fadeIn("slow", function () {
                    // back handler												 
                    $("input#back").click(function () {
                        initForm();
                        return false;
                    }); // submit handler
                    $("#login-form").submit(function () {
                        var _p = $(passId).val(); // form id
                        var _c = $(confirmId).val(); // confirm id
                        //@ valid password( modify as needed )
                        if (_p.length < 8) {
                            $(waitId).html(jsErrMsg1).fadeIn("fast", function () {
                                $(passId).focus();
                            });
                        } else {
                            //@ valid password ( modify as needed )
                            if (_c.length < 8) {
                                $(waitId).html(jsErrMsg1).fadeIn("fast", function () {
                                    $(confirmId).focus();
                                });
                            } else {
                                if (_c != _p) {
                                    $(waitId).html(jsErrMsg2).fadeIn("fast", function () {
                                        $(passId).focus();
                                    });
                                } else {
                                    $.post(changeFile, {
                                        p: _p,
                                        c: _c
                                    }, function (data) {
                                        $(waitId).fadeOut("slow", function () {
                                            $(wrapperId).fadeOut("slow", function () {
                                                $(this).html(data.message).fadeIn();
                                                $("a#back").click(function () {
                                                    initForm();
                                                    return false;
                                                });
                                            });
                                        });
                                    }, "json");
                                }
                            }
                        }
                        return false;
                    });
                    $(passId).focus();
                });
            }, 175);
        });
    }*/
    // Gallery Fade	
    $(".latest_img").fadeTo("slow", 0.85); // This sets the opacity of the thumbs to fade down to 85% when the page loads
    $(".latest_img").hover(function () {
        $(this).fadeTo("slow", 1.0); // This should set the opacity to 100% on hover
    },
    function () {
        $(this).fadeTo("slow", 0.85); // This should set the opacity back to 85% on mouseout
    }); // Fancybox - Gallery	
    $("#iframe").fancybox({
		'padding'           : 0,
		'width'				: 677,
		'height'			: 485,
		'autoScale'     	: true,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'type'				: 'iframe'
    }); 
	 $("a#image").fancybox({
		'padding'       : 5,				   
		'titleShow'     : false,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic'
    }); 
	  $("#map").fancybox({
		'padding'       : 5,				   
		'titleShow'     : false,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic',
		'type'			: 'iframe'
    }); 
	// Add Active State and Fade In Content   
   init();
    function init() {
		$(".section").slideUp(500);
		var content_show = $("li a.home").attr("href");
		$(content_show).slideDown(800);		 
	}	
	setTimeout(function() {	
	    $("#outerWrapper").stop().animate({
            'marginTop': 0
        }, 500);
	}, 200);
	$("#mainNav li a").click(function () {				
        $(this).siblings().removeClass("active"); // Unset all other buttons
        $(this).addClass("active");
		
        $(".section").slideUp(500); // Slide up content
		
		var content_show = $(this).attr("href");
		setTimeout(function() {				
           $(content_show).slideDown(800);
		}, 500);
        return false;
    });	
    $(".linkFade a").click(function () {		
		$(".section").slideUp(500);							 
        var content_show = $(this).attr("href");
		setTimeout(function() {				
           $(content_show).slideDown(800);
		}, 500);
		return false;
    }); 
	 $(".site a").click(function () {		
		$(".section").slideUp(500);							 
        var content_show = $(this).attr("href");
		setTimeout(function() {				
           $(content_show).slideDown(800);
		}, 500);
		return false;
    });
	// Form Validate
    var options = {
        beforeSubmit: validate,
        // pre-submit callback 
        success: showResponse,
        // post-submit callback 
        //clearForm: true, // clear all form fields after successful submit 
        resetForm: true // reset the form after successful submit 
    }; // bind form using 'ajaxForm' 
    $('#contact-form').ajaxForm(options);
});
// Contact Form settings
var secs;
var timerID = null;
var timerRunning = false;
var delay = 1000;

function showResponse() {
    // Set the length of the timer, in seconds
    secs = 7;
    StopTheClock();
    StartTheTimer();
}

function StopTheClock() {
    if (timerRunning) clearTimeout(timerID);
    timerRunning = false;
}

function StartTheTimer() {
    if (secs == 0) {
        StopTheClock();
        $('input.send').animate({
            opacity: "show"
        },
        "fast");
    } else {
        $('input.send').animate({
            opacity: "hide"
        },
        "fast");
        self.status = secs;
        secs--;
        timerRunning = true;
        timerID = self.setTimeout("StartTheTimer()", delay);
    }
    if (secs == 1) {
        $('#success').animate({
            opacity: "hide"
        },
        "fast");
    }
    if (secs == 5) {
        $('#success').animate({
            opacity: "show"
        },
        "fast");
    }
}

function validate(formData, jqForm, options) {
    $("li.error").animate({
        opacity: "hide"
    },
    "slow");
    var nameValue = $('input[name=name]').fieldValue();
    var subjectValue = $('input[name=subject]').fieldValue();
    var emailValue = $('input[name=email]').fieldValue();
    var messageValue = $('textarea[name=message]').fieldValue();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var correct = true;
    if (!nameValue[0]) {
        $("li.error.wrong_name").animate({
            opacity: "show"
        },
        "slow");
        correct = false;
    }
    if (!emailValue[0]) {
        $("li.error.wrong_email").animate({
            opacity: "show"
        },
        "slow");
        correct = false;
    } else if (!emailReg.test(emailValue[0])) {
        $("li.error.wrong_email").animate({
            opacity: "show"
        },
        "slow");
        correct = false;
    }
    if (!messageValue[0]) {
        $("li.error.wrong_message").animate({
            opacity: "show"
        },
        "slow");
        correct = false;
    }
    if (!subjectValue[0]) {
        $("li.error.wrong_subject").animate({
            opacity: "show"
        },
        "slow");
        correct = false;
    }
    if (!correct) {
        return false;
    }
}
$("p#success").click(function () {
    $(this).animate({
        opacity: "hide"
    },
    "slow");
}); 