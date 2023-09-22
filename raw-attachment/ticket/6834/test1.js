 $(document).ready(function(){
    QUnit.log = function(result, message)
   {
    if (window.console && window.console.log)
    {
      window.console.log(result +' :: '+ message);
    }
   };
   module("param Unit Test");
    test("param test", function()
    {
       expect(1);
       var input = "ab+ba";
       var result = $.deparam(input);
       //var deObj = $.deparam(result, false);
       //equals(input, deobj, 'Expected deparam get ab+ba as the result, result was: ' + deObj);
       equals(result, 'ab+ba');
    });
  });
  
  
