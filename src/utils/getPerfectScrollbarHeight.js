export default (rowsPerPage: number, length: number, defaultHeight: number) => {
    if(length > rowsPerPage){
      return rowsPerPage * defaultHeight;
    }
    return length * defaultHeight;
};
