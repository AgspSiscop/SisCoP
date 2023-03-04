const generatorDFD = require('./DFDLayout')

class DFD{  

    static getValues(body){
        this.nup = body.nup
        this.dvname = body.dvname
        this.chdvname = body.chdvname
        this.chdvpg = body.chdvpg
        this.sector = body.sector
        this.object = body.object
        this.biNr = body.binr
        this.biDate = body.bidate
        this.day =  body.dayp;
        this.month = body.monthp;
        this.year = body.yearp;
    }
    static resetValues(){
        this.nup = undefined
        this.dvname = undefined
        this.chdvname = undefined
        this.sector = undefined
        this.object = undefined
        this.map = undefined
    }

    static getMap(object){
        this.map = object
    }

    static table(){        
        let itens = [];
        let array = [];
             
        for(let i = 5; i < this.map.Mapa.length; i++){
            if(Object.keys(this.map.Mapa[i])[0] === 'MAPA COMPARATIVO E ANÁLISE CRÍTICA DOS ORÇAMENTOS'){
                let index = Object.keys(this.map.Mapa[i])
                array.push({text: `${this.map.Mapa[i][index[0]]}`, margin: [1,7,1,7]}, {text: `${this.map.Mapa[i][index[1]]}`, alignment: 'justify', margin: [1,7,1,7]}, {text: `${this.map.Mapa[i][index[4]]}`, margin: [1,7,1,7]});
                itens.push(array)
                array = []
            }
        }        
        return itens        
    }

    static analysis(){
        return generatorDFD(this.nup,this.dvname,this.chdvname, this.chdvpg, this.day,this.month,this.year,this.sector,this.object.toLowerCase(),this.table(), this.biNr, this.biDate)
    }
}

module.exports = DFD