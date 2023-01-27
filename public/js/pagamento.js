function openPag(evt, FormPag){
    var i, tabContent, tablinks;
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0, i < tabContent.length; i++;) {
        tabContent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks")
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(FormPag).style.display = "block";
    evt.EventTarget.className += " active"
}