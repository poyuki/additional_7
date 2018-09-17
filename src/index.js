module.exports = function solveSudoku(matrix) {
    let matrixForSolve = matrix,sugestions=[1,2,3,4,5,6,7,8,9];
    let closerZero=getClosestZero(matrixForSolve);
    if(closerZero.length) {
        sugestions.some((val) => {
            if (isGoodSuggestion(matrixForSolve, closerZero, val)) {
                matrixForSolve[closerZero[0]][closerZero[1]] = val;
                let tempMatrix = solveSudoku(matrixForSolve);
                if (isSolved(tempMatrix)) {
                    matrixForSolve = tempMatrix;
                    return true;
                }
                matrixForSolve[closerZero[0]][closerZero[1]]=0;
            }
        });
    }
    return matrixForSolve;
};

function getClosestZero(MatrixForSolve) {
    let res=[];
    MatrixForSolve.forEach((row,i)=>{
        if(!res.length) {
            row.forEach((col, j) => {
                if (col === 0 && !res.length) {
                    res.push(i, j);
                }
            });
        }
    });
    return res;
}
function isGoodSuggestion(matrixForSolve,closerZero,sugestion) {
    let rowAndColIsGood=true,result=true;
    matrixForSolve.forEach((row,index)=>{
        if(index===closerZero[0]){
            row.forEach((col)=>{
                if(col===sugestion) rowAndColIsGood=false;
            });
        }
        if(row[closerZero[1]]===sugestion) rowAndColIsGood=false;
    });
    if(rowAndColIsGood){
        let sectionCoord=[Math.floor(closerZero[0]/3)*3,Math.floor(closerZero[1]/3)*3];
        for(let i=sectionCoord[0];i<sectionCoord[0]+3;i++){
            for(let j=sectionCoord[1];j<sectionCoord[1]+3;j++){
                if(matrixForSolve[i][j]===sugestion){
                    result=false;
                }
            }
        }
    }else{
        result=false;
    }
    return result;
}
function isSolved(matrix) {
    let result=true;
    matrix.forEach((row)=>{
        row.forEach((val)=>{
            if(val === 0){
                result=false;
            }
        });
    });
    return result
}
/*
function getIndexesOfZeros(matrix){
    let zeroIndexes=new Map(),i,j;
    for(i=0;i<9;i++){
        zeroIndexes.set(i,new Map());
        for(j=0;j<9;j++){
            if(!matrix[i][j]){
                zeroIndexes.get(i).set(j,[]);
            }
        }
        if(!zeroIndexes.get(i).size) zeroIndexes.delete(i);
    }
    return zeroIndexes;
}

function getSugetstionsForZeros(zeroIndexes,matrix){
    let resZeroIndexes=new Map(zeroIndexes),
        sugestions='123456789';
    resZeroIndexes.forEach((value,i,map)=>{
        let rowVals='',rowValAr=[],rowSuggest='';
        matrix[i].forEach((item)=>{
            if(item) rowValAr.push(item);
        });
        rowValAr.sort((a,b)=>a-b);
        rowValAr.forEach((item)=>{
            rowVals+=item;
        });
        for(let i=0;i<sugestions.length;i++){
            if(rowVals.indexOf(sugestions.charAt(i))===-1){
                rowSuggest+=sugestions.charAt(i);
            }
        }
        value.forEach((value,j,map)=>{
            let colValAr=[],colVals='',colSuggest='';
            matrix.forEach((item)=>{
                if(item[j]) colValAr.push(item[j]);
            });
            colValAr.sort((a,b)=>a-b);
            colValAr.forEach((item)=>{
                colVals+=item;
            });

            for(let i=0;i<sugestions.length;i++){
                if(colVals.indexOf(sugestions.charAt(i))===-1){
                    colSuggest+=sugestions.charAt(i);
                }
            }

            map.get(j).push(rowSuggest,colSuggest);
        })
    });
    return resZeroIndexes
}

function simplifySugestions(zeroIndexes) {
    let simpleIndex=new Map();
    zeroIndexes.forEach((value,i,map)=>{
        simpleIndex.set(i,new Map());
        value.forEach((value,j,map)=>{
            let rowSuggest=zeroIndexes.get(i).get(j)[0],
                colSuggest=zeroIndexes.get(i).get(j)[1],
                biggerSuggest,smallerSuggest,generalSuggest='';
            if(rowSuggest>colSuggest){
                biggerSuggest=rowSuggest;
                smallerSuggest=colSuggest;
            }else{
                biggerSuggest=colSuggest;
                smallerSuggest=rowSuggest;
            }
            for(let k=0;k<biggerSuggest.length;k++){
                if(smallerSuggest.indexOf(biggerSuggest.charAt(k))!==-1) generalSuggest+=biggerSuggest.charAt(k)
            }
            simpleIndex.get(i).set(j,generalSuggest)
        });
    });
    return simpleIndex;
}

function singlesSuggestions(simpleIndex) {
    let singlesSuggestions=new Map(),colSuggest=new Map();
    for(let r=0;r<9;r++){
        colSuggest.set(r,new Map());
    }
    simpleIndex.forEach((value,i,map)=>{
        singlesSuggestions.set(i,new Map());
        /**Single Row Suggestions*/
       /* let rowSuggests='',rowSuggestsObj={},singleRowSuggest=[];
        value.forEach((value,j,map)=>{
            singlesSuggestions.get(i).set(j,{});
            colSuggest.get(j).set(i,value);
            rowSuggests+=value;
        });
        for(let k=0;k<rowSuggests.length;k++){
            if(rowSuggestsObj.hasOwnProperty(rowSuggests.charAt(k))){
                rowSuggestsObj[rowSuggests.charAt(k)]++;
            }else{
                rowSuggestsObj[rowSuggests.charAt(k)]=1;
            }
        }
        let rowSuggestsObjKeys= Object.keys(rowSuggestsObj);
        rowSuggestsObjKeys.forEach((item)=>{
            if(rowSuggestsObj[item]===1) singleRowSuggest.push(item);
        });
        if (singleRowSuggest.length) {
            singleRowSuggest.forEach((el)=>{
                value.forEach((value, j, map) => {
                    if (value.indexOf(el) !== -1) singlesSuggestions.get(i).get(j).singleRowSuggest=el
                });
            });
        }
        /**Single Row Suggestions ended*/
   /* });

    colSuggest.forEach((col,j,map)=>{
        let colSuggestStr='',colSuggestsObj={},singleColSuggest=[];
        col.forEach((val,i)=>{
            colSuggestStr+=val;
        });
        for(let k=0;k<colSuggestStr.length;k++){
            if(colSuggestsObj.hasOwnProperty(colSuggestStr.charAt(k))){
                colSuggestsObj[colSuggestStr.charAt(k)]++;
            }else{
                colSuggestsObj[colSuggestStr.charAt(k)]=1;
            }
        }
        let ColSuggestsObjKeys= Object.keys(colSuggestsObj);
        ColSuggestsObjKeys.forEach((item)=>{
            if(colSuggestsObj[item]===1) singleColSuggest.push(item);
        });
        if (singleColSuggest.length) {
            singleColSuggest.forEach((el)=>{
                col.forEach((val, i, map) => {
                    if (val.indexOf(el) !== -1) singlesSuggestions.get(i).get(j).singleColSuggest=el
                });
            });
        }
    });
    return singlesSuggestions;
}
function setSimpleSuggestions(simpleSuggestions,matrix) {
    let matrixForSolve=matrix;
    simpleSuggestions.forEach((row,i,map)=>{
        row.forEach((col,j,map)=>{
            if(col.singleRowSuggest!==undefined&&col.singleColSuggest!==undefined&&col.singleRowSuggest===col.singleColSuggest) {
                matrixForSolve[i][j]=parseInt(col.singleRowSuggest);
            }else if(col.singleRowSuggest!==undefined&&col.singleColSuggest===undefined){
                matrixForSolve[i][j]=parseInt(col.singleRowSuggest);
            }else if(col.singleRowSuggest===undefined&&col.singleColSuggest!==undefined){
                matrixForSolve[i][j]=parseInt(col.singleColSuggest);
            }
        });
    });
    return matrixForSolve;
}

/**
 * @return {boolean}
 */
/*function Solved(matrixForSolve) {
    let result=true;
    matrixForSolve.forEach((row,i)=>{
        row.forEach((column,j)=>{
            if(matrixForSolve[i][j]===0) result=false;
        });
    });
    return result;
}
*/