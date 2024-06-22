int copy_matrix(GLint positionMatrix[24][6],GLint dummyMatrix[24][6])
{
	int i=0;
	for(i=0;i<24;i++)
	{
		int k=0;
		for(k=0;k<6;k++)
		{
			dummyMatrix[i][k]=positionMatrix[i][k];
		}
	}
	return 0;
}

int suppose_move(GLint positionMatrix[24][6],GLint dummyMatrix[24][6],int previous,int next,int moves[2],int dice[2],int *youhit,int *ophit,int game)
{
	copy_matrix(positionMatrix,dummyMatrix);
	if(move(dummyMatrix,previous,next,moves,dice,youhit,ophit,game))
	{	
		return 1;
	}
	else 
	{
		return 0;
	}
}

int suppose_takein(GLint positionMatrix[24][6],GLint dummyMatrix[24][6],int position,int moves[2],int dice[2],int *youhit,int *ophit,int game)
{
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

int suppose_takeout(GLint positionMatrix[24][6],GLint dummyMatrix[24][6],int position,int moves[2],int dice[2],int *opout,int *ophit,int game)
{
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





