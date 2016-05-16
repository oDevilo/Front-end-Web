/**
 * Created by abc on 2016/2/18.
 */
function HttpRequest(sUrl, fpCallback){
    this.request=this.createXmlHttpRequest();
    this.request.open("GET",sUrl,true);

    var tempRequest=this.request;
    function request_readystatechange(){
        if (tempRequest.readyState==4){
            if (tempRequest.status==200){
                fpCallback(tempRequest.responseText);
            }
            else {
                alert("An error occurred trying to contact the server.");
            }
        }
    }
    this.request.onreadystatechange=request_readystatechange();
}
HttpRequest.prototype.createXmlHttpRequest=function(){
    if (window.XMLHttpRequest){
        var oHttp=new XMLHttpRequest();
        return oHttp;
    }else if(window.ActiveXObject){
        var versions=[
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.3.0"
        ];
        for(var i=0;i<versions.length;i++){
            try{
                var oHttp=new ActiveXObject(versions[i]);
                return oHttp;
            }
            catch (e){
                //do nothing
            }
        }
    }
    return null;
}
