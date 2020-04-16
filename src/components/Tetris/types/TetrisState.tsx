export type TetrisState = {
    matrix: Array<Array<number>>,
    matrixBlockLayer: Array<Array<number>>,
    activeBlock: string,
    nextBlock: string,
    position: Array<number>,
    rotate: number
}

export let TetrisDefaultState = {
    matrix: [],
    matrixBlockLayer: [],
    activeBlock: 't',
    nextBlock: 'o',
    position: [0, 0],
    rotate: 0
};
