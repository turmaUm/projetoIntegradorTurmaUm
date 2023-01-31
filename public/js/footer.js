window.addEventListener('load', function() {

    let categorias = document.querySelectorAll('h4')
    categorias[0].addEventListener('click', function(){

        let table = document.querySelector('.table1');
        if(table.style.display != 'none'){
            table.style.display='none'
        }else{
            table.style.display='block';
        }
    })
    categorias[1].addEventListener('click', function(){

        let table1 = document.querySelector('.table2');
        if(table1.style.display != 'none'){
            table1.style.display='none'
        }else{
            table1.style.display='block';
        }
    })
    categorias[2].addEventListener('click', function(){

        let table2 = document.querySelector('.table3');
        if(table2.style.display != 'none'){
            table2.style.display='none'
        }else{
            table2.style.display='block';
        }
    })


})