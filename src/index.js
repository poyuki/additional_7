module.exports = function solveSudoku(matrix) {
    let r=[],i,j,
        sugestions='123456789';

    for(i=0;i<9;i++){

        for(j=0;j<9;j++){
            r[i]=[];
            if(!matrix[i][j]){
                r[i].push(j);
            }
        }
    }


};
