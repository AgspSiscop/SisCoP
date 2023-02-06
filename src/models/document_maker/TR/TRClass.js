const generatorTR = require('./TRBuysLayout');
const generatorTRSRP = require('./TRSRPBuysLayout')
const Extensive = require('../../../../public/js/General/Extensive')


class TR  {
    
    static getValues(body){
        this.nup = body.nup;
        this.resp = body.resp;
        this.role = body.role;
        this.resppg = body.resppg;
        this.object = body.object;
        this.perish = body.perish;
        this.cmdname = body.cmdname;
        this.cmdpg = body.cmdpg;
        this.acquisition = body.acquisition;
        this.process = body.process;
    }

    static getMap(object){
        this.map = object
        console.log(this.map)
        this.values = this.valuesTable()               
    }
    
    static resetValues(){
        this.nup = undefined
        this.resp = undefined
        this.role = undefined
        this.resppg = undefined;
        this.object = undefined
        this.perish = undefined
        this.cmdname = undefined
        this.cmdpg = undefined
        this.map = undefined
        this.perish = undefined   
        this.values = undefined  
        this.acquisition = undefined  
        this.process = undefined  
    }

    static valuesTable(){
        let itens = [];       
        
        for(let i = 5; i < this.map.Mapa.length; i++){            
            if(Object.keys(this.map.Mapa[i])[0] === 'MAPA COMPARATIVO E ANÁLISE CRÍTICA DOS ORÇAMENTOS'){
                let index = Object.keys(this.map.Mapa[i])
                itens.push({
                    index: this.map.Mapa[i][index[0]],
                    description: this.map.Mapa[i][index[1]],
                    catmat: this.map.Mapa[i][index[2]],
                    unit: this.map.Mapa[i][index[3]],
                    amount: this.map.Mapa[i][index[4]],
                    unitary: this.map.Mapa[i][index[index.length - 2]],
                    max: this.map.Mapa[i][index[index.length -1]]
                });
            }
        }
        return itens        
    }

    static #processCategory(){
        const process = []
        if(this.process == '0'){
            process.push('PREGÃO ELETRÔNICO')
            process.push('pregão, em sua forma eletrônica')
        }else if(this.process == '1'){
            process.push('DISPENSA ELETRÔNICA')
            process.push('dispensa, em sua forma eletrônica')
        }
        return process;
    }
    
    static #toNumber(value){
        let spacer = '.'
        let result = value.split(spacer)
        result = result.join('')
        let finalValue = result.replace(',', '.')
        return parseFloat(finalValue) 
    }
    
    static #conversion(value){
        let result = parseFloat(value)    
        return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(result)
    }
    
    static #calcMax(unit, max){        
        let result =  parseFloat(unit * max).toString()   
        return result
    }

    static #fristRowFT(index, catmat, unit, amount, valueUnitary, valueMax){
        const fristCol = {'rowSpan': 2, 'text': index, 'alignment': 'center'}
        const secondCol = {'text': catmat, 'fontSize': 10, 'alignment': 'center'}
        const thridCol = {'text': unit, 'fontSize': 10, 'alignment': 'center'}
        const fourthCol = {'text': amount, 'fontSize': 10, 'alignment': 'center'}
        const fifthCol = {'text': this.#conversion(valueUnitary), 'fontSize': 10, 'alignment': 'center'}
        const sixthCol =  {'text': this.#conversion(valueMax), 'fontSize': 10, 'alignment': 'center'}
        return [ fristCol, secondCol, thridCol, fourthCol, fifthCol, sixthCol]
   }
   
   static #secondRowFT(description){
        const fristCol = ''
        const secondCol = 'DESCRIÇÃO'
        const thridCol = {'colSpan': 4, 'text': description, 'fontSize': 10}
        const fourthCol = ''
        const fifthCol = ''
        const sixthCol =  ''
        return [ fristCol, secondCol, thridCol, fourthCol, fifthCol, sixthCol]
   }
   
   static #getItensFristTable(arrayItens){
       const tables = new Array()
       for(let a of arrayItens){
           tables.push(this.#fristRowFT(a.index, a.catmat, a.unit, a.amount, a.unitary, a.max));
           tables.push(this.#secondRowFT(a.description))        
       }
       return tables
   }
   
   static #getItensSecondTable(arrayItens){
       const tables = new Array()
       for(let a of arrayItens){
           tables.push(this.#fristRowST(a.index, a.catmat, a.unit, a.amount, a.amountMin, a.unitary, a.max));        
           tables.push(this.#secondRowST(a.description))
       }
       return tables
   }
   
   static #fristRowST(index, catmat, unit, amountMax, amountMin, valueUnitary, valueMax){
       const fristCol = {'rowSpan': 2, 'text': index, 'alignment': 'center'}
       const secondCol = {'text': catmat, 'fontSize': 10, 'alignment': 'center'}
       const thridCol = {'text': unit, 'fontSize': 10, 'alignment': 'center'}
       const fourthCol = {'text': amountMax, 'fontSize': 10, 'alignment': 'center'}
       const fifthCol = {'text': '1', 'fontSize': 10, 'alignment': 'center'}
       const sixthCol = {'text': this.#conversion(valueUnitary), 'fontSize': 10, 'alignment': 'center'}
       const seventhCol =  {'text': this.#conversion(valueMax), 'fontSize': 10, 'alignment': 'center'}
       return [ fristCol, secondCol, thridCol, fourthCol, fifthCol, sixthCol, seventhCol]
   }
   
   static #secondRowST(description){
       const fristCol = ''
       const secondCol = 'DESCRIÇÃO'
       const thridCol = {'colSpan': 5, 'text': description, 'fontSize': 10}
       const fourthCol = ''
       const fifthCol = ''
       const sixthCol =  ''
       const seventhCol =  ''
       return [ fristCol, secondCol, thridCol, fourthCol, fifthCol, sixthCol]
   }
    
    static #generateFristTable(){    
        const array = []
        const arrayq = []
        let countq = 1;
        let arrayObject = this.values;
    
        for(let i = 0; i < arrayObject.length; i++){
            let v = arrayObject[i].unitary
            let q = arrayObject[i].amount       
    
            if( q * v > 80000){ 
                let tax =  parseInt(q * 0.25)    
                let quota;            
                let quotaq;            
                let mainq;
            
                for(let c = 1; c <= tax ; c++){    
                    if((c * v) < 80000){                
                        quota = ((c/q) * 100).toFixed(2);                    
                        quotaq = c
                        mainq = q - c                                
                    }            
                }
                array.push({
                    index: (arrayObject[i].index).toString(),
                    catmat: arrayObject[i].catmat,
                    unit: arrayObject[i].unit,
                    amount: mainq.toString(),
                    unitary: arrayObject[i].unitary,
                    max: mainq * arrayObject[i].unitary,
                    description: arrayObject[i].description
                })
    
                arrayq.push({
                    index: (arrayObject.length + countq).toString(),
                    catmat: arrayObject[i].catmat,
                    unit: arrayObject[i].unit,
                    amount: quotaq.toString(),
                    unitary: arrayObject[i].unitary,
                    max: quotaq * arrayObject[i].unitary,
                    description: arrayObject[i].description + `(Cota reservada do item ${arrayObject[i].index.toString()} para ME/EPP em ${quota.toString()}%)`
                })
                countq++                 
            }else{
                array.push({
                    index: (arrayObject[i].index).toString(),
                    catmat: arrayObject[i].catmat,
                    unit: arrayObject[i].unit,
                    amount: arrayObject[i].amount.toString(),
                    unitary: arrayObject[i].unitary,
                    max: arrayObject[i].max,
                    description: arrayObject[i].description
                })
            }   
        }
        return this.#getItensFristTable(array.concat(arrayq))
        //return(array.concat(arrayq))
    }

    static generateSecondTable(){
        const array = []
        const arrayq = []
        let countq = 1;
        let arrayObject = this.values 
    
        for(let i = 0; i < arrayObject.length; i++){
            let v = arrayObject[i].unitary
            let q = arrayObject[i].amount       
    
            if( q * v > 80000){ 
                let tax =  parseInt(q * 0.25)    
                let quota;            
                let quotaq;            
                let mainq;
            
                for(let c = 1; c <= tax ; c++){    
                    if((c * v) < 80000){                
                        quota = ((c/q) * 100).toFixed(2);                    
                        quotaq = c
                        mainq = q - c                                
                    }            
                }
                array.push({
                    index: (arrayObject[i].index).toString(),
                    catmat: arrayObject[i].catmat,
                    unit: arrayObject[i].unit,
                    amount: mainq.toString(),
                    unitary: arrayObject[i].unitary,
                    max: mainq * arrayObject[i].unitary,
                    description: arrayObject[i].description
                })
    
                arrayq.push({
                    index: (arrayObject.length + countq).toString(),
                    catmat: arrayObject[i].catmat,
                    unit: arrayObject[i].unit,
                    amount: quotaq.toString(),
                    unitary: arrayObject[i].unitary,
                    max: quotaq * arrayObject[i].unitary,
                    description: arrayObject[i].description + `(Cota reservada do item ${arrayObject[i].index.toString()} para ME/EPP em ${quota.toString()}%)`
                })
                countq++                 
            }else{
                array.push({
                    index: (arrayObject[i].index).toString(),
                    catmat: arrayObject[i].catmat,
                    unit: arrayObject[i].unit,
                    amount: arrayObject[i].amount.toString(),
                    unitary: arrayObject[i].unitary,
                    max: arrayObject[i].max,
                    description: arrayObject[i].description
                })
            }    
        }
        return this.#getItensSecondTable(array.concat(arrayq))
    }

    static #getTotalValue(arrayItens){
        let total = 0    
        for(let a of arrayItens){
            total += parseFloat(a.max)
        }    
        return total;
    }
    
    static #totalValue(){
        const array = []
        const itens = this.values
        for(let i = 0; i < itens.length; i++){
            array.push({
                max: this.#calcMax(itens[i].amount, itens[i].unitary)
            })
        }
        return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(this.#getTotalValue(array))
    }   
    
    static #extensiveValue(){
        const array = []
        const itens = this.values
        for(let i = 0; i < itens.length; i++){
            array.push({
                max: this.#calcMax(itens[i].amount, itens[i].unitary)
            })
        }
        return Extensive.convertValue(this.#getTotalValue(array).toFixed(2).toString())                      
    }

    static TRDB(){
        const array = []
        let quota = false
        let comission = false
        const itens = this.values
        for(let i = 0; i < itens.length; i++){
            if(this.#calcMax(itens[i].amount, itens[i].unitary) > 80000 && itens[i].unitary < 80000 && (1/itens[i].amount) <= 0.25){
                quota = true
            } 
            if(this.#calcMax(itens[i].amount, itens[i].unitary) > 176000){
                comission = true
            }
        }
        if(quota == true){
            array.push('1.2a')
            array.push('1.3a')
            array.push('1.4a')
        }else{
            array.push('1.2b')
            array.push('1.3b')
            array.push('1.4b')
        }
        if(this.perish == 'true'){
            array[3] = '6.2a'
        }else{
            array[3] = '6.2b'
        }
        if(comission == true){
            array[4] = '11.1.1a'
        }else{
            array[4] = '11.1.1b'
        }   
        return array
    }

    static analysis(item){        
        if(this.acquisition == 'T'){
            return generatorTR(this.#processCategory(), '2022', this.nup, this.object, this.#extensiveValue(), '','',this.cmdname,this.cmdpg, this.resp, this.resppg, this.role, this.#generateFristTable(),this.#totalValue(), item[0].object, item[1].object, item[2].object, item[4].object, item[3].object)
        }else if(this.acquisition == 'S'){
            return generatorTRSRP(this.#processCategory(), '2022', this.nup, this.object, 'vinte e quatro mil', '','',this.cmdname,this.cmdpg, this.resp, this.resppg, this.role, this.#totalValue(),this.generateSecondTable(), item[0].object, item[1].object, item[2].object, item[4].object, item[3].object)
        }
    }

}


module.exports = TR