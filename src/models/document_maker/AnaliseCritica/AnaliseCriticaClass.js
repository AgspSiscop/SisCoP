const generatorACPP = require('./AnaliseCriticaPPLayout');
const generatorACI =  require('./AnaliseCriticaILayout');
const generatorACP = require('./AnaliseCriticaPLayout');
const generatorACParam = require('./AnaliseCriticaParamLayout')


class AC { 
    
    static getValues(body){
        if(body.nup != undefined){
            this.nup = body.nup;
            this.object = body.object;
            this.resp = this.#getResp(body);
            this.PResp  = this.#getPResp(body);
            this.day = body.dayp;
            this.month = body.monthp;
            this.year = body.yearp;                  
        }
        if(body.graphic != undefined){
            this.graphic = body.graphic
            this.review = body.review
        }
        if(body.providersqnt != undefined){ //refactor this with #getproviders
            this.providersArray = []                   
            for(let i = 1; i <= body.providersqnt; i++){                              
                this.providersArray.push({text:[{ text: `1.2.1.${i}   `, bold: true },{text: `${body['pname'+i]}`}], style: 'paragraph' });
                this.providersArray.push({text:[{ text: `Endereço: ${body['paddress' +i]} - CEP: ${body['pcep'+i]}\n`}, {text: `Telefone: ${body['ptel'+i]}\n`}, {text: `CNPJ: ${body['pcnpj'+i]}\n\n`}],style: 'subItem'})
            }
        }        
    }

    static getMap(object){

        this.map = object        
        for(let i = this.map.Mapa.length -1; i >= 5; i--){
            if(Object.keys(this.map.Mapa[i])[0] !== 'MAPA COMPARATIVO E ANÁLISE CRÍTICA DOS ORÇAMENTOS'){                
                this.map.Mapa.pop();
            }
        }        
        this.columnsPublic = this.#columnsPublic(this.map);
        this.columnsInternet =  this.#columnsInternet(this.map);
        this.columnsProvider = this.#columnsProvider(this.map)
    }

    static resetValues(){          
        this.providersArray = []
    }
    
    static #getResp(body){        
        if(typeof(body.resp) === 'string'){
            return {text: [{text: `${body.resp} - ${body.resppg || null}\n`, bold: true},
            `${body.role || null}`
            ],
            style: 'defaultStyle',
            alignment: 'center'};
            
        }else{
            const respArray = [];
            if(body.resp.length == body.role.length && body.resp.length == body.resppg.length){                
                for(let i = 0; i < body.resp.length; i++){
                    respArray.push({text: `${body.resp[i]} - ${body.resppg[i] || null}\n`, bold: true})
                    respArray.push(`${body.role[i] || null}\n\n\n\n\n\n\n\n\n`)
                }
                return {text: respArray, style: 'defaultStyle', alignment: 'center'};
            }                 
        }
    }

    static #getPResp(body){
        if(typeof(body.resp) === 'string'){
            return {text: `${body.resp}, ${body.role || null}, `, bold: true}
            
        }else{
            const respArray = [];
            if(body.resp.length == body.role.length && body.resp.length == body.resppg.length){                
                return {text: `${body.resp[0]}, ${body.role[0] || null}, `, bold: true}
            }                 
        }

    }

    static #columnsPublic(){ //função que retorna o array com todos os orçamentos de internet parametro *worksheets   
       const allRows = []      
   
       for(let i = 5; i < this.map.Mapa.length; i++){
           const valueU = []        
           valueU.push(this.map.Mapa[i]['__EMPTY_4']);    
           allRows.push(valueU);              
       }   
       return allRows;
   }    
   
    static #columnsInternet(){ //função que retorna o array com todos os orçamentos de internet parametro *worksheets
       const internet = []
       const allRows = []    
       for(let i of Object.keys(this.map.Mapa[1])){
           internet.push(i)
       }
   
       let qnt = parseInt(internet[7].split('_')[3])
   
       for(let i = 5; i < this.map.Mapa.length; i++){
           const valueU = []
           for(let j = 5; j < qnt; j++){
               valueU.push(this.map.Mapa[i]['__EMPTY_'+j]);
           }
           allRows.push(valueU);                   
       }
       return allRows;
   }
   
    static #columnsProvider(){ //função que retorna o array com todos os orçamentos dos fornecedores parametro *worksheets
       const provider = []
       const allRows = []
       let valueU = []
       for(let i of Object.keys(this.map.Mapa[1])){
           provider.push(i)
       }
       let init = parseInt(provider[7].split('_')[3])
       let final = parseInt(provider[8].split('_')[3])    
   
       for(let i = 5; i < this.map.Mapa.length; i++){
           for(let j = init; j < final; j++){
               valueU.push(this.map.Mapa[i]['__EMPTY_'+j]);
           }
           allRows.push(valueU);
           valueU = [];
       }       
       return allRows;
   }   

   static #providersParam(){ // função que filtra todos os orçamentos e retorna um array com todos os itens que precisam passar pela parametrização
        let providers = this.columnsProvider;
        let column = []
        let arrayTable = []
        let table = {}
        let rows = []
        let final =[]
        for(let i = 0; i < providers[0].length; i++){
            table['column'+i] = []                
            for(let j = 0; j < providers.length; j++){            
                table['column'+i].push(providers[j][i])            
            }
        }    
        for(let i = 0; i < Object.values(table.column0).length;i++){
            for(let j = 0; j <Object.keys(table).length; j++){
                if(Object.values(table['column'+j])[i] != null){
                    column.push({line: i,column: j})
                }            
            }
            if(column.length > 2 ){
                arrayTable.push(column)
            }
            column = []
        }
        for(let i = 0; i < arrayTable.length; i++){
            for(let j = 0; j < arrayTable[i].length; j++){            
                column.push(arrayTable[i][j].column)
                if(j == 0){
                    rows.push(arrayTable[i][j].line)
                }
            }              
        }
        final.push({rows: rows})  
        arrayTable = []
        final = final.reduce((list,sub) => list.concat(sub), [])
        final[0].columns = []  
        for(let i = 0; i <Object.keys(table).length; i++){        
        if(column.filter(x => x == i).length > 2){                
                    final[0].columns.push(i)
                    final[0].columns.reduce((list,sub) => list.concat(sub), [])
        }
        }      
        return final
   }

   static #calcParam(){ //função que calcula os valores da parametrização para serem tratados na função que gera o gráfico
    let arrayP = this.#providersParam();
    let tabP = this.columnsProvider;
    let arrayV = []
    let array = []    

    for(let i = 0; i < Object.values(arrayP[0].rows).length; i++){
        for(let j = 1; j <  Object.values(arrayP[0].columns).length; j++){            
            array.push({
                value: tabP[Object.values(arrayP[0].rows)[i]][Object.values(arrayP[0].columns)[0]] / tabP[Object.values(arrayP[0].rows)[i]][Object.values(arrayP[0].columns)[j]],
                columns: 'F ' + (Object.values(arrayP[0].columns)[0]+1) + '/' + (Object.values(arrayP[0].columns)[j]+1)
            })                                  
        }
        arrayV.push({
            index: Object.values(arrayP[0].rows)[i]+1,
            values: array             
        })        
        array =[]
    }    
    return arrayV
   }   

    static #allColumns(){//recebe worksheets, função que pega todos os valores de internet e de fornecedores e retorna um array
       const columns = []
       const allRows = []    
       for(let i of Object.keys(this.map.Mapa[1])){
           columns.push(i)
       }
       
       let final = parseInt(columns[8].split('_')[3])
   
       for(let i = 5; i < this.map.Mapa.length; i++){
           const valueU = []
           for(let j = 5; j < final; j++){
               valueU.push(this.map.Mapa[i]['__EMPTY_'+j]);
           }
           allRows.push(valueU);              
       }
       return allRows
   }
   
    static #internetQnt(){ //verifica se existem 3 orçamentos validos de internet ou não e retorna um array com os indices dos que não possuem
       let itens = []
       let allitens = this.columnsInternet
       
       for(let i = 0; i < allitens.length; i++){
           let qnt = 0
           let valid = 0
           for(let j = 0; j < allitens[i].length; j++){
               if(allitens[i][j] != undefined){
                   valid++
               }
               if(allitens[i][j] > this.map.Analise[i +2].__EMPTY_5 || allitens[i][j] < this.map.Analise[i+2].__EMPTY_6){
                   qnt++
               }
           }
           if(valid - qnt < 3){
               itens.push( i +1) 
           }           
       }       
       return itens    
   }
   
    static #publicQnt(){ //FUNÇÃO  que retorna o indice dos itens publicos que forem existentes, mas se todo o processo for feito por itens publicos ele retorna um array vazio
       let itens = []
       for(let i = 5; i < this.map.Mapa.length; i++){
           if(this.map.Mapa[i]['__EMPTY_4'] != null){
               itens.push(i -4); 
           }                     
       }
       if(this.map.Mapa.length -5 == itens.length){
           itens = []
       }
       return itens
   }

    static #providerQnt(){
        const providers = this.columnsProvider;
        let qnt = []
        const maxLength = providers.reduce((max, subarray) => Math.max(max, subarray.length), 0);

        for(let i = 0; i < maxLength; i++){
            let valid = false
            for(let j = 0; j < providers.length; j++){
                if(providers[j][i] != null){
                    valid = true
                }            
            }
            if(valid == true){
                qnt.push({provider: qnt.length +1})
            }            
        }
        return qnt
    }

   static #publicValid(){ //FUNÇÃO QUE RETORNA O INDICE DOS ITENS PUBLICOS existentes
        let itens = []
        for(let i = 5; i < this.map.Mapa.length; i++){
            if(this.map.Mapa[i]['__EMPTY_4'] != null){
                itens.push(i -4); 
            }                     
        }    
        return itens
    }

    static #numberOfItens(arrayNumbers){ //*** */ função que retorna os numeros de um array tratados com ", 'e'" 
        const finalArray = []    
        if(this.columnsInternet.length == arrayNumbers.length && arrayNumbers.length > 3){
            return `de ${arrayNumbers[0].toString().padStart(2, '0')} à ${arrayNumbers[arrayNumbers.length -1].toString().padStart(2, '0')}`
        }
        
        let n = '';   
        for(let i = 0; i < arrayNumbers.length; i++){           
            n = arrayNumbers[i].toFixed().padStart(2, '0')

            if(i == arrayNumbers.length -1 && arrayNumbers.length > 1){
                finalArray.push(' e '+ n)
            }else if(i == 0){
                finalArray.push(n)
            }else{
                finalArray.push(', '+ n)
            }         
        }
        return finalArray.join('')
    }

    static #selectValuesParam(){ //função que retorna os valores dos itens que vão para parametrização 
        let arrayP = this.#providersParam();
        let tabP = this.columnsProvider;
        let arrayV = []
        let array = []    
    
        for(let i = 0; i < Object.values(arrayP[0].rows).length; i++){
            for(let j = 0; j < Object.values(arrayP[0].columns).length; j++){
                array.push({
                    value: tabP[Object.values(arrayP[0].rows)[i]][Object.values(arrayP[0].columns)[j]],
                    columns: (Object.values(arrayP[0].columns)[j]+1)
                })
            }       
            arrayV.push({
                index: Object.values(arrayP[0].rows)[i]+1,
                values: array             
            })
                    
            array =[]
        }    
        return arrayV
       }       
       
       static #generateTable(){ //função que gera a tabela com os valores da analise de parametrização
        let providersValues = this.#selectValuesParam();
        let providersValuesCalc = this.#calcParam();
        let providers = this.#providersParam(); 
        let providersQnt = Object.values(providers[0].columns).length  
        let result = [];
        let itens = [];
        let widths = [];
        let header1 = [];
        let header2 = [];   
        let columns = providersQnt * 2
        let colSpanH = providersQnt -1
        let table = {}
        if(providersQnt == 0){
            return null;
        }else{    
            for(let i = 0; i < columns; i++){
                widths.push('*')
                if(i == 0){
                    header1.push({
                        text: 'Item',
                        style: 'tableHeader',
                        rowSpan: 2,
                        alignment: 'center'
                    });
                    header2.push('')
                }else if(i > 0 && i <= providersQnt){
                    header1.push({
                        text: `Fornecedor ${providers[0].columns[i -1] +1}`,
                        style: 'tableHeader',
                        rowSpan: 2,
                        alignment: 'center'
                    });
                    header2.push('')
                }else if(i == providersQnt + 1 ){
                    header1.push({
                        text: 'Razão Entre os Preços',
                        style: 'tableHeader', 
                        colSpan: colSpanH, 
                        alignment: 'center'
                    })
                    header2.push({
                        text: `F${providers[0].columns[0]+1}/F${providers[0].columns[i - providersQnt]+1}`,
                        alignment: 'center',
                        style: 'tableHeader'
                    })           
                }else{
                    header1.push('')
                    header2.push({
                        text: `F${providers[0].columns[0]+1}/F${providers[0].columns[i - providersQnt]+1}`,
                        alignment: 'center',
                        style: 'tableHeader'
                    })
                }
            }
            result.push(header1);
            result.push(header2);
            for(let i = 0; i < providersValues.length; i++){
                for(let j = 0; j < columns; j++){
                    if(j == 0){
                        itens.push({
                            text: providersValues[i].index,
                            alignment: 'center',
                            style: 'innerTable'
                            
                        })
                    }else if(j > 0 && j <= providersQnt){
                        itens.push({
                            text: providersValues[i].values[j-1].value >= 0 ? Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(providersValues[i].values[j-1].value) : '' ,
                            alignment: 'center',
                            style: 'innerTable'
                        })
                    }else{
                        itens.push({
                            text:  providersValuesCalc[i].values[j - providersQnt-1].value >= 0 ? providersValuesCalc[i].values[j - providersQnt-1].value.toFixed(3).toString().replace('.', ',') : '',
                            alignment: 'center',
                            style: 'innerTable'
                        })
                    }
                }
                result.push(itens)
                itens = []       
            }
            table.style = 'tableExample';
            table.table = {
                widths: widths,
                headerRows: 2,
                body: result
            }           
            return table
        }    
       }    

    static #graphicArray(){ //retorna o objeto tratado para montagem do gráfico ou null se não possuir valores para parametrização
        let arrayP = this.#calcParam();    
        if(arrayP.length == 0){
            return null
        }else{
            let array = []
            let labels = []
            let label;    
            let colors = [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 102, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
            ];
            let final = {           
            datasets: []
            };
            for(let i = 0; i < Object.values(arrayP[i].values).length; i++){
                for(let j = 0; j < arrayP.length; j++){            
                    array.push(Object.values(arrayP[j].values)[i].value)
                    if(labels.length != arrayP.length){
                        labels.push('Item ' + arrayP[j].index)
                    }                                  
                }
                label = Object.values(arrayP[0].values)[i].columns
                final.datasets.push({
                    label: label,
                    data: array,
                    color: colors[i],
                    borderWidth: 6
                })            
                array = []
            }   
            final.labels = labels
            final.size = Object.keys(final).length            
            return final        
        }   
    }

    static #percentage(){ // retorna um array para preenchimento dos valores da porcentagem utilizada no processo
        let value = Object.values(this.map.Analise[0])[0]
        const array = []
    
        array.push(`${  (1 + value).toString().replace('.', ',')} e por ${(1 - value).toString().replace('.', ',')}`)
        array.push(`${(100 * (1 +value)).toFixed(0)}% e ${(100 * (1 - value)).toFixed(0)}%`)
        return array
    }   
   
    static item112(){ //item AC 1.1.2 ***
       let itens = this.columnsPublic;
       let valid = []
   
       for(let i of itens){
           if(i[0] != null){
               valid.push(i[0])
           }
       }
   
       if(valid.length == 0){
           return '1.1.2a'
       }else if(valid.length == itens.length){
           return '1.1.2c'
       }else if(valid.length == 1){
           return '1.1.2d'
       }else{
           return '1.1.2b'
       }    
   }
   
   static item113(){ //Função pra retorna o indice 1.1.3 do DB  
       let internet = this.columnsInternet;
       let publics = this.#publicValid()
       let count = 0
       for(let i = 0; i < internet.length; i++){
           for(let j of Object.values(internet[i])){
               if(j != null){
                   count++
               }
           }
       }    
       if(count == 0 && internet.length == publics.length){
        return null
       }else if(count == 0){
           return '1.1.3a'
       }else if(count == 1){
           return '1.1.3b'
       }else if(count == 2){
           return '1.1.3c'
       }else if(count == 3){
           return '1.1.3d'         
       }else{
           return '1.1.3e'
       }       
   }

   static item114(){
       let publics = this.columnsPublic
       let internet = this.#internetQnt();        
       let count = 0;

       for(let j = 0; j < internet.length; j++){
           let i = internet[j]                      

           if(publics[i -1][0] != undefined){
               count++
           }            
       }
       

       if(internet.length == count){            
           return null
       }else if(internet.length - count == 1){            
           return '1.1.4a'
       }else{            
           return '1.1.4b'
           
       }
   }

   static item115(object){
       let internet = this.#internetQnt();
       let publics = this.columnsPublic;
          
       if(internet.length == 0 || publics.length == 0){
           return null
       }else if(internet.length == 1){
           return '1.1.5a'
       }else{
           return '1.1.5b'
       }
   }
   
   static item311(){ //item AC 3.1.1*
       let allitens = this.#allColumns()
       let up = false
       let down = false  
       for(let i = 0; i < allitens.length;i++){       
           for(let j = 0; j < allitens[i].length; j++){            
               if(allitens[i][j] > this.map.Analise[i +2].__EMPTY_5){
                   up = true                
               }
               if(allitens[i][j] < this.map.Analise[i +2].__EMPTY_6){
                   down = true
               }                    
           }                 
       }       
       if(up == false && down == false){        
           return '3.1.1a'
       }else if(up == true && down == true){
           return '3.1.1b'
       }else if(up == true){
           return '3.1.1c'
       }else{
           return '3.1.1d'
       }
   }

    static item312(){        
        if(this.item311() == '3.1.1a'){
            return '3.1.2a'
        }else{
            return '3.1.2b'
        }
   }  

   static analysisParam(){ //retorna um objeto com os dados necessários para ser gerado o gráfico. Também deve ser usado como uma condição para redirecionar para pagina  de analise da parametrização ou não
    let objectGraphic = this.#graphicArray();
    let numberProviders = this.#providerQnt();
      
    if(objectGraphic == null && numberProviders.length == 0){
        return null
    }else if(objectGraphic == null && numberProviders.length > 0 ){
        return {qntproviders: numberProviders}
    }else{
        objectGraphic.qntproviders = numberProviders;        
        return objectGraphic
    }
   }

   static analysis(item){   // funcção que captura todos os valores do form e gera os dados do pdf com elas 
    let thirth = this.item113()    
    let fourth = this.item114();
    let table = this.#generateTable()
    
    if(thirth == null && fourth == null){
        return generatorACPP(this.nup,this.resp, this.PResp, this.#percentage(),this.day,this.month,this.year, this.object.toUpperCase() ,item[0].text,item[1].text
        ,item[2].text,item[3].text)
    }else if(fourth == null){
        return generatorACI(this.nup, this.#numberOfItens(this.#publicQnt()), this.resp, this.PResp,this.#percentage(),this.day,this.month,this.year,this.object.toUpperCase() ,item[0].text,item[1].text,item[2].text
        ,item[3].text,item[4].text)
    }else if(table != null){
        return generatorACParam(this.nup, this.#numberOfItens(this.#publicQnt()),this.#numberOfItens(this.#internetQnt()),
        this.providersArray,this.resp, this.PResp,table,this.graphic, this.review,this.#percentage(),this.day,this.month,this.year,this.object.toUpperCase() ,item[0].text,item[1].text,item[2].text,item[3].text,item[4].text
        ,item[5].text,item[6].text)
    }else{        
        return generatorACP(this.nup, this.#numberOfItens(this.#publicQnt()),this.#numberOfItens(this.#internetQnt()),
        this.providersArray,this.resp, this.PResp, this.#percentage(),this.day,this.month,this.year, this.object.toUpperCase() ,item[0].text,item[1].text,item[2].text,item[3].text,item[4].text
        ,item[5].text,item[6].text)
    }  
   }

}

module.exports = AC

