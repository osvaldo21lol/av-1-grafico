// Parte 1: Função getCSS
const getCSS = (variavel) => {
    const bodyStyles = getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(variavel);
};

const tickConfig = {
    family: getCSS('--font'),
    size: 16,
    color: getCSS('--primary-color')
};

// Parte 2: Visualizar Informações de Qualidade do Ar
const url = 'https://api.airqualityapi.com/api/v1/global'; // Exemplo de API fictícia

async function visualizarInformacoesQualidadeAr() {
    const res = await fetch(url);
    const dados = await res.json();

    const qualidadeAr = dados.data.air_quality_index.toFixed(2);
    const particulasPM25 = dados.data.pm25.toFixed(2);
    const particulasPM10 = dados.data.pm10.toFixed(2);

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `A qualidade do ar atual é de <span>${qualidadeAr}</span> (AQI), com níveis de PM2.5 de <span>${particulasPM25} µg/m³</span> e PM10 de <span>${particulasPM10} µg/m³</span>.`;

    const container = document.getElementById('graficos-container');
    container.appendChild(paragrafo);
}

// Parte 3: Exibir Gráficos de Dados de Qualidade do Ar
async function exibirGraficoQualidadeAr() {
    const trace1 = {
        x: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        y: [35, 40, 30, 25, 50, 55], // Exemplo de índices de qualidade do ar mensais
        mode: 'lines',
        type: 'scatter',
        line: {
            color: getCSS('--secondary-color'),
            width: 3
        }
    };

    const layout = {
        title: 'Variação do Índice de Qualidade do Ar Mensal',
        xaxis: { title: 'Mês', tickfont: tickConfig },
        yaxis: { title: 'Índice de Qualidade do Ar (AQI)', tickfont: tickConfig },
        paper_bgcolor: getCSS('--bg-color'),
        plot_bgcolor: getCSS('--bg-color')
    };

    const data = [trace1];
    Plotly.newPlot('graficos-container', data, layout);
}

// Chamadas para exibir os dados e o gráfico
visualizarInformacoesQualidadeAr();
exibirGraficoQualidadeAr();
      
