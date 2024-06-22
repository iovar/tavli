void move_scenario(GLint positionMatrix[24][6],
			int mdice[2],
			int mmoves[2],
			GLint *mhitOp,
			GLint *mhitYou,
			GLint *moutOp,
			GLint *moutYou,
			Scenario *root,
			int stage,
			int game
			)
{
	Scenario *Last;
	if(stage==0)
		Last=NULL;
	else Last=root;
	
	int i=0;
	
	if((*mhitOp>0)&&(game==0))
	{
		for(i=23;i>17;i--)
		{
			int dice[2]={mdice[0],mdice[1]};
			int moves[2]={mmoves[0],mmoves[1]};
			GLint hitOp=*mhitOp;
			GLint hitYou=*mhitYou;
			GLint outOp=*moutOp;
			GLint outYou=*moutYou;
	
			GLint dummyMatrix[24][6];
			if(suppose_takein(positionMatrix,dummyMatrix,i,moves,dice,&hitYou,&hitOp,game))
			{
				if(Last==NULL)
				{
					int k;
					int j;
					for(k=0;k<24;k++)
						for(j=0;j<6;j++)
							root->positionMatrix[k][j]=dummyMatrix[k][j];
					root->specs=(Specs *)malloc((sizeof(struct specifics)));
					root->specs->hitOp=hitOp;
					root->specs->outOp=outOp;
					root->specs->hitYou=hitYou;
					root->specs->outYou=outYou;
					root->specs->moves[0]=moves[0];
					root->specs->moves[1]=moves[1];
					root->specs->rating=0.0;
					root->down=NULL;
					root->next=NULL;
					if(!stage)
					{
						root->next=NULL;
						Last=root;
					}
					else
					{
						root->down=NULL;
						Last=root;
					}
				}
				else
				{
					Scenario *temp=(Scenario *)malloc((sizeof(struct scenario)));
					int k;
					int j;
					for(k=0;k<24;k++)
						for(j=0;j<6;j++)
							temp->positionMatrix[k][j]=dummyMatrix[k][j];
					temp->specs=(Specs *)malloc((sizeof(struct specifics)));
					temp->specs->hitOp=hitOp;
					temp->specs->outOp=outOp;
					temp->specs->hitYou=hitYou;
					temp->specs->outYou=outYou;
					temp->specs->moves[0]=moves[0];
					temp->specs->moves[1]=moves[1];
					temp->specs->rating=0.0;
					temp->down=NULL;
					temp->next=NULL;
					if(!stage)
					{
						temp->next=NULL;
						Last->next=temp;
						Last=temp;
					}
					else
					{
						temp->down=NULL;
						Last->down=temp;
						Last=temp;
					}
					
				}
			}
		}
	}
	
	
	
	else
	{
		for(i=0;i<6;i++)
		{
			if((positionMatrix[i][4]==1)||(positionMatrix[i][4]==0))
				continue;
			int dice[2]={mdice[0],mdice[1]};
			int moves[2]={mmoves[0],mmoves[1]};
			GLint hitOp=*mhitOp;
			GLint hitYou=*mhitYou;
			GLint outOp=*moutOp;
			GLint outYou=*moutYou;
			
			GLint dummyMatrix[24][6];
			if(suppose_takeout(positionMatrix,dummyMatrix,i,moves,dice,&outOp,&hitOp,game))
			{
				
				if(Last==NULL)
				{
					int k;
					int j;
					for(k=0;k<24;k++)
						for(j=0;j<6;j++)
							root->positionMatrix[k][j]=dummyMatrix[k][j];
					root->specs=(Specs *)malloc((sizeof(struct specifics)));
					root->specs->hitOp=hitOp;
					root->specs->outOp=outOp;
					root->specs->hitYou=hitYou;
					root->specs->outYou=outYou;
					root->specs->moves[0]=moves[0];
					root->specs->moves[1]=moves[1];
					root->specs->rating=0.0;
					root->down=NULL;
					root->next=NULL;
					if(!stage)
					{
						root->next=NULL;
						Last=root;
					}
					else
					{
						root->down=NULL;
						Last=root;
					}
				}
				else
				{
					Scenario *temp=(Scenario *)malloc((sizeof(struct scenario)));
					int k;
					int j;
					for(k=0;k<24;k++)
						for(j=0;j<6;j++)
							temp->positionMatrix[k][j]=dummyMatrix[k][j];
					temp->specs=(Specs *)malloc((sizeof(struct specifics)));
					temp->specs->hitOp=hitOp;
					temp->specs->outOp=outOp;
					temp->specs->hitYou=hitYou;
					temp->specs->outYou=outYou;
					temp->specs->moves[0]=moves[0];
					temp->specs->moves[1]=moves[1];
					temp->specs->rating=0.0;
					temp->down=NULL;
					temp->next=NULL;
					if(!stage)
					{
						temp->next=NULL;
						Last->next=temp;
						Last=temp;
					}
					else
					{
						temp->down=NULL;
						Last->down=temp;
						Last=temp;
					}
	
				}
			}
		}
	
		for(i=1;i<24;i++)
		{	
			if((positionMatrix[i][4]==1)||(positionMatrix[i][4]==0))
				continue;
			
			int d=0;
			
			for(d=0;d<2;d++)
			{
				if(i-mdice[d]>=0)
				{
					int dice[2]={mdice[0],mdice[1]};
					int moves[2]={mmoves[0],mmoves[1]};
					GLint hitOp=*mhitOp;
					GLint hitYou=*mhitYou;
					GLint outOp=*moutOp;
					GLint outYou=*moutYou;
			
					GLint dummyMatrix[24][6];
					if(suppose_move(positionMatrix,dummyMatrix,i,i-dice[d],moves,dice,&hitYou,&hitOp,game))
					{
						if(Last==NULL)
						{
	// 						root=(Scenario *)malloc((sizeof(struct scenario)));
							int k;
							int j;
							for(k=0;k<24;k++)
								for(j=0;j<6;j++)
									root->positionMatrix[k][j]=dummyMatrix[k][j];
							root->specs=(Specs *)malloc((sizeof(struct specifics)));
							root->specs->hitOp=hitOp;
							root->specs->outOp=outOp;
							root->specs->hitYou=hitYou;
							root->specs->outYou=outYou;
							root->specs->moves[0]=moves[0];
							root->specs->moves[1]=moves[1];
							root->specs->rating=0.0;
							root->down=NULL;
							root->next=NULL;
							if(!stage)
							{
								root->next=NULL;
								Last=root;
							}
							else
							{
								root->down=NULL;
								Last=root;
							}
						}
						else
						{
							Scenario *temp=(Scenario *)malloc((sizeof(struct scenario)));
							int k;
							int j;
							for(k=0;k<24;k++)
								for(j=0;j<6;j++)
									temp->positionMatrix[k][j]=dummyMatrix[k][j];
							temp->specs=(Specs *)malloc((sizeof(struct specifics)));
							temp->specs->hitOp=hitOp;
							temp->specs->outOp=outOp;
							temp->specs->hitYou=hitYou;
							temp->specs->outYou=outYou;
							temp->specs->moves[0]=moves[0];
							temp->specs->moves[1]=moves[1];
							temp->specs->rating=0.0;
							temp->down=NULL;
							temp->next=NULL;
							if(!stage)
							{
								temp->next=NULL;
								Last->next=temp;
								Last=temp;
							}
							else
							{
								temp->down=NULL;
								Last->down=temp;
								Last=temp;
							}
						}
					}
				}
			}
		}
	}
	
	return ;

}
