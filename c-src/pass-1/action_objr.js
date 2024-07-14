/* int Action(int pos_,int team_, GLint *hitOp, GLint positionMatrix[24][6], GLint *pouliYUp, int game) */
export function Action ( pos_, team_, hitOp, positionMatrix, pouliYUp, game ) {
    if(team_==1)
    {
        if(pouliYUp==0)
        {
            if(positionMatrix[pos_][4]==1)
                if (positionMatrix[pos_][3]>0)
                {
                    positionMatrix[pos_][3]--;
                    if(positionMatrix[pos_][3]==0)
                    {
                        if((game==1)&&(positionMatrix[pos_][5]==1))
                        {
                            positionMatrix[pos_][5]=0;
                            positionMatrix[pos_][4]=2;
                            positionMatrix[pos_][3]=1;
                        }
                        else
                            positionMatrix[pos_][4]=0;
                    }
                    pouliYUp=1;
                    return { status: 0,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
                }
                else return { status: 1,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
        }
        else if(pouliYUp==1)
        {
            if(positionMatrix[pos_][4]==2)
            {
                if ((positionMatrix[pos_][3]==1)&&(positionMatrix[pos_][5]==0))
                {
                    positionMatrix[pos_][4]=1;
                    if(game==0)
                        hitOp+=1;
                    else if(game==1)
                        positionMatrix[pos_][5]=1;
                    else if(game==2)
                        return { status: 0,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };

                    pouliYUp=0;
                    return { status: 0,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
                }
                return { status: 1,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
            }
            else if(positionMatrix[pos_][4]==0)
            {
                positionMatrix[pos_][3]=1;
                positionMatrix[pos_][4]=1;
                pouliYUp=0;
                return { status: 0,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
                }
            else if(positionMatrix[pos_][4]==1)
            {
                positionMatrix[pos_][3]++;
                pouliYUp=0;
                return { status: 0,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
            }
        }
        else
            return { status: 1,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
    }
    else if(team_==2)
    {
        if(positionMatrix[pos_][4]==1)
        {
            if ((positionMatrix[pos_][3]==1)&&(game!=2))
            {
                return { status: 3,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
            }

            else if (positionMatrix[pos_][3]>1)
            {
                return { status: 0,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
            }
        }
        else if(positionMatrix[pos_][4]==0)
        {
            return { status: 1,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
        }
        else if(positionMatrix[pos_][4]==2)
        {
            return { status: 2,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
        }


        else
            return { status: 0,  pos_, team_, hitOp, positionMatrix, pouliYUp, game };
    }
}
