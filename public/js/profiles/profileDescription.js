document.addEventListener('click', (e) => {
    const data = document.getElementById('datasform');
    const password = document.getElementById('passwordform');
    const element = e.target.id;    
    if(element === 'dataschange'){
        if(data.className == 'display_none'){
            data.className = ''
        }else{
            data.className = 'display_none';
        }
    }
    if(element === 'datasbutton'){
        data.setAttribute('method', 'POST');
        data.setAttribute('action', '/changedatas');  
    }
    if(element === 'passwordchange'){
        if(password.className == 'display_none'){
            password.className = ''
        }else{
            password.className = 'display_none';
        }
    }
    if(element === 'passwordbutton'){
        password.setAttribute('method', 'POST');
        password.setAttribute('action', '/changepassword');
    }
});

