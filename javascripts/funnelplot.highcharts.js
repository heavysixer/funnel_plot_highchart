$.fn.funnelPlot = function(options) {
    var element = $(this);
    var funneler = {
        min: function(arr) {
            return Math.min.apply(Math, arr);
        },
        max: function(arr) {
            return Math.max.apply(Math, arr);
        },
        median: function(arr) {
          var len = arr.length;
            var i = Math.floor(len / 2);
            if ((len % 2) == 1) {
                return (arr[i]);
            } else {
                return (arr[i - 1] + arr[i]) / 2;
            }
        },
        stats: function(arr) {
            arr.sort(function(l, r) {
                return l - r;
            });
            var hsh = {
                max: this.max(arr),
                min: this.min(arr),
                sum: 0,
                sumSq: 0,
                count: arr.length,
                range: Number.NaN,
                arithMean: Number.NaN,
                standardDeviation: Number.NaN,
                median: arr[0]
            };
            hsh.range = hsh.max - hsh.min;
            for (var x = 0; x < hsh.count; x++) {
                hsh.sum += x;
                hsh.sumSq += x * x;
            }
            hsh.arithMean = hsh.sum / hsh.count;
            if (hsh.count > 0) {
                hsh.standardDeviation = Math.sqrt(((hsh.count * hsh.sumSq) - (hsh.sum * hsh.sum)) / (hsh.count * (hsh.count - 1)));
                hsh.median = this.median(arr);
            }
            return hsh;
        },
        funnelCurve: function(opts) {
            var options = {
                type: 'spline',
                showInLegend: false,
                name: ' ',
                data: [],
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 0
                    }
                },
                enableMouseTracking: false
            };
            $.extend(true, options, opts);
            return (options);
        },
        build: function(data) {
            var len = data.length;
            var xData = [];
            var yData = [];
            var parts = [];
            for (var n = 0; n < len; n++) {
                xData.push(data[n][0]);
                yData.push(data[n][1]);
            }
            var x = this.stats(xData);
            var y = this.stats(yData);
            parts.push(this.funnelCurve({
                color: "#0000aa",
                dashStyle: "ShortDash",
                data: [[x.min, y.median], [x.max, y.max]]
            }));
            parts.push(this.funnelCurve({
                name: 'Median',
                showInLegend: true,
                data: [[x.min, y.median], [x.max, y.median]]
            }));
            parts.push(this.funnelCurve({
                color: "#0000aa",
                dashStyle: "ShortDash",
                data: [[x.min, y.median], [x.max, y.min]]
            }));
            return (parts);
        }
    };
    var chartOptions = {
        chart: {
            renderTo: element.attr("id"),
            defaultSeriesType: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        xAxis: {
            title: {
                enabled: true,
                text: ''
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function() {
                return '' +
                this.x + ' cm, ' + this.y + ' kg';
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        }
    };
    $.extend(true, chartOptions, options);
    chartOptions.series = chartOptions.series.concat(funneler.build(chartOptions.series[0].data));
    var chart = new Highcharts.Chart(chartOptions);
    return chart;
};