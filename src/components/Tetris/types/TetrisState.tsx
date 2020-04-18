import {blockStrings} from "../Blocks";

export const shuffle = function (arr: any[]) {
    var length = arr.length;
    while (length) {
        var index = Math.floor((length--) * Math.random());
        var temp = arr[length];
        arr[length] = arr[index];
        arr[index] = temp;
    }
    return arr;
};

export type TetrisState = {
    matrix: Array<Array<number>>,
    matrixBlockLayer: Array<Array<number>>,
    activeBlock: string,
    nextBlock: string,
    position: Array<number>,
    rotate: number,
    blockPreview: string[],
}

export let TetrisDefaultState = {
    matrix: [],
    matrixBlockLayer: [],
    activeBlock: 't',
    nextBlock: 'o',
    position: [0, 0],
    rotate: 0,
    blockPreview: JSON.parse(JSON.stringify(shuffle(blockStrings)))
};
