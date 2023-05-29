jQuery.fn.index = function(elem){

  // legacy implementation
  if ( typeof elem === 'object'){
    return jQuery.inArray(
              elem && elem.jquery ? elem[0] : elem
             , this );
  }
  //return the index of the element in a new jQuery obj from selector or by default, amongst its own siblings.
  return jQuery.inArray(this[0],
            elem ? jQuery(elem) : this.parent().children() );

}; 