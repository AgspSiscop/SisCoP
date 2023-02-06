const generatorCA = require('./CALayout')

 class CA{

    static getValues(body){
        this.nup = body.nup;
        this.resp = body.resp;
        this.role = body.role;
        this.resppg = body.resppg;
        this.perish = body.perish
    }

    static getMap(object){
        this.map = object
        this.values = this.#valuesTable()
    }

    static resetValues(){
        this.nup =  undefined
        this.resp = undefined
        this.role = undefined
        this.resppg = undefined
        this.perish = undefined
        this.map = undefined
        this.values = undefined
    }

    static #valuesTable(){
        let itens = []
        
        for(let i = 5; i < this.map.Mapa.length; i++){
            if(Object.keys(this.map.Mapa[i])[0] === 'MAPA COMPARATIVO E ANÁLISE CRÍTICA DOS ORÇAMENTOS'){
                let index = Object.keys(this.map.Mapa[i])
                itens.push({                
                    amount: this.map.Mapa[i][index[4]],
                    unitary: this.map.Mapa[i][index[index.length - 2]],                
                })
            }             
        }
        return itens        
    }

    static itensDB(){    
        const array = []
        const arrayq = []
        const result = []       
        let arrayObject = this.values;
        let valid = true     
    
        for(let i = 0; i < arrayObject.length; i++){
            let v = arrayObject[i].unitary
            let q = arrayObject[i].amount    
            if( q * v > 80000){ 
                array.push(i)    
                arrayq.push(i)                               
            }else{
                array.push(i)
            }
            
            if(q * v > 176000){
                valid = false
            }
        }
        
        if((array.concat(arrayq)).length == arrayObject.length){
            result.push('1.4')
        }
        if(this.perish == 'false'){
            result.push('6.2')
        }
        if(valid == true){
            result.push('11.1.1')
        }
        result.push('12')

        return result
    }

    static analysis(item){
        return generatorCA(this.nup, this.role, this.resp, this.resppg, '', '', '', item.map(x => x.object))
    }

    
}

module.exports = CA