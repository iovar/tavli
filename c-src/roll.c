void roll(int dice[2])
{
#ifndef WIN32
	int fd=open("/dev/urandom",O_RDONLY);
#else
    int fd=-1;
#endif
    if(fd!=-1)
	{
	
		char bits[8];
		int nbytes=read(fd,bits,8);
		dice[0]=abs(bits[abs(rand()%nbytes)])%6+1;
		nbytes=read(fd,bits,8);
		dice[1]=abs(bits[abs(rand()%nbytes)])%6+1;
		close(fd);
	}
	else
	{
		SDL_Delay(3);
		srand(SDL_GetTicks());
		dice[0]=rand()%6+1;
		dice[1]=rand()%6+1;
	}
};

 
