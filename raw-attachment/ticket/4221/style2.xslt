<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" encoding="utf-8" indent="yes" doctype-system= "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"
   doctype-public="-//W3C//DTD XHTML 1.1//EN"/>

  <xsl:template match="/test">
    <html>
      <head>
        <meta http-equiv="content-type" content="application/xhtml+xml; charset=utf-8"/>
        <title>Test</title>
        <script type="text/javascript">
            showHello=function() {
              alert(&quot;Hello world!&quot;);
            };
        </script>
      </head>
      <body onload="showHello()">
        Test text
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>