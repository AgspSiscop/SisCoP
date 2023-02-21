export const createElements = (elementName, attributes, text) => {
    const element = document.createElement(elementName);
    const attributesArray =  Object.entries(attributes);
    element.innerHTML = text || '';
    attributesArray.forEach(([key, value]) => element.setAttribute(key, value));    
    return element
}

export const createSelect = (optionsValues,optionsArray, userAtributeName, selectName, selectID) => {
    const select = document.createElement('select');
    select.name = selectName;
    select.id = selectID;
    for(let i = 0; i < optionsArray.length; i++){
        const options = document.createElement('option');
        options.value = optionsValues[i];
        options.innerHTML = optionsArray[i];
        select.appendChild(options);
        if(optionsArray[i] == userAtributeName){
            options.selected = true;
        }
    }
    return select;
}

export const createYearSelect = (optionsValues, selectName, selectID) => {
    const select = document.createElement('select');
    select.name = selectName;
    select.id = selectID;
    select.appendChild(createElements('option', {value: ''}, ''));
    for(let i = 0; i < optionsValues.length; i++){
        const options = document.createElement('option');
        options.value = optionsValues[i].year;
        options.innerHTML = optionsValues[i].year;
        select.appendChild(options);        
    }
    return select;
}

export const createMessageUsersSelect = (optionsArray, selectName, selectID) => {
    const select = document.createElement('select');
    select.name = selectName;
    select.id = selectID;
    select.appendChild(createElements('option', {value: ''}, ''))
    for(let i = 0; i < optionsArray.length; i++){
        const options = document.createElement('option');
        options.value = optionsArray[i]._id;
        options.innerHTML = `${optionsArray[i].pg} ${optionsArray[i].name} - ${optionsArray[i].section.name}`;
        select.appendChild(options);       
    }
    return select;   
}

export const createSectionsSelect = (optionsArray, sectionAtributeName,selectName, selectID) => {
    const select = document.createElement('select');
    select.name = selectName;
    select.id = selectID;
    select.appendChild(createElements('option', {value: ''}, ''))
    for(let i = 0; i < optionsArray.length; i++){
        const options = document.createElement('option');
        options.value = optionsArray[i]._id;
        options.innerHTML = optionsArray[i].name;
        select.appendChild(options);
        if(optionsArray[i]._id == sectionAtributeName){
            options.selected = true;
        }      
    }
    return select;
}

export const createMessageProcessesSelect = (optionsArray, selectName, selectID) => {
    const select = document.createElement('select');
    select.name = selectName;
    select.id = selectID
    for(let i = 0; i < optionsArray.length; i++){
        const options = document.createElement('option');
        options.value = optionsArray[i]._id;
        options.id = optionsArray[i]._id;
        options.innerHTML = optionsArray[i].title;
        select.appendChild(options);       
    }
    return select;    
}

export const clearContainer = (container) => {
    while(container.childNodes.length > 0){                                                                             
        container.removeChild(container.firstChild);                       
    }
}

export const createContainer = (elementName, attributes, elementsArray) => {
    const element = document.createElement(elementName);
    const attributesArray =  Object.entries(attributes);
    appendElements(element, elementsArray);
    attributesArray.forEach(([key, value]) => element.setAttribute(key, value));    
    return element
}

export const appendElements = (container, elementsArray) =>{
    for(let i of elementsArray){
        container.appendChild(i);
    }
}

export const setAttributes = (element, attributes) => {
    const attributesArray =  Object.entries(attributes);
    attributesArray.forEach(([key, value]) => element.setAttribute(key, value))
}