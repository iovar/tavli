// int move(GLint positionMatrix[24][6],int previous,int next,int moves[2],int dice[2],int *youhit,int *ophit,int game)
export function move(props) {
    const { positionMatrix,previous,next,moves,dice,youhit,ophit,game } = props;
    let hit = youhit;

	if(check_opaction(positionMatrix,
			moves,
			dice,
			previous,
			next,
			ophit,
			NULL,
			game
			))
	{
		if(!check_action(previous,next,2,
				positionMatrix,
				dice,
				NULL,
				moves,
				NULL,
				game
				))
		{
			positionMatrix[previous][3]--;
			if(positionMatrix[previous][3]==0)
			{
				if((game==1)&&(positionMatrix[previous][5]==1))
				{
					positionMatrix[previous][5]=0;
					positionMatrix[previous][4]=1;
					positionMatrix[previous][3]=1;
				}
				else
					positionMatrix[previous][4]=0;
			}
			if((positionMatrix[next][4]==1)&&(positionMatrix[next][5]==0))
			{
				if(game==0)
					hit+=1;
				else if(game==1)
					positionMatrix[next][5]=1;
				else if(game==2)
					return { result: 0, hit };
				positionMatrix[next][4]=2;
			}
			else if(positionMatrix[next][4]==0)
			{
				positionMatrix[next][4]=2;
				positionMatrix[next][3]=1;
			}
			else
				positionMatrix[next][3]+=1;

            return { result: 1, hit };
		}

		else return { result: 0, hit };
	}

    else return { result: 0, hit };
}
