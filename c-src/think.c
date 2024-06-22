void think(GLint positionMatrix[24][6],
	int dice[2],
	GLint *hitOp,
	GLint *hitYou,
	GLint *outOp,
	GLint *outYou,
	int game
	)

{
	GLint dummyMatrix[24][6];





	int mmoves[2]={0,0};
	int doubles=0;
	int i=0;

	if(dice[0]==dice[1])
		doubles=1;
	for(i=0;i<doubles+1;i++)
	{
		if((game==0)||(game==1))
			copy_matrix(positionMatrix,dummyMatrix);
		else if(game==2)
			fevga_matrix(positionMatrix,dummyMatrix);

		if(!can_play(2,mmoves,dummyMatrix,dice,*hitOp,*outOp,game))
		{
			break;
		}
		Scenario root;
		list_scenarios(dummyMatrix,
					dice,
					mmoves,
					hitOp,
					hitYou,
					outOp,
					outYou,
					&root,
					game);
		Scenario *best;
		best=(Scenario *)rate_scenarios(&root,game);
		if(game==2)
		{
			fevga_matrix(best->positionMatrix,positionMatrix);
		}
		else
			copy_matrix(best->positionMatrix,positionMatrix);
		*hitOp=best->specs->hitOp;
		*hitYou=best->specs->hitYou;
		*outOp=best->specs->outOp;
		*outYou=best->specs->outYou;
		mmoves[0]=best->specs->moves[0];
		mmoves[1]=best->specs->moves[1];
	}

}


