$.fn.funnelPlot = function(options) {
    var element = $(this);
    var funneler = {
        min: function(arr) {
            return Math.min.apply(Math, arr);
        },
        max: function(arr) {
            return Math.max.apply(Math, arr);
        },
        funnelCurve: function(opts) {
            var options = {
                type: 'line',
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
            for (var x = 0; x < len; x++) {
                xData.push(data[x][0]);
                yData.push(data[x][1]);
            }
            var xMin = this.min(xData);
            var xMax = this.max(xData);
            var yMin = this.min(yData);
            var yMax = this.max(yData);
            parts.push(this.funnelCurve({
                data: [[xMin, (yMax / 2)], [xMax, yMax]]
            }));
            parts.push(this.funnelCurve({
                name : 'Average',
                data: [[xMin, (yMax / 2)], [xMax, (yMax / 2)]]
            }));
            parts.push(this.funnelCurve({
                data: [[xMin, (yMax / 2)], [xMax, yMin]]
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