const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CA =  new Schema({
    _id:{
        type: String,
        required: true
    },
    text:{
        type: String
    },
    object:{
        type: Object
    }
});

mongoose.model('certificadodeadocao', CA);


/*mongoose.Promise =  global.Promise;
mongoose.connect('mongodb://localhost/licitacao').then(() => {
    console.log('Conected to Database');
}).catch((e) => {
    console.log('Erro: ' + e);
});

let var14,var62,var1111,var12 
var14 =var62 = var1111 = var12= mongoose.model('certificadodeadocao')


new var14({
    _id: '1.4',
    object: {text: 'Itens 1.2 a 1.4 - os tópicos não se aplicam ao objeto do presente processo, já que os itens não ultrapassam, individualmente, o valor de R$ 80.000,00 e/ou suas divisões ultrapassam a quantidade de 25%; \n\n'}   
}).save()

new var62({
    _id: '6.2',
    object: {text: 'Item 6.2 – o objeto não envolve produto perecível;\n\n' }   
}).save()

new var1111({
    _id: '11.1.1',
    object: {text: 'tem 11.1.1 - o tópico não se aplica ao objeto do presente processo, já que os itens não ultrapassam, individualmente, o valor de R$ 176.000,00;\n\n'}
}).save()

new var12({
    _id: '12',
    object: {text: 'Item 12 – não será utilizada a antecipação do pagamento;\n\n'}
}).save()*/


