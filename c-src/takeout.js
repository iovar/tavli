// int takeout(GLint positionMatrix[24][6],int position,int moves[2],int dice[2],int *opout,int *ophit,int game)
export function takeout(positionMatrix, position, moves, dice, opout, ophit, game) {
	let doubles=0;
	if(dice[0]==dice[1])
		doubles=1;
	let empty=empty_positions(2,positionMatrix);

	if(check_opaction(positionMatrix,
			moves,
			dice,
			position,
			-1,
			ophit,
			opout,
			game))
	{
		for(let d=0;d<2;d++)
		{
			if(moves[d]<1+doubles)
			{
				if(((position==5-empty)&&(dice[d]>=(position+1)))||(position==dice[d]-1))
				{
					positionMatrix[position][3]--;
					if(positionMatrix[position][3]==0)
					{
						if((game==1)&&(positionMatrix[position][5]==1))
						{
							positionMatrix[position][5]=0;
							positionMatrix[position][4]=1;
							positionMatrix[position][3]=1;
						}
						else
							positionMatrix[position][4]=0;
					}
					moves[d]++;
					opout.value+=1;
					return 1;
				}

			}
		}
		return 0;
	}

	else return 0;
}
