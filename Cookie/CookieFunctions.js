/**
 * Created by abc on 2016/2/17.
 */
function setCookie(cookieName, cookieValue, cookiePath, cookieExpires){
    cookieValue=escape(cookieValue);
    if (cookieExpires==""){
        var nowDate=new Date();
        nowDate.setMonth(nowDate.getMonth()+6);
        cookieExpires=nowDate.toUTCString();
    }
    if (cookiePath!=""){
        cookiePath=";Path="+cookiePath;
    }
    document.cookie=cookieName+"="+cookieValue+";expires="+cookieExpires
    +cookiePath;
}

function getCookieValue(cookieName){
    var cookieValue=document.cookie;
    var cookieStartAt=cookieValue.indexOf(" "+cookieName+"=");
    if (cookieStartAt==-1){
        cookieValue=null;

    }else{
        cookieStartAt=cookieValue.indexOf("=",cookieStartAt)+1;
        var cookieEndsAt=cookieValue.indexOf(";",cookieStartAt);
        if (cookieEndsAt==-1){
            cookieEndsAt=cookieValue.length;
        }
        cookieValue=unescape(cookieValue.substring(cookieStartAt,cookieEndsAt));
    }
    return cookieValue;
}