<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IEnumerable<IGrouping<string, SystemTask>>>" %>
<%@ Import Namespace="WIRED.Core.Entities.System" %>

<script type="text/javascript">

    $(document).ready(function() {
        alert("step1");

        CreateUserView.InitList();
    });

    var CreateUserView = function() {
        var SelectedRole = "";

        function InitResourceList() {

            alert("step2");

            $('#CreateTeamLocalResourceList').dialog({
                autoOpen: false,
                width: 500,
                modal: true,
                resizable: false,
                buttons: {
                    "Cancel": function() {
                        $(this).dialog("close");
                    },
                    "Select": function() {
                        var selectedValue = $('#resourceList').getGridParam('selrow');
                        var selectRowData = $('#resourceList').getRowData(selectedValue);

                        if (jQuery.trim(selectedValue) == '') {
                            alert('Please select a repsonsible person');
                        }
                        else {
                            $('#txt' + SelectedRole + 'User').val(selectRowData.Name);
                            $('#txt' + SelectedRole + 'Username').val(selectRowData.Username);
                        }

                        $(this).dialog("close");
                    }
                }
            });
        }

        function RequestLocalResource(role) {
            SelectedUser = role;
            $("#CreateTeamLocalResourceList").dialog('open');
        }

        function RequestRemoteResource(role) {
        }

        return {
            InitList: InitResourceList,
            RequestLocal: RequestLocalResource,
            RequestRemote: RequestRemoteResource
        }
    } ();
</script>

<div id="CreateTeam">
    <p>
        <label for="TeamName">
            Team Name:</label>
        <%= Html.TextBox("TeamName", "")%>
        <%= Html.ValidationMessage("TeamName", "*")%>
    </p>
    <table>
        <thead>
            <tr>
                <th>
                    Role
                </th>
                <th>
                    Responsible
                </th>
                <th>
                    Resource
                </th>
            </tr>
        </thead>
        <%
            foreach (var role in Model)
            {
        %>
        <tr>
            <td>
                <label for="">
                    <%= Html.Encode(role.Key) %>
                </label>
            </td>
            <td>
                <input id="<%= string.Format("txt{0}User", Html.Encode(role.Key)) %> " type="text"
                    value="" />
                <%= Html.Hidden(string.Format("txt{0}Username", Html.Encode(role.Key)))%>
            </td>
            <td>
                <input id="requestLocalResource" onclick="CreateUserView.RequestLocalResource('<%= Html.Encode(role.Key) %>');"
                    type="Button" value="Local..." />
                <input id="requestRemoteResource" onclick="CreateUserView.RequestRemoteResource('<%= Html.Encode(role.Key) %>');"
                    type="Button" value="Remote..." />
            </td>
        </tr>
        <%  } %>
    </table>
</div>
<div id="CreateTeamLocalResourceList">
    <% Html.RenderPartial("~/Views/PartialViews/ResourceList.ascx"); %>
</div>
<div id="CreateTeamRemoteResourceList">
</div>
