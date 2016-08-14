const Animation = require('victory').VictoryAnimation;

const overlayStyles = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  cursor: 'pointer',
  borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
  minHeight: '25%'
};

module.exports = (React) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: false,
      };

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
      this.setState({
        expanded: !this.state.expanded
      });
    }

    mapChildren () {
      return React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          expanded: this.state.expanded
        });
      });
    }

    render () {
      const animationData = this.state.expanded ? {left: 0} : {left: 75};
      const inner = React.createElement('div', {style: {position: 'relative'}}, this.mapChildren());
      const dynamicStyles = {
        borderColor: this.props.foregroundColor,
        backgroundColor: this.props.backgroundColor
      };

      return React.createElement(Animation, {data: animationData, duration: 350}, (d) => {
        if (d.left > 0) {
          d = Object.assign({}, {
            left: d.left + '%',
            // top: d.top + '%'
          });
        }
        return React.createElement('div', {style: Object.assign({}, overlayStyles, d, dynamicStyles), onClick: this.handleClick, onMouseEnter: this.props.onMouseEnter, onMouseLeave: this.props.onMouseLeave}, inner);
      });
    }
  }
};
