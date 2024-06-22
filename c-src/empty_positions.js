export function empty_positions(who,positionMatrix) {
	let empty=0;
	let i;

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
