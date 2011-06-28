$.fn.funnelPlot = function(options) {
    var element = $(this),
    chartOptions = {},
    data = options.series.data,
    seriesOptions = [];
    chart = new Highcharts.Chart(chartOptions,
    function(chart) {
        $.each(chart.series[0].data,
        function(i, point) {
            chart.renderer.rect(
            point.plotX + chart.plotLeft - point.barW / 2,
            point.plotY + chart.plotTop - 35,
            point.barW,
            20,
            5
            )
            .attr({
                zIndex: 5,
                fill: 'skyblue',
                'stroke-width': '1'
            })
            .add();

            chart.renderer.text(
            "123.4", point.plotX + chart.plotLeft - 16,
            point.plotY + chart.plotTop - 20.5
            )
            .attr({
                zIndex: 6
            })
            .add();
        });
    });
    return chart;
};