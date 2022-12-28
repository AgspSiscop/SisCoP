const formm =  document.getElementById('formm');
const submit =  document.getElementById('submitformm');
const section = document.getElementById('messagesection');
const year = document.getElementById('year');


submit.addEventListener('click', () => {
    formm.setAttribute('action', '/menssageiro/nova');
    formm.setAttribute('method', 'POST');
});

year.addEventListener('change', () => {

})

function select(value){    
    for(let i of section.childNodes){
        if(i.nodeName == 'OPTION'){
            if(i.value == value){
                i.setAttribute('selected','');                                                  
            }
        }        
    }
}



