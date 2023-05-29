<?php
	$raw_post = file_get_contents("php://input");
	if ($_POST) {
		?>$("#res").append(<?php
			echo json_encode(
					"raw_post:" . $raw_post . "\n" . print_r($_POST,true)
				);
		?>);<?php
		exit;
	}

?>
<?php
	if (!$_GET['fix']) {
		?><script type="text/javascript" src="js/jquery-latest.js"></script><?php
	} else {
		?><script type="text/javascript" src="js/jquery-nightly.js"></script><?php
	}
?>

<script type="text/javascript">

var array_foo = [0,1,2,[0,1,2]];
var postObj = {
  list : array_foo,
  testObj: {
             nested :{
                       nested2: "value",
                       nested3: "value"
                     }
           }
};

$.post("mda.php", postObj,
  function(dta) {

  },
  "script"
);

</script>
<pre>
<a href="mda.phps">The source to this file.</a>
<a href="js/jquery-nightly.js">jquery-nightly.js with fix.</a>
<a href="?fix=true">Show this page with the fix applyed.</a>

Code:
<pre>
var array_foo = [0,1,2,[0,1,2]];
var postObj = {
  list : array_foo,
  testObj: {
             nested :{
                       nested2: "value",
                       nested3: "value"
                     }
           }
};

$.post("mda.php", postObj,
  function(dta) {

  },
  "script"
);
</pre>

<?php
	if (!$_GET['fix']) {
		?><a href="?fix=true"><h2>Fix it</h2></a><?php
	} else {
		?><a href="?"><h2>Break it.</h2></a><?php
	}
?>
<h2>Live Test Response</h2>
<pre id="res" style='border:2px solid #000;'></pre>
<?php
if (!$_GET['fix']) {
	?><a href="?fix=true">(What you're looking at is what it shouldn't look like. Fix it by clicking this link)</a><?php
} else {
	?><a href="?">(What you're looking at is what it should look like. Break it by clicking this link)</a><?php
}
?>

<h1>Solution</h1>
<b>At line 2871 of the nightly build for 2008-05-15 I changed the param: function.</b>
<pre>
param: function( a , pn, d) {
	if (!d)
		d=0;

	var t = typeof(a);
	// We're at the end of the line so return it.
	if ((t == 'string' || t == 'number' || t == 'boolean' || t == 'undefined') && pn)
		return pn+'='+encodeURIComponent(a);

	var s = [];
	if ( (a.constructor == Array && this.name) || a.jquery )
		// Serialize the form elements
		jQuery.each( a, function(){
			s.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( this.value ) );
		});
	// Otherwise, assume that it's an object of key/value pairs
	else
		for ( var j in a ) {
			d++;
			// prevent infinite recursion.  max of 10 levels deep.
			if (d>10)
				break;
			if (!pn)
				// recurse into siblings. with this as parent.
				s.push(jQuery.param(a[j], encodeURIComponent(j),d));
				else
				// recurse into siblings.
				s.push(jQuery.param(a[j], pn+"["+encodeURIComponent(j)+"]",d));

		}
	// Return the resulting serialization
	return s.join("&").replace(/%20/g, "+");
}
</pre>

