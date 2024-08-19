/* int copy_matrix(GLint positionMatrix[24][6],GLint dummyMatrix[24][6]) */
export function copy_matrix(positionMatrix,dummyMatrix) {
	for(let i=0;i<24;i++)
	{
		for(let k=0;k<6;k++)
		{
			dummyMatrix[i][k]=positionMatrix[i][k];
		}
	}
	return 0;
}

/* int suppose_move(GLint positionMatrix[24][6],GLint dummyMatrix[24][6],int previous,int next,int moves[2],int dice[2],int *youhit,int *ophit,int game) */
export function suppose_move(positionMatrix, dummyMatrix, position, moves, dice, youhit, ophit, game ) {
	copy_matrix(positionMatrix,dummyMatrix);
	return move(dummyMatrix,previous,next,moves,dice,youhit,ophit,game))
}

/* int suppose_takein(GLint positionMatrix[24][6],GLint dummyMatrix[24][6],int position,int moves[2],int dice[2],int *youhit,int *ophit,int game) */
export function suppose_takein(props) {
    const { positionMatrix, dummyMatrix, position, moves, dice, youhit, ophit, game } = props;

	copy_matrix(positionMatrix,dummyMatrix);
	if(takein(dummyMatrix,position,moves,dice,youhit,ophit,game))
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

/* int suppose_takeout(GLint positionMatrix[24][6],GLint dummyMatrix[24][6],int position,int moves[2],int dice[2],int *opout,int *ophit,int game) */
export function suppose_takeout(positionMatrix, dummyMatrix, position, moves, dice, opout, ophit, game) {
	copy_matrix(positionMatrix,dummyMatrix);
	if(takeout(dummyMatrix,position,moves,dice,opout,ophit,game))
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
