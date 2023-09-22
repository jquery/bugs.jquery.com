// Won't work
$('.animateme-1').animate(
    { width: "90%" },
    {queue: false, duration: 1000},
     "swing",
    function() {
        alert("done - 1");
    }
)

// Works
$('.animateme-2').animate(
    { width: "90%" },
    1000,
     "swing",
    function() {
        alert("done - 2");
    }
)