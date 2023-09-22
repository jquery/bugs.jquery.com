jQuery(document).ready(function() {
  var html = '';
  html += '<form class="the-form">';
  html +=   'silly text';
  html +=   '<img class="silly-img" src="potato.jpg"/>';
  html += '</form>';
  
  // create an unattached dom wrapped inside a jquery
  
  var dom = $(document.createElement('div')).html(html);
  var form = dom.find('.the-form');
  
  // As I read the documentation the output from the use of ':first' and 'first-child' selectors,
  // should be identical in the case of a trivial (single-element) selection set
  
  var firstElem = form.children(':first'); // ok, returns silly-img
  var firstNode = form.contents(':first'); // ok, returns 'silly text'

  firstElem = form.children(':first-child'); // ok, returns silly-img
  firstNode = form.contents(':first-child'); // fail, returns silly-img.  should return 'silly text'
};