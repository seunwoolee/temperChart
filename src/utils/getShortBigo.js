export default (width = 0, bigo) => {
  if (width < 1024 && bigo.length > 30) {
    return `${bigo.substring(0, 25)}...`;
  }
  return bigo;
};
