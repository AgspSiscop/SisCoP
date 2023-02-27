function generatorDFD(nup, divsionName, chDivisionName, dayDFD, monthDFD, yearDFD, sector, object, table, biNr, biDate){
    const docDefinitions = {
        content: [
            {image: './public/img/blazon.png',width:66, heigh: 99, alignment: 'center', margin: [1,1,1,4]},
            {
                text: [
                    'MINISTÉRIO DA DEFESA\n',
                    'EXÉRCITO BRASILEIRO\n',
                    'ARSENAL DE GUERRA DE SÃO PAULO\n\n\n',
                    'DOCUMENTO DE FORMALIZAÇÃO DA DEMANDA\n',
                    `(NUP: ${nup})\n\n\n`			
                    ],
                style: 'header',
                alignment: 'center',
                style: 'defaultStyle',
                bold: true
            },
            {
                style: 'tableExample',
                margin: [40,1,1,1],
                table: {
                    widths: [460],
                    body: [
                        [
                            {
                                text: [
                                 {text: 'Órgão: ', fontSize: 11, alignment: 'justify', bold: true},
                                 {text: 'Arsenal de Guerra de São Paulo', fontSize: 11}
                                ],
                                margin: [1,7,1,4],
                                style: 'defaultStyle'
                            },
                        ],
                        [
                           {
                                text: [
                                    {text: 'Setor Requisitante: ', fontSize: 11, alignment: 'justify', bold: true},
                                    {text: `${divsionName}`, fontSize: 11}
                                    ],
                                     margin: [1,7,1,4],
                                     style: 'defaultStyle'
                            }
                        ],
                        [
                           {
                                text: [
                                    {text: 'Responsável pela Demanda:  ', fontSize: 11, alignment: 'justify', bold: true},
                                    {text: `${chDivisionName}`, fontSize: 11}
                                    ],
                                     margin: [1,7,1,4],
                                     style: 'defaultStyle'
                            }
                        ]
                    ]
                }
            },
                {
                style: 'tableExample',
                margin: [40,-2,1,1],
                table: {
                    widths: [225, 226],
                    body: [
                        [
                            {
                                text: [
                                 {text: 'E-mail: ', fontSize: 11, bold: true},
                                 {text: `divisaotecnica.agsp@gmail.com\n`, fontSize: 11}
                            ],
                            margin: [1,7,1,4]
                            },
                            {
                                text: [
                                 {text: 'Telefone: ', fontSize: 11, bold: true},
                                 {text: `(11) 4199-0357\n`, fontSize: 11}
                            ],
                            margin: [1,7,1,4]
                            },
                        ]
                    ]
                }
            },
            {
                text: '\n\n',
                style: 'defaultStyle'
            },
            {
                style: 'tableExample',
                margin: [40,1,1,1],
                table: {
                    widths: [460],
                    body: [
                        [
                            {
                                text: [
                                 {text: '1. Justificativa da necessidade da contratação.', fontSize: 11, alignment: 'justify', bold: true}
                                ],
                                margin: [1,7,1,4],
                                
                            },
                        ],
                        [
                           {
                                text: [
                                    {text: `A fim de cumprir a demanda da ${sector} da ${divsionName} deste Arsenal de Guerra, faz-se necessário realizar a ${object} para apoiar e viabilizar a execução das atividades fim da referida Divisão `, fontSize: 11},
                                    ],
                                     margin: [1,7,1,10],
                                     
                            }
                        ],
                        [
                           {
                                text: [
                                    {text: '2. Quantidade de serviço demandada.', fontSize: 11, bold: true}
                                    ],
                                     margin: [1,7,1,4],
                                     
                            }
                        ],
                        [
                           {
                                stack: [
                                    {text: 'Relação de material a ser adquirido, conforme condições, quantidades e exigências estabelecidas\
     a seguir:\n\n', fontSize: 11},
                                    {
                                        table: {
                                            widths: [50, 300, 50],
                                            body: [['Nr', 'Descrição', 'Qtd']]
                                        }
                                    },                                    
                                    {
                                        table: {
                                            widths: [50, 300, 50],
                                            body: table
                                        },alignment: 'center'
                                    },
                                    ],
                                     margin: [1,7,1,10],
                                     
                            },
                            
                        ],
                    ]
                }
            },
            {
                style: 'tableExample',
                margin: [40,-2,1,1],
                table: {
                    widths: [460],
                    body: [
                            [
                               {
                                    text: [
                                        {text: 'S3. Previsão de data em que deve ser iniciada a prestação dos serviços.', fontSize: 11, bold: true}
                                        ],
                                         margin: [1,7,1,4]
                                }
                            ],
                            [
                               {
                                    text: [
                                        {text: 'Não é o caso.', fontSize: 11}
                                        ],
                                         margin: [1,15,1,15]
                                }
                            ],
                            [
                                {
                                    text: [
                                     {text: '4. Indicação do membro da equipe de planejamento e se necessário o responsável pela fiscalização.', fontSize: 11, bold: true}
                                    ],
                                    margin: [1,7,1,4]
                                },
                            ],
                            [
                                {
                                    text: [
                                     {text: `Conforme BI Nr ${biNr}, de ${biDate}, do AGSP, anexo ao presente documento.`, fontSize: 11}
                                    ],
                                    margin: [1,15,1,15]
                                },
                            ],
                        ]
                    }
            },
            {
                text: [
                    {text: '\n\n\n\nMunicípio de ', italics: true, fontSize: 11},
                    {text: `Barueri, ${dayDFD} de ${monthDFD} de ${yearDFD}.\n\n\n\n`, bold: true, fontSize: 11},
                    {text: `${chDivisionName}\n`, alignment: 'center', bold: true},
                    {text: `Responsável pela Formalização da Demanda\n`, alignment: 'center'}                    
                    ],
                    style: 'defaultStyle',
                    margin: [40,1,1,1]
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
                margin: [ 1, 1, 1, 1 ],
                fontSize: 10,
                alignment: 'justify',
                bold: false
            },
            paragraph:{
                font: 'Helvetica',
                margin: [ 70, 1, 1, 1 ],
                fontSize: 10,
                alignment: 'justify',
                bold: false
                
            },
            tableExample:{
                font: 'Helvetica',                
            }
        }
        
    }
    return docDefinitions
}

module.exports = generatorDFD
