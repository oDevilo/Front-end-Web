/**
 * Created by abc on 2016/5/13.
 */
function onLoad(f) {
    if (onLoad.loaded)
        window.setTimeout(f, o);
    else if (window.addEventListener)
        window.addEventListener("load", f, false);
    else if (window.attachEvent())
        window.attachEvent("onload", f);
}
onLoad.loaded = false;
