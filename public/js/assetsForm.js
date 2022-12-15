const btnacpp = document.getElementById('acpp')
const btndxreq = document.getElementById('dxreq')
const btntr = document.getElementById('tr')
const formp = document.getElementById('formp')
const inputFile = document.getElementById('file')
const spanName = document.getElementById('filename')
const tr = document.getElementById('TR')
const ac = document.getElementById('AC')
const dfd = document.getElementById('DFD')
const ca = document.getElementById('CA');
const dr = document.getElementById('DR')

inputFile.value = '' //resets when page is reloaded


inputFile.addEventListener('change', () => {
    let text = inputFile.value.split("\\");    
    spanName.textContent = text[2];
    tr.removeAttribute('class');
    tr.setAttribute('class','button');
    ac.removeAttribute('class');
    ac.setAttribute('class','button');
    dfd.removeAttribute('class');
    dfd.setAttribute('class','button');
    ca.removeAttribute('class');
    ca.setAttribute('class','button');
    dr.removeAttribute('class');
    dr.setAttribute('class','button');

});

ac.addEventListener('click', () => {
    formp.setAttribute('action', '/montagem/analise_critica');
    formp.setAttribute('target', '_blank');
    formp.setAttribute('enctype', 'multipart/form-data');
});

tr.addEventListener('click', () => {
    formp.setAttribute('action', '/montagem/TR');
    formp.setAttribute('target', '_blank');
    formp.setAttribute('enctype', 'multipart/form-data');    
});

dfd.addEventListener('click', () => {
    formp.setAttribute('action', '/montagem/DFD');
    formp.setAttribute('target', '_blank');
    formp.setAttribute('enctype', 'multipart/form-data');    
});

ca.addEventListener('click', () => {
    formp.setAttribute('action', '/montagem/CA');
    formp.setAttribute('target', '_blank');
    formp.setAttribute('enctype', 'multipart/form-data');    
});

dr.addEventListener('click', () => {
    formp.setAttribute('action', '/montagem/DiexReq');
    formp.setAttribute('target', '_blank');
    formp.removeAttribute('enctype')
})



