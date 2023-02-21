export const request = obj => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(obj.method, obj.url, true);

    if(obj.method.toUpperCase() === 'GET'){
        xhr.send();
        xhr.addEventListener('load', () =>{
            if(xhr.status === 200 && xhr.readyState === 4){                
                resolve(JSON.parse(xhr.responseText));
            }else{
                reject(xhr.statusText);
            }
        });        
    }
    
    if(obj.method.toUpperCase() === 'POST'){
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(obj.params);
        xhr.addEventListener('load', () => {
            if(xhr.status === 200 && xhr.readyState === 4){
                resolve(JSON.parse(xhr.responseText));
            }else{
                reject(xhr.statusText);
            }
        });
    }
});