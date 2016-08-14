
const size = 10;

module.exports = (React) => {
  return (props) => {
    return React.createElement('svg', {
      onClick: props.onClick,
      style: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: size,
        height: size
      }
    }, [React.createElement('line', {
      x1: 0,
      y1: 0,
      x2: size,
      y2: size,
      stroke: props.color
    }), React.createElement('line', {
      x1: 0,
      y1: size,
      x2: size,
      y2: 0,
      stroke: props.color
    })]);
  };
};
