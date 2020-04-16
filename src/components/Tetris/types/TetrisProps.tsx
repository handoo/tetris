export type TetrisProps = {
    width: number,
    height: number,
};

export const TetrisDefaultProps = {
    width: 16,
    height: 20,
};


export type CellProps = {
    type: number
};

export const CellDefaultProps = {
    type: 0
};
