const style = {
  marginLeft: {
    marginLeft: 0,
  },
  evenRow: {
    backgroundColor: '#eee'
  },
  negMargin: {
    marginLeft: -18,
  },
  scaleDown: {
    scaleX: 0.7,
    scaleY: 0.7
  }
};

export default style;

export const evenRow = (i: number) => (i % 2 === 0) ? style.evenRow : {};
