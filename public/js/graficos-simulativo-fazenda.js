var umidCard = document.querySelector('#umid-card');
var tempCard = document.querySelector('#temp-card');

var tituloDesempenho = document.querySelector('#desempenho-titulo');

/* -- lm35Temperatura */
var contextoLm35Temperatura = document.getElementById('lm35Temperatura').getContext('2d');
var lm35Temperatura = new Chart(
    contextoLm35Temperatura,
    {
        type: 'line',
        data: {
            datasets: [{
                label: 'Temperatura',
                type: 'line',
                borderColor: ['#EB1616'],
                backgroundColor: ['#eb1616b2']
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    distribution: 'series',
                    ticks: {
                        beginAtZero: true,
                        fontSize: 10
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperatura'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                duration: 0
            }
        }
    }
);

/* -- qtd lm35 */
var contextoQtdLm35 = document.getElementById('qtdLm35').getContext('2d');
var qtdLm35 = new Chart(
    contextoQtdLm35,
    {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Umidade',
                type: 'line',
                borderColor: ['#45b3e7'],
                backgroundColor: ['#45b4e794']
            }],
            labels: [
                'Ativos',
                'Inativos',
              ],
              datasets: [{
                data: [10, 1],
                backgroundColor: [
                  '#337AB7',
                  '#D9534F',
                ],
                hoverOffset: 2
              }]
        },
    }
);


/* -- dht11Umidade -- */
var contextoDht11Umidade = document.getElementById('dht11Umidade').getContext('2d');
var dht11Umidade = new Chart(
    contextoDht11Umidade,
    {
        type: 'line',
        data: {
            datasets: [{
                label: 'Umidade',
                type: 'line',
                borderColor: ['#45b3e7'],
                backgroundColor: ['#45b4e794']
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    distribution: 'series',
                    ticks: {
                        beginAtZero: true,
                        fontSize: 10
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Umidade',

                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                duration: 0
            }
        }
    }
);
/* -- qtd dht11 */
var contextoQtdDht11 = document.getElementById('qtdDht11').getContext('2d');
var qtdDht11 = new Chart(
    contextoQtdDht11,
    {
        type: 'pie',
        data: {
            datasets: [{
                data: [9, 11],
                backgroundColor: [
                    '#D9534F', // Cor para os sensores inativos
                    '#337AB7', // Cor para os sensores ativos
                ],
                hoverOffset: 2
            }],
            labels: [
                'Inativos', // Rótulo para os sensores inativos
                'Ativos',   // Rótulo para os sensores ativos
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Status dos Sensores'
            }
        }
    }
);



var paginacao = {};
var tempo = {};
function obterDados(grafico, valoresAleatorio) {
    var valores = valoresAleatorio;
    if (paginacao[valoresAleatorio] == null) {
        paginacao[valoresAleatorio] = 0;
    }
    if (tempo[valoresAleatorio] == null) {
        tempo[valoresAleatorio] = 0;
    }
    // Exibir à partir do último elemento exibido anteriormente
    var ultimaPaginacao = paginacao[valoresAleatorio];
    paginacao[valoresAleatorio] = valores.length;
    var valores = valores.slice(ultimaPaginacao);
    //Máximo de 60 itens exibidos no gráfico
    if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
        grafico.data.labels.shift();
        grafico.data.datasets[0].data.shift();
    }


    // capturar a hora
    var dateObj = new Date();

    var horas = dateObj.getHours();
    var minutos = dateObj.getMinutes(); 
    var segundos = dateObj.getSeconds();

    grafico.data.labels.push(`${horas}:${minutos}`);
    grafico.data.datasets[0].data.push(parseFloat(valoresAleatorio));
    grafico.update();
    
}

var tituloTempCritico = document.querySelector('#contagem-temp-critico');

var contagemTempCritico = 12;

setInterval(() => {
    let minTemp = 30;
    let maxTemp = 35;

    let minUmid = 12;
    let maxUmid = 14.5;

    let somaTemp = 0;

    // supondo 10 sensores ativos e 1 inativo
    for (let i = 0; i < 11; i++) {
        if(i == 0){ 
            continue; 
        }
        let num2 = parseInt(Math.random() * (maxTemp - minTemp) + minTemp);
        somaTemp += num2;
    } 

    // supondo 21 dht11 sensores ativos e 9 inativo 

        let umidade = parseFloat(Math.random() * (maxUmid - minUmid) + minUmid).toFixed(2);

    let mediaTemp = somaTemp / 10;

    var valoresAleatorio = `${umidade};${mediaTemp}`;

    valoresAleatorio = valoresAleatorio.split(';')
    console.log(valoresAleatorio);

    umidCard.innerHTML = `
        <h2> ${valoresAleatorio[0]}%</h2>
    `
    tempCard.innerHTML = `
        <h2 id="ref_temp"> ${valoresAleatorio[1]}°C</h2>
    `

    obterDados(dht11Umidade, valoresAleatorio[0]);
    obterDados(lm35Temperatura, valoresAleatorio[1]);

    tituloTempCritico.textContent = contagemTempCritico;

    contagemTempCritico++;
    
}, 1000);
