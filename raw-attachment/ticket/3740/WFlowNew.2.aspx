<%@ Page Language="C#" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<script runat="server">

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>// var strcxlb = 11:草稿箱里的内容</title>

    <script src="jquery-1.2.6-vsdoc.js" type="text/javascript"></script>

    <script src="jquery-1.2.6.js" type="text/javascript"></script>

    <script src="jsUtility.js" type="text/javascript"></script>

    <script type="text/javascript">
        var pagerState = {
            ///<summary>分页器的状态</summary>
            pageSize: 10
            , currPage: 1
            , iItemCount: 0
            , pageCount: function() {
                var count = parseInt(this.iItemCount / this.pageSize);
                if (count * this.pageSize !== this.iItemCount) {  // 如果不是刚刚为整数页码
                    count++;
                }
                return count;
            }
        };
        var dateBegin = new Date();
        dateBegin.setFullYear(2000);
        var queryState = {
            /// <summary>查询数据的状态</summary>
            dateBegin: dateBegin
                , dateEnd: (new Date())
                , sgwzh: ""
                , sbt: ""
                , sflow: ""
                , spx: ""
                , sflow: ""
                , scxlb: 11      // 类别11对应草稿箱里面的内容
        }

        function pageLoad() {
        }
        $(document).ready(
        function() {
            /**
            缓存表格模板
            **/
            var rowTemplate = $("#tblDataTable>tbody>tr:eq(0)").remove().clone(true);
            $("#tblDataTable").data("rowTemplate", rowTemplate);
            /***执行请求获取Web数据 The method to get web data use ms ajax frame****/
            OAWS.GetFileList(pagerState.pageSize,
            pagerState.currPage,
            queryState.dateBegin,
            queryState.dateEnd,
            queryState.sgwzh,
            queryState.sbt,
            queryState.sflow,
            queryState.spx,
            queryState.scxlb,
            onSucess);
            /***执行请求获取Web数据 END****/
            $("#divOpDelete").mouseover(function() {
                $(this).addClass("mover");
            }).mouseout(function() {
                $(this).removeClass("mover");
            });
        });
        function onSucess(result) {
            // the right edition I change code here
            var rowTemplate = $("#tblDataTable").data("rowTemplate").clone(true);
            for (var i = 0; i < result.GongWenCollection.length; i++) {
                rowTemplate = $("#tblDataTable").data("rowTemplate").clone(true);
                var tds = rowTemplate.children("td");
                rowTemplate.children("td")
            .each(function() {
                var node = result.GongWenCollection[i][$(this).text().trim()];
                $(this).text(node);
            });
                $(rowTemplate).appendTo($("#tblDataTable>tbody"));
            }
        }
    </script>

    <style type="text/css">
        #divOpDelete /***设置divOpDelete(删除按钮的样式)***/
        {
            border: solid 1px white;
            width: 50px;
            height: 20px;
            margin: 13px 0px 0px 0px;
        }
        /*#divOpDelete img
        {
            margin-top: auto;
            margin-bottom: auto;
        }*/.mover /**获取焦点的时候的按钮的样式**/
        {
            border: solid 1px #004288;
            cursor: hand;
            background: url(images/bgBtn.jpg) repeat-x;
        }
    </style>
    <link href="../style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
            <Services>
                <asp:ServiceReference Path="~/WebService/OAWS.asmx" />
            </Services>
        </asp:ScriptManager>
    </div>
    <div id="divOpDelete">
        <img id="imgDelete" src="images/icoDel.gif" alt="删除暂存流程" />
        <span>删除</span>
    </div>
    <div id="_DivList">
        <table id="tblDataTable" width="100%" border="0" cellspacing="0" cellpadding="2">
            <colgroup>
                <col width="40" />
                <col width="40" />
                <col width="60" />
                <col width="*" />
                <col width="120" />
                <col width="135" />
            </colgroup>
            <thead>
                <tr>
                    <td class="ListTitle">
                        <input type="checkbox" id="checkbox1" name="checkbox1" title="全选" value="全选" />
                    </td>
                    <td class="ListTitle">
                        缓急
                    </td>
                    <td class="ListTitle">
                        发件人
                    </td>
                    <td class="ListTitle">
                        主题
                    </td>
                    <td class="ListTitle">
                        文号
                    </td>
                    <td class="ListTitle">
                        发件时间
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr valign="bottom">
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>
                        sHJ
                    </td>
                    <td>
                        sSender
                    </td>
                    <td>
                        sBH
                    </td>
                    <td>
                        sFWZH
                    </td>
                    <td>
                        sDateTimeReceived
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="#toolTip">
        <h3 id="#toolTip_Title">
        </h3>
        <div id="#toolTip_Body">
        </div>
        <div id="#toolTip_Footer">
        </div>
    </div>
    </form>
</body>
</html>
