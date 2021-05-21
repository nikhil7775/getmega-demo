import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import PropTypes from 'prop-types';

class RevenueGraph extends React.Component {
    chart = null;

    static propTypes = {
      data: PropTypes.array,
    }

    static defaultProps = {
      data: [],
    }

    componentDidMount() {
      const { data } = this.props;
      this.createGraph(data);
    }

    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }

    createGraph = (data) => {
      am4core.useTheme(am4themes_animated);

      const chart = am4core.create('revenue-graph', am4charts.XYChart);

      const xAxis = chart.xAxes.push(new am4charts.DateAxis());
      xAxis.renderer.minGridDistance = 40;
      xAxis.title.text = 'Revenue';

      const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.logarithmic = true;

      data.forEach((a) => {
        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'value';
        series.defaultState.transitionDuration = 1000;
        series.data = a.revenue || [];
        series.name = a.company;
        series.legendSettings.labelText = `${a.company}: ${a.country}`;
        series.minBulletDistance = 15;

        series.tooltipText = `${a.company} : {value}`;
      });

      // Add legend
      chart.legend = new am4charts.Legend();
      chart.legend.useDefaultMarker = true;
      chart.legend.fontSize = 12;
      chart.legend.valueLabels.template.align = 'right';
      chart.legend.valueLabels.template.textAlign = 'end';
      chart.legend.itemContainers.template.tooltipText = '{legendSettings.labelText}';
      chart.legend.maxHeight = 72;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.maxTooltipDistance = -1;
      chart.cursor.xAxis = xAxis;

      chart.scrollbarX = new am4core.Scrollbar();

      this.chart = chart;
    }

    render() {
      return (
        <div id="revenue-graph" style={{ width: '100%', height: '600px' }} />
      );
    }
}

export default RevenueGraph;
