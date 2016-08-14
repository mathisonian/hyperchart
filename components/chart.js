
const Victory = require('victory');
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

module.exports = (React) => {
  return (props) => {
    const Component = chartMap[props.type];
    const Viz = React.createElement(Component, {data: props.data, style: {data: getStyles(props)}});
    // if (props.expanded) {
    //   return React.createElement(Chart, {}, Viz);
    // }
    return Viz;
  };
};
