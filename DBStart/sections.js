const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Section = new Schema ({
    name:{
        type: String,
        required: true,
        unique: true 
    },
    level:{
        type: Number,
        required: true
    }
});

mongoose.model('section', Section);

mongoose.Promise =  global.Promise;
mongoose.connect('mongodb://localhost/siscop').then(() => {
    console.log('Conected to Database');
}).catch((e) => {
    console.log('Erro: ' + e);
});

const leve1 = ['Transporte','Armamento Pesado','Armamento Leve', 'Correaria', 'STS', 'Serralheria','Linha de Blindados', 
'Comunicações', 'Óptica', 'Pelotão de Obras', 'Almoxarifado', 'Suprimento', 'Informática', 'Posto Médico',
'Divisão de Técnica', 'Divisão Industrial', 'Compania de Comando e Serviço', 'Divisão de Manutenção'];
const level2 = ['SALC','Fiscal ADM', 'Ordenador de Despesas', 'Orçamentação']
const level10 = ['ADM']

for(let section of leve1){
    let entrace = mongoose.model('section');

    new entrace({
        name: section,
        level: 1    
    }).save();
}
for(let section of level2){
    let entrace = mongoose.model('section');

    new entrace({
        name: section,
        level: 2    
    }).save();
}
for(let section of level10){
    let entrace = mongoose.model('section');

    new entrace({
        name: section,
        level: 10    
    }).save();
}
