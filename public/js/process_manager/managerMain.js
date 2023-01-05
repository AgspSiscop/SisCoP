(function readyJS(win, doc){
    'use strict';   
    
    const list =  doc.getElementById('sectionslist');
    const processList = doc.getElementById('list');
    const sectionTitle = doc.getElementById('sectiontitle');
    const searchP = doc.getElementById('searchprocess');
    const sections = ['Armamento Pesado','Armamento Leve', 'Correaria', 'STS', 'Linha de Blindados', 
    'Comunicações', 'Óptica', 'Pelotão de Obras', 'Almoxerifado', 'Suprimento', 'Informática', 'Posto Médico', 
    'Divisão de Inovação, Planejamento e Qualidade', 'Divisão Industrial', 'Compania de Comando e Serviço'];


    for(let i of sections){
        let div = doc.createElement('div');
        let label =  doc.createElement('label');

        label.innerHTML = i;
        div.setAttribute('class', 'manager_body');
        div.appendChild(label);
        list.appendChild(div);

        label.addEventListener('click', () =>{

            let ajax =  new XMLHttpRequest();
            let params = 'origin=' + label.innerHTML;
            while(processList.childNodes.length > 0){                           
                processList.removeChild(processList.firstChild);            
            }            
            
            ajax.open('POST', '/acompanharprocessos');
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajax.onreadystatechange = function(){
                if(ajax.status === 200 && ajax.readyState === 4){
                    const headerDiv =  document.createElement('div');
                    const headerArray = ['Processo', 'Forma de Aquisição', 'Status']
                    sectionTitle.innerHTML = label.innerHTML;
                    searchP.setAttribute('class', '');
                    sectionTitle.setAttribute('style', 'margin-bottom: 20px;');
                    headerDiv.setAttribute('class', 'flexorientation--spaceb');
                    headerDiv.setAttribute('style', 'margin-left:15px;')
                    processList.appendChild(headerDiv);
                    
                    for(let i of headerArray){
                        let div = document.createElement('div');
                        let label = document.createElement('label');
                        div.setAttribute('class', 'manager_header');
                        label.innerHTML = i;
                        div.appendChild(label);
                        headerDiv.appendChild(div);
                    }

                    for(let i of JSON.parse(ajax.responseText)){
                        let form = document.createElement('form');                                               
                        let div1 = document.createElement('div');
                        let div2 = document.createElement('div');
                        let div3 = document.createElement('div');
                        let element =  document.createElement('button');
                        let date = document.createElement('small');
                        let processCtg = document.createElement('label');
                        let processStatus = document.createElement('label');                        
                        let processStatusDate = document.createElement('small');
                        let notes = document.createElement('img');

                        
                        element.innerHTML = i.title;
                        element.setAttribute('class', 'transparentbutton highlighted')
                        date.innerHTML = `Inicio: ${i.date}`;
                        date.setAttribute('style', 'display: block; margin-top: 5px;');

                        if(i.status.length > 0){
                            notes.setAttribute('src', '/img/note.png');
                            notes.setAttribute('style', 'width:20px;')                            
                            processStatus.innerHTML = i.status.at(-1).state;                            
                            div3.setAttribute('title', i.status.at(-1).anotation);
                            processStatusDate.innerHTML = `Atualizado em: ${i.status.at(-1).date}`;
                            processStatusDate.setAttribute('style', 'display:block; margin-top:5px;')
                            div3.appendChild(processStatus);
                            div3.appendChild(notes);
                            div3.appendChild(processStatusDate);
                            div3.setAttribute('class', 'manager_process');
                        }else{
                            div3.appendChild(processStatus);
                            div3.appendChild(processStatusDate);
                            div3.setAttribute('class', 'manager_process');
                        }
                        
                        if(i.category){
                            processCtg.innerHTML = i.category[0].toUpperCase() + i.category.substring(1);
                        }

                        form.setAttribute('class', 'list_iten flexorientation--spaceb');

                        div1.appendChild(element);
                        div1.appendChild(date);
                        div1.setAttribute('class', 'manager_process_title');
                        div2.appendChild(processCtg);
                        div2.setAttribute('class', 'manager_process');                        
                        form.appendChild(div1);
                        form.appendChild(div2);
                        form.appendChild(div3)
                        processList.appendChild(form);

                        element.addEventListener('click', () => {
                            form.setAttribute('method', 'POST');
                            form.setAttribute('action', `/acompanharprocessos/${i._id}`)
                        })
                    }               
                }    
            };
            ajax.send(params);

        });
    }
    
    

   /*send.addEventListener('click', () => {   
    let selected =  document.getElementById(process.value) || null;
    let title;
    console.log(selected)
    if(selected ==  null){
        title = 'Menssagem sem Processo';
        formm.setAttribute('action', `/mensageiro/novasemprocesso/${title}`);         
    }else{
        title = selected.innerHTML
        formm.setAttribute('action', `/mensageiro/nova/${title}`);
    }     
   });

    year.addEventListener('change', (e) => {
        let ajax =  new XMLHttpRequest();
        let params = 'year=' + year.value;
        while(process.childNodes.length > 0){                           
            process.removeChild(process.firstChild);            
        }              
        
        ajax.open('POST', '/mensageiro/processes');
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function(){
            if(ajax.status === 200 && ajax.readyState === 4){                          
               for(let i of JSON.parse(ajax.responseText)){                
                let option = document.createElement('option');                             
                option.setAttribute('value', `${i._id}`);
                option.setAttribute('id', `${i._id}`)
                option.textContent = i.title
                process.appendChild(option);               
               }               
            }    
        };
        ajax.send(params);
    });*/

})(window, document)