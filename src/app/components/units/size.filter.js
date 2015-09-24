const MetricSymbols = ['', 'k', 'M', 'G', 'T', 'P'];
const LN1000 = Math.log(1000);

function log1000(val)
{
	return Math.log(val) / LN1000;
}

function sizeFilter()
{
	return function(input)
	{
		var bytes = parseInt(input);
		var metricOrdinal = Math.floor(log1000(bytes));

		var metricSize = bytes / Math.pow(1000, metricOrdinal);
		var metricSymbol = MetricSymbols[metricOrdinal];

		return metricSize.toFixed(2) + " " + metricSymbol + "B";
	};
}

export default sizeFilter;
