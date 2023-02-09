const handlebars = require('express-handlebars');
const hbs = handlebars.create();


hbs.handlebars.registerHelper('select', (postagem, categoria) => { //Helper, função criada para ser usada em editpostagens, para só exibir <options> que não estejam repetidos por conta do primeiro a ser exibido ser o valor do postagem e não categoria.     
    if(postagem != categoria){            
        return true;                    
    }else{          
        return false;
    }    
});

hbs.handlebars.registerHelper('pages', (count, page) =>{ //logica de criação de buttons quando exitir dados ainda para serem exibidos
let a = (parseInt(page) + 1) * 5;    
if(count >= a){
    return true;
}else{
    return false;
}
});

hbs.handlebars.registerHelper('sum', (page) => { //helper para retornar o valor que será inserido no href para o button de mudança de pagina
return  parseInt(page) + 1;
});

hbs.handlebars.registerHelper('previousPage', (page) => {
if(page > 0){
    return true;
}else{
    return false;
}
});

hbs.handlebars.registerHelper('sub', (page) => {
return parseInt(page) -1;
});

hbs.handlebars.registerHelper('admin', (level, number) => {
    if(level >= number){
        return true;
    }else{
        return false;
    }
});

hbs.handlebars.registerHelper('compareValue', (section, nameOf) => {
    
    if(section === nameOf){
        return true;
    }else{
        return false;
    }
});


module.exports = hbs;