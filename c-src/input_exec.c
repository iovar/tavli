/*********************************************************************************
*                                 Tavli 3d                                       *
**********************************************************************************
*                                                                                *
*             Copyright (C) 2005  John Varouhakis                                *
*                                                                                *
*                                                                                *
*    This program is free software; you can redistribute it and/or modify        *
*    it under the terms of the GNU General Public License as published by        *
*    the Free Software Foundation; either version 2 of the License, or           *
*    (at your option) any later version.                                         *
*                                                                                *
*    This program is distributed in the hope that it will be useful,             *
*    but WITHOUT ANY WARRANTY; without even the implied warranty of              *
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the               *
*    GNU General Public License for more details.                                *
*                                                                                *
*    You should have received a copy of the GNU General Public License           *
*    along with this program; if not, write to the Free Software                 *
*    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA   *
*                                                                                *
*                                                                                *
*                                                                                *
*    For further information contact me at biocrasher@gmail.com                  *
**********************************************************************************/




#include	<tavli.h>


int input_exec(int acc_,int strafe_,int button,int gkpr,int x_,int y_,
		GLint positionMatrix[24][6],
		GLint *outYou,
		GLint *outOp,
		GLint *hitYou,
		GLint *hitOp,
		int   *turn,
		GLfloat *xmvr,
		GLfloat *zmvr,
		GLfloat *yrot,
		int dice[2],
		int moves[2],
		int opmoves[2],
		GLint *pouliYUp,
		Uint32 res[3],
		Prefs *prefs,
		int game
		)


{	
	
	static int LastPos=-1;

	if(positionMatrix==NULL)
		return LastPos;

	Uint32	horiz=res[1];
	Uint32	vertic=res[2];

	if((acc_!=0)||(strafe_!=0))
	{
		if(acc_==1)
		{	*zmvr+=-0.01;
	
		}
		if(acc_==-1)
		{	*zmvr+=0.01;
	
		}
		if(strafe_==1)
		{
	
			*yrot+=1;;
	
		}
		if(strafe_==-1)
		{
			*yrot-=1;
	
		}
	}
	else if(button==1)
	{
		if((*yrot!=0)||(*zmvr!=0))
		{
			*yrot=0;
			*zmvr=0;
		}
		else
		{

//***************************************take out************************************************
			int pos=mouse_position(horiz,vertic,x_,y_,prefs);
			if((pos==24)&&(*pouliYUp==1))
			{
				int tot=retrieval_area_total(1,positionMatrix);
				if((tot+*outYou==14)&&(LastPos>=18))
				{
					int doubles=0;
					int d;
					if (dice[1]==dice[0])
						doubles=1;

					int empty=empty_positions(1,positionMatrix);
					int jum;
					for(jum=0;(jum<5)&&(LastPos+jum<24);jum++)
					{
						if(positionMatrix[LastPos+jum][4]!=1)
							empty-=1;
						else break;
					}
					for(d=0;d<2;d++)
					{
						if(moves[d]<1+doubles)
						{
							if((LastPos==24-dice[d])||
							((LastPos==18+empty)&&(LastPos>=(24-dice[d]))))
							{
								char quer[64]="#TAKEOUT:";
// 								console_writeline(getenv("HOME"),"#TAKEOUT\n",getenv("USER"));
								char strpos[4]={(LastPos-LastPos%10)/10+48,LastPos%10+48,'\n','\0'};
								strcat(quer,strpos);
// 								if(*turn==0)
								console_writeline(getenv("HOME"),quer,getenv("USER"));
								(*outYou)+=1;
								*pouliYUp=0;
								moves[d]++;
								LastPos=-1;
								break;
							}
						}
					}
					if((moves[0]-doubles==1)&&(moves[1]-doubles==1))
					{
						console_writeline(getenv("HOME"),"#YOUR_TURN\n",getenv("USER"));
						*turn=1;
					}
	
				}

			}
//***********************************end take out************************************************


//*********************************normal play **************************************************
			if ((*turn==0)&&(*hitYou==0))
			{
				if(pos==24)
				{
					pos=LastPos;
				}
				if((*pouliYUp==1))
				{
					int firstpiece=1;
					if((game==2)&&(positionMatrix[0][3]==13)&&(positionMatrix[0][4]==1)&&(LastPos==0))
					{
						firstpiece=0;
						int fevgcount;
						for(fevgcount=12;fevgcount<=23;fevgcount++)
							if(positionMatrix[fevgcount][4]==1)
							{
								
								firstpiece=1;
								break;
							}
					}
					if((game==2)&&((pos>=0)&&(pos<6))&&(positionMatrix[pos][4]==0)&&(firstpiece))
					{
						int fevgcount;
						firstpiece=0;
						for(fevgcount=5;fevgcount>=0;fevgcount--)
							if((positionMatrix[fevgcount][4]==0)||(positionMatrix[fevgcount][4]==2))
							{
								if(fevgcount==pos)
									continue;
								firstpiece=1;
								break;
							}
						
						
					}
					if((game!=2)||(firstpiece))
					{
						if(((positionMatrix[pos][4]==2)&&(positionMatrix[pos][3]+positionMatrix[pos][5]>1)))
								pos=LastPos;
						else if(check_action(LastPos,pos,1,
									positionMatrix,
									dice,
									moves,
									opmoves,
									turn,
									game))
						{
								pos=LastPos;
						}
					}
					else	
						pos=LastPos;
					
				}
				if(pos!=24)
				{
					
					Action(pos,1,
						hitOp,
						positionMatrix,
						pouliYUp,
						game);
					if(*pouliYUp==0)
					{
						if((LastPos!=pos)&&(positionMatrix[pos][4]==1))
						{
							char quer[64]="#MOVE:";
// 							console_writeline(getenv("HOME"),"#MOVE\n",getenv("USER"));
							char strpos[6]={(pos-pos%10)/10+48,pos%10+48,(LastPos-LastPos%10)/10+48,LastPos%10+48,'\n','\0'};
// 							sleep(1);
							strcat(quer,strpos);
// 							if(*turn==0)
// 							if((LastPos>=0)&&(LastPos<24))
							console_writeline(getenv("HOME"),quer,getenv("USER"));
						}
						LastPos=-1;
					
					}
					if(*pouliYUp==1)
						LastPos=pos;
				}
			}

//*****************************end normal play **************************************************

//*******************************insert hit *****************************************************
			else if((*turn==0)&&(*hitYou>=1))
			{
				int ymoves[2]={0,0};
				int doubles=0;
				int k=2;
				if (dice[0]==dice[1])
					doubles=1;
				if ((((dice[0])==1+pos))&&
				(((doubles==1)&&(moves[0]<2))||((doubles==0)&&(moves[0]<1))))
				{
					ymoves[0]++;
					k--;
				}
				else if(((dice[1])==1+pos)&&
				(((doubles==1)&&(moves[1]<2))||((doubles==0)&&(moves[1]<1))))
				{
					ymoves[1]++;
					k--;
				}
				else k=-1;

				if((k!=-1)&&
				(!((positionMatrix[pos][4]==2)&&(positionMatrix[pos][3]>1))))
				{
					*pouliYUp=1;
					if(!Action(pos,1,
						hitOp,
						positionMatrix,
						pouliYUp,
						game))
						k--;

					if(k==0)
						{
						char quer[64]="#TAKEIN:";
// 						console_writeline(getenv("HOME"),"#TAKEIN\n",getenv("USER"));
						char strpos[4]={(pos-pos%10)/10+48,pos%10+48,'\n','\0'};
						strcat(quer,strpos);
// 						if(*turn==0)
							console_writeline(getenv("HOME"),quer,getenv("USER"));
						(*hitYou)-=1;
						moves[0]+=ymoves[0];
						moves[1]+=ymoves[1];
						}
					*pouliYUp=0;
				}

				if((moves[0]-doubles==1)&&(moves[1]-doubles==1))
				{
// 					console_writeline(getenv("HOME"),"#YOUR_TURN\n",getenv("USER"));
					*turn=1;
				}
			}
//***************************end insert hit ****************************************************
		}

	}

}

