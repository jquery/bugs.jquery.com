Imports System.Data
Imports System.Data.SqlClient

Partial Class chat_Chat
    Inherits System.Web.UI.Page

    Dim classCriptografia As New classCriptografia()
    Dim classChat As New classChat()


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Not Page.IsPostBack Then

            lblDe.Text = classCriptografia.Descriptografar(Request.QueryString("nom"), "#!$a36?@")
            classChat.InsereMsg(Session("HoraEntrada"), lblDe.Text, "", "", " entrou na sala...")
            classChat.InsereUsuario(lblDe.Text)
            smChat.RegisterAsyncPostBackControl(btnEnviar)
            classChat.CarregaUser(xdsUser, ltvUser)

        End If

    End Sub

    Protected Sub timMSG_Tick(ByVal sender As Object, ByVal e As System.EventArgs) Handles timMSG.Tick

        classChat.LerXML(lblDe.Text, DateTime.Parse(Session("HoraEntrada")), msgChat)

    End Sub

    Protected Sub btnEnviar_Click(ByVal sender As Object, ByVal e As System.Web.UI.ImageClickEventArgs) Handles btnEnviar.Click

        Dim tipo As String = Nothing
        If cbReservado.Checked Then

            tipo = "<b>(reservadamente)</b>"

        End If

        'O QUE O USUÁRIO DIGITOU VAI SER ACRESCIDO NO OBJETO Application ["msg"]
        classChat.InsereMsg(DateTime.Now, lblDe.Text, tipo & " fala para ", " teste" & ": ", txtMsg.Text)
        txtMsg.Text = ""

    End Sub

End Class
