int fevga_matrix(GLint positionMatrix[24][6],GLint dummyMatrix[24][6])
{
	int i=0;
	for(i=11;i>=0;i--)
	{
		int k=0;
		for(k=0;k<6;k++)
		{
			dummyMatrix[12+i][k]=positionMatrix[23-i][k];
		}
	}
	for(i=23;i>11;i--)
	{
		int k=0;
		for(k=0;k<6;k++)
		{
			dummyMatrix[i-12][k]=positionMatrix[23-i][k];
		}
	}


	return 0;
}



