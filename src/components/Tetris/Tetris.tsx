import React, {Component} from "react";
import {TetrisProps, TetrisDefaultProps} from "./types/TetrisProps";
import {TetrisState, TetrisDefaultState, shuffle} from "./types/TetrisState";
import {KeyboardEvent} from "./Interfaces/Event";
import Style from "./Tetris.module.scss";
import Cell from "./Cell";
import Blocks, {BlockDefault, getBlockPadding, BlockDataHasRotate, blockStrings} from "./Blocks";

class Tetris extends Component<TetrisProps, TetrisState> {

    state: TetrisState = TetrisDefaultState;

    static defaultProps: TetrisProps = TetrisDefaultProps;
    private timer: any;

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
            matrixBlockLayer: matrix,
            activeBlock: 't',
            position: [0, 6],
            rotate: 3
        };
    }

    handleKey = (keyboardEvent: KeyboardEvent) => {
        const {position, rotate, activeBlock} = this.state;

        let block = this.getBlock();

        if (keyboardEvent.code === 'ArrowUp') {
            let nextBlock: BlockDataHasRotate = Blocks[activeBlock][(rotate + 1) % Blocks[activeBlock].length];

            if (position[0] + nextBlock.length < 20)
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
            this.downCheck();
        } else if (keyboardEvent.code === 'Space') {

        }
    };

    downCheck() {
        const {position, matrix} = this.state;
        let block = this.getBlock();


        if(position[0] + block.length < 20){
            let isContinue = true;
            let sensorArr: number[][] = [];
            block.map((blockRow, rowIndex) => {
                let sensor: number[] = [];
                blockRow.map((cell, cellIndex) => {
                    if(cell !== 0
                        && matrix[position[0] + rowIndex + 1][position[1] + cellIndex] > 0)
                        isContinue = false;
                    sensor.push(matrix[position[0] + rowIndex + 1][position[1] + cellIndex]);
                });
                sensorArr.push(sensor);
            });

            if (isContinue)
                this.setState({
                    position: [
                        position[0] + 1,
                        position[1]
                    ]
                });
            else{
                this.commitBlock();
            }
        }else{
            this.commitBlock();
        }
    }

    commitBlock(){
        const {position, activeBlock, matrix, rotate, matrixBlockLayer} = this.state;

        let block: BlockDataHasRotate = Blocks[activeBlock][rotate % Blocks[activeBlock].length];

        block.map((blockRow, rowIndex) => {
            blockRow.map((cell, cellIndex) => {
                matrix[position[0] + rowIndex][position[1] + cellIndex] = cell
            });
        });

        let nextBlock:string | undefined = this.state.blockPreview.pop();

        this.setState({
            matrix: matrixBlockLayer,
            activeBlock: nextBlock ? nextBlock : '',
            position: [0, 6],
        }, () => {
            console.log(this.state.blockPreview);
            if(this.state.blockPreview.length === 0)
                this.setState({
                    blockPreview: JSON.parse(JSON.stringify(shuffle(blockStrings)))
                });
        })
    }

    getBlock(): BlockDataHasRotate {
        const {activeBlock, rotate} = this.state;
        let block: BlockDataHasRotate = Blocks[activeBlock][rotate % Blocks[activeBlock].length];

        return block;
    }

    componentDidUpdate(prevProps: Readonly<TetrisProps>, prevState: Readonly<TetrisState>, snapshot?: any): void {

    }

    componentDidMount(): void {
        document.addEventListener("keydown", this.handleKey, false);

        this.timer = setInterval(() => {
            this.downCheck();
        }, 700);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keydown', this.handleKey, false);
    }

    static getDerivedStateFromProps(props: TetrisProps, state: TetrisState) {

        let setState = {};
        let block = Blocks[state.activeBlock][state.rotate % Blocks[state.activeBlock].length];
        let newLayer = JSON.parse(JSON.stringify(state.matrix));

        block.map((blockRow, rowIndex) => {
            blockRow.map((cell, cellIndex) => {
                if(cell > 0)
                    newLayer[state.position[0] + rowIndex][state.position[1] + cellIndex] = cell;
            });
        });

        let effectiveLength = getBlockPadding(block);
        if (state.position[1] < 3 - effectiveLength.left) {
            state.position[1] = 3 - effectiveLength.left;
        } else if (state.position[1] + 1 > 13 - block[0].length + effectiveLength.right) {
            state.position[1] = 13 - block[0].length + effectiveLength.right;
        }

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
