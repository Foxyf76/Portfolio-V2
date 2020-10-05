import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import pattern from '../../assets/images/skills_pattern.png';
import {
  DeveloperBoard,
  GitHub,
  Star,
  Publish,
  OpenInNew,
  ExpandMore,
} from '@material-ui/icons';
import { scroller } from 'react-scroll';
import { getRepos, Irepo } from '../../Actions';

const projects = [
  {
    image: require('../../assets/images/seospider.png'),
    name: 'SEO Spider',
    description: `An SEO tool which scrapes the 'people also asked' (PAA) section of the Google search results page. The resulting PAA questions 
    are then searched and scraped to create a tree structure of search terms and the google search results.`,
    link: 'https://github.com/Foxyf76/People-Also-Asked/',
  },

  {
    image: require('../../assets/images/socialcleanr.png'),
    name: 'SocialCleanr',
    description: `A web app that uses machine learning and social media APIs to pull user's Facebook/Twitter content before filtering it for 
    innapropriate imagry or text. All innapropriate detected via machine learning are then alerted to the user`,
    link: 'https://github.com/Foxyf76/Social-Cleaner',
  },

  {
    image: require('../../assets/images/wip.svg'),
    name: 'TotalOSINT (WIP)',
    description: `A work-in-progress app for scraping and combining OSINT from across multiple websites including VirusTotal and IBM X-Force. This 
    app supports searches on IP addresses, file hashes and domains`,
    link: 'https://github.com/Foxyf76/TotalOSINT',
  },
];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: 'url(' + pattern + ')',
    boxShadow: 'inset 0px 10px 10px rgba(0,0,0,0.6)',
    '& h4': {
      color: 'white',
      fontFamily: 'Raleway',
      textTransform: 'uppercase',
      marginTop: '60px',
    },
    '& h5': {
      fontFamily: 'Raleway',
      textTransform: 'uppercase',
      padding: '10px',
    },
  },
  projectCard: {
    transition: 'all .2s ease-in-out',
    margin: '20px',
    width: '300px',
    height: '420px',
    textAlign: 'center',
    '&:hover': {
      transform: 'scale(1.08)',
    },
  },
  divider: {
    width: '40px',
    border: 0,
  },
  githubCard: {
    margin: '10px',
    paddingBottom: '10px',
    width: '300px',
    height: '90px',
    transition: 'all .5s ease-in-out',
    '& h6': {
      fontFamily: 'Raleway',
      textTransform: 'uppercase',
    },
    '&:hover': {
      backgroundColor: '#03a3ff',
      color: 'white',
    },
  },
  expandButton: {
    marginTop: '20px',
    color: '#4a4a4a',
  },
});
export const Projects: React.FC = () => {
  const classes = useStyles();
  const [repos, setRepos] = useState<Irepo[]>([]);

  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    async function fetchRepos() {
      setRepos(await getRepos());
    }
    if (repos.length === 0) {
      fetchRepos();
    }
  }, [repos]);

  const handleExpandClick = () => {
    scroller.scrollTo('contact', {
      duration: 1500,
      delay: 100,
      smooth: true,
    });
  };

  return (
    <div id='projects' className={classes.root} onLoadStart={forceUpdate}>
      <Typography variant='h4'>Projects</Typography>

      <hr
        className={classes.divider}
        style={{ borderTop: '2px solid #03a3ff' }}
      />

      <Typography variant='h5' style={{ color: 'white', display: 'flex' }}>
        <DeveloperBoard
          fontSize='large'
          style={{
            color: '#03a3ff',
            paddingRight: '10px',
          }}
        />
        Recent Works
      </Typography>

      <Grid
        container
        direction={'row'}
        justify='center'
        spacing={4}
        xs={12}
        style={{ marginTop: '10px' }}
      >
        {projects.map((project) => (
          <Card raised={true} className={classes.projectCard}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt={project.name}
                height='180'
                image={project.image}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {project.name}
                </Typography>
                <Typography
                  style={{ height: '120px' }}
                  variant='body2'
                  color='textSecondary'
                  component='p'
                >
                  {project.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ textAlign: 'center' }}>
              <a
                href={project.link}
                style={{ textDecoration: 'none' }}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  startIcon={<OpenInNew />}
                  size='small'
                  color='primary'
                  style={{ color: '#4a4a4a' }}
                >
                  View On GitHub
                </Button>
              </a>
            </CardActions>
          </Card>
        ))}
      </Grid>

      <div
        style={{
          backgroundColor: '#dedede',
          marginTop: '60px',
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid #4a4a4a' }}
        />

        <Typography variant='h5' style={{ display: 'flex', color: '#4a4a4a' }}>
          <GitHub
            fontSize='large'
            style={{
              color: '#03a3ff',
              paddingRight: '10px',
            }}
          />
          Active GitHub Repos
        </Typography>

        {repos.length === 0 ? (
          <CircularProgress
            value={0}
            style={{ padding: '20px', color: '#03a3ff' }}
          />
        ) : (
          <Grid container direction={'row'} justify='center' xs={12}>
            {repos.map((repo) => (
              <a
                href={repo.html_url}
                style={{ textDecoration: 'none' }}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Card className={classes.githubCard}>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant='h6'>{repo.name}</Typography>
                      <Typography
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Publish
                          fontSize='small'
                          style={{ paddingRight: '10px' }}
                        />
                        Commits: {repo.commits_url}
                      </Typography>

                      <Typography
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Star
                          fontSize='small'
                          style={{ paddingRight: '10px' }}
                        />
                        Stars: {repo.stargazers_count}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </a>
            ))}
          </Grid>
        )}

        <IconButton
          className={classes.expandButton}
          onClick={handleExpandClick}
        >
          <ExpandMore fontSize='large' />
        </IconButton>
      </div>
    </div>
  );
};
