/**
 * Created by abc on 2016/2/17.
 */
function createDocument(){
    var xmlDoc;
    if (window.ActiveXObject){
        var version=[
            "Msxml2.DOMDocument.6.0",
            "Msxml2.DOMDocument.3.0"
        ];
        for (var i=0;i<version.length;i++){
            try{
                xmlDoc=new ActiveXObject(version[i]);
                return xmlDoc;
            }
            catch (error){
                //do nothing
            }
        }
    }else if (document.implementation && document.implementation.createDocument){

            xmlDoc=document.implementation.createDocument("","",null);
            return xmlDoc;
    }
    return null;
}