const generatorDiexR = require('./DiexReqLayout')

class DR {
    static getValues(body){
        this.nup = body.nup
        this.resp = body.resp
        this.role = body.role
        this.resppg = body.resppg
        this.object = body.object
        this.diexreq = body.diexreq
        this.chdvname = body.chdvname
        this.chdvpg = body.chdvpg
        this.dvname = body.dvname
        this.chsupname = body.chsupname
        this.chsuppg = body.chsuppg
        this.fiscalname = body.fiscalname
        this.fiscalpg = body.fiscalpg
        this.cmdname = body.cmdname
        this.cmdpg = body.cmdpg
        this.process = body.process
        this.day = body.dayp;
        this.month = body.monthp
        this.year = body.yearp     
    }

    static resetValues(){
        this.nup = undefined
        this.resp = undefined
        this.role = undefined
        this.resppg = undefined
        this.object = undefined
        this.diexreq = undefined
        this.chdvname = undefined
        this.chdvpg = undefined
        this.dvname = undefined
        this.chsupname = undefined
        this.chsuppg = undefined
        this.fiscalname = undefined
        this.fiscalpg = undefined
        this.cmdname = undefined
        this.cmdpg = undefined
        this.process = undefined

    }

    static processCategory(){
        let array = []    
        if(this.process == '0'){
            array.push('abertura de procedimento licitatório');
            array.push('licitatório para a');
            return array;
        }else if(this.process == '1'){
            array.push('abertura de procedimento administrativo para contratação direta');
            array.push('administrativo para contratação direta da');
            return array;
        }
    }

    static analysis(){
        return generatorDiexR(this.nup, this.processCategory() ,this.diexreq, this.day, this.month, this.year, this.chdvname, this.chdvpg, this.dvname, this.object, this.chsupname, this.chsuppg, this.fiscalname, this.fiscalpg, this.cmdname, this.cmdpg, '')
    }
    

}

module.exports = DR