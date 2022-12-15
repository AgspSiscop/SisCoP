function generatorTR(category, yearTR, nup, object, extensiveValue, dayTR, monthTR, cmdName, postCmd, nameTR, postGrad, role, table, totalValue, var12, var13, var14, var62, var1111){
    
    let docDefinitions = {
        content: [
            {image: './public/img/blazon.png',width:66, heigh: 99, alignment: 'center', margin: [1,1,1,4]},
            {
                text: [
                    'MINISTÉRIO DA DEFESA\n',
                    'EXÉRCITO BRASILEIRO\n',
                    'ARSENAL DE GUERRA DE SÃO PAULO\n\n\n',
                    `TERMO DE REFERÊNCIA ${category[0]} (COMPRAS) \n`,
                    `${category[0]} Nº___/${yearTR}\n`,
                    {text: `(Processo Administrativo n° ${nup})\n\n\n`, bold: true}			
                    ],
                style: 'header',
                alignment: 'center'
            },
            {
                text: [
                    {text: '1.   DO OBJETO\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: `1.1.  ${object}, conforme condições, quantidades e exigências estabelecidas neste instrumento:\n\n\n`,
                style: 'paragraph'
            },
                {
                style: 'tableExample',
                margin: [ 30, 1, 1, 1 ],
                fontSize: 5,
                table: {
                    widths: [29, 72, 48, 65, 110, 110],
                    body: [
                        //inset array here
                        [
                            {
                                text: 'ITEM',
                                style: 'innerTable'
                                
                            },
                            {
                                text: 'IDENT. CATMAT',
                                style: 'innerTable'
                                
                            },
                            {
                                text: 'UNIDADE DE MEDIDA',
                                style: 'innerTable'
                                    
                            },
                            {
                                text: 'QUANTIDADE',
                                style: 'innerTable'
                                
                            },
                            {
                                text: 'VALOR UNITÁRIO MÁXIMO',
                                style: 'innerTable'
                            },
                            {
                                text: 'VALOR MÁXIMO ACEITÁVEL',
                                style: 'innerTable'
                            },
                        ],
                    ],
                    
                }
            },
            {
                style: 'tableExample',
                margin: [ 30, -2, 1, 1 ],
                table: {
                    widths: [29, 72, 48, 65, 110, 110],
                    body: table                   
                }
            },
            {
                style: 'tableExample',
                margin: [ 30, -2, 1, 1 ],
                table: {
                    widths: [360, 110],
                    body: [
                        [
                            {
                                text: 'VALOR TOTAL',
                                style: 'innerTable'
                            },
                            {
                                text: `${totalValue}`,
                                style: 'innerTable'
                            },
                        ],
                    ],
                }
            },            
            {
                text: [
                    var12,
                    var13,
                    var14
                    ],
                    style: 'paragraph'                    
            },
            {
                text: [
                    '1.5.       O prazo de vigência da contratação é de 30 dias contados do ateste do recebimento da Nota de Empenho (NE),\
 prorrogável na forma do art. 57, § 1°, da Lei n° 8.666/93.\n\n',
                    {text: '1.6.        No que diz respeito aos critérios de sustentabilidade e observando o que é exposto no Anexo I da Instrução Normativa\
 IBAMA n° 06, de 15 de março de 2013, é possível afirmar que para os itens do presente objeto não foram encontrados argumentos\
 técnicos suficientes para enquadrá-los em alguma Ficha Técnica, e assim, a obrigação de inscrição no Cadastro Técnico Federal\
 de Atividades Potencialmente Poluidoras e Utilizadoras de Recursos Ambientais (CTF/APP) por parte do Fabricante não se faz necessária.\n\n', decoration: 'underline', bold: true},
                    {text: '1.7.       Além disso, tomando-se por base a IN SLTI/MPOG n° 01/2010, determina-se para todos os itens:', decoration: 'underline', bold: true}
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: '1.7.1. que os bens sejam, preferencialmente, acondicionados em embalagem individual adequada, com\
 o menor volume possível, e que utilize materiais recicláveis, de forma a garantir a máxima proteção\
 durante o transporte e o armazenamento;\n\n', decoration: 'underline', bold: true},
                    {text: '1.7.2. que os bens não contenham substâncias perigosas em concentração acima da\
 recomendada na diretiva RoHS (Restriction of Certain Hazardous Substances), tais como\
 mercúrio (Hg), chumbo (Pb), cromo hexavalente (Cr(VI)), cádmio (Cd), bifenil-polibromados \
 (PBBs), éteres difenil-polibromados (PBDEs).\n\n\n', decoration: 'underline', bold: true}
                    ],
                    style: 'subItem'
            },
            {
                text:[
                    {text: '2.    JUSTIFICATIVA E OBJETIVO DA CONTRATAÇÃO\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '2.1.       A Justificativa e o objetivo da contratação encontram-se pormenorizadas em Tópico\
 específico dos Estudos Técnicos Preliminares, apêndice deste Termo de Referência.\n\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '3.    DESCRIÇÃO DA SOLUÇÃO:\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '3.1.          A descrição da solução como um todo, encontra-se pormenorizada em Tópico\
 específico dos Estudos Técnicos Preliminares, apêndice deste Termo de Referência.\n\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '4.    CLASSIFICAÇÃO DOS BENS COMUNS\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [ //INSSERIR UMA VARIÁVEL PARA QUANDO FOR DISPENSA ELETRONICA
                    `4.1.          Trata-se de aquisição de bem comum, a ser contratada mediante licitação,\
 na modalidade ${category[1]}.\n\n\n`
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '5.    CRITÉRIOS DE SUSTENTABILIDADE\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '5.1.        Os critérios de sustentabilidade são aqueles previstos nas especificações do objeto\
 e/ou obrigações da contratada e/ou no edital como requisito previsto em lei especial.\n\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '6.    ENTREGA E CRITÉRIOS DE ACEITAÇÃO DO OBJETO\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '6.1.         O prazo de entrega do objeto é de 30 (trinta) dias, contados do recebimento da Nota de Empenho pelo fornecedor,\
 em remessa única, no seguinte endereço: Rodovia Marechal Rondon, km 29, s/n, Centro, Barueri – SP. \n\n',
                    var62,
                    '6.3.         Os bens serão recebidos provisoriamente no prazo de 30 (trinta) dias, pelo(a) responsável pelo acompanhamento e fiscalização do contrato, para efeito de posterior verificação de sua conformidade com as especificações constantes neste Termo de Referência e na proposta.\n\n',
                    '6.4.        Os bens poderão ser rejeitados, no todo ou em parte,\
 quando em desacordo com as especificações constantes neste Termo de Referência\
 e na proposta, devendo ser substituídos no prazo de 20 (vinte) dias, a contar da\
 notificação da contratada, às suas custas, sem prejuízo da aplicação das penalidades.\n\n',
                    '6.5.          Os bens serão recebidos definitivamente no prazo de 30 (trinta) dias,\
 contados do recebimento provisório, após a verificação da qualidade e quantidade do material\
 e consequente aceitação mediante termo circunstanciado.\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    '6.5.1.          Na hipótese de a verificação a que se refere o subitem anterior não\
 ser procedida dentro do prazo fixado, reputar-se-á como realizada, consumando-se o \
 recebimento definitivo no dia do esgotamento do prazo.\n\n'
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '6.6.          O recebimento provisório ou definitivo do objeto não exclui a responsabilidade\
 da contratada pelos prejuízos resultantes da incorreta execução do contrato.\n\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '7.    OBRIGAÇÕES DA CONTRATANTE\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '7.1.          São obrigações da Contratante:\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    '7.1.1.          receber o objeto no prazo e condições estabelecidas no Edital e seus anexos;\n\n',
                    '7.1.2.           verificar minuciosamente, no prazo fixado, a conformidade dos bens recebidos\
 provisoriamente com as especificações constantes do Edital e da proposta, para fins de aceitação e recebimento definitivo;\n\n',
                    '7.1.3.          comunicar à Contratada, por escrito, sobre imperfeições, falhas ou irregularidades\
 verificadas no objeto fornecido, para que seja substituído, reparado ou corrigido;\n\n',
                    '7.1.4.          acompanhar e fiscalizar o cumprimento das obrigações da Contratada,\
 através de comissão/servidor especialmente designado;\n\n',
                    '7.1.5.          efetuar o pagamento à Contratada no valor correspondente ao \
 fornecimento do objeto, no prazo e forma estabelecidos no Edital e seus anexos;\n\n'
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '7.2.          A Administração não responderá por quaisquer compromissos assumidos pela\
 Contratada com terceiros, ainda que vinculados à execução do contrato, bem como por\
 qualquer dano causado a terceiros em decorrência de ato da Contratada, de seus empregados\
 , prepostos ou subordinados.\n\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '8.    OBRIGAÇÕES DA CONTRATADA\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '8.1.          A Contratada deve cumprir todas as obrigações constantes no Edital, seus anexos\
 e sua proposta, assumindo como exclusivamente seus os riscos e as despesas decorrentes da boa e perfeita \
 execução do objeto e, ainda:\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    '8.1.1.          efetuar a entrega do objeto em perfeitas condições, conforme especificações,\
 prazo e local constantes no Termo de Referência e seus anexos, acompanhado da respectiva nota \
 fiscal, na qual constarão as indicações referentes a: marca, fabricante, modelo, procedência \
 e prazo de garantia ou validade;\n\n'
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '8.1.1.1.          O objeto deve estar acompanhado do manual do usuário, com uma \
 versão em português e da relação da rede de assistência técnica autorizada;\n\n'
                    ],
                    style: 'paragraph',
                    margin: [110,1,1,1]
            },
                {
                text: [
                    '8.1.2.          responsabilizar-se pelos vícios e danos decorrentes do objeto, \
 de acordo com os artigos 12, 13 e 17 a 27, do Código de Defesa do Consumidor (Lei nº 8.078, de 1990);\n\n',
                    '8.1.3.          substituir, reparar ou corrigir, às suas expensas, no prazo fixado neste Termo\
 de Referência, o objeto com avarias ou defeitos;\n\n',
                    '8.1.4.          comunicar à Contratante, no prazo máximo de 24 (vinte e quatro) horas que antecede a \
 data da entrega, os motivos que impossibilitem o cumprimento do prazo previsto, com a devida comprovação;\n\n',
                    '8.1.5.          manter, durante toda a execução do contrato, em compatibilidade com as obrigações\
 assumidas, todas as condições de habilitação e qualificação exigidas na licitação;\n\n',
                    '8.1.6.          indicar preposto para representá-la durante a execução do contrato.\n\n',
                    '8.1.7.          promover a destinação final ambientalmente adequada, sempre que a legislação assim o exigir,\
 como nos casos de pneus, pilhas e baterias, etc....\n\n'
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '8.2.          Quando não for possível a verificação da regularidade no Sistema de Cadastro de Fornecedores\
 – SICAF, a empresa contratada deverá entregar ao setor responsável pela fiscalização do contrato, até o dia\
 trinta do mês seguinte ao da prestação dos serviços, os seguintes documentos: 1) prova de regularidade relativa\
 à Seguridade Social; 2) certidão conjunta relativa aos tributos federais e à Dívida Ativa da União; 3) \
 certidões que comprovem a regularidade perante a Fazenda Municipal ou Distrital do domicílio ou sede do contratado;\
 4) Certidão de Regularidade do FGTS – CRF; e 5) Certidão Negativa de Débitos Trabalhistas – CNDT, conforme alínea \
 "c" do item 10.2 do Anexo VIII-B da IN SEGES/MP n. 5/2017;\n\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '9.    DA SUBCONTRATAÇÃO\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '9.1.          Não será admitida a subcontratação do objeto licitatório.\n\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '10.    DA ALTERAÇÃO SUBJETIVA\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '10.1.          É admissível a fusão, cisão ou incorporação da contratada com/em\
 outra pessoa jurídica, desde que sejam observados pela nova pessoa jurídica todos\
 os requisitos de habilitação exigidos na licitação original; sejam mantidas as demais\
 cláusulas e condições do contrato; não haja prejuízo à execução do objeto pactuado\
 e haja a anuência expressa da Administração à continuidade do contrato.\n\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '11.    DO CONTROLE E FISCALIZAÇÃO DA EXECUÇÃO\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '11.1.          Nos termos do art. 67 Lei nº 8.666, de 1993, será designado \
 representante para acompanhar e fiscalizar a entrega dos bens, anotando em \
 registro próprio todas as ocorrências relacionadas com a execução e determinando\
 o que for necessário à regularização de falhas ou defeitos observados.\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    var1111
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '11.2.          A fiscalização de que trata este item não exclui nem reduz\
 a responsabilidade da Contratada, inclusive perante terceiros, por qualquer\
 irregularidade, ainda que resultante de imperfeições técnicas ou vícios redibitórios,\
 e, na ocorrência desta, não implica em corresponsabilidade da Administração ou de \
 seus agentes e prepostos, de conformidade com o art. 70 da Lei nº 8.666, de 1993.\n\n',
                    '11.3.          O representante da Administração anotará em registro próprio todas \
 as ocorrências relacionadas com a execução do contrato, indicando dia, mês e ano, bem \
 como o nome dos funcionários eventualmente envolvidos, determinando o que for\
 necessário à regularização das falhas ou defeitos observados e encaminhando os \
 apontamentos à autoridade competente para as providências cabíveis.\n\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '12.    DO PAGAMENTO\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '12.1.          O pagamento será realizado no prazo máximo de até 30 (trinta) dias,\
 contados a partir do recebimento da Nota Fiscal ou Fatura, através de ordem bancária,\
 para crédito em banco, agência e conta corrente indicados pelo contratado.\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: '12.1.1.          Os pagamentos decorrentes de despesas cujos valores\
 não ultrapassem o limite de que trata o inciso II do art. 24 da Lei 8.666, de 1993, \
 deverão ser efetuados no prazo de até 5 (cinco) dias úteis, contados da data da \
 apresentação da Nota Fiscal, nos termos do art. 5º, § 3º, da Lei nº 8.666, de 1993.\n\n'}
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '12.2.          Considera-se ocorrido o recebimento da nota fiscal ou fatura\
 quando o órgão contratante atestar a execução do objeto do contrato.\n\n',
                    '12.3.          A Nota Fiscal ou Fatura deverá ser obrigatoriamente acompanhada\
 da comprovação da regularidade fiscal, constatada por meio de consulta on-line ao \
 SICAF ou, na impossibilidade de acesso ao referido Sistema, mediante consulta aos \
 sítios eletrônicos oficiais ou à documentação mencionada no art. 29 da Lei nº 8.666, de 1993. \n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: '12.3.1.          Constatando-se, junto ao SICAF, a situação de irregularidade do\
 fornecedor contratado, deverão ser tomadas as providências previstas no do art. 31 da \
 Instrução Normativa nº 3, de 26 de abril de 2018.\n\n'}
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '12.4.          Havendo erro na apresentação da Nota Fiscal ou dos documentos pertinentes à contratação,\
 ou, ainda, circunstância que impeça a liquidação da despesa, como, por exemplo, obrigação financeira pendente,\
 decorrente de penalidade imposta ou inadimplência, o pagamento ficará sobrestado até que a Contratada providencie\
 as medidas saneadoras. Nesta hipótese, o prazo para pagamento iniciar-se-á após a comprovação da regularização da\
 situação, não acarretando qualquer ônus para a Contratante.\n\n',
                    '12.5.          Será considerada data do pagamento o dia em que constar como emitida a ordem bancária para pagamento.\n\n',
                    '12.6.          Antes de cada pagamento à contratada, será realizada consulta ao SICAF para verificar a manutenção das\
 condições de habilitação exigidas no edital. \n\n',
                    '12.7.          Constatando-se, junto ao SICAF, a situação de irregularidade da contratada, será providenciada sua notificação,\
 por escrito, para que, no prazo de 5 (cinco) dias úteis, regularize sua situação ou, no mesmo prazo, apresente sua defesa. \
 O prazo poderá ser prorrogado uma vez, por igual período, a critério da contratante.\n\n',
                    '12.8.          Previamente à emissão de nota de empenho e a cada pagamento, a Administração deverá realizar\
 consulta ao SICAF para identificar possível suspensão temporária de participação em licitação, no âmbito do órgão \
 ou entidade, proibição de contratar com o Poder Público, bem como ocorrências impeditivas indiretas, observado o \
 disposto no art. 29, da Instrução Normativa nº 3, de 26 de abril de 2018.\n\n',
                    '12.9.          Não havendo regularização ou sendo a defesa considerada improcedente, a contratante deverá\
 comunicar aos órgãos responsáveis pela fiscalização da regularidade fiscal quanto à inadimplência da contratada,\
 bem como quanto à existência de pagamento a ser efetuado, para que sejam acionados os meios pertinentes e \
 necessários para garantir o recebimento de seus créditos.\n\n',
                    '12.10.          Persistindo a irregularidade, a contratante deverá adotar as medidas necessárias à rescisão\
 contratual nos autos do processo administrativo correspondente, assegurada à contratada a ampla defesa.\n\n',
                    '12.11.          Havendo a efetiva execução do objeto, os pagamentos serão realizados normalmente, até que se decida pela rescisão do contrato, \
 caso a contratada não regularize sua situação junto ao SICAF.\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: '12.11.1.          Será rescindido o contrato em execução com a contratada inadimplente no SICAF, salvo por motivo de economicidade, \
 segurança nacional ou outro de interesse público de alta relevância, devidamente justificado, em qualquer caso, pela máxima autoridade da \
 contratante.\n\n'}
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '12.12.          Quando do pagamento, será efetuada a retenção tributária prevista na legislação aplicável.\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: '12.12.1.          A Contratada regularmente optante pelo Simples Nacional, nos termos da Lei Complementar nº 123,\
 de 2006, não sofrerá a retenção tributária quanto aos impostos e contribuições abrangidos por aquele regime. No entanto,\
 o pagamento ficará condicionado à apresentação de comprovação, por meio de documento oficial, de que faz jus ao tratamento\
 tributário favorecido previsto na referida Lei Complementar.\n\n'}
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '12.13.          Nos casos de eventuais atrasos de pagamento, desde que a Contratada não tenha concorrido,\
 de alguma forma, para tanto, o valor devido deverá ser acrescido de atualização financeira, e sua apuração se \
 fará desde a data de seu vencimento até a data do efetivo pagamento, em que os juros de mora serão calculados\
 à taxa de 0,5% (meio por cento) ao mês, ou 6% (seis por cento) ao ano, mediante aplicação das seguintes fórmulas:\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: 'EM = I x N x VP, sendo:\nEM = Encargos moratórios;\nN = Número de dias entre a data prevista para o pagamento e a do efetivo pagamento;\n \
                    VP = Valor da parcela a ser paga.\nI = Índice de compensação financeira = 0,00016438, assim apurado:'}
                    ],
                    style: 'subItem'
            },
            {
                style: 'tableExample',
                margin: [ 37, 1, 1, 1],
                table: {
                    widths: [160, 100, 200],
                    body: [
                        [
                            {
                                text: 'I = (TX)',
                                style: 'innerTable',
                                bold: false
                            },
                            {
                                text:[ 
                                    {text: 'I = ', bold: false},
                                    {text: '(6 / 100)\n', bold: false, decoration: 'underline'},
                                    {text: '360', bold: false}
                                    ],
                                style: 'innerTable'
                            },
                            {
                                text:[ 
                                    {text: 'I = 0,00016438\n', bold: false},
                                    {text: 'TX = Percentual da taxa anual = 6%', bold: false}
                                    ],
                                style: 'innerTable'
                            },
                        ],
                    ],
                }
            },
            {
                text:[
                    {text: '\n\n13.    DO REAJUSTE\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '13.1.           Os preços inicialmente contratados são fixos e irreajustáveis no prazo\
 de um ano contado da data limite para a apresentação das propostas.\n\n',
                    '13.2.           Após o interregno de um ano, e independentemente de pedido da CONTRATADA, os\
 preços iniciais serão reajustados, mediante a aplicação, pela CONTRATANTE, do índice IPCA/IBGE,\
 exclusivamente para as obrigações iniciadas e concluídas após a ocorrência da anualidade, com\
 base na seguinte fórmula (art. 5º do Decreto n.º 1.054, de 1994): \n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: 'R = V (I – Iº) / Iº, onde:\n\nR = Valor do reajuste procurado;\n\nV = Valor contratual a ser reajustado;\n\n\
 Iº = índice inicial - refere-se ao índice de custos ou de preços correspondente à data fixada para entrega da proposta na licitação;\n\n\
 I = Índice relativo ao mês do reajustamento;\n\n'}
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '13.3.          Nos reajustes subsequentes ao primeiro, o interregno mínimo de \
 um ano será contado a partir dos efeitos financeiros do último reajuste.\n\n',
                    '13.4.          No caso de atraso ou não divulgação do índice de reajustamento, o \
 CONTRATANTE pagará à CONTRATADA a importância calculada pela última variação conhecida, \
 liquidando a diferença correspondente tão logo seja divulgado o índice definitivo. \n\n',
                    '13.5.          Nas aferições finais, o índice utilizado para reajuste será, obrigatoriamente, o definitivo.\n\n',
                    '13.6.          Caso o índice estabelecido para reajustamento venha a ser extinto ou de qualquer forma não possa mais \
 ser utilizado, será adotado, em substituição, o que vier a ser determinado pela legislação então em vigor.\n\n',
                    '13.7.          Na ausência de previsão legal quanto ao índice substituto, as partes elegerão novo índice oficial, para reajustamento\
 do preço do valor remanescente, por meio de termo aditivo.\n\n',
                    '13.8.          O reajuste será realizado por apostilamento.\n\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '14.    DA GARANTIA DE EXECUÇÃO\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '14.1.         Não haverá exigência de garantia contratual da execução, pelas razões abaixo justificadas:\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: '14.1.1.         Pela forma de pagamento, que acontece somente após a entrega definitiva do bem, com ateste da\
 Nota Fiscal pelo gestor do contrato. Assim, não há risco para administração e consequentemente não se faz necessária a \
 exigência de garantia contratual da execução.\n\n\n'}
                    ],
                    style: 'subItem'
            },
            {
                text:[
                    {text: '15.    A GARANTIA CONTRATUAL DOS BENS. (SUPRESSÃO)\n\n\n', bold: true, decoration: 'lineThrough'},
                    ],
                    style: 'defaultStyle'
            },
            {
                text:[
                    {text: '16.    DAS SANÇÕES ADMINISTRATIVAS\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '16.1.         Comete infração administrativa nos termos da Lei nº 10.520, de 2002, a Contratada que:\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: 'a)    falhar na execução do contrato, pela inexecução, total ou parcial, de quaisquer das obrigações assumidas na contratação;\n\n'},
                    {text: 'b)    ensejar o retardamento da execução do objeto;\n\n'},
                    {text: 'c)    fraudar na execução do contrato;\n\n'},
                    {text: 'd)    comportar-se de modo inidôneo; ou\n\n'},
                    {text: 'e)    cometer fraude fiscal.\n\n'},
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '16.2.         Pela inexecução ',
                    {text: 'total ou parcial ', decoration: 'underline'},
                    'do objeto deste contrato, a Administração pode aplicar à CONTRATADA as seguintes sanções:'
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: 'i)        '},
                    {text: 'Advertência por escrito', bold: true},
                    {text: ', quando do não cumprimento de quaisquer das obrigações contratuais consideradas faltas leves, assim entendidas\
 aquelas que não acarretam prejuízos significativos para o serviço contratado;\n\n'},
                    {text: 'ii)        '},
                    {text: 'Multa:\n\n', bold: true}
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '(1)  moratória de 0,5% (zero vírgula cinco por cento) por dia de atraso injustificado\
 sobre o valor da parcela inadimplida, até o limite de 30 (trinta) dias.\n\n',
                    '(2)  compensatória de 10% (dez por cento) sobre o valor total do contrato, no caso de inexecução total do objeto;\n\n',
    
                    ],
                    style: 'paragraph',
                    margin: [110,1,1,1]
            },
            {
                text: [
                    {text: 'iii)        '},
                    {text: 'Suspensão de licitar e impedimento de contratar', bold: true},
                    {text: 'com o órgão, entidade ou unidade administrativa pela qual a Administração Pública opera e atua concretamente,\
 pelo prazo de até dois anos;\n\n'},
                    {text: 'iv)        '},
                    {text: 'Sanção de impedimento de licitar e contratar com órgãos e entidades da União', bold: true},
                    {text:', com o consequente descredenciamento no SICAF pelo prazo de até cinco anos.\n\n'},
                    {text: 'v)        '},
                    {text: 'Declaração de inidoneidade para licitar ou contratar ', bold: true},
                    {text:'com a Administração Pública, enquanto perdurarem os motivos determinantes da punição ou até \
 que seja promovida a reabilitação perante a própria autoridade que aplicou a penalidade, que será\
 concedida sempre que a Contratada ressarcir a Contratante pelos prejuízos causados;\n\n'}
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '16.3.         A Sanção de impedimento de licitar e contratar prevista no subitem “iv” também é aplicável em\
 quaisquer das hipóteses previstas como infração administrativa neste Termo de Referência.\n\n',
                    '16.4.         As sanções previstas nos subitens “i”, “iii”, “iv” e “v” poderão ser aplicadas à CONTRATADA juntamente\
 com as de multa, descontando-a dos pagamentos a serem efetuados.\n\n',
                    '16.5.         Também ficam sujeitas às penalidades do art. 87, III e IV da Lei nº 8.666, de 1993, as empresas ou \
 profissionais que:\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: '16.5.1.          tenham sofrido condenação definitiva por praticar, por meio dolosos, fraude fiscal no recolhimento de\
 quaisquer tributos;\n\n'},
                    {text: '16.5.2.          tenham praticado atos ilícitos visando a frustrar os objetivos da licitação;\n\n'},
                    {text: '16.5.3.          demonstrem não possuir idoneidade para contratar com a Administração em virtude de \
 atos ilícitos praticados.\n\n'},
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '16.6.         A aplicação de qualquer das penalidades previstas realizar-se-á em processo administrativo que assegurará o contraditório\
 e a ampla defesa à Contratada, observando-se o procedimento previsto na Lei nº 8.666, de 1993, e subsidiariamente a Lei nº 9.784, de 1999.\n\n',
                    '16.7.         As multas devidas e/ou prejuízos causados à Contratante serão deduzidos dos valores a serem pagos, ou recolhidos em favor da União,\
 ou deduzidos da garantia, ou ainda, quando for o caso, serão inscritos na Dívida Ativa da União e cobrados judicialmente.\n\n'
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: '16.7.1.          Caso a Contratante determine, a multa deverá ser recolhida no prazo máximo de 30 (trinta) dias, a contar \
 da data do recebimento da comunicação enviada pela autoridade competente.\n\n'},
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '16.8.         Caso o valor da multa não seja suficiente para cobrir os prejuízos causados pela conduta do licitante, a União ou Entidade poderá\
 cobrar o valor remanescente judicialmente, conforme artigo 419 do Código Civil.\n\n',
                    '16.9.         A autoridade competente, na aplicação das sanções, levará em consideração a gravidade \
 da conduta do infrator, o caráter educativo da pena, bem como o dano causado à Administração, observado o princípio da proporcionalidade.\n\n',
                    '16.10.         Se, durante o processo de aplicação de penalidade, se houver indícios de prática de infração administrativa tipificada \
 pela Lei nº 12.846, de 1º de agosto de 2013, como ato lesivo à administração pública nacional ou estrangeira, cópias do processo \
 administrativo necessárias à apuração da responsabilidade da empresa deverão ser remetidas à autoridade competente, com despacho \
 fundamentado, para ciência e decisão sobre a eventual instauração de investigação preliminar ou Processo Administrativo de \
 Responsabilização - PAR.\n\n',
                    '16.11.         A apuração e o julgamento das demais infrações administrativas não consideradas como ato lesivo à Administração Pública nacional ou\
 estrangeira nos termos da Lei nº 12.846, de 1º de agosto de 2013, seguirão seu rito normal na unidade administrativa.\n\n',
                    '16.12.         O processamento do PAR não interfere no seguimento regular dos processos administrativos \
 específicos para apuração da ocorrência de danos e prejuízos à Administração Pública Federal resultantes de ato \
 lesivo cometido por pessoa jurídica, com ou sem a participação de agente público. \n\n',
                    '16.13.         As penalidades serão obrigatoriamente registradas no SICAF.\n\n\n',
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '17.    CRITÉRIOS DE SELEÇÃO DO FORNECEDOR.\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '17.1.         Os critérios de aceitabilidade de preços serão:\n\n',
                    
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    {text: `17.1.1.         Valor Global: ${totalValue} (${extensiveValue}).\n\n`},
                    {text: '17.1.2.         Valores unitários: conforme planilha de composição de preços anexa ao edital.\n\n'},
                    ],
                    style: 'subItem'
            },
            {
                text: [
                    '17.2.         O critério de julgamento da proposta é o menor preço por item.\n\n',
                    '17.3.         As regras de desempate entre propostas são as discriminadas no edital.\n\n\n',
                    
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '18.    ESTIMATIVA DE PREÇOS E PREÇOS REFERENCIAIS.\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '18.1.         O custo estimado da contratação é de ',
                    {text: `${totalValue}\n\n\n`, bold: true}
                    
                    ],
                    style: 'paragraph'
            },
            {
                text:[
                    {text: '19.    DOS RECURSOS ORÇAMENTÁRIOS.\n\n', bold: true},
                    ],
                    style: 'defaultStyle'
            },
            {
                text: [
                    '19.1.         A indicação da dotação orçamentária fica postergada para o momento da assinatura do contrato ou instrumento equivalente.\n\n\n\n\n\n\n',
                    
                    ],
                    style: 'paragraph'
            },
            {
                text: [
                    'Município de ',
                    {text: `Barueri, ${dayTR} de ${monthTR} de ${yearTR}.\n\n\n\n\n\n`, bold: true}
                    ],
                style: 'defaultStyle'
            },
            {
                text: [
                    `${nameTR} – ${postGrad}\n`                
                    ],
                style: 'header',
                alignment: 'center'
            },
            {
                text: `${role}\n\n\n\n\n`,
                fontSize: 10,
                alignment:'center',
                font: 'Helvetica'
            },
            {
                text: [
                    'Aprovo o presente Termo de Referência, bem como estou de acordo com todas as informações prestadas nas declarações e assinaturas acima.\n\n\n',
                    
                    ],
                    style: 'defaultStyle'
            },
                {
                text: [
                    'Município de ',
                    {text: `Barueri, ${dayTR} de ${monthTR} de ${yearTR}.\n\n\n\n\n\n`, bold: true}
                    ],
                style: 'defaultStyle'
            },
            {
                text: [
                    `${cmdName} – ${postCmd}\n`                
                    ],
                style: 'header',
                alignment: 'center'
            },
            {
                text: `Ordenador de Despesas\n\n`,
                fontSize: 10,
                alignment:'center',
                font: 'Helvetica'
            },
            
            
        ],
        
        
        
        footer: {
        columns: [
        {text: '_______________________________________________________________________________________________________________\n\
        Câmara Nacional de Modelos de Licitações e Contratos da Consultoria-Geral da União\nTermo de Referência - Modelo para Pregão Eletrônico\
 – Compras\nAtualização: Julho/2021', fontSize: 5},
        ],
        margin: [80,20,1,1],
        font: 'Helvetica'
    },
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
                margin: [ 30, 1, 1, 1 ],
                fontSize: 10,
                alignment: 'justify',
                bold: false
            },
            subItem:{
                font: 'Helvetica',
                margin: [ 70, 1, 1, 1 ],
                fontSize: 10,
                alignment: 'justify',
                bold: false
            },
            innerTable:{
                font: 'Helvetica',
                margin: [1,9,1,9],
                fontSize: 9.5,
                alignment: 'center',
                bold: true
            },
            tableExample:{
                font: 'Helvetica',                
            }
        },
        pageMargins: [ 40, 50, 70, 90 ],
        
    }
    return docDefinitions;
}

module.exports = generatorTR