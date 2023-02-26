const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnaliseCritica =  new Schema({
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

//mongoose.model('analisecritica', AnaliseCritica);

const AnaliseCriticaModel = mongoose.model('analisecritica', AnaliseCritica);

class ACDB {
    
    static async findMany(idValues){
        try {
            const elements = []
            for(let value of idValues){                
                const dbElement = await AnaliseCriticaModel.findOne({_id: value});
                if(dbElement){                    
                    elements.push(dbElement);
                }
                
            }
            return elements;
        } catch (error) {
            throw new Error(error)            
        }
    }
}

module.exports = ACDB
/*
mongoose.Promise =  global.Promise;
mongoose.connect('mongodb://localhost/licitacao').then(() => {
    console.log('Conected to Database');
}).catch((e) => {
    console.log('Erro: ' + e);
});

let var111a,var111b,var112a,var112b,var112c,var112d,var113a,var113b,var113c,var113d,var113e,var114a,var114b,var115a,var115b,var311a,var311b,var311c,var311d,var312a,var312b
var111a = var111b = var112a = var112b = var112c = var112d = var113a = var113b = var113c = var113d = var113e = var114a =
var114b = var115a = var115b = var311a = var311b = var311c = var311d = var312a = var312b = mongoose.model('analisecritica')


new var111a({
    _id: '1.1.1a',
    text: 'Normativa nº 73, de 05 de agosto de 2020'    
}).save()

new var111b({
    _id: '1.1.1b',
    text: 'Normativa SEGES/ME Nº 65, de 7 de julho de 2021'    
}).save()

new var112a({
    _id: '1.1.2a',
    text: 'foi realizada a pesquisa de preços das contratações similares da União e de outros entes públicos e não foi obtido sucesso'    
}).save()

new var112b({
    _id: '1.1.2b',
    text: 'foi realizada a pesquisa de preços das contratações similares da União e de outros entes públicos e foi obtido sucesso para os itens '    
}).save()

new var112c({
    _id: '1.1.2c',
    text: 'foi realizada a pesquisa de preços das contratações similares da União e de outros entes públicos e foi obtido sucesso, como demonstram as consultas em anexo'    
}).save()

new var112d({
    _id: '1.1.2d',
    text: 'foi realizada a pesquisa de preços das contratações similares da União e de outros entes públicos e foi obtido sucesso para o item '    
}).save()

new var113a({
    _id: '1.1.3a',
    text: 'Vale ressaltar que foram encontradas dificuldades na realização da pesquisa de preços com a modalidade supracitada, em virtude da especificidade do item em questão. Neste caso, não foi obtido nenhum orçamento de internet para o respectivo item.'    
}).save()

new var113b({
    _id: '1.1.3b',
    text: 'Os preços levantados foram de um sítio eletrônico especializado, como demonstram os orçamentos em anexo. '    
}).save()

new var113c({
    _id: '1.1.3c',
    text: 'Os preços levantados foram de dois sítios eletrônicos especializados, como demonstram os orçamentos em anexo. '    
}).save()

new var113d({
    _id: '1.1.3d',
    text: 'Os preços levantados foram de três sítios eletrônicos especializados, como demonstram os orçamentos em anexo. '    
}).save()

new var113e({
    _id: '1.1.3e',
    text: 'Os preços levantados foram de diversos sítios eletrônicos especializados, como demonstram os orçamentos em anexo. '    
}).save()

new var114a({
    _id: '1.1.4a',
    text: 'Vale ressaltar que, para o item '    
}).save()

new var114b({
    _id: '1.1.4b',
    text: 'Vale ressaltar que, para os itens '    
}).save()

new var115a({
    _id: '1.1.5a',
    text: 'foram encontradas dificuldades na realização da pesquisa de preços com a modalidade supracitada, em virtude da especificidade dos itens em questão. Neste caso, não foi obtido nenhum orçamento de internet para o respectivo item.'    
}).save()

new var115b({
    _id: '1.1.5b',
    text: 'foram encontradas dificuldades na realização da pesquisa de preços com a modalidade supracitada, em virtude da especificidade dos itens em questão. Neste caso, não foi obtido nenhum orçamento de internet para os respectivos itens.'    
}).save()

new var311a({
    _id: '3.1.1a',
    text: 'não foram encontrados preços acima do valor máximo e/ou abaixo do valor mínimo estabelecido.'    
}).save()

new var311b({
    _id: '3.1.1b',
    text: 'foram encontrados diversos preços acima do valor máximo e/ou abaixo do valor mínimo estabelecido.'    
}).save()

new var311c({
    _id: '3.1.1c',
    text: 'foram encontrados preços acima do valor máximo estabelecido.'    
}).save()

new var311d({
    _id: '3.1.1d',
    text: 'foram encontrados preços abaixo do valor mínimo estabelecido.'    
}).save()

new var312a({
    _id: '3.1.2a',
    text: 'Desta forma, foi calculada a média de cada item e obteve-se, assim, o preço de referência.'    
}).save()

new var312b({
    _id: '3.1.2b',
    text: 'Desta forma, tais valores foram excluídos e foi calculada a média de cada item com os orçamentos remanescentes e obteve-se, assim, o preço de referência.'    
}).save()
*/




