<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Chat.aspx.vb" Inherits="chat_Chat" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/Chat.css" />
    <script src="../js/jquery-1.4.2.js" type="text/javascript"></script>
      
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <asp:ScriptManager ID="smChat" runat="server"></asp:ScriptManager> 

    <div id="container">

        <asp:UpdatePanel ID="udpMSG" UpdateMode="Conditional" runat="server">
            <ContentTemplate>
                <asp:Timer ID="timMSG" Interval="500" runat="server"></asp:Timer>
                <div id="msgChat" runat="server"></div>
             </ContentTemplate>                
        </asp:UpdatePanel>    
        
        
        
                
                <div id="Usuarios" runat="server">
                    <asp:ListView ID="ltvUser" runat="server">
                        <LayoutTemplate>
                            <ul>
                                <asp:PlaceHolder ID="GroupPlaceholder" runat="server" />
                            </ul>
                        </LayoutTemplate>
                        <GroupTemplate>
                            <li runat="server" id="itemPlaceholder"></li>
                        </GroupTemplate>
                        <ItemTemplate>
                            <li><asp:LinkButton Text='<%# XPath("nickName") %>' ID="lbtUser" runat="server"><asp:Label ID="lblUser" runat="server"></asp:Label></asp:LinkButton></li>
                        </ItemTemplate>
                    </asp:ListView>               
                </div>           

                <asp:XmlDataSource ID="xdsUser" XPath="Chat/User" runat="server"></asp:XmlDataSource>

        <br /><br /><br />
        <div id="divEsquerda">
            <div>
                <asp:label ID="lblDe" runat="server" text="Rafael Fernandes D Orazio"></asp:label>
                <asp:Label ID="lblCodigoUser" runat="server" Visible="false"></asp:Label>
            </div>
        </div>
        <div id="divCentro">
            
                    <div id="nickEnvio"><asp:label ID="lblPara" runat="server">&nbsp;</asp:label></div>
            
                    <div id="msg"><asp:TextBox ID="txtMsg" CssClass="txtMsg" runat="server"></asp:TextBox></div>         
                    <asp:ImageButton ID="btnEnviar" CssClass="imgEnviar" ImageUrl="../img/images/Chat/btnEnviar.png" runat="server" />
                                
        </div>
        <div id="divDireita">
            <div id="opcoesEnvio">
                <asp:CheckBox ID="cbReservado" runat="server" /><asp:Label ID="Label1" CssClass="desgrudar" Text="Reservadamente" runat="server"></asp:Label>
                <asp:CheckBox ID="cbrolagemAutomatica" runat="server" /><asp:Label ID="Label2" CssClass="desgrudar" Text="Rolagem Automática" runat="server"></asp:Label>
            </div>
        </div>        
        
    </div>     
    
    </div>
    </form>

        <script language="javascript" type="text/javascript">

//            $(window).unload(function() {
//                //function Sair() {

//                $.ajax({
//                    type: "GET",
//                    url: "Sair.ashx",
//                    data: "user=" + document.getElementById('lblDe').innerHTML,
//                    dataType: "text",
//                    success: function(user) {
//                        alert(user);
//                        //$("#resultado").text(msg);
//                    }
//                });

//                //}
            //            });

            $(document).ready(function() {
                $(window).unload(function() {
                    $.get('Sair.ashx', { user: document.getElementById('lblDe').innerHTML });
                    alert('postget');
                });
            });

            
        </script>

</body>
</html>
