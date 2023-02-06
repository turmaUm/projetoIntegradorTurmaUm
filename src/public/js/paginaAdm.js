window.addEventListener('load', function(){
    
    let botao = document.getElementById('botao');
    let tagAside = document.querySelector('aside');
    let classeMobile = document.querySelector('.mobile');

    botao.addEventListener('click', function(){
        
        if(tagAside.style.display == 'none'){
            tagAside.style.display='block';
            classeMobile.style.position='fixed'
            classeMobile.style.left = '20%'
        }
        else{
            tagAside.style.display='none';
            classeMobile.style.position=''
            classeMobile.style.left = '0'
        }
        
    })
    


})