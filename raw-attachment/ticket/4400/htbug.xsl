<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:pn="http://www.plezanje.net/climbing">

<xsl:output method="html" encoding="utf-8"
  doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" 
  doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/>

<xsl:template match="/">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
      <script type='text/javascript' src='jquery-1.3.2.js'></script>
    </head>
    <body>
      <p class="para" id="add_top"><a href="#" onclick='alert(this.nodeName)' pn:id='123' class='ref'>Click top element</a></p>
      <table>
        <xsl:apply-templates select="//elem" />
      </table>
      <script>$(function() { alert("root nodeName="+document.documentElement.nodeName+" "+$('p.para a.ref').length);})</script>
    </body>
  </html>
</xsl:template>

<xsl:template match="elem">
  <tr>
    <td><xsl:value-of select="@name" /></td>
    <td><p class="para" id="add_{@id}"><a href="#" onclick='alert(this.nodeName)' pn:id='123' class='ref'>Click table element</a></p></td>
  </tr>
</xsl:template>

</xsl:stylesheet>
