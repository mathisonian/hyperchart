
const Victory = require('victory');
const Axis = require('victory').VictoryAxis;
const Chart = Victory.VictoryChart;

const chartMap = {
  line: Victory.VictoryLine,
  scatter: Victory.VictoryScatter
};

const getStyles = (props) => {
  switch (props.type) {
    case 'line':
      return {
        stroke: props.foregroundColor
      };
    case 'scatter':
      return {
        fill: props.foregroundColor
      };
  }
}

const getAxisStyles = (props) => {
  return {
    axis: {stroke: props.foregroundColor},
    // grid: {stroke: props.backgroundColor},
    ticks: {size: 0},
    tickLabels: {fill: props.foregroundColor},
    axisLabel: {fill: props.foregroundColor}
  };
};

module.exports = (React) => {
  return (props) => {
    const Component = chartMap[props.type];
    const xAxis = React.createElement(Axis, {style: getAxisStyles(props)});
    const yAxis = React.createElement(Axis, {style: getAxisStyles(props), dependentAxis: true});
    const Viz = React.createElement(Component, {data: props.data, style: {data: getStyles(props)}});
    if (props.expanded) {
      return React.createElement(Chart, {style: {
        axis: {
          axis: {stroke: "black"},
          grid: {strokeWidth: 2},
          ticks: {stroke: "red", size: 4},
          tickLabels: {fontSize: 12},
          axisLabel: {fontsize: 16}
        }
      }}, [xAxis, yAxis, Viz]);
    }
    return Viz;
  };
};
