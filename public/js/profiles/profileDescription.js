const dataChange =  document.getElementById('dataschange');
const data = document.getElementById('datasform');
const datasButton = document.getElementById('datasbutton');
const passwordChange =  document.getElementById('passwordchange');
const password = document.getElementById('passwordform');
const passwordButton = document.getElementById('passwordbutton');

dataChange.addEventListener('click', () =>{
    if(data.className == 'display_none'){
        data.className = ''
    }else{
        data.className = 'display_none';
    }
});

datasButton.addEventListener('click', () => {
    data.setAttribute('method', 'POST');
    data.setAttribute('action', '/changedatas');    
})

passwordChange.addEventListener('click', () =>{
    if(password.className == 'display_none'){
        password.className = ''
    }else{
        password.className = 'display_none';
    }
})

passwordButton.addEventListener('click', () => {
   password.setAttribute('method', 'POST');
   password.setAttribute('action', '/changepassword');
})
