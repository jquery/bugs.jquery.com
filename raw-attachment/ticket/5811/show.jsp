<html>

<body>
<h1><% out.println(request.getParameter("title")!=null?request.getParameter("title"):"����");%></h1>
<pre><% out.println(request.getParameter("content")!=null?request.getParameter("content"):"����");%></pre>
</body>
</html>