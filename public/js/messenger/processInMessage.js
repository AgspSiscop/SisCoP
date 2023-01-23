(function readyJS(){
    'use strict';

    const process = document.getElementById('process');
    const button = document.getElementById('processbutton');
    const form = document.getElementById('processmessage');

    let ajax =  new XMLHttpRequest();
    let params = 'process=' + process.value;                   
    
    ajax.open('POST', '/mensageiro/process');
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ajax.onreadystatechange = function(){
        if(ajax.status === 200 && ajax.readyState === 4){
            const process = JSON.parse(ajax.responseText);                                                
            if(process){
                button.addEventListener('click', () => {
                    form.setAttribute('method', 'POST');
                    form.setAttribute('action', `/processosrecebidos/${process.year}/${process.transfer_dir}`);
                });                              
            }               
        }    
    };
    ajax.send(params);      

})(window, document)

