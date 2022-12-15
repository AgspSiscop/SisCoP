function generatorCA(nup, role, resp, resppg,dayCert, monthCert, yearCert, arrayItens){

    const docDefinitions = {
        content: [
            {image: './public/img/blazon.png',width:66, heigh: 99, alignment: 'center', margin: [1,1,1,4]},
            {
                text: [
                    'MINISTÉRIO DA DEFESA\n',
                    'EXÉRCITO BRASILEIRO\n',
                    'ARSENAL DE GUERRA DE SÃO PAULO\n\n',
                    'PREGÃO ELETRÔNICO Nº ____/2022\n',
                    `(Processo Administrativo n.º ${nup})\n\n\n`			
                    ],
                style: 'header',
                alignment: 'center'
            },
            {
                text: [
                    'CERTIFICO  que   as  minutas   que   integram   o   presente  processo  foram  extraídas  do  sítio\n',
                    'eletrônico  da  CJU/São  Paulo  no  endereço www.agu.gov.br/cjusp e que conferi que se tratam \n',
                    'dos modelos de minutas atualizados, tendo rubricado todas as páginas dos documentos, e que\n',
                    'a instrução  processual  foi  devidamente   cotejada  com  as  listas  de  verificação  (checklists)\n',
                    'disponíveis  no  mesmo  sítio   acima   apontado   (havendo   justificativa   nos   autos   para   os\n',
                    'documentos faltantes\n\n\n'
                    ],
                    
                style: 'defaultStyle'
            },
            {
                text: [
                    'DECLARO que incluí os trechos',
                    {text: ' negritados e sublinhados', bold: true, decoration: 'underline'},
                    ' na minuta de:\n\n',
                    '- Edital(___)\n\n',
                    '- Contrato (__)\n\n',
                    '- Termo de referência (X)\n\n',
                    '- Outra (__), pelos motivos a seguir expostos:\n\n',
                    'Itens 1.6 e 1.7 - foi necessário incluir critérios e práticas de sustentabilidade;\n\n'
                ],
                style: 'defaultStyle'
            },
            {
                text: '________________________________________________________________________________\n\n\n',
                alignment: 'center',
                bold: true,
                decoration: 'underline',
                style: 'defaultStyle'
            },
            {
                text: [
                    'E\n\n',
                    'DECLARO, outrossim, que suprimi os trechos indicados pela expressão (SUPRESSÃO) \nna minuta de:\n\n',
                    '- Edital (__)\n\n',
                    '- Contrato (__)\n\n',
                    '- Termo de referência (X)\n\n',
                    '- Outra (__), pelos motivos a seguir expostos:\n\n',
                    ],
                style: 'defaultStyle'
            },
            {
                text: arrayItens,
               style: 'defaultStyle'     
            },
            {
                text: '________________________________________________________________________________\n\n\n',
                alignment: 'center',
                bold: true,
                decoration: 'underline',
                style: 'defaultStyle'
            },
                {
                text: [
                    'DECLARO, ao final, possuir competência para firmar a presente declaração.\n\n',
                    'Município de ',
                    {text: `Barueri, ${dayCert} de ${monthCert} de ${yearCert}.\n\n\n\n\n\n`, bold: true}
                    ],
                style: 'defaultStyle'
            },
            {
                text: [
                    `${resp} – ${resppg}\n`                
                    ],
                style: 'header',
                alignment: 'center'
            },
            {
                text: `${role}`,
                fontSize: 10,
                alignment:'center',
                style: 'header',
                bold: false
            }
            
            
            
            
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
                margin: [ 45, 1, 1, 1 ],
                fontSize: 10,
                alignment: 'justify',
                bold: false
                
            }
        }
        
    }

    return docDefinitions

}

module.exports = generatorCA
