<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Login.aspx.vb" Inherits="chat_Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="smLogin" runat="server"></asp:ScriptManager>
        
        <asp:Label runat="server">Usuário:</asp:Label><asp:TextBox ID="txtLogin" runat="server"></asp:TextBox><br />
        <asp:Label ID="Label1" runat="server">Senha:</asp:Label><asp:TextBox ID="txtSenha" TextMode="Password" runat="server"></asp:TextBox>
        <br />
        <asp:ImageButton ID="btnEntrar" ImageUrl="../img/images/Chat/btnEntrar.png" runat="server" />
        <br />
        <div id="divErro" runat="server"></div>
    </div>
    </form>
</body>
</html>
