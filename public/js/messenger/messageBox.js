(function readyJS(win, doc){    
    'use strict';
    
    const mainDiv = doc.getElementById('messagelist');
    const index = doc.getElementById('searchindex');
    const handleM = doc.getElementById('handlemessage');
    const search =  doc.getElementById('search');
    const typeSearch = doc.getElementById('typeofsearch');
    const handleArrow =  doc.getElementById('handle');
    const searchArrow = doc.getElementById('searcharrow');
    const back = document.getElementById('searchback');
    const next = document.getElementById('searchnext');
    const message = 15 

    search.addEventListener('keyup', () => {        
        handleM.setAttribute('class', 'display_none');
        handleArrow.setAttribute('class', 'flexorientation--spaceb display_none');
        searchArrow.setAttribute('class', 'flexorientation--spaceb');

        index.innerHTML = 1;
        index.setAttribute('style', 'margin-top: 35px')
        let ajax =  new XMLHttpRequest();
        let params1 = `type=${typeSearch.value}&search=${search.value}`;           
        
        ajax.open('POST', `${document.URL.slice(0, -3)}/search${String(index.innerHTML -1).padStart(3, 0)}`);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function(){
            if(ajax.status === 200 && ajax.readyState === 4){
                next.setAttribute('class', 'arrow_disabled');
                back.setAttribute('class', 'arrow_disabled');   
                while(mainDiv.childNodes.length > 0){                                                                             
                    mainDiv.removeChild(mainDiv.firstChild);                       
                }                      
                let data = JSON.parse(ajax.responseText);
                for(let i of data.messages){
                    mainDiv.appendChild(createList(i));
                }                    
            
                if(data.count -(index.innerHTML * message) > 0){
                    next.setAttribute('class', 'arrow');                        
                }                                                
            }    
        };
        ajax.send(params1);
    });

    next.addEventListener('click', () => {        
        if(next.className == 'arrow'){
            let ajaxNext =  new XMLHttpRequest();
            let params1 = `type=${typeSearch.value}&search=${search.value}`;       
            ajaxNext.open('POST', `${document.URL.slice(0, -3)}/search${String(index.innerHTML).padStart(3, 0)}`);
            ajaxNext.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajaxNext.onreadystatechange = function(){                                
                if(ajaxNext.status === 200 && ajaxNext.readyState === 4){
                    index.innerHTML = parseInt(index.innerHTML)+ 1;                                   
                    let data = JSON.parse(ajaxNext.responseText);
                    while(mainDiv.childNodes.length > 0){                                                                             
                        mainDiv.removeChild(mainDiv.firstChild);                       
                    }                                                   
                    for(let i of data.messages){
                        mainDiv.appendChild(createList(i));
                    }
                    if(index.innerHTML > 1){
                        back.setAttribute('class', 'arrow');                        
                    }
                    if(data.count -(index.innerHTML * message) <= 0){
                        next.setAttribute('class', 'arrow_disabled');                      
                    }
                }                                
            }
            ajaxNext.send(params1);
        }       
    });

    back.addEventListener('click', () => {        
        if(back.className == 'arrow'){
            let ajaxBack =  new XMLHttpRequest();
            let params1 = `type=${typeSearch.value}&search=${search.value}`;      
            ajaxBack.open('POST', `${document.URL.slice(0, -3)}/search${String(index.innerHTML -2).padStart(3, 0)}`);
            ajaxBack.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajaxBack.onreadystatechange = function(){                                
                if(ajaxBack.status === 200 && ajaxBack.readyState === 4){
                    index.innerHTML = parseInt(index.innerHTML) -1;                                   
                    let data = JSON.parse(ajaxBack.responseText);

                    while(mainDiv.childNodes.length > 0){                                                                             
                        mainDiv.removeChild(mainDiv.firstChild);                       
                    }

                    for(let i of data.messages){
                        mainDiv.appendChild(createList(i));
                    }                   
                    if(index.innerHTML = 1){
                        back.setAttribute('class', 'arrow_disabled');                        
                    }
                    if(20 -(index.innerHTML * message) > 0){
                        next.setAttribute('class', 'arrow');                        
                    }
                }                                
            }
            ajaxBack.send(params1);
        }       
    });   
       

})(window, document)

function createList(element){
    let a = document.createElement('a');
    let divFather = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    let delForm = document.createElement('form');
    let label1 = document.createElement('label');
    let label2 = document.createElement('label');
    let label3 = document.createElement('label');
    let label4 = document.createElement('label');
    let delButton =  document.createElement('button');
    let delImg =  document.createElement('img');

    a.setAttribute('href', `${document.URL.slice(0, -3)}/${element._id}`);
    a.setAttribute('class', 'message_style');

    divFather.setAttribute('class', 'flexorientation--spaceb list_iten');

    div1.setAttribute('class', 'messenger_body');
    
    div2.setAttribute('class', 'messenger_body');
    div3.setAttribute('class', 'messenger_body');
    div4.setAttribute('class', 'messenger_body');
    delForm.setAttribute('method', 'POST');
    delForm.setAttribute('action', `${document.URL.slice(0, -3)}/${element._id}/delete`)
    
    label1.innerHTML = element.title;
    label2.innerHTML = element.process_title;
    label3.innerHTML = element.section_receiver;
    label4.innerHTML = element.date;
    div1.appendChild(label1);
    div2.appendChild(label2);
    div3.appendChild(label3);
    div4.appendChild(label4);

    delButton.setAttribute('class', 'redbutton');
    delButton.setAttribute('style', 'margin-top: 0px; margin-left: 20px;');
    delImg.setAttribute('src', '/img/trash.png');
    delImg.setAttribute('style', 'height: 16px;');
    delButton.appendChild(delImg);
    delForm.appendChild(delButton);    
    
    divFather.appendChild(div1);divFather.appendChild(div1);divFather.appendChild(div1);
    divFather.appendChild(div2);
    divFather.appendChild(div3);
    divFather.appendChild(div4);
    divFather.appendChild(delForm);
    a.appendChild(divFather);
    return a
}