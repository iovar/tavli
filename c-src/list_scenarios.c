Scenario *list_scenarios(GLint positionMatrix[24][6],
			int dice[2],
			int mmoves[2],
			GLint *hitOp,
			GLint *hitYou,
			GLint *outOp,
			GLint *outYou,
			Scenario *root,
			int game
			)
{
	
	//1st dice************************
	move_scenario(positionMatrix,
				dice,
				mmoves,
				hitOp,
				hitYou,
				outOp,
				outYou,
				root,
				0,
				game
				);
	
	if(root==NULL)
	{
		fprintf(stderr,"NULL SCENARIO !!!!\n");fflush(stdout);
		_exit(-1);
	}
	
	//2nd dice************************
	Scenario *temp;
	temp=root;
	
	do{
	
		if(temp==NULL)
		{
			fprintf(stderr,"NULL SCENARIO !!!!\n");fflush(stdout);
			_exit(-1);
		}
		
		
		move_scenario(temp->positionMatrix,
				dice,
				temp->specs->moves,
				&(temp->specs->hitOp),
				&(temp->specs->hitYou),
				&(temp->specs->outOp),
				&(temp->specs->outYou),
				temp,
				1,
				game
				);
	
		temp=temp->next;
	
	}while(temp!=NULL);
	
	
	//serialize list
	Scenario *lastDown;
	temp=root;
	lastDown=root->down;
	//find first that goes down
	if(lastDown==NULL)
		do
		{
			if(temp->down!=NULL)
			{
				//give it to the root;
				root->down=temp->down;
				temp->down=NULL;
				break;
			}	
			temp=temp->next;
		}while(temp!=NULL);
	
	//pickup the last downward element
	lastDown=root->down;
	//we can only move once
	if(lastDown==NULL)
		return;
	
	while(lastDown->down!=NULL)
	{
		lastDown=lastDown->down;
		
	}
	temp=root->next;
	//we only have one initial action
	if(temp==NULL)
		return;
		
	do{
		if(temp==NULL)
		{
			fprintf(stderr,"NULL SCENARIO !!!!\n");fflush(stdout);
			_exit(-1);
		}
	
	
		
		if(temp->down==NULL)
		{
			temp=temp->next;
			continue;
		}
		//connect
		else
		{
			lastDown->down=temp->down;
			temp->down=NULL;
		}
		
		while(lastDown->down!=NULL)
		{
			lastDown=lastDown->down;
			
		}
		
		temp=temp->next;
	
	}while(temp!=NULL);
	


}	
