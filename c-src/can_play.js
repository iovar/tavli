// int can_play(int who,int moves[2],GLint positionMatrix[24][6],int dice[2],int hit,int out,int game)
export function can_play(who, moves, positionMatrix, dice, hit, out, game props) {
    let ret=0;
    let doubles=0;
    if(dice[0]==dice[1])
        doubles=1;

    if(hit>0)
    {
        if(who==1)
        {
            let d;
            for(d=0;d<2;d++)
            {
                if(moves[d]<1+doubles)
                {
                    if((positionMatrix[-1+dice[d]][4]==0)||
                    (positionMatrix[-1+dice[d]][4]==1)||
                    ((positionMatrix[-1+dice[d]][4]==2)&&
                    positionMatrix[-1+dice[d]][3]<2))
                    {
                        ret=1;
                        break;
                    }
                }
            }
        }

        if(who==2)
        {
            let d;
            for(d=0;d<2;d++)
            {
                if(moves[d]<1+doubles)
                {
                    if((positionMatrix[24-dice[d]][4]==0)||
                    (positionMatrix[24-dice[d]][4]==2)||
                    ((positionMatrix[24-dice[d]][4]==1)&&
                    positionMatrix[24-dice[d]][3]<2))
                    {
                        ret=1;
                        break;
                    }
                }
            }
        }
    return ret;
    }

    let total=0;
/*normal check*/
    for(let i=0;i<24;i++)
    {
        if((i==0)&&(game==2)&&(positionMatrix[23*(who-1)][3]==14)&&(positionMatrix[23*(who-1)][4]==who))
        {
            let firstpiece=0;
            let fevgcount;
            for(fevgcount=12*(2-who);fevgcount<=11+12*(2-who);fevgcount++)
                if(positionMatrix[fevgcount][4]==who)
                {
                    firstpiece=1;
                    break;
                }
            if(!firstpiece)
                continue;

        }
        if(positionMatrix[i][4]==who)
        {
            let d;
            for(d=0;d<2;d++)
            {
                if(moves[d]<1+doubles)
                {
                    let    s,//sign
                        o;//other player
                    if(who==1)
                        {s=1;o=2;}
                    else
                        {s=-1;o=1;}

                    if((i+s*dice[d]<0)||(i+s*dice[d]>23))
                        continue;
                    if ((positionMatrix[i+s*dice[d]][4]==0)||
                    (positionMatrix[i+s*dice[d]][4]==who)||
                    ((positionMatrix[i+s*dice[d]][4]==o)&&
                    (positionMatrix[i+s*dice[d]][3]+positionMatrix[i+s*dice[d]][5]<2)&&(game!=2)))
                    {

                        ret=1;
                        break;
                    }
                }
            }
            if(ret==1)
                break;
        }
    }

/*take out check*/
    if(!ret)//if there is already an action available
    {
        let tot=retrieval_area_total(who,positionMatrix);
        if(tot+out==15)
        {
            let empty=empty_positions(who,positionMatrix);

            let d;
            for(d=0;d<2;d++)
            {
                if(moves[d]<1+doubles)
                {
                    if(who==1)
                    {
                        if(positionMatrix[24-dice[d]][4]==1)
                        {

                            ret=1;
                            break;
                        }
                        if(dice[d]>6-empty)
                        {
                            let lc=1;
                            for(lc=1;lc<=empty;lc++)
                            {
                                if((24-dice[d]+lc)>23)
                                    break;
                                if(positionMatrix[24-dice[d]+lc][4]==1)
                                {

                                    ret=1;
                                    break;
                                }
                            }
                            if(ret==1)
                                break;
                        }
                    }


                    if(who==2)
                    {
                        if(positionMatrix[-1+dice[d]][4]==2)
                        {

                            ret=1;
                            break;
                        }
                        else if(dice[d]>6-empty)
                        {
                            let lc;
                            for(lc=6;lc>=0;lc--)
                            {
                            if((lc==5-empty)&&(dice[d]>=(lc+1)))
                                if(positionMatrix[lc][4]==2)
                                {

                                    ret=1;
                                    break;
                                }
                            }
                            if(ret==1)
                                break;
                        }
                    }

                }
            }
        }
    }

    return ret;
}
