int empty_positions(int who,GLint positionMatrix[24][6])
{
	int empty=0;
	int i;
	
	if(who==1)
	{
		for(i=18;i<24;i++)
		{
			if(positionMatrix[i][4]!=1)
				empty++;
			else
				break;
		}
		
		return empty;
	}

	else if(who==2)
	{
		for(i=5;i>=0;i--)
		{
			if(positionMatrix[i][4]!=2)
				empty++;
			else
				break;
		}
		return empty;
	}
}
