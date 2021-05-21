import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

class PieChart extends React.Component {
  chart = null;

  static propTypes = {
    data: PropTypes.array,
    country: PropTypes.string.isRequired,
  }

  static defaultProps = {
    data: [],
  }

  componentDidMount() {
    const { data, country } = this.props;
    this.createGraph(data, country);
  }

  componentDidUpdate(prevProps) {
    const { data, country } = this.props;
    const { data: prevData } = prevProps;
    if (!_.isEqual(data, prevData)) {
      if (this.chart) {
        this.chart.dispose();
      }
      this.createGraph(data, country);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createGraph = (data, country) => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create(`pie-graph-${country}`, am4charts.PieChart);

    chart.data = data || [];

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'revenue';
    pieSeries.dataFields.category = 'company';
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);

    this.chart = chart;
  }

  render() {
    const { country } = this.props;
    return (
      <div id={`pie-graph-${country}`} style={{ width: '90%', height: '250px' }} />
    );
  }
}

export default PieChart;
