int check_opaction(GLint positionMatrix[24][6],
			int moves[2],
			int dice[2],
			int previous,
			int next,
			int   *ophit,
			int   *opout,
			int game)
{
    int doubles=0;
    if (dice[0]==dice[1])
        doubles=1;


    if((*ophit>=1)||(previous==-1))
    {
        if(previous!=-1)//called by takein
            return 0;
        if((*ophit)==0)//mistake call by takein
            return 0;


        int d;
        for(d=0;d<2;d++)
        {
            if(moves[d]<1+doubles)
            {
                if(24-dice[d]==next)
                    if((positionMatrix[24-dice[d]][4]==0)||
                    (positionMatrix[24-dice[d]][4]==2)||
                    ((positionMatrix[24-dice[d]][4]==1)&&
                    ((positionMatrix[24-dice[d]][3]+positionMatrix[24-dice[d]][5]<2)&&(game!=2))))
                    {
                        return 1;
                        break;
                    }

            }
        }

        return 0;

    }



    if(next==-1)//caled by takeout
    {

        int tot=retrieval_area_total(2,positionMatrix);fflush(stdout);

        if((tot+(*opout)!=15))
        {
            return 0;
        }
        else
        {

            int empty=empty_positions(2,positionMatrix);

            int d;
            for(d=0;d<2;d++)
            {

                if(moves[d]<1+doubles)
                {
                    if((previous<0)||(previous>23))
                    {
                        _exit(-1);
                    }

                    if(((previous==5-empty)&&(dice[d]>=(previous+1)))||(previous==dice[d]-1))
                    {
                        if(positionMatrix[previous][4]==2)
                            return 1;
                        else if(d==1)
                            return 0;
                        else if(d==0)
                            continue;


                    }
                }
            }

            return 0;
        }



    }

    //normal move

    if(!check_action(previous,next,3,
            positionMatrix,
            dice,
            NULL,
            moves,
            NULL,
            game
            ))
        return 1;
    else
        return 0;
    }

