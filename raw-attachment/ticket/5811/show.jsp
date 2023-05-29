<html>

<body>
<h1><% out.println(request.getParameter("title")!=null?request.getParameter("title"):"±êÌâ");%></h1>
<pre><% out.println(request.getParameter("content")!=null?request.getParameter("content"):"ÄÚÈÝ");%></pre>
</body>
</html>