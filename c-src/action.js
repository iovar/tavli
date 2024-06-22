
/* int Action(int pos_,int team_, GLint *hitOp, GLint positionMatrix[24][6], GLint *pouliYUp, int game) */
export function Action (props) {
    const { pos_, team_, positionMatrix, game } = props;

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
                    props.pouliYUp=1;
                    return 0;
                }
                else return 1;
        }
        else if(props.pouliYUp==1)
        {
            if(positionMatrix[pos_][4]==2)
            {
                if ((positionMatrix[pos_][3]==1)&&(positionMatrix[pos_][5]==0))
                {
                    positionMatrix[pos_][4]=1;
                    if(game==0)
                        props.hitOp+=1;
                    else if(game==1)
                        positionMatrix[pos_][5]=1;
                    else if(game==2)
                        return 0;

                    props.pouliYUp=0;
                    return 0;
                }
                else return 1;
            }
            else if(positionMatrix[pos_][4]==0)
            {
                positionMatrix[pos_][3]=1;
                positionMatrix[pos_][4]=1;
                props.pouliYUp=0;
                return 0;
                }
            else if(positionMatrix[pos_][4]==1)
            {
                positionMatrix[pos_][3]++;
                props.pouliYUp=0;
                return 0;
            }
        }
        else
            return 1;
    }
    else if(team_==2)
    {
        if(positionMatrix[pos_][4]==1)
        {
            if ((positionMatrix[pos_][3]==1)&&(game!=2))
            {
                return 3;
            }

            else if (positionMatrix[pos_][3]>1)
            {
                return 0;
            }
        }
        else if(positionMatrix[pos_][4]==0)
        {
            return 1;
        }
        else if(positionMatrix[pos_][4]==2)
        {
            return 2;
        }


        else
            return 0;
    }
}
