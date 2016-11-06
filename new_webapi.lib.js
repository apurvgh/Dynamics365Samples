/*
 Author : Apurv Ghai
  Description: The program has been distributed *as is* to help the community members and do not certify to be used for Production Use.

*/

src = "ClientGlobalContext.js.aspx";

function _getContext() {
    var errorMessage = "Context is not available.";
    if (typeof GetGlobalContext != "undefined")
    { return GetGlobalContext(); }
    else
    {
        if (typeof Xrm != "undefined") {
            return Xrm.Page.context;
        }
        else { throw new Error(errorMessage); }
    }
}

function UpdateAccount() {
    var clientUrl = Xrm.Page.context.getClientUrl();
    var req = new XMLHttpRequest()
    req.open("PATCH", encodeURI(clientUrl + "/api/data/v8.2/accounts(c9270348-57e6-e511-80cd-00155d4b0e09)"), true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState == 4 /* complete */) {
            req.onreadystatechange = null;
            if (this.status == 204) {

                //Confirmation Message
                Xrm.Utility.alertDialog("Done Deal")
            }
            else {
                //debugger;
                var error = JSON.parse(this.response).error;
                Xrm.Utility.alertDialog("An Error Occurred");
            }
        }
    };
    //Updating New Value
    req.send(JSON.stringify({ name: "Sample account", telephone1: "011019" }));

}

function CreateAccount() {
    var clientUrl = Xrm.Page.context.getClientUrl();
    var req = new XMLHttpRequest()
    req.open("POST", encodeURI(clientUrl + "/api/data/v8.2/accounts"), true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState == 4 /* complete */) {
            req.onreadystatechange = null;
            if (this.status == 204) {

                //Confirmation Message
                Xrm.Utility.alertDialog("Account has been created.")
            }
            else {
                debugger;
                var error = JSON.parse(this.response).error;
                Xrm.Utility.alertDialog("An Error Occurred");
            }
        }
    };
    //Updating New Value
    req.send(JSON.stringify({ name: "Contoso Account", telephone1: "701-999-0110" }));
}

function SearchAccounts() {

    var strSearch = document.getElementById("txtAccountName").value;
    var clientUrl = Xrm.Page.context.getClientUrl();
    var req = new XMLHttpRequest();
    //" + strSearch + "
    req.open("GET", encodeURI(clientUrl + "/api/data/v8.2/accounts?$select=name&$filter=contains(name,'" + strSearch + "')"));
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            req.onreadystatechange = null;
            if (this.status == 200) {
                var data = JSON.parse(this.response);
                alert(data.value.length + " account(s) found.");
                if (data && data.value) {
                    for (var accountCount = 0; accountCount < data.value.length; accountCount++) {
                        var accountName = data.value[accountCount].name;
                        var eTag = data.value[accountCount]['@odata.etag'];
                    }
                }
            }
            else {
                var error = JSON.parse(this.response).error;
                Xrm.Utility.alertDialog("An Error Occurred");
            }
        }
    };
    req.send(null);
}

