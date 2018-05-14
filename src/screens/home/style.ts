const style = {
  marginLeft: {
    marginLeft: 7,
  },
  evenRow: {
    backgroundColor: '#eee'
  },
  negMargin: {
    marginLeft: -18,
  }
};

export default style;

export const evenRow = (i: number) => (i % 2 === 0) ? style.evenRow : {};
