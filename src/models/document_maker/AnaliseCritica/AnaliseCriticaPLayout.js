 function generatorACP(nup, itens1, itens2, providers, namesAnaliseCritica, nameAnaliseCritica, percentage,dayAnaliseCritica, monthAnaliseCritica, 
    yearAnaliseCritica, objectName, var111, var112, var113, var114, var115, var311, var312){

        const docDefinitions = {
            content: [
                {image: './public/img/blazon.png',width:66, heigh: 99, alignment: 'center', margin: [1,1,1,4]},
                {                
                    text: [
                        'MINISTÉRIO DA DEFESA\n',
                        'EXÉRCITO BRASILEIRO\n',
                        'ARSENAL DE GUERRA DE SÃO PAULO\n\n\n',
                        'ANÁLISE CRÍTICA DA PESQUISA DE PREÇOS\n',
                        {text: `(Processo Administrativo n° ${nup})\n\n\n`, bold: false}			
                        ],
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: [
                        {text: `Objeto: ${objectName}.\n\n`, bold: true},
                        {text: `1.   PARÂMETROS UTILIZADOS PARA A REALIZAÇÃO DA PESQUISA DE PREÇOS\n\n`, bold: true},
                        {text: `1.1  Parâmetros utilizados\n\n`, bold: true},
                        ],
                        style: 'defaultStyle'
                },
                {text: [{text: 'À   luz   do   que   prescreve  a   Portaria  SEGES/ME  Nº  938,  de  2  de  fevereiro  de   2022,  a  Instrução'}],style: 'paragraph'},
                {text: [{text: `${var111}, que dispõe sobre os procedimentos administrativos básicos para a realização de pesquisa de preços para aquisição de bens e contratação de serviços em geral, ${var112}${itens1}.`}],style: 'defaultStyle'},
                
                {text: [{text: `Em   seguida,   foi   utilizada   a   pesquisa    publicada    em    mídia    especializada,    sítios     eletrônicos`}],style: 'paragraph'},
                {text: [{text: `especializados ou de domínio amplo para apurar preços de mercado. ${var113}${var114}${itens2} ${var115}`}],style: 'defaultStyle'},
                {text: [{text: `Por  fim, foram  realizadas  buscas  em  sítios  eletrônicos  de  domínio amplo  a fim  de obter  contatos  de`}],style: 'paragraph'},
                {text: [{text: `empresas fornecedoras dos itens em questão, com o intuito de serem realizadas cotações diretas. Tal busca resultou no contato de fornecedores, que em sua maioria responderam a solicitação em tempo hábil.`}],style: 'defaultStyle'},
                {
                    text: [
                         {text: `\n\n1.2.  Cotação por meio de fornecedores\n\n`, bold: true},
                            {text: `1.2.1  Critérios para a seleção dos fornecedores para a solicitação de cotação\n\n`, bold: true},
                            {text: 'Para a seleção dos fornecedores para a solicitação de cotação, foram escolhidas empresas do ramo do objeto. De todas as empresas consultadas, obteve-se resposta apenas das que estão listadas abaixo:\n\n'}
                        ],
                        style: 'defaultStyle'
                },
                providers,
                {
                    text: [
                        {text: `2.   METODOLOGIA UTILIZADA PARA OBTENÇÃO DO PREÇO DE REFERÊNCIA\n\n`, bold: true},
                        {text: `2.1  Metodologia\n`, bold: true},
                        'A fim de determinar o real valor de mercado para cada um dos itens do presente objeto, executou-se a seguinte metodologia:\n\
 1° passo: excluiu-se o maior e o menor valor de cada um dos itens, obtendo-se em seguida a média aritmética dos preços restantes.\
 Contextualizando: p (menor preço); P (maior preço); x1, x2 e x3 (preços intermediários)'
                        ],
                        style:'defaultStyle'
                    
                },
                {image: './public/img/method1.png',width:70.5, heigh: 17.25, alignment: 'center', margin: [1,1,1,1]},
                {image: './public/img/method2.png',width:89.25, heigh: 43.5, alignment: 'center', margin: [1,1,1,8]},                
                {
                    text: [ //implantar possibilidade de alteração nas porcentagens
                        `2° passo: multiplicou-se a média obtida no passo anterior por ${percentage[0]}, obtendo-se assim os valores máximo e mínimo\
 admitidos para este item.`
                        ],
                        style: 'defaultStyle'
                },
                {image: './public/img/method3.png',width:172.5, heigh: 78, alignment: 'center', margin: [1,1,1,8]}, 
                {
                    text: [
                        '3° passo: exclui-se os preços que são maiores que o valor máximo obtido no passo anterior (excessivamente elevados),\
 bem como os que são menores que o valor mínimo obtido no mesmo passo (não praticáveis no mercado).\
 4° passo: calculou-se a média aritmética de cada um dos itens desconsiderando os valores não praticáveis no mercado\
 e os excessivamente elevados, obtendo-se assim o valor de referência de cada um.\
 Contextualizando: consideraremos a título de exemplificação que:'
                        ],
                        style: 'defaultStyle'
                },                
                {image: './public/img/method4.png',alignment: 'center', margin: [1,1,1,8]}, 
                {
                    text: [
                        'Logo, o valor de referência (VR) é obtido da seguinte forma:'
                        ],
                        style: 'defaultStyle'
                },
                {image: './public/img/method5.png',alignment: 'center', margin: [1,1,1,8]},
                {
                    text: [ //implantar possibilidade de alteração nas porcentagens
                        `Vale ressaltar que os valores máximo e mínimo obtidos da média (${percentage[1]}, respectivamente), são critérios estabelecidos\
 por este militar com a finalidade de dirimir quaisquer práticas de preços superfaturados e/ou subfaturados.\n\n` 
                        ],
                        style: 'defaultStyle'
                },
                //paragrafo 3, se for o caso
                {
                    text: [
                        {text: `3.   ANÁLISE DOS PREÇOS COLETADOS\n\n`, bold: true},
                        {text: '3.1  Demonstração da metodologia aplicada aos preços\n\n', bold: true},
                        `Aplicando a metodologia definida no tópico anterior, ${var311} ${var312}\n\n\n`,
                        ],
                        style:'defaultStyle'
                    
                },
                {
                    text: [
                        {text: `4.   CONCLUSÃO\n\n`, bold: true},
                        'Conclui-se, portanto, que os presentes procedimentos para a realização de pesquisa de preços forneceram os parâmetros para a \
 Administração avaliar a compatibilidade das propostas ofertadas pelos licitantes com os preços praticados no mercado e \
 verificar a razoabilidade do valor a ser investido, afastando a prática de atos possivelmente antieconômicos.\n\n\n',
                        {text: 'DECLARAÇÃO DE LEGALIDADE DAS PESQUISAS\n\n', bold: true},
                        'Eu, ',
                        nameAnaliseCritica,
                        {text: 'declaro que\n'},
                        {text: 'a.  as pesquisas apresentadas para compor o presente processo de contratação foram providenciadas exclusivamente\
por mim ou por militares sob minha supervisão;\n'},
                        {text: 'b.  não tentei, por qualquer meio ou por qualquer pessoa, influenciar no valor das pesquisas apresentadas;\n'},
                        {text: 'c.  o conteúdo e valor das pesquisas apresentadas são verdadeiros e espelham o conteúdo existente nos meios \
utilizados ou nas propostas firmadas pelas empresas consultadas;\n'},
                        {text: 'd.  os valores das pesquisas apresentadas de qualquer empresa não foram, no todo ou em parte,\
 direta ou indiretamente,  informados, discutidos ou divulgados a qualquer outra empresa  participante do processo de cotação; e\n'},
                        {text: 'e.  estou plenamente ciente do teor e da extensão desta declaração e detenho plenos poderes e informações para firmá-la.\n\n\n\n'},
                        
                        ],
                        style:'defaultStyle'
                    
                },
                {
                    text:[
                        `Barueri - SP, ${dayAnaliseCritica} de ${monthAnaliseCritica} de ${yearAnaliseCritica}.\n\n\n\n\n\n\n\n\n`                        
                        ],
                        style: 'defaultStyle',
                        alignment: 'center'
                },
                namesAnaliseCritica
                
            ],
            styles: {
                header: {
                    font: 'Helvetica',
                    fontSize: 10,
                    bold: true,
                    alignment: 'center'
                },
                defaultStyle: {
                    font: 'Helvetica',
                    margin: [ 1, 1, 1, 1 ],
                    fontSize: 10,
                    alignment: 'justify',
                    bold: false
                },
                paragraph:{
                    font: 'Helvetica',
                    margin: [ 40, 1, 1, 1 ],
                    fontSize: 10,
                    alignment: 'justify',
                    bold: false
                },
                subItem:{
                    font: 'Helvetica',
                    margin: [ 79, 1, 1, 1 ],
                    fontSize: 10,
                    alignment: 'justify',
                    bold: false
                },
                innerTable:{
                    font: 'Helvetica',
                    margin: [1,10,1,10],
                    fontSize: 10,
                    alignment: 'center',
                    bold: true
                }
            }
    
        }

        return docDefinitions;
    }

    module.exports = generatorACP
