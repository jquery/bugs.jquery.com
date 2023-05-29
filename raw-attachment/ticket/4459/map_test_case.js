      $(document).ready(function(){
        
        var test_obj = { 0:'zero', 1:'one' };
        var test_arr = [ 'zero', 'one' ];
        
        $.map(test_arr, function (n, i) {
          alert('I\'m iterating (array)!');
        });
        $.map(test_obj, function (n, i) {
          alert('I\'m iterating (object)!');
        });
      
      });
