/* int sceneselect(char *HOME, */
        /* GLint positionMatrix[24][6], */
        /* GLint *outYou, */
        /* GLint *outOp, */
        /* GLint *hitYou, */
        /* GLint *hitOp, */
        /* int   *turn, */
        /* int dice[2], */
        /* ) */

let quit=0;
let pouliYUp=0;
let moves=[0,0];
let opmoves=[0,0];

const getEmptyMatrix() => (
    Array.from({ length: 24 }, () => Array.from({ length: 6 })),
);

export function* sceneselect(props = {
    positionMatrix: getEmptyMatrix(),
    outYou: 0,
    outOp: 0,
    hitYou: 0,
    hitOp: 0,
    turn: 0,
    dice: [0,0],
}) {
    const { positionMatrix, outYou, outOp, hitYou, hitOp, turn, dice } = props;

    let button=0;
    let opdice=[0,0];
    let game=0;
    let prevselection=-5;
    let pouliwas=0;
    let hitwas=0;
    let match=0;
    let match_type=0;
    let match_score=[0,0];
    let match_limit=5;
    let prev_match_game=3;
    while(!quit) {
            if((props.turn==0)&&(pouliYUp==0)) {
                if(!can_play(1,moves,positionMatrix,dice,props.hitYou,props.outYou,game)) {
                    props.turn=1;
                }
            }
            if(props.turn==0) {
                input_exec(acc,strafe,down_,gkpr,rotx,roty,
                    positionMatrix,
                    outYou,
                    outOp,
                    hitYou,
                    hitOp,
                    turn,
                    xmvr,
                    zmvr,
                    yrot,
                    dice,
                    moves,
                    opmoves,
                    pouliYUp,
                    res,
                    prefs,
                    game);
            }
            else if ((props.outYou==15)||((game==1)&&(positionMatrix[23][4]==1)&&(positionMatrix[23][5]==1)))
            {
                quit=4;
                break;
            }
            if(retrieval_area_total(1,positionMatrix)+(props.outYou)>15)
            {
                for(let lcr=5;lcr>=0;lcr--)
                    if(positionMatrix[23-lcr][4]==1)
                    {
                        positionMatrix[23-lcr][3]--;
                        if(positionMatrix[23-lcr][3]==0)
                            positionMatrix[23-lcr][4]=0;
                    }
            }
            if((props.turn==1)&&(quit!=4))
            {
                dice = roll();
                int doubles=0;
                if(dice[0]==dice[1])
                    doubles=1;
                //nulify*************************
                moves[0]=0;
                moves[1]=0;
                opmoves[0]=0;    //in case there
                opmoves[1]=0;    //are leftover
                props.turn=0;        //actions
                //nulify*************************
                opdice[0]=dice[0];
                opdice[1]=dice[1];
                /********!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*********/
                think(positionMatrix,dice,hitOp,hitYou,outOp,outYou,game);//<----opponent action
                /************************************************************/
                dice = roll();
                if ((props.outOp>=15)||((game==1)&&(positionMatrix[0][4]==2)&&(positionMatrix[0][5]==1))) {
                    if(match) {
                        match_score[1]+=((props.outYou==0)?2:1);
                    }
                }
                else if  ((props.outYou>=15)||((game==1)&&(positionMatrix[23][4]==1)&&(positionMatrix[23][5]==1))) {
                    if(match) {
                        match_score[0]+=((props.outOp==0)?2:1);
                    }
                }
                //nulify*************************
                moves[0]=0;
                moves[1]=0;
                opmoves[0]=0;    //in case there
                opmoves[1]=0;    //are leftover
                props.turn=0;        //actions
                //nulify*************************
            }
    }

    return quit;
}

