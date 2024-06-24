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



#include    <tavli.h>
#include    <msound.h>
#ifndef    HAVE_CONFIG
    #include    <config.h>
    #define HAVE_CONFIG 1
#endif

#ifdef HAVE_FULL
    #ifndef FULL_COMP 
    #define FULL_COMP 1
    #endif
#else
    #ifndef FULL_COMP 
    #define FULL_COMP 0
    #endif
#endif

#ifdef HAVE_CHEAT
    #ifndef CHEAT_MODE 
    #define CHEAT_MODE 1
    #endif
#else
    #ifndef CHEAT_MODE 
    #define CHEAT_MODE 0
    #endif
#endif

#ifndef MAXMSG
    #define MAXMSG 512
#endif

int *getsetscore(int *score)
{
    static int lscore[2]={0,0};
    if(score==NULL)
        return lscore;
    else
    {
        lscore[0]=score[0];
        lscore[1]=score[1];
        return NULL;
    }

}

int sceneselect(char *HOME,
        GLint positionMatrix[24][6],
        GLint *outYou,
        GLint *outOp,
        GLint *hitYou,
        GLint *hitOp,
        int   *turn,
        GLfloat *xmvr,
        GLfloat *zmvr,
        GLfloat *yrot,
        Uint32 res[3],
        int specs[2],
        int dice[2],
        GLint *listbase,
        GLint tavli[],
        Prefs *prefs,
        char *sounds[]
        )

{
    Uint32    horiz=res[1];
    Uint32    vertic=res[2];
    int fullscreen=specs[0];
    static int quit=0;
    static GLint pouliYUp=0;
    static int moves[2]={0,0};
    static int opmoves[2]={0,0};
    int curfps=0;
    int acc=0;
    int strafe=0;
    int button=0;
    int gkpr=0;
    int do_=0;
    int rotx=0;
    int roty=0;
    int down_=0;
    char keycode=0;
    int opdice[2]={0,0};
    int game=0;
    int prevselection=-5;
    int pouliwas=0;
    int hitwas=0;
    int match=0;
    int match_type=0;
    int match_score[2]={0,0};
    int match_limit=5;
    int prev_match_game=3;
    pthread_mutex_t musicmutex;
#ifndef SDL_THREADS
    pthread_t musicthread;
#else
    SDL_Thread *musicthread=NULL;
#endif
    pthread_mutex_init(&musicmutex,NULL);
    char *sender=getenv("USER");
    console_writeline(HOME,"                                                    Tavli3d                       Copyright (C) 2005-2006 John Varouhakis. Tavli3d comes with ABSOLUTELY NO WARRANTY; for details see the README and COPYING files that you should have received with the program.  This is free software, and you are welcome to redistribute it under certain conditions.                                 Tavli3d v0.3.3.0              This console is still purely cosmetical:)If you wish to contact me for anything   regarding this game,                     my mail is biocrasher@gmail.com.                    Happy gaming!                                                    ","system");


    while(quit!=1)
    {
        if(quit==4)
        {
            //clear some data***************
            pouliYUp=0;
            opmoves[0]=0;
            opmoves[1]=0;
            opdice[0]=0;
            opdice[1]=0;
            moves[0]=0;
            moves[1]=0;
            *turn=0;
            roll(dice);
            if(!match)
            {
                quit=0;
                match_type=0;
                prev_match_game=3;
                match_score[0]=0;
                match_score[1]=0;
                match_limit=5;
            }
            //******************************

        }
        getsetscore(match_score);
//         fprintf(stderr,"your score %d,opps score %d, limit %d,match %d\n",match_score[0],match_score[1],match_limit,match);
    //menu scene*************************************************************************
        while(!quit)
        {
            if(prefs->music)
            {
#ifndef SDL_THREADS
                play_ogg(sounds[0],&musicthread,&musicmutex);
#else
                play_ogg(sounds[0],musicthread,&musicmutex);
#endif
            }
//             else
//             {
//                 pthread_mutex_unlock(&musicmutex);
//                 pthread_cancel(musicthread);
//             }
            int xe, ye;
            SDL_GetMouseState(&ye,&xe);
            int selection=0;
            float xps=14.0*(1000*ye)/horiz;
            float yps=14.0*(1000*xe)/vertic;
            xps/=1000.0;
            yps/=1000.0;

            if ((xps>4.0)&&(xps<9.0)&&(yps>6.0)&&(yps<7.3))
                selection=1;
            else if ((xps>4.0)&&(xps<9.0)&&(yps>7.6)&&(yps<8.65))
                selection=3;
            else if ((xps>4.0)&&(xps<9.0)&&(yps>9.0)&&(yps<10.3))
                selection=4;
            else if ((xps>4.0)&&(xps<9.0)&&(yps>11.4)&&(yps<12.8))
                selection=2;
            else if ((xps>4.0)&&(xps<9.0)&&(yps>4.9)&&(yps<5.9))
                selection=-1;
            else
                selection=0;

            if(prefs->sounds)
            {
                if((selection!=0)&&(selection!=prevselection))
                {
                    play_wav(sounds[2]);
                    prevselection=selection;
                }
                else
                    prevselection=selection;
            }
            if(!FULL_COMP)
                curfps=fps_adjust(prefs->maxfps);
            quit=input_handle(&acc,
                    &strafe,
                    &button,
                    &gkpr,
                    &do_,
                    &rotx,
                    &roty,
                    &down_,
                    &keycode);
            console_type(HOME,keycode,sender,NULL,NULL,NULL);
            menuScene(selection,listbase,tavli);
            consoleScene(listbase,tavli);
            SDL_GL_SwapBuffers();
            Setup_Scene(0);

            if(quit==10)
                quit=0;
            if((down_==1)&&(selection==2))
            {
                if(prefs->sounds)
                    play_wav(sounds[1]);
                quit=1;
            }

            else if((down_==1)&&(selection==3))
            {
                if(prefs->sounds)
                    play_wav(sounds[1]);
                int firstrun=1;
                static int mode=0;

                if((horiz==1280)&&(vertic==1024))
                    mode=0;
                else if((horiz==1280)&&(vertic==960))
                    mode=1;
                else if((horiz==1152)&&(vertic==864))
                    mode=2;
                else if((horiz==1024)&&(vertic==768))
                    mode=3;
                else if((horiz==800)&&(vertic==600))
                    mode=4;
                else if((horiz==640)&&(vertic==480))
                    mode=5;
                int full=fullscreen;
                while(1)
                {
                    int xec, yec;
                    SDL_GetMouseState(&yec,&xec);
                    int select=0;
                    float xpsc=14*yec/horiz;
                    float ypsc=14*xec/vertic;
                    if ((xpsc>2.0)&&(xpsc<10.0)&&(ypsc>5.8)&&(ypsc<7.0))
                        select=1;
                    else if ((xpsc>2.0)&&(xpsc<10.0)&&(ypsc>7.6)&&(ypsc<9.0))
                        select=3;
                    else if ((xpsc>4.0)&&(xpsc<9.0)&&(ypsc>9.5)&&(ypsc<10.1))
                        select=2;
                    if(prefs->sounds)
                    {
                        if((select!=0)&&(select!=prevselection))
                        {
                            play_wav(sounds[2]);
                            prevselection=select;
                        }
                        else
                            prevselection=select;
                    }
                    optionsScene(select,&full,mode,listbase,tavli);
                    consoleScene(listbase,tavli);
                    SDL_GL_SwapBuffers();
                    if((down_==1)&&(select==2))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        FILE *fp;
                        char *cwd;
                        cwd=getcwd(NULL,0);
                        chdir(HOME); 
                        fp=fopen(".tavli3d/options","w");
                        if(errno)
                            fprintf(stderr,"\nError:\n %s\n",strerror(errno));
                        if(fp==NULL)
                        {
#ifndef WIN32
                            mkdir("./.tavli3d",S_IRUSR|S_IWUSR|S_IXUSR|S_IRGRP|S_IXGRP|S_IROTH|S_IXOTH);
#else
                            mkdir("./.tavli3d");
#endif
                            fp=fopen(".tavli3d/options","w");
                            if (fp==NULL)
                            {
                                fprintf(stderr,"WARNING!!!\nCouldn't save options\nTried to make dir $HOME/.3dtavli but failed.\nIf you want to try again, create the dir manually and set the permissions accordingly(must have read-write access...)\n");
                                chdir(cwd);
                            break ;
                            }
                        }
                        fprintf(fp,"%d\n",full+1);
                        fprintf(fp,"%d\n",mode);
                        fclose(fp);
                        chdir(cwd);
                        pthread_mutex_destroy(&musicmutex);
                        return 31;
                        break;
                    }
                    else if((down_==1)&&(select==1))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        if(full==-1)
                            full=0;
                        else if(full==0)
                            full=-1;
                    }
                    else if((down_==1)&&(select==3)&&!firstrun)
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        mode--;
                        if (mode==-1)
                            mode=5;
                    }
                    if(!FULL_COMP)
                        curfps=fps_adjust(prefs->maxfps);
                    quit=input_handle(&acc,
                            &strafe,
                            &button,
                            &gkpr,
                            &do_,
                            &rotx,
                            &roty,
                            &down_,
                            &keycode);
                    console_type(HOME,keycode,sender,NULL,NULL,NULL);
                    if(quit==1)
                    {
                        quit=0;
                        break;
                    }
                    if(quit==10)
                        quit=0;
                    firstrun=0;
                }
            }
            else if((down_==1)&&(selection==4))
            {
                if(prefs->sounds)play_wav(sounds[1]);
                Prefs backupprefs=*prefs;
                int down_=0;
                while(1)
                {
                    int xec, yec;
                    SDL_GetMouseState(&yec,&xec);

                    int select=-1;
                    float xpsc=14.0*(1000*yec)/horiz;
                    float ypsc=14.0*(1000*xec)/vertic;
                    xpsc/=1000.0;
                    ypsc/=1000.0;
                    if ((xpsc>2.5)&&(xpsc<12.0)&&(ypsc>4.7)&&(ypsc<5.3))
                        select=1;
                    else if ((xpsc>2.5)&&(xpsc<12.0)&&(ypsc>5.4)&&(ypsc<6.1))
                        select=2;
                    else if ((xpsc>2.5)&&(xpsc<12.0)&&(ypsc>6.3)&&(ypsc<6.8))
                        select=3;
                    else if ((xpsc>2.5)&&(xpsc<12.0)&&(ypsc>7.0)&&(ypsc<7.5))
                        select=4;
                    else if ((xpsc>2.5)&&(xpsc<12.0)&&(ypsc>7.6)&&(ypsc<8.2))
                        select=5;
                    else if ((xpsc>2.5)&&(xpsc<12.0)&&(ypsc>8.3)&&(ypsc<8.9))
                        select=6;
                    else if ((xpsc>2.5)&&(xpsc<12.0)&&(ypsc>9.0)&&(ypsc<9.5))
                        select=7;
                    else if ((xpsc>4.0)&&(xpsc<9.0)&&(ypsc>10.3)&&(ypsc<11.1))
                        select=0;

                    if(prefs->sounds)
                    {
                        if((select!=-1)&&(select!=prevselection))
                        {
                            play_wav(sounds[2]);
                            prevselection=select;
                        }
                        else
                            prevselection=select;
                    }
                    preferencesScene(select,prefs,listbase,tavli);
                    consoleScene(listbase,tavli);
                    SDL_GL_SwapBuffers();
                    if((down_==1)&&(select==1))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        if(prefs->playercolor==2)
                        {
                            prefs->playercolor=1;
                            prefs->enemycolor=2;
                        }
                        else
                        {
                            prefs->playercolor=2;
                            prefs->enemycolor=1;
                        }
                    }

                    if((down_==1)&&(select==2))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        while(1)
                        {
                            int xec_, yec_;
                            SDL_GetMouseState(&yec_,&xec_);
                            int select_=-1;
                            float xpsc_=14.0*(1000*yec_)/horiz;
                            float ypsc_=14.0*(1000*xec_)/vertic;
                            xpsc_/=1000.0;
                            ypsc_/=1000.0;
                            if ((xpsc_>2.5)&&(xpsc_<12.0)&&(ypsc_>4.7)&&(ypsc_<5.3))
                                select_=1;
                            else if ((xpsc_>2.5)&&(xpsc_<12.0)&&(ypsc_>5.4)&&(ypsc_<6.1))
                                select_=2;
                            else if ((xpsc_>2.5)&&(xpsc_<12.0)&&(ypsc_>6.3)&&(ypsc_<6.8))
                                select_=3;
                            else if ((xpsc_>4.0)&&(xpsc_<9.0)&&(ypsc_>10.3)&&(ypsc_<11.1))
                                select_=0;

                            if(prefs->sounds)
                            {
                                if((select_!=-1)&&(select_!=prevselection))
                                {
                                    play_wav(sounds[2]);
                                    prevselection=select_;
                                }
                                else
                                    prevselection=select_;
                            }

                            sideScene(select_,prefs,listbase,tavli);
                            consoleScene(listbase,tavli);
                            SDL_GL_SwapBuffers();
                            if(!FULL_COMP)
                                curfps=fps_adjust(prefs->maxfps);
                            quit=input_handle(&acc,
                                    &strafe,
                                    &button,
                                    &gkpr,
                                    &do_,
                                    &rotx,
                                    &roty,
                                    &down_,
                                    &keycode);
                            console_type(HOME,keycode,sender,NULL,NULL,NULL);
                            if((down_==1)&&(select_==0))
                            {
                                if(prefs->sounds)play_wav(sounds[1]);
                                break;
                            }
                            if((down_==1)&&(select_==1))
                            {
                                if(prefs->sounds)play_wav(sounds[1]);
                                prefs->playerside[0]++;
                                if(prefs->playerside[0]>3)
                                    prefs->playerside[0]=0;
                            }
                            if((down_==1)&&(select_==2))
                            {
                                if(prefs->sounds)play_wav(sounds[1]);
                                prefs->playerside[1]++;
                                if(prefs->playerside[1]>3)
                                    prefs->playerside[1]=0;
                            }
                            if((down_==1)&&(select_==3))
                            {
                                if(prefs->sounds)play_wav(sounds[1]);
                                prefs->playerside[2]++;
                                if(prefs->playerside[2]>3)
                                    prefs->playerside[2]=0;
                            }
                            if(quit==1)
                            {
                                quit=0;
                                break;
                            }
                            if(quit==10)
                                quit=0;    
                        }
                    }
                    if((down_==1)&&(select==3))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        prefs->dicethrowing=abs(prefs->dicethrowing-1);
                    }
                    if((down_==1)&&(select==4))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        prefs->difficulty++;
                        if(prefs->difficulty>2)
                            prefs->difficulty=0;
                    }
                    if((down_==1)&&(select==5))
                    {
                        if(sounds[0]!=NULL)
                        {
                            if(prefs->sounds)play_wav(sounds[1]);
                            prefs->sounds=abs(prefs->sounds-1);
                        }
                    }
                    if((down_==1)&&(select==6))
                    {
                        if(sounds[0]!=NULL)
                        {
                            if(prefs->sounds)play_wav(sounds[1]);
                            prefs->music=abs(prefs->music-1);
                        }
                    }
                    if((down_==1)&&(select==7))
                        prefs->maxfps=(prefs->maxfps>=90)?15:prefs->maxfps+5;

                    if(!FULL_COMP)
                        curfps=fps_adjust(prefs->maxfps);
                    quit=input_handle(&acc,
                            &strafe,
                            &button,
                            &gkpr,
                            &do_,
                            &rotx,
                            &roty,
                            &down_,
                            &keycode);
                    console_type(HOME,keycode,sender,NULL,NULL,NULL);
                    if((down_==1)&&(select==0))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        save_prefs(HOME,prefs);
                        break;
                    }

                    if(quit==1)
                    {
                        prefs->playercolor=backupprefs.playercolor;
                        prefs->enemycolor=backupprefs.enemycolor;
                        prefs->difficulty=backupprefs.difficulty;
                        prefs->playerside[0]=backupprefs.playerside[0];
                        prefs->playerside[1]=backupprefs.playerside[1];
                        prefs->playerside[2]=backupprefs.playerside[2];
                        prefs->dicethrowing=backupprefs.dicethrowing;
                        prefs->sounds=backupprefs.sounds;
                        prefs->music=backupprefs.music;
                        prefs->maxfps=backupprefs.maxfps;
                        quit=0;
                        break;
                    }
                    if(quit==10)
                        quit=0;
                }
            }
/************************************************************/
            else if((down_==1)&&(selection==-1))
            {
                if(prefs->sounds)play_wav(sounds[1]);
                quit=2;
                while(1)
                {
                    int xet, yet;
                    SDL_GetMouseState(&yet,&xet);
                    int selectiont=-1;
                    float xpst=14.0*(1000*yet)/horiz;
                    float ypst=14.0*(1000*xet)/vertic;
                    xpst/=1000.0;
                    ypst/=1000.0;
                    if ((xpst>4.0)&&(xpst<9.0)&&(ypst>5.8)&&(ypst<7.3))
                        selectiont=0;
                    else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>7.6)&&(ypst<8.65))
                        selectiont=1;
                    else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>9.0)&&(ypst<10.3))
                        selectiont=2;
                    else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>11.4)&&(ypst<12.8))
                        selectiont=3;
                    else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>4.1)&&(ypst<5.3))
                        selectiont=4;
                    else if ((xpst>10.5)&&(xpst<12.0)&&(ypst>6.6)&&(ypst<8.1))
                        selectiont=5;
                    else if ((xpst>10.5)&&(xpst<12.0)&&(ypst>8.7)&&(ypst<10.3))
                        selectiont=6;
                    else
                        selectiont=-1;

                    if(prefs->sounds)
                    {
                        if((selectiont!=-1)&&(selectiont!=prevselection))
                        {
                            play_wav(sounds[2]);
                            prevselection=selectiont;
                        }
                        else
                            prevselection=selectiont;
                    }

                    if(!FULL_COMP)
                        curfps=fps_adjust(prefs->maxfps);
                    int quitt=input_handle(&acc,
                            &strafe,
                            &button,
                            &gkpr,
                            &do_,
                            &rotx,
                            &roty,
                            &down_,
                            &keycode);
                    console_type(HOME,keycode,sender,NULL,NULL,NULL);
                    if(quitt==10)
                        quitt=0;

                    if((quitt==1)||((down_==1)&&(selectiont==3)))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        quit=0;
                        break;
                    }
                    if((down_==1)&&((selectiont==0)||(selectiont==1)||(selectiont==2)))
                    {
                        match=1;
                        match_type=0;
                        match_score[0]=0;
                        match_score[1]=0;
//                         match_limit=5;
                        if(prefs->sounds)play_wav(sounds[1]);
                        game=selectiont;
                        break;
                    }
                    if((down_==1)&&(selectiont==4))
                    {
                        match=1;
                        match_type=1;
                        prev_match_game=3;
                        match_score[0]=0;
                        match_score[1]=0;
//                         match_limit=5;
                        break;
                    }
                    if((down_==1)&&(selectiont==5))
                        match_limit=((match_limit<15)?match_limit+2:3);
                    if((down_==1)&&(selectiont==6))
                        match_limit=((match_limit>3)?match_limit-2:15);

                    pickgameScene(selectiont,listbase,tavli,-1,match_limit);
                    consoleScene(listbase,tavli);
                    SDL_GL_SwapBuffers();
                    Setup_Scene(0);

                }
            }







/************************************************************/
            else if((down_==1)&&(selection==1))
            {
                if(prefs->sounds)play_wav(sounds[1]);
                quit=2;
                while(1)
                {
                    int xet, yet;
                    SDL_GetMouseState(&yet,&xet);
                    int selectiont=-1;
                    float xpst=14.0*(1000*yet)/horiz;
                    float ypst=14.0*(1000*xet)/vertic;
                    xpst/=1000.0;
                    ypst/=1000.0;
                    if ((xpst>4.0)&&(xpst<9.0)&&(ypst>5.8)&&(ypst<7.3))
                        selectiont=0;
                    else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>7.6)&&(ypst<8.65))
                        selectiont=1;
                    else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>9.0)&&(ypst<10.3))
                        selectiont=2;
                    else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>11.4)&&(ypst<12.8))
                        selectiont=3;
                    else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>4.5)&&(ypst<5.1))
                        selectiont=4;
                    else
                        selectiont=-1;

                    if(prefs->sounds)
                    {
                        if((selectiont!=-1)&&(selectiont!=prevselection))
                        {
                            play_wav(sounds[2]);
                            prevselection=selectiont;
                        }
                        else
                            prevselection=selectiont;
                    }

                    if(!FULL_COMP)
                        curfps=fps_adjust(prefs->maxfps);
                    int quitt=input_handle(&acc,
                            &strafe,
                            &button,
                            &gkpr,
                            &do_,
                            &rotx,
                            &roty,
                            &down_,
                            &keycode);
                    console_type(HOME,keycode,sender,NULL,NULL,NULL);
                    if(quitt==10)
                        quitt=0;    

                    if((quitt==1)||((down_==1)&&(selectiont==3)))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        quit=0;
                        break;
                    }
                    if((down_==1)&&((selectiont==0)||(selectiont==1)||(selectiont==2)))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        initialize(positionMatrix,
                            outYou,
                            outOp,
                            hitYou,
                            hitOp,
                            turn,
                            xmvr,
                            zmvr,
                            yrot,
                            prefs,
                            selectiont
                        );
                        game=selectiont;
                        break;
                    }
                    if((down_==1)&&(selectiont==4))
                    {
                        if(prefs->sounds)play_wav(sounds[1]);
                        while(1)
                        {
                            int xet, yet;
                            SDL_GetMouseState(&yet,&xet);

                            int selectiont=-1;
                            float xpst=14.0*(1000*yet)/horiz;
                            float ypst=14.0*(1000*xet)/vertic;
                            xpst/=1000.0;
                            ypst/=1000.0;

                            if ((xpst>4.0)&&(xpst<9.0)&&(ypst>5.8)&&(ypst<7.3))
                                selectiont=0;
                            else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>7.6)&&(ypst<8.65))
                                selectiont=1;
                            else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>9.0)&&(ypst<10.3))
                                selectiont=2;
                            else if ((xpst>4.0)&&(xpst<9.0)&&(ypst>11.4)&&(ypst<12.8))
                                selectiont=3;
                            else
                                selectiont=-1;
                            if(prefs->sounds)
                            {
                                if((selectiont!=-1)&&(selectiont!=prevselection))
                                {
                                    play_wav(sounds[2]);
                                    prevselection=selectiont;
                                }
                                else
                                    prevselection=selectiont;
                            }


                            if(!FULL_COMP)
                                curfps=fps_adjust(prefs->maxfps);
                            int quitt=input_handle(&acc,
                                    &strafe,
                                    &button,
                                    &gkpr,
                                    &do_,
                                    &rotx,
                                    &roty,
                                    &down_,
                                    &keycode);
                            console_type(HOME,keycode,sender,NULL,NULL,NULL);
                            if(quitt==10)
                                quitt=0;
                            if((quitt==1)||((down_==1)&&(selectiont==3)))
                            {
                                if(prefs->sounds)
                                    play_wav(sounds[1]);
//                                 quit=0;
                                break;
                            }
                            if((down_==1)&&((selectiont==0)||(selectiont==1)||(selectiont==2)))
                            {
                                if(prefs->sounds)play_wav(sounds[1]);
                                initialize(positionMatrix,
                                    outYou,
                                    outOp,
                                    hitYou,
                                    hitOp,
                                    turn,
                                    xmvr,
                                    zmvr,
                                    yrot,
                                    prefs,
                                    selectiont
                                );
                                game=selectiont;
                                gameScene(0,
                                    NULL,
                                    NULL,
                                    NULL,
                                    NULL,
                                    NULL,
                                    0,
                                    0,
                                    NULL,
                                    NULL,
                                    NULL,
                                    NULL,
                                    NULL,
                                    NULL,
                                    NULL,
                                    0,
                                    NULL,
                                    0,
                                    3,
                                    curfps
                                    );
                                consoleScene(listbase,tavli);
                                SDL_GL_SwapBuffers();
                                while(1)
                                {
                                    int k=input_handle(&acc,
                                            &strafe,
                                            &button,
                                            &gkpr,
                                            &do_,
                                            &rotx,
                                            &roty,
                                            &down_,
                                            &keycode);
                                    console_type(HOME,keycode,sender,NULL,NULL,NULL);
                                        if(k==1)
                                        {
                                            break;
                                        }
                                    gameScene(1,
                                        positionMatrix,
                                        outYou,
                                        outOp,
                                        hitYou,
                                        hitOp,
                                        zmvr,
                                        yrot,
                                        dice,
                                        opdice,
                                        listbase,
                                        tavli,
                                        pouliYUp,
                                        moves,
                                        res,
                                        1,
                                        prefs,
                                        game,
                                        selectiont,
                                        curfps
                                        );
                                    consoleScene(listbase,tavli);
                                    SDL_GL_SwapBuffers();
                                    Setup_Scene(1);
                                    if(!FULL_COMP)
                                        curfps=fps_adjust(prefs->maxfps);
                                }
                            }
                        pickgameScene(selectiont,listbase,tavli,1,0);
                        consoleScene(listbase,tavli);
                        SDL_GL_SwapBuffers();
                        Setup_Scene(0);
                        }
                    }
                    pickgameScene(selectiont,listbase,tavli,0,0);
                    consoleScene(listbase,tavli);
                    SDL_GL_SwapBuffers();
                    Setup_Scene(0);

                }
        //first game roll**********************************
                roll(dice);
                //*************************************************
            }
        }
    //preparation in match mode-match end scene****************************************
        if((match)&&(quit!=5))
        {
            if(quit==4)
            {
                if((match_score[0]>=match_limit)||(match_score[1]>=match_limit))
                {
                    match=0;
                    //win match scene***************************************************
                    int es;
                    int timestop=SDL_GetTicks();
                    for(es=0;es<5*prefs->maxfps;es++)
                    {
                        if(SDL_GetTicks()-timestop>5000)
                            break;
                        endMatchScene(tavli,prefs,es,((match_score[0]>=match_limit)?1:2));
//                         consoleScene(listbase,tavli);
                        SDL_GL_SwapBuffers();
                        Setup_Scene(1);
                        if(!FULL_COMP)
                            curfps=fps_adjust(prefs->maxfps);
                        int k=input_handle(&acc,
                            &strafe,
                            &button,
                            &gkpr,
                            &do_,
                            &rotx,
                            &roty,
                            &down_,
                            &keycode);
                        if(k)
                            break;
                    }
                    continue;
                }
                quit=0;
            }
            roll(dice);
            if(match_type)
            {
                prev_match_game=((prev_match_game<2)?prev_match_game+1:0);
                game=prev_match_game;
            }
            initialize(positionMatrix,
                outYou,
                outOp,
                hitYou,
                hitOp,
                turn,
                xmvr,
                zmvr,
                yrot,
                prefs,
                game
            );
        }
        if((quit==2)||(quit==5))
            quit=0;
        //game scene*************************************************************************
        while(!quit)
        {
            if(prefs->sounds)
            {
                if(pouliYUp!=pouliwas)
                {
                    pouliwas=pouliYUp;
                    if(pouliYUp)
                        play_wav(sounds[3]);
                    else
                        play_wav(sounds[4]);
                }
                if(hitwas!=(*hitYou))
                {
                    if((hitwas<(*hitYou)))
                        play_wav(sounds[3]);
                    else if (hitwas>(*hitYou))
                        play_wav(sounds[4]);
                    hitwas=(*hitYou);
                }
            }
            if(!FULL_COMP)
                curfps=fps_adjust(prefs->maxfps);
            quit=input_handle(&acc,
                    &strafe,
                    &button,
                    &gkpr,
                    &do_,
                    &rotx,
                    &roty,
                    &down_,
                    &keycode);
            if(CHEAT_MODE)
            {
                if(keycode=='u')
                {
                    *outYou=15;
                    *outOp=1;
                }
                else if(keycode=='U')
                {
                    *outYou=15;
                    *outOp=0;
                }
                else if(keycode=='o')
                {
                    *outYou=1;
                    *outOp=15;
                }
                else if(keycode=='O')
                {
                    *outYou=0;
                    *outOp=15;
                }
            }
            console_type(HOME,keycode,sender,NULL,NULL,NULL);
            if(quit==10)
            {
                if(CHEAT_MODE)
                {
                    *turn=1;
                    quit=0;
                }
                else quit=0;
            }
            if((*turn==0)&&(pouliYUp==0))
                if(!can_play(1,moves,positionMatrix,dice,*hitYou,*outYou,game))
                {
                    int es=0;
                    for(es=0;es<100;es++)
                    {
                        int k=input_handle(&acc,
                                &strafe,
                                &button,
                                &gkpr,
                                &do_,
                                &rotx,
                                &roty,
                                &down_,
                                &keycode);
                        console_type(HOME,keycode,sender,NULL,NULL,NULL);
                            if(k)
                                break;
                        gameScene(1,
                            positionMatrix,
                            outYou,
                            outOp,
                            hitYou,
                            hitOp,
                            zmvr,
                            yrot,
                            dice,
                            opdice,
                            listbase,
                            tavli,
                            pouliYUp,
                            moves,
                            res,
                            1,
                            prefs,
                            game,
                            -1,
                            curfps
                            );
                        consoleScene(listbase,tavli);
                        SDL_GL_SwapBuffers();
                        if(!FULL_COMP)
                            curfps=fps_adjust(prefs->maxfps);
                    }
                    *turn=1;
                }
            if(*turn==0)
            {
                input_exec(acc,strafe,down_,gkpr,rotx,roty,
                    positionMatrix,
                    outYou,
                    outOp,
                    hitYou,
                    hitOp,
                    turn,
                    xmvr,
                    zmvr,
                    yrot,
                    dice,
                    moves,
                    opmoves,
                    &pouliYUp,
                    res,
                    prefs,
                    game);


            }

            if(prefs->sounds)
            {
                if(pouliYUp!=pouliwas)
                {
                    pouliwas=pouliYUp;
                    if(pouliYUp)
                        play_wav(sounds[3]);
                    else
                        play_wav(sounds[4]);
                }
                if(hitwas!=(*hitYou))
                {
                    if((hitwas<(*hitYou)))
                        play_wav(sounds[3]);
                    else if (hitwas>(*hitYou))
                        play_wav(sounds[4]);
                    hitwas=(*hitYou);
                }
            }
            if ((*outOp==15)||((game==1)&&(positionMatrix[0][4]==2)&&(positionMatrix[0][5]==1)))
            {
                int es=0;
                if(match)
                {
                    match_score[1]+=((*outYou==0)?2:1);
                }
                int timestop=SDL_GetTicks();
                for(es=0;es<120;es++)
                {
                    if(SDL_GetTicks()-timestop>2000)
                        break;
                    endScene(2,listbase,tavli,(*outYou));
                    consoleScene(listbase,tavli);
                    SDL_GL_SwapBuffers();
                    Setup_Scene(0);
                    if(!FULL_COMP)
                        curfps=fps_adjust(prefs->maxfps);
                }
                quit=4;
                break;
            }
            else if ((*outYou==15)||((game==1)&&(positionMatrix[23][4]==1)&&(positionMatrix[23][5]==1)))
            {
                int es=0;
                if(match)
                {
                    match_score[0]+=((*outOp==0)?2:1);
                }
                int timestop=SDL_GetTicks();
                for(es=0;es<120;es++)
                {
                    if(SDL_GetTicks()-timestop>2000)
                        break;
                    endScene(1,listbase,tavli,(*outOp));
                    consoleScene(listbase,tavli);
                    SDL_GL_SwapBuffers();
                    Setup_Scene(0);
                    if(!FULL_COMP)
                        curfps=fps_adjust(prefs->maxfps);
                }
                quit=4;
                break;
            }
            //fixate 
            if(retrieval_area_total(1,positionMatrix)+(*outYou)>15)
            {
                int lcr=0;
                for(lcr=5;lcr>=0;lcr--)
                    if(positionMatrix[23-lcr][4]==1)
                    {
                        positionMatrix[23-lcr][3]--;
                        if(positionMatrix[23-lcr][3]==0)
                            positionMatrix[23-lcr][4]=0;
                    }
            }
            if((*turn==1)&&(quit!=4))
            {
                float dc=0;
                if(prefs->sounds)play_wav(sounds[1]);
                roll(dice);
                if(prefs->dicethrowing)
                    while(diceScene(2,
                        dice,
                        listbase,
                        tavli,
                        &dc,
                        curfps
                        ))
                    {
                        consoleScene(listbase,tavli);
                        SDL_GL_SwapBuffers();
                        gameScene(1,
                            positionMatrix,
                            outYou,
                            outOp,
                            hitYou,
                            hitOp,
                            zmvr,
                            yrot,
                            dice,
                            opdice,
                            listbase,
                            tavli,
                            pouliYUp,
                            moves,
                            res,
                            2,
                            prefs,
                            game,
                            -1,
                            curfps
                            );
                        int k=input_handle(&acc,
                            &strafe,
                            &button,
                            &gkpr,
                            &do_,
                            &rotx,
                            &roty,
                            &down_,
                            &keycode);
                        console_type(HOME,keycode,sender,NULL,NULL,NULL);
                        if(k)
                            break;
                        if(!FULL_COMP)
                            curfps=fps_adjust(prefs->maxfps);
                    }
                int doubles=0;
                if(dice[0]==dice[1])
                    doubles=1;
                //nulify*************************
                moves[0]=0;
                moves[1]=0;
                opmoves[0]=0;    //in case there
                opmoves[1]=0;    //are leftover
                *turn=0;        //actions
                //nulify*************************
                opdice[0]=dice[0];
                opdice[1]=dice[1];
                /********!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*********/
                think(positionMatrix,dice,hitOp,hitYou,outOp,outYou,game);//<----opponent action
                /************************************************************/
                int lc1;
                for(lc1=3*curfps;lc1>0;lc1--)
                {
                    gameScene(2,
                        positionMatrix,
                        outYou,
                        outOp,
                        hitYou,
                        hitOp,
                        zmvr,
                        yrot,
                        dice,
                        opdice,
                        listbase,
                        tavli,
                        0,
                        moves,
                        res,
                        0,
                        prefs,
                        game,
                        -1,
                        curfps);
                    consoleScene(listbase,tavli);
                    SDL_GL_SwapBuffers();
                    Setup_Scene(1);
                    if(!FULL_COMP)
                        curfps=fps_adjust(prefs->maxfps);
                }
                if(prefs->sounds)play_wav(sounds[1]);
                roll(dice);
                if ((*outOp>=15)||((game==1)&&(positionMatrix[0][4]==2)&&(positionMatrix[0][5]==1)))
                {
                    int lc;
                    if(match)
                    {
                        match_score[1]+=((*outYou==0)?2:1);
                    }
                    int timestop=SDL_GetTicks();
                    for(lc=120;lc>0;lc--)
                    {
                        if(SDL_GetTicks()-timestop>2000)
                            break;
                        endScene(2,listbase,tavli,*outYou);
                        consoleScene(listbase,tavli);
                        SDL_GL_SwapBuffers();
                        Setup_Scene(0);
                        if(!FULL_COMP)
                            curfps=fps_adjust(prefs->maxfps);
                    }
                    quit=4;
                    break;
                }
                else if  ((*outYou>=15)||((game==1)&&(positionMatrix[23][4]==1)&&(positionMatrix[23][5]==1)))
                {
                    int lc;
                    if(match)
                    {
                        match_score[0]+=((*outOp==0)?2:1);
                    }
                    int timestop=SDL_GetTicks();
                    for(lc=120;lc>0;lc--)
                    {
                        if(SDL_GetTicks()-timestop>2000)
                            break;
                        endScene(1,listbase,tavli,*outOp);
                        consoleScene(listbase,tavli);
                        SDL_GL_SwapBuffers();
                        Setup_Scene(0);
                        if(!FULL_COMP)
                            curfps=fps_adjust(prefs->maxfps);
                    }
                    quit=4;
                    break;
                }
                //nulify*************************
                moves[0]=0;
                moves[1]=0;
                opmoves[0]=0;    //in case there
                opmoves[1]=0;    //are leftover
                *turn=0;        //actions
                //nulify*************************
                if(quit!=4)
                {
                    float dc=0;
                    if(prefs->dicethrowing)
                        while(diceScene(1,
                            dice,
                            listbase,
                            tavli,
                            &dc,
                            curfps,
                            positionMatrix,
                            outYou,
                            outOp,
                            hitYou,
                            hitOp))
                        {
                            consoleScene(listbase,tavli);
                            SDL_GL_SwapBuffers();
                            gameScene(1,
                                positionMatrix,
                                outYou,
                                outOp,
                                hitYou,
                                hitOp,
                                zmvr,
                                yrot,
                                dice,
                                opdice,
                                listbase,
                                tavli,
                                pouliYUp,
                                moves,
                                res,
                                2,
                                prefs,
                                game,
                                -1,
                                curfps
                                );
                            int k=input_handle(&acc,
                                &strafe,
                                &button,
                                &gkpr,
                                &do_,
                                &rotx,
                                &roty,
                                &down_,
                                &keycode);
                            console_type(HOME,keycode,sender,NULL,NULL,NULL);
                            if(k)
                                break;
                            if(!FULL_COMP)
                                curfps=fps_adjust(prefs->maxfps);
                        }
                }
                *turn=0;
            }

            gameScene(1,
                positionMatrix,
                outYou,
                outOp,
                hitYou,
                hitOp,
                zmvr,
                yrot,
                dice,
                opdice,
                listbase,
                tavli,
                pouliYUp,
                moves,
                res,
                0,
                prefs,
                game,
                -1,
                curfps
                );
            consoleScene(listbase,tavli);
            SDL_GL_SwapBuffers();
            Setup_Scene(1);

            if(quit==1)
                quit=3;
        }

        //pause scene*************************************************************************
        if(quit==3)
            quit=0;

        while(!quit)
        {
            int xe, ye;
            SDL_GetMouseState(&ye,&xe);
            int selection=0;
            float xps=14*ye/horiz;
            float yps=14*xe/vertic;
            if ((xps>4.0)&&(xps<9.0)&&(yps>5.8)&&(yps<7.0))
                selection=1;
            else if ((xps>4.0)&&(xps<9.0)&&(yps>7.6)&&(yps<9.0))
                selection=2;
            else
                selection=0;

            if(prefs->sounds)
            {
                if((selection!=0)&&(selection!=prevselection))
                {
                    play_wav(sounds[2]);
                    prevselection=selection;
                }
                else
                    prevselection=selection;
            }

            if(!FULL_COMP)
                curfps=fps_adjust(prefs->maxfps);
            quit=input_handle(&acc,
                    &strafe,
                    &button,
                    &gkpr,
                    &do_,
                    &rotx,
                    &roty,
                    &down_,
                    &keycode);
            console_type(HOME,keycode,sender,NULL,NULL,NULL);
            pauseScene(selection,listbase,tavli);
            consoleScene(listbase,tavli);
            SDL_GL_SwapBuffers();
            Setup_Scene(0);
            if(quit==10)
                quit=0;
            if((down_==1)&&(selection==2))
            {
                if(prefs->sounds)play_wav(sounds[1]);
                quit=4;
                match=0;
            }
            else if((down_==1)&&(selection==1))
            {
//                 if(prefs->sounds)play_wav(sounds[1]);
                quit=5;
            }
        }
    }
    console_writeline(HOME,"#QUIT\n",getenv("USER"));
    if(prefs->music)
#ifndef SDL_THREADS
        pthread_cancel(musicthread);
#else
        SDL_KillThread(musicthread);
#endif
    pthread_mutex_unlock(&musicmutex);
    pthread_mutex_destroy(&musicmutex);

    return quit;
}

