<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version='1.0'
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  xmlns='http://www.w3.org/1999/xhtml'>
<xsl:output method='html' encoding='utf-8' indent='no'
  doctype-public='-//W3C//DTD XHTML 1.0 Strict//EN'
  doctype-system='http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'/>

<xsl:template match='/'>
  <html>
    <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
      <script type='text/javascript' src='jquery-1.3.js'></script>
      <script type='text/javascript' src='script.js'></script>
    </head>
    <body>
      <div id='div'>
        <span class='span'>1st span</span>
      </div>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
