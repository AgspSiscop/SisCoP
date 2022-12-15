class Extensive{

    static convertValue(value){        
        let array,arrayA,arrayB;
        arrayA = []
        arrayB = []
        let capture = ''
        let captureCents = ''
        let valueA = value.split('.')[0]
        let valueB = value.split('.')[1]
               
        array = valueA.split('').reverse()        
        arrayB.push(valueB.split('').reverse())
        for(let i = 0; i < array.length; i = i + 3){
            arrayA.push((array.slice(i, i+3)))
        }
        for(let i = arrayA.length -1; i >= 0; i--){
            for(let j = arrayA[i].length -1; j >= 0; j--){
                capture += this.#values(i,j,arrayA)
            }           
            if(i == 0){
                capture += 'reais e '
            }
        }
        for(let i = arrayB.length -1; i >= 0; i--){
            for(let j = arrayB[i].length -1; j >= 0; j--){
                capture += this.#values(i,j,arrayB)
            }           
            if(i == 0){
                captureCents += 'centavos '
            }
        }      
        
        return capture + captureCents           
    }

    static #values(i, j,arrayA){
        let one, two, twoB, three;
        one = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
        two = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
        twoB = ["","","vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
        three = ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
        let capture = ''       
        
        if(j == 2){
            if(arrayA[i][j] == 1 && arrayA[i][j-1] == 0 && arrayA[i][j-2] ==0){
                capture += three[0] + ' '                        
            }else{
                capture += three[arrayA[i][j]] + ' e '
            }
        }
        if(j == 1){
            if(arrayA[i][j] == 1){
                capture += two[arrayA[i][j-1]] + ' '
            }else if(arrayA[i][j] > 1 && arrayA[i][j-1] == 0){
                capture += twoB[arrayA[i][j]] + ' '
            }else if(arrayA[i][j] > 1 && arrayA[i][j-1] > 0){
                capture += twoB[arrayA[i][j]] + ' e ' 
            }else if(arrayA[i][j] == 0 && arrayA[i][j-1] > 0){
                capture += one[arrayA[i][j-1]] + ' '
            }
        }
        if(j == 0){
            if( !arrayA[i][j+1] ^ arrayA[i][j+1] > 1  && arrayA[i][j] != 0){                              
                capture += one[arrayA[i][j]] + ' '                                
            }else if(arrayA[i][j+1] == 0 && arrayA[i][j] == 0 && capture.length == 0){
                capture += one[arrayA[i][j]] + ' '
            }
            if(i == 2){
                if(capture.length == 3){
                    capture += 'milhão '
                }else{
                    capture += 'milhões '
                }                        
            }
            if(i == 1){
                capture += 'mil '                        
            }
        }
        return capture
    }
}

module.exports = Extensive