$(document).ready(function(){

    $("#instructions-description a.action-tab").click(function(){
        $("#instructions-description").toggleClass("active");
    });
    
    $("input").clearingInput();
    $("#invoice-body td textarea").autogrow();
    
    $("input[id^=qty-], input[id^=unit-sell-price-], input[id^=tax-]").bind("keyup", recalc);
    
    function recalc()
    {
        $("[id^=sub-total-]").calc(
        	// the equation to use for the calculation
        	"qty * price",
        	// define the variables used in the equation, these can be a jQuery object
        	{
        		qty: $("input[id^=qty-]"),
        		price: $("input[id^=unit-sell-price-]")
        	},
        	// define the formatting callback, the results of the calculation are passed to this function
        	function (s){
        		// return the number as a dollar amount
        		return "$" + s.toFixed(2);
        	},
        	// define the finish callback, this runs after the calculation has been complete
        	function ($this){
        		// sum the total of the $("[id^=total_item]") selector
        		var sum = $this.sum();
        		
        		$("#invoice-sub-total").text(
        			// round the results to 2 digits
        			"$" + sum.toFixed(2)
        		);
        	}
        );
        
        $("[id^=item-tax-total-]").calc(
        	// the equation to use for the calculation
        	"(subTotal * tax) / 100",
        	// define the variables used in the equation, these can be a jQuery object
        	{
        		subTotal: $("[id^=sub-total-]"),
        		tax: $("input[id^=tax-]")
        	},
        	// define the formatting callback, the results of the calculation are passed to this function
        	function (s){
        		// return the number as a dollar amount
        		return "$" + s.toFixed(2);
        	},
        	// define the finish callback, this runs after the calculation has been complete
        	function ($this){
        		// sum the total of the $("[id^=total_item]") selector
        		var sum = $this.sum();
        		
        		$("#invoice-tax-total").text(
        			// round the results to 2 digits
        			"$" + sum.toFixed(2)
        		);
        	}
        );
        
        $("#invoice-sub-total, #invoice-tax-total").sum({
            selector: "#invoice-total",
            oncalc: function (value, settings){
        		// you can use this callback to format values
        		$(settings.selector).html("$" + value);
        	}
        });
    }
});