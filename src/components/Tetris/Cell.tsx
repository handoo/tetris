import React from 'react';
import Style from "./Tetris.module.scss";
import {CellDefaultProps, CellProps} from "./types/TetrisProps";

const Cell = (props:CellProps) => {

    /************************\
     *
     * e i o t l j s z
     * 0 1 2 3 4 5 6 7
     *
     * e is empty
     *
    \************************/

    const blocks = ['e', 'i', 'o', 't', 'l', 'j', 's', 'z', 'g'];

    return (
        <div className={[Style.cell, Style[blocks[props.type]]].join(' ')}>
            {/*{props.type}*/}
        </div>
    )
};

Cell.defaultProps = CellDefaultProps;

export default Cell;
