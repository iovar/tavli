typedef struct specifics
	{
		int hitOp;
		int outOp;
		int hitYou;
		int outYou;
		int moves[2];
		int rating;
	}Specs;

typedef struct scenario
	{
		Specs *specs;
		GLint positionMatrix[24][6];
		struct scenario *next;
		struct scenario *down;
		
	}Scenario;

typedef struct preferences_
	{
		int playercolor;
		int enemycolor;
		int difficulty;
		int playerside[3];	//SW SE NE NW
		int position[24];
		int dicethrowing;
		int sounds;
		int music;
		int maxfps;
	}Prefs;




#endif
