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
        $.getJSON(postFile, function (data) {
            if (data.status === true) {
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
                                        if (data.status === true) {
                                            if (autoRedir) {
                                                window.location = data.url;
                                            } else {
                                                $(waitId).fadeOut("slow", function () {
                                                    $(wrapperId).fadeOut("slow", function () {
                                                        $(this).html(data.message).fadeIn();
                                                        $("a#changeP").click(function () {
                                                            $(wrapperId).html(data.message).fadeOut();
                                                           // initPassForm();
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
    }