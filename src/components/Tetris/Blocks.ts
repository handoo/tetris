export type BlockData = number[][][];
export type BlockDataHasRotate = number[][];
export type BlockDefault = number[];
export type Blocks = {
    [key: string]: BlockData
};

export const blockStrings: string[] = ['i', 'o', 't', 'l', 'j', 's', 'z'];

const i:BlockData = [
    [
        [1, 1, 1, 1, 1]
    ],
    [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
    ]
];

const o:BlockData = [
    [
        [2, 2],
        [2, 2],
    ]
];

const t:BlockData = [
    [
        [3, 3, 3],
        [0, 3, 0],
    ],
    [
        [3, 0, 0],
        [3, 3, 0],
        [3, 0, 0],
    ],
    [
        [0, 3, 0],
        [3, 3, 3],
    ],
    [
        [0, 0, 3],
        [0, 3, 3],
        [0, 0, 3],
    ]
];

const l:BlockData = [
    [
        [4, 0],
        [4, 0],
        [4, 4],
    ],
    [
        [0, 0, 4],
        [4, 4, 4],
    ],
    [
        [4, 4],
        [0, 4],
        [0, 4],
    ],
    [
        [4, 4, 4],
        [0, 0, 4],
    ]
];

const j:BlockData = [
    [
        [0, 5],
        [0, 5],
        [5, 5],
    ],
    [
        [5, 0, 0],
        [5, 5, 5],
    ],
    [
        [5, 5],
        [5, 0],
        [5, 0],
    ],
    [
        [5, 5, 5],
        [5, 0, 0],
    ]
];

const s:BlockData = [
    [
        [0, 6, 6],
        [6, 6, 0],
    ],
    [
        [6, 0],
        [6, 6],
        [0, 6],
    ],
];

const z:BlockData = [
    [
        [7, 7, 0],
        [0, 7, 7],
    ],
    [
        [0, 7],
        [7, 7],
        [7, 0],
    ],
];


const Blocks: Blocks = {
    i: i,
    o: o,
    t: t,
    l: l,
    j: j,
    s: s,
    z: z,
};

export default Blocks;

export const getBlockPadding = (block: BlockDataHasRotate) => {

    let leftDummy = 99;
    block.map((row: BlockDefault) => {
        let rowMax = 0;
        row.some((o: number, i: number) => {
            if (o !== 0) {
                rowMax = i;
                return true
            }
        });
        leftDummy = leftDummy > rowMax ? rowMax : leftDummy;
    });

    let rightDummy = 99;
    block.map((row: BlockDefault) => {
        let rowMax = 0;
        let trigger = false;
        row.map((o: number) => {
            if (trigger) {
                if (o === 0)
                    rowMax += 1;
            } else {
                if (o !== 0)
                    trigger = true;
            }
        });
        rightDummy = rightDummy > rowMax ? rowMax : rightDummy;
    });


    return {
        left: leftDummy,
        right: rightDummy
    };
};
