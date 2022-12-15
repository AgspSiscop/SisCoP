function generatorDiexR(nup, category, diexReq, dayDiex, monthDiex, yearDiex, chDivisionName, chDivisionPg, divisionName, objectName, chSupplyName, chSupplyPg, fiscalName, fiscalPg, cmdName, cmdPg, phrase){

    const docDefinitions = {
        content: [
            {
                text: [
                    `DIEx Requisição nº ${diexReq} (SUPRIMENTO)\n`,
                    `EB: ${nup}\n\n`,
                    {text: `Barueri - SP, ${dayDiex} de ${monthDiex} de ${yearDiex}.\n\n`, alignment: 'right'}
                    ],
                style: 'header'
            },
            {
                text: [
                    'Do ',
                    {text: 'Chefe da Seção de Suprimento\n', bold: false},
                    'Ao ',
                    {text: 'Sr Fiscal Administrativo\n', bold: false},
                    'Assunto: ',
                    {text: `${category[0]}\n`, bold : false},
                    'Referência: ',
                    {text: 'Portaria Ministerial nº 305, de 24 de maio de 1995 (IG 12-02)\n', bold: false},
                    'Anexo: ',
                    {text: '1) Documento de Formalização da Demanda;\n', bold: false}				,
                    ],
                style: 'header'
            },
            {
                text: [
                    {text:'2) Equipe de Planejamento da Contratação;\n', bold: false},
                    {text:'3) Estudo Técnico Preliminar;\n', bold: false},
                    {text:'4) Análise de Riscos;\n', bold: false},
                    {text:'5) Termo de Referência;\n', bold: false},
                    {text:'6) Análise Crítica da Pesquisa de Preços;\n', bold: false},
                    {text:'7) Mapa Comparativo; e\n', bold: false},
                    {text:'8) Pesquisa de Preços.\n\n\n', bold: false}
                    ],
                    style: 'header',
                    margin: [ 30, 1, 1, 1 ],
                    
            },
            //table
            {
                style: 'tableExample',
                table: {
                    widths: [260, 260],
                    body: [
                        [
                            {
                                text: [
                                {text: 'A fim de atender à demanda de produção, solicito providenciar a abertura de procedimento licitatório do objeto constante da relação anexa.\n\n\n\n\n\n\n\n', fontSize: 11, alignment: 'justify'},
                                {text: `${chDivisionName} - ${chDivisionPg}\n`, bold: true, fontSize: 12},
                                {text: `Chefe da ${divisionName}`, fontSize: 11}
                            
                            ],
                            alignment: 'center',
                            style: 'defaultStyle'
                            },
                            {
                                text: [
                                    {text: `Nos termos do Art. 13º do documento acima referenciado, solicito providências junto ao Ordenador de Despesas (OD) no sentido \
 de aprovar a abertura de procedimento ${category[1]} ${objectName}, destinado a atender às necessidades da\
 ${divisionName}.\n\n\n\n\n\n`, fontSize: 11, alignment: 'justify'},
                                    {text: `${chSupplyName} - ${chSupplyPg}\n`, bold: true, fontSize: 12},
                                    {text: 'Chefe da Seção de Suprimento do AGSP', fontSize: 11}
                                ],
                                alignment: 'center',
                                style: 'defaultStyle'
                            }
                        ]
                    ]
                }
            },
            {
                text: ['\n\n\n',],
                style: 'defaultStyle'
            },
            {
                style: 'tableExample',
                table: {
                    widths: [260, 260],
                    body: [
                        [
                            {
                                text: [
                                    {text: 'PARECER DO FISCAL ADMINISTRATIVO:\n', bold: true, alignment: 'justify'},
                                    {text: 'Sou de parecer favorável quanto à aprovação da presente requisição. Assessoro o Ordenador de Despesas do AGSP no sentido de autorizar o procedimento.\
                                    \n\n\n\n\n\n', fontSize: 11, alignment: 'justify'},
                                    {text: `${fiscalName} - ${fiscalPg}\n`, bold: true, fontSize: 12},
                                    {text: 'Fiscal Administrativo', fontSize: 11}
                                
                                ],
                                alignment: 'center',
                                style: 'defaultStyle'
                            },
                            {
                                text: [
                                    {text: 'DESPACHO DO OD:\n', bold: true, alignment: 'justify'},
                                    {text: '1. Autorizo o início dos procedimentos licitatórios;   \n', fontSize: 11, alignment: 'justify'},
                                    {text: '2. Determino à SALC que adote a modalidade de licitação correspondente, observando o Art. 38 \
                                    da Lei 8.666/93 e demais normas em vigor.\n\n\n\n\n\n\n', fontSize: 11, alignment: 'justify'},
                                    {text: `${cmdName} - ${cmdPg}\n`, bold: true, fontSize: 12},
                                    {text: 'Ordenador de Despesas do AGSP', fontSize: 11}
                                    ],
                                    alignment: 'center',
                                    style: 'defaultStyle'
                            }
                        ]
                    ]
                }
            },
            {
                text: [
                    {text: `\n\n\n\n${phrase}`, bold: true, alignment: 'center'}
                    ],
                    style: 'header'
                
            },
        ],
        styles: {
            header: {
                font: 'Helvetica',
                fontSize: 12,
                bold: true,
                alignment: 'justify'
            },
            defaultStyle: {
                font: 'Helvetica',
                margin: [ 1, 1, 1, 1 ],
                fontSize: 10,
                alignment: 'justify',
                bold: false                
            },
            tableExemple:{
                font: 'Helvetica'
            }
        }        
    }

    return docDefinitions;

}

module.exports = generatorDiexR