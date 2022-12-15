const generatorDFD = require('./DFDLayout')

class DFD{
    static nup;
    static dvname;
    static chdvname;
    static sector;
    static object;
    static map;

    static getValues(body){
        this.nup = body.nup
        this.dvname = body.dvname
        this.chdvname = body.chdvname
        this.sector = body.sector
        this.object = body.object
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
        let itens = []
        let array = []     
        for(let i = 5; i < this.map.Mapa.length; i++){
            let index = Object.keys(this.map.Mapa[i])
            array.push({text: `${this.map.Mapa[i][index[0]]}`, margin: [1,7,1,7]}, {text: `${this.map.Mapa[i][index[1]]}`, alignment: 'justify', margin: [1,7,1,7]}, {text: `${this.map.Mapa[i][index[4]]}`, margin: [1,7,1,7]});
            itens.push(array)
            array = []
        }        
        return itens        
    }

    static analysis(){
        return generatorDFD(this.nup,this.dvname,this.chdvname,'','','',this.sector,this.object.toLowerCase(),this.table())
    }
}

module.exports = DFD