import { getCSS, tickConfig } from "./common.js";

async function quantidadeUsuariosPorRede() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false';
    const res = await fetch(url);
    const dados = await res.json();

    const nomeDasCriptomoedas = dados.map(coin => coin.name);
    const precoDasCriptomoedas = dados.map(coin => coin.current_price);
    const marketCap = dados.map(coin => (coin.market_cap / 1e9).toFixed(2)); // Convertendo para bilhões de USD

    const data = [
        {
            x: nomeDasCriptomoedas,
            y: marketCap,
            type: 'bar',
            text: precoDasCriptomoedas.map(price => `$${price}`), // Preço como texto ao passar o mouse
            marker: {
                color: getCSS('--primary-color')
            }
        }
    ];

    const laytout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Principais Criptomoedas por Capitalização de Mercado',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                font: getCSS('--font')
            }
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Nome das Criptomoedas',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Capitalização de Mercado (em bilhões USD)',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        }
    };

    const grafico = document.createElement('div');
    grafico.className = 'grafico';
    document.getElementById('graficos-container').appendChild(grafico);
    Plotly.newPlot(grafico, data, laytout);
}

quantidadeUsuariosPorRede();


