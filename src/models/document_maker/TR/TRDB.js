const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TR = new Schema({
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

mongoose.model('tr', TR);



/*
mongoose.Promise =  global.Promise;
mongoose.connect('mongodb://localhost/licitacao').then(() => {
    console.log('Conected to Database');
}).catch((e) => {
    console.log('Erro: ' + e);
});

let var12a, var12b,var13a,var13b,var14a,var14b,var62a,var62b,var1111a,var1111b;
var12a = var12b = var13a = var13b = var14a = var14b = var62a = var62b = var1111a = var1111b = mongoose.model('tr')

new var12a({
    _id: '1.2a',
    object: {text:[{text: '\n\n1.2.          Na hipótese de não haver vencedor para a cota reservada, esta poderá ser adjudicada ao vencedor da cota principal ou, diante de sua recusa, aos licitantes remanescentes, desde que pratiquem o preço do primeiro colocado da cota principal.\n\n'}]}    
}).save()

new var12b({
    _id: '1.2b',
    object: {text:[{text: '\n\n1.2.          Na hipótese de não haver vencedor para a cota reservada, esta poderá ser adjudicada ao vencedor da cota principal ou, diante de sua recusa, aos licitantes remanescentes, desde que pratiquem o preço do primeiro colocado da cota principal. ', decoration: 'lineThrough'}, {text: '(SUPRESSÃO)\n\n', bold: true , decoration: 'lineThrough'}]}    
}).save()

new var13a({
    _id: '1.3a',
    object: {text: [{ text: '1.3.         Se a mesma empresa vencer a cota reservada e a cota principal, a contratação das cotas deverá ocorrer pelo menor preço.\n\n'}]}    
}).save()

new var13b({
    _id: '1.3b',
    object: {text: [{ text: '1.3.         Se a mesma empresa vencer a cota reservada e a cota principal, a contratação das cotas deverá ocorrer pelo menor preço.  ',decoration: 'lineThrough'}, {text: '(SUPRESSÃO)\n\n', bold: true, decoration: 'lineThrough'}]}    
}).save()

new var14a({
    _id: '1.4a',
    object: {text:[{text: '1.4.         Será dada a prioridade de aquisição aos produtos das cotas reservadas quando forem adjudicados aos licitantes qualificados como microempresas ou empresas de pequeno porte, ressalvados os casos em que a cota reservada for inadequada para atender as quantidades ou as condições do pedido, conforme vier a ser decidido pela Administração, nos termos do art. 8º, §4º, do Decreto n. 8.538, de 2015.\n\n'}]}    
}).save()

new var14b({
    _id: '1.4b',
    object: {text:[{text: '1.4.         Será dada a prioridade de aquisição aos produtos das cotas reservadas quando forem adjudicados aos licitantes qualificados como microempresas ou empresas de pequeno porte, ressalvados os casos em que a cota reservada for inadequada para atender as quantidades ou as condições do pedido, conforme vier a ser decidido pela Administração, nos termos do art. 8º, §4º, do Decreto n. 8.538, de 2015.  ',decoration: 'lineThrough'}, {text: '(SUPRESSÃO)\n\n', bold: true, decoration: 'lineThrough'}]}    
}).save()

new var62a({
    _id: '6.2a',
    object: {text:[{text: '6.2.            No caso de produtos perecíveis, o prazo de validade na data da entrega não poderá ser inferior a ...... (......) (dias ou meses ou anos), ou a (metade, um terço, dois terços etc.) do prazo total recomendado pelo fabricante.\n\n'}]}     
}).save()

new var62b({
    _id: '6.2b',
    object: {text:[{text: '6.2.            No caso de produtos perecíveis, o prazo de validade na data da entrega não poderá ser inferior a ...... (......) (dias ou meses ou anos), ou a (metade, um terço, dois terços etc.) do prazo total recomendado pelo fabricante.  ', decoration: 'lineThrough'},{text: '(SUPRESSÃO)\n\n', bold: true, decoration: 'lineThrough'}]}     
}).save()

new var1111a({
    _id: '11.1.1a',
    object: {text: [{text: '11.1.1.            O recebimento de material de valor superior a R$ 176.000,00 (cento e setenta e seis mil reais) será confiado a uma comissão de, no mínimo, 3 (três) membros, designados pela autoridade competente.\n\n'}]}     
}).save()

new var1111b({
    _id: '11.1.1b',
    object: {text: [{text: '11.1.1.            O recebimento de material de valor superior a R$ 176.000,00 (cento e setenta e seis mil reais) será confiado a uma comissão de, no mínimo, 3 (três) membros, designados pela autoridade competente.  ', decoration: `lineThrough`},{text: '(SUPRESSÃO)\n\n', bold: true, decoration: 'lineThrough'}]}     
}).save()
*/
