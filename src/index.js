module.exports = function solveSudoku(matrix) {
    let singleSuggestions;
    let zeroIndexes=getIndexesOfZeros(matrix);
    zeroIndexes=getSugetstionsForZeros(zeroIndexes,matrix);
    let simpleIndex=simplifySugestions(zeroIndexes);
    singleSuggestions=singlesSuggestions(simpleIndex);
    let solvedMatrix=setSimpleSuggestions(singlesSuggestions,matrix);
};

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
    let singlesSuggestions=new Map();
    simpleIndex.forEach((value,i,map)=>{
        singlesSuggestions.set(i,new Map());
        /**Single Row Suggestions*/
        let rowSuggests='',rowSuggestsObj={},singleRowSuggest=[];
        value.forEach((value,j,map)=>{
            singlesSuggestions.get(i).set(j,{});
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
    });
    return singlesSuggestions;
}
function setSimpleSuggestions(simpleSuggestions,matrix) {
    let matrixForSolve=marix;
    simpleSuggestions.forEach((row,i,map)=>{
        row.forEach((col,j,map)=>{
            let r=map.get(i).get(j);
        });
    })

}
