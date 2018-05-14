const style = {
  rowText: {
    alignSelf: "center",
    marginLeft: 4,
  },
  evenRow: {
    backgroundColor: '#eee'
  }
};

export default style;

export const evenRow = (i: number) => (i % 2 === 0) ? style.evenRow : {};
