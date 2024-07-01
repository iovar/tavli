/* Scenario *list_scenarios(GLint positionMatrix[24][6], */
			/* int dice[2], */
			/* int mmoves[2], */
			/* GLint *hitOp, */
			/* GLint *hitYou, */
			/* GLint *outOp, */
			/* GLint *outYou, */
			/* Scenario *root, */
			/* int game */
			/* ) */
Scenario list_scenarios(props) {
    const { positionMatrix, dice, mmoves, hitOp, hitYou, outOp, outYou, root, game } = props;
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

	if(root==null)
	{
		fprintf(stderr,"null SCENARIO !!!!\n");fflush(stdout);
		_exit(-1);
	}

	//2nd dice************************
	let temp;
	temp=root;

	do{

		if(temp==null)
		{
			fprintf(stderr,"null SCENARIO !!!!\n");fflush(stdout);
			_exit(-1);
		}


		move_scenario(temp.positionMatrix,
				dice,
				temp.specs.moves,
				temp.specs.hitOp,
				temp.specs.hitYou,
				temp.specs.outOp,
				temp.specs.outYou,
				temp,
				1,
				game
				);

		temp=temp.next;

	}while(temp!=null);


	//serialize list
	let lastDown;
	temp=root;
	lastDown=root.down;
	//find first that goes down
	if(lastDown==null)
		do
		{
			if(temp.down!=null)
			{
				//give it to the root;
				root.down=temp.down;
				temp.down=null;
				break;
			}
			temp=temp.next;
		}while(temp!=null);

	//pickup the last downward element
	lastDown=root.down;
	//we can only move once
	if(lastDown==null)
		return;

	while(lastDown.down!=null)
	{
		lastDown=lastDown.down;

	}
	temp=root.next;
	//we only have one initial action
	if(temp==null)
		return;

	do{
		if(temp==null)
		{
			fprintf(stderr,"null SCENARIO !!!!\n");fflush(stdout);
			_exit(-1);
		}



		if(temp.down==null)
		{
			temp=temp.next;
			continue;
		}
		//connect
		else
		{
			lastDown.down=temp.down;
			temp.down=null;
		}

		while(lastDown.down!=null)
		{
			lastDown=lastDown.down;

		}

		temp=temp.next;

	}while(temp!=null);



}
