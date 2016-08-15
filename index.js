
const OUTPUT_HEADER = require('./constants').OUTPUT_HEADER;
const fs = require('fs');
const Window = require('hyperterm-window');

exports.reduceUI = (state, action) => {
  switch (action.type) {
    case 'SET_CHART':
      return state.set('chart', action.chart);
  }
  return state;
};

exports.mapTermsState = (state, map) => {
  return Object.assign(map, {
    chart: state.ui.chart
  });
};

exports.mapTermsDispatch = (dispatch, map) => {
  return Object.assign(map, {
    clearChart: () => {
      dispatch({
        type: 'SET_CHART',
        chart: null
      });
    }
  })
};

exports.getTermProps = (uid, parentProps, props) => {
  return Object.assign(props, {
    chart: parentProps.chart,
    clearChart: parentProps.clearChart
  });
};

exports.middleware = (store) => (next) => (action) => {
  if (!action) {
    return;
  }
  if (action.type === 'SESSION_ADD_DATA') {
    const { data } = action;
    if (data.trim().startsWith(OUTPUT_HEADER)) {
      const metadata = JSON.parse(data.replace(OUTPUT_HEADER, ''));
      let jsonData = null;
      fs.readFile(metadata.path, 'utf8', function (err, filedata) {
        if (err) {
            // send error to console
            console.log(err);
            return;
        };
        jsonData = JSON.parse(filedata);
        store.dispatch({
          type: 'SET_CHART',
          chart: {
            type: metadata.type,
            data: jsonData
          }
        });
      });
    } else {
      return next(action);
    }
  } else {
    return next(action);
  }
};

exports.decorateTerm = (Term, { React, notify }) => {

  return class extends React.Component {
    render () {
      const { backgroundColor, foregroundColor } = this.props;
      const children = [React.createElement(Term, Object.assign({}, this.props, { key: 'term' }))];
      if (this.props.chart) {
        const chart = React.createElement(Chart, Object.assign({}, this.props.chart, {
          key: 'hyperchart',
          colors: this.props.colors,
          backgroundColor: backgroundColor,
          foregroundColor: foregroundColor
        }));
        const hyperwindow = React.createElement(Window, Object.assign({}, this.props, {key: 'window', onClose: this.props.clearChart}), [chart]);
        children.push(hyperwindow);
      }
      return React.createElement('div', {style: {width: '100%', height: '100%', position: 'relative'}}, children);
    }
  }
};
