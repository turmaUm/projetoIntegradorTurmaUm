window.addEventListener('load', function() {

    
//     document.body.onresize = function(){
//         if(document.body.clientWidth <= 600){
//             let table = document.querySelector('.table1');
//             table.style.display='none'
//             let table1 = document.querySelector('.table2');
//             table1.style.display='none'
//             let table2 = document.querySelector('.table3');
//             table2.style.display='none'
//         }

//     }

    let categorias = document.querySelectorAll('h4')
    categorias[0].addEventListener('click', function(){

        if(document.body.clientWidth < 600){
            let table = document.querySelector('.table1');
            if(table.style.display == 'none'){
                table.style.display='block'
            }else{
                table.style.display='none';
            }
            
        }
    })
    categorias[1].addEventListener('click', function(){

        if(document.body.clientWidth < 600){
            let table1 = document.querySelector('.table2');
            if(table1.style.display == 'none'){
                table1.style.display='block'
            }else{
                table1.style.display='none';
            }

        }
    })
    categorias[2].addEventListener('click', function(){
        if(document.body.clientWidth < 600){

            let table2 = document.querySelector('.table3');
            if(table2.style.display == 'none'){
                table2.style.display='block'
            }else{
                table2.style.display='none';
            }
        }
    })

    document.body.onresize = function(){
        if(document.body.clientWidth > 600){
            let table = document.querySelector('.table1');
            table.style.display='block'
            let table1 = document.querySelector('.table2');
            table1.style.display='block'
            let table2 = document.querySelector('.table3');
            table2.style.display='block'
        }else{
            let table = document.querySelector('.table1');
            table.style.display='none'
            let table1 = document.querySelector('.table2');
            table1.style.display='none'
            let table2 = document.querySelector('.table3');
            table2.style.display='none' 
        }
    }

   }

)