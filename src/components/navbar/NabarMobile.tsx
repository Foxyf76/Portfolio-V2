import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { createBrowserHistory } from 'history';
import { List, ListItem, ListItemText } from '@material-ui/core';

const history = createBrowserHistory();

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  navItems: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '30px',

    textTransform: 'uppercase'
  },
  navActiveItem: {
    color: 'rgb(27,163,251)',
    borderRadius: 25
  }
});

export const NavbarMobile: React.FC = () => {
  const classes = useStyles();
  const [isOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(false);

  const handleState = (to: any) => {
    if (to === 'home') {
      setActive(true);
    } else {
      setActive(false);
    }
    setMenuOpen(false);
    history.push(`/${to}`);
  };

  var burgerStyle = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      transition: 'background-color 0.5s ease-in-out',
      background: active ? '#e3e3e3' : 'rgb(27,163,251)'
    },

    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  };

  const handleMenu = (state: any) => {
    setMenuOpen(state.isOpen);
  };

  return (
    <Menu styles={burgerStyle} isOpen={isOpen} onStateChange={handleMenu}>
      <BrowserRouter>
        <List className={classes.navItems} component='nav'>
          <Link
            activeClass={classes.navActiveItem}
            onSetActive={handleState}
            to='home'
            spy={true}
            smooth={true}
            duration={500}>
            <ListItem button style={{ borderRadius: 25 }} onClick={handleState}>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>

          <Link
            activeClass={classes.navActiveItem}
            onSetActive={handleState}
            to='about'
            spy={true}
            smooth={true}
            duration={500}>
            <ListItem button style={{ borderRadius: 25 }}>
              <ListItemText primary='About' />
            </ListItem>
          </Link>
          <Link
            activeClass={classes.navActiveItem}
            onSetActive={handleState}
            to='skills'
            spy={true}
            smooth={true}
            duration={500}>
            <ListItem button style={{ borderRadius: 25 }}>
              <ListItemText primary='Skills' />
            </ListItem>
          </Link>
          <Link
            activeClass={classes.navActiveItem}
            onSetActive={handleState}
            to='projects'
            spy={true}
            smooth={true}
            duration={500}>
            <ListItem button style={{ borderRadius: 25 }}>
              <ListItemText primary='Projects' />
            </ListItem>
          </Link>
          <Link
            activeClass={classes.navActiveItem}
            onSetActive={handleState}
            to='contact'
            spy={true}
            smooth={true}
            duration={500}>
            <ListItem button style={{ borderRadius: 25 }}>
              <ListItemText primary='Contact' />
            </ListItem>
          </Link>
        </List>
      </BrowserRouter>
    </Menu>
  );
};