	$('form').live('submit', function(event) {
		var form = $(this);
		var formContainer = $(form).parent();
		var formContainerID = $(form).parent().attr('id');
		var formName = $(form).attr('id').toString().split('_')[0] + '_form.html';
		var formInputs = $(form).find('input:not(.button), textarea');
		//var formLength = $(formInputs).size();
		var formSubmit = $(form).find('input.submit-button');
		var errorPagesText = $('div.error-txt');
		var formPostDataArr = [];
		
		// Disable Submit Button
		$(formSubmit).attr('disabled', 'true');
		$(errorPagesText).remove();
		// Get Form Inputs
		$(formInputs).each(function(i) {
			var input = $(this);
			var inputName = $(input).attr('name').toString();
			var inputVal = $(input).val().replace(/\n/g,"\\n");
			var postDataPart = "'" + inputName + "':'" + inputVal + "'";
			formPostDataArr.push(postDataPart);
		});
		// convert array into json for posting it via jQuery.load to the PHP File
		var postData = eval('({' + formPostDataArr.join(",") + '})');
		
		// load the eform results
		$(formContainer).load(formName, postData, function() {
			$(formContainer).children().find('label').inFieldLabels({ fadeOpacity: '0.3', fadeDuration: 300 });
			$('input.required, textarea.required').valid8();
			$('fieldset.preview').css('opacity', '0');
			if (formContainerID === 'win-form' ) {
				var formContainerThanks = $('#win-form').find('div.thankyou').attr('class');
				if ( formContainerThanks === 'thankyou' ) {
					$(formContainer).delay(10000).slideFadeToggle();
					$('#ticket-box').delay(10000).slideTicketBox();
					setTimeout(function () { $(formContainer).load(formName, function() {
						$(formContainer).children().find('label').inFieldLabels({ fadeOpacity: '0.3', fadeDuration: 300 });
						$('input.required, textarea.required').valid8();
					}) }, 12000);
				}
			}
			//...cut out some more code, just browser-specific fixes (opera/ie)
		});