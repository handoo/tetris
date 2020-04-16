import React, {Component} from "react";
import {TetrisProps, TetrisDefaultProps} from "./types/TetrisProps";
import {TetrisState, TetrisDefaultState} from "./types/TetrisState";
import {KeyboardEvent} from "./Interfaces/Event";
import Style from "./Tetris.module.scss";
import Cell from "./Cell";
import Blocks, {BlockDefault, getBlockPadding, BlockDataHasRotate} from "./Blocks";

class Tetris extends Component<TetrisProps, TetrisState> {

    state: TetrisState = TetrisDefaultState;

    static defaultProps: TetrisProps = TetrisDefaultProps;
    private timer:any;

    constructor(props: TetrisProps) {
        super(props);

        const {width, height} = props;

        let matrix = [];

        for (let h = 0; h < height; h++) {
            let row = [];
            for (let w = 0; w < width; w++) {
                row.push(0);
            }
            matrix.push(row);
        }

        this.state = {
            ...this.state,
            matrix: matrix,
            activeBlock: 't',
            position: [0, 6]
        };
    }

    handleKey = (keyboardEvent: KeyboardEvent) => {
        const {position, rotate, activeBlock} = this.state;

        let block = this.getBlock();

        if (keyboardEvent.code === 'ArrowUp') {
            let nextBlock: BlockDataHasRotate = Blocks[activeBlock][(rotate + 1) % Blocks[activeBlock].length];

            if(position[0] + nextBlock.length < 20)
                this.setState({
                    rotate: rotate + 1
                });
        } else if (keyboardEvent.code === 'ArrowLeft') {
            let effectiveLength = getBlockPadding(block);
            this.setState({
                position: [
                    position[0],
                    position[1] - 1 < 3 - effectiveLength.left ? 3 - effectiveLength.left : position[1] - 1
                ]
            })
        } else if (keyboardEvent.code === 'ArrowRight') {
            let effectiveLength = getBlockPadding(block);
            this.setState({
                position: [
                    position[0],
                    position[1] + 1 > 13 - block[0].length + effectiveLength.right ?
                        13 - block[0].length + effectiveLength.right : position[1] + 1
                ]
            })
        } else if (keyboardEvent.code === 'ArrowDown') {
            if(position[0] + block.length < 20)
                this.setState({
                    position: [
                        position[0] + 1,
                        position[1]
                    ]
                });
        } else if (keyboardEvent.code === 'Space') {

        }
    };

    getBlock(): BlockDataHasRotate {
        const {activeBlock, rotate} = this.state;
        let block: BlockDataHasRotate = Blocks[activeBlock][rotate % Blocks[activeBlock].length];

        return block;
    }

    componentDidMount(): void {
        document.addEventListener("keydown", this.handleKey, false);

        let block = this.getBlock();
        this.timer = setInterval(() => {
            if(this.state.position[0] + block.length < 20)
            this.setState({
                position: [
                    this.state.position[0] + 1,
                    this.state.position[1]
                ]
            })
        }, 1000);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keydown', this.handleKey, false);
    }

    static getDerivedStateFromProps(props: TetrisProps, state: TetrisState) {

        let setState = {};
        let block = Blocks[state.activeBlock][state.rotate % Blocks[state.activeBlock].length];
        let newLayer = JSON.parse(JSON.stringify(state.matrix));

        block.map((row: BlockDefault, index: number) => {
            let targetRow = newLayer[state.position[0] + index];
            targetRow.splice(state.position[1], block[index].length, row);
            targetRow = targetRow.flat();

            newLayer[state.position[0] + index] = targetRow;
        });

        let effectiveLength = getBlockPadding(block);
        if (state.position[1] < 3 - effectiveLength.left) {
            state.position[1] = 3 - effectiveLength.left;
        } else if (state.position[1] + 1 > 13 - block[0].length + effectiveLength.right) {
            state.position[1] = 13 - block[0].length + effectiveLength.right;
        }

        // crash detect

        setState = {
            ...setState,
            matrixBlockLayer: newLayer,
            position: state.position
        };

        return setState;
    }

    render() {
        const {matrixBlockLayer} = this.state;
        return <>
            <div className={Style.tetrisWrap}>
                {matrixBlockLayer.map((row, num) => {
                    return <div className={Style.row} key={'row' + num}>
                        {row.map((cell, no) => {
                            return <Cell type={cell} key={cell + '-cell' + num + '-' + no}/>;
                        })}
                    </div>;
                })}
            </div>
        </>
    }
}


export default Tetris;
