document.getElementById('tabPadrao').click();

function abrirTab(event, idtab){
    var conteudos = document.getElementsByClassName('tabcontent');
    for (var i = 0; i < conteudos.length; i++){
        conteudos[i].style.display = 'none'
    }

    var tabs = document.getElementsByClassName('tab-button');
    for (var i = 0; i < tabs.length; i++){
        tabs[i].className = tabs[i].className.replace('ativo', '')
    }

    document.getElementById(idtab).style.display = 'block'
    event.currentTarget.className += ' ativo'
}