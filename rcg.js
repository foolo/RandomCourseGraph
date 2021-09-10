function generateGraph() {
	// generate the graph
	N = 500
	INITAL_SHARE_PRICE = 100
	SIGMA = 3
	const atog = Math.log(1.01)
	let arr = Array(N).fill(0)
	currentSharePrice = INITAL_SHARE_PRICE
	for (let i = 0; i < N; i++) {
		randomPercentage = SIGMA * randomNormal()
		// convert percentage so that +X% followed by -X% results in a net zero change
		arithmeticChange = Math.exp(log1_01 * randomPercentage);
		currentSharePrice *= arithmeticChange;
		arr[i] = currentSharePrice
	}
    return arr;
}

function dataset(label, color, data) {
	return {
		label: label,
		fill: false,
		data: data,
		backgroundColor: color,
		borderColor: color,
		borderWidth: 1,
		lineTension: 0 // linear interpolation
	}
}

function initChart(x_size) {
	zeroes = Array(x_size).fill(0)
	var config = {
		type: 'line',
		data: {
			labels: zeroes,
			datasets: [ dataset('price', 'blue', zeroes) ]
		},
		options: {
			elements: {
				point:{
					radius: 0
				}
			}
		}
	}
	var ctx = document.getElementById('chartCanvas');
	window.myChart = new Chart(ctx, config);
}

window.onload = function() {
	updadeChart();
};

// https://stackoverflow.com/a/36481059/961254
// Standard Normal variate using Box-Muller transform.
function randomNormal() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

const log1_01 = Math.log(1.01)
function updadeChart() {
    arr = generateGraph()

	// show table
	if (window.myChart == null) {
		initChart(N);
	}
	Date.prototype.addDays = function(days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}
	let endDate = new Date();
	xLabels = Array(N)
	for (let i = 0; i < N; i++) {
		let days = i - N;
		xLabels[i] = endDate.addDays(days).toISOString().substring(0, 10);;
	}
	window.myChart.config.data.labels = xLabels
	window.myChart.config.data.datasets[0].data = arr
	window.myChart.update()
}