<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPageTop.master"
    CodeFile="HistoryPage2.aspx.cs" Inherits="HistoryPage2" ValidateRequest="false" %>

<%@ Register Assembly="System.Web.Extensions, Version=1.0.61025.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <title>Untitled Page</title>

    <script type="text/javascript">

     
      jQuery(document).ready(function() {
         pageloadedFirstTime = true;
          // Initialize history plugin.
          jQuery.historyInit(pageload);
          //pageload function is for callback purpose
          jQuery('[id$=hiddenFieldCurrentContainerType]').val("D");
         


          return false;

      });
      
      function LoadDetailPage(screenId, filters, hid) {
    try {
        alert(screenId);
        var ucName = "";
        if (screenId == 1)
            ucName = 'ClientDemographic.ascx';
        else if (screenId == 2)
            ucName = 'ClientInformation.ascx';
       
       
        if (ucName != "")
            jQuery.post("Default.aspx?ucName=" + ucName, 'ajaxRequest=true', loadPageCallback);
        else {
            var DivShowDetailHTML = document.getElementById("DivShowDetailHTML");
            DivShowDetailHTML.innerHTML = "";
        }
        return false;
    }
    catch (Ex) {
        alert(Ex);
    }

}


function loadPageCallback(result) {
    try {
        //Get the PageResponse Object passed through JSON and create an JSON object over here
        start = result.indexOf("##START##") + 9;
        end = result.indexOf("##END##");
        var outputHtml = result.substr(start, end - start);
        var DivShowDetailHTML = document.getElementById("DivShowDetailHTML");
        DivShowDetailHTML.innerHTML = outputHtml;
    }
    catch (ex) {
        alert(ex);
    }
}

function test() {
    alert('HI');

}


function OpenNewPage(screenId, containerType, filtersData) {
    alert(screenId);
    var hash = screenId;
    hash = hash.replace(/^.*#/, '');
    // moves to a new page. 
    // pageload is called at once.
    // hash don't contain "#", "?"
    var hid = new String();
  

    if (jQuery('[id$=hiddenFieldCurrentContainerType]').val() == containerType)
        jQuery.historyLoad(String(parseInt(hid)));
    else {
        LoadDetailPage(hash, filtersData, hid);
    }
    return false;

}

 var pageloadedFirstTime = false;
    // PageLoad function
    // This function is called when:
    // 1. after calling jQuery.historyInit();
    // 2. after calling jQuery.historyLoad();
    // 3. after pushing "Go Back" button of a browser
  //  jQuery.noConflict();
    function pageload(hid) {

        if (hid && (!pageloadedFirstTime)) {
            LoadDetailPage(screenId, filters, hid);
        } else {
            // start page
            jQuery("#DivShowDetailHTML").empty();
        }
        pageloadedFirstTime = false;

    }





    
      
    </script>

</asp:Content>
<asp:Content ContentPlaceHolderID="ContentPlaceHolderChildContents" runat="server">
    <div>
        <center>
            <span id="Span2" style="font-family: Microsoft Sans Serif; font-size: 10pt; color: #804000;">
                <b>History Prototype through JQuery.History</b></span></center>
        <br />
        <a style="cursor: pointer" onclick="javascript:OpenNewPage('1','D','ClientId=1&DocumentId=20&Version=4');">
            <font style="font-family: Microsoft Sans Serif; font-size: 8.25pt; color: #804000;">
                Load Client Demographic</font></a><br />
        <a style="cursor: pointer" onclick="OpenNewPage('2','D','ClientId=1&DocumentId=21&Version=5');">
            <font style="font-family: Microsoft Sans Serif; font-size: 8.25pt; color: #804000;">
                Load Client Information</font></a>
        <br />
        <a rel="history" style="cursor: pointer" onclick="OpenNewPage('3','L','ClientId=1&FirstName=Sonia&LastName=Dhamija');">
            <font style="font-family: Microsoft Sans Serif; font-size: 8.25pt; color: #804000;">
                Load List Page</font></a>
        <input type="text" id="textboxTest" runat="server" />
        <br />
        <span id="Span1" style="font-family: Microsoft Sans Serif; font-size: 10pt; color: #804000;">
            <b>Div HTML Container</b></span>
        <div id="DivShowDetailHTML" style="background-color: #F4F4F4; font-family: Microsoft Sans Serif;
            font-size: 10px; color: #183490; font-weight: normal;">
        </div>
        <input type="hidden" value="" id="hiddenFieldHashValue" />
        <input type="hidden" id="HiddenPageFilters" runat="server" />
    </div>
</asp:Content>
