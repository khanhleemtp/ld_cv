import { createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

/* TODO  Styles  */
export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },

  props: {
    MuiButton: {
      // disableRipple: true,
    },
  },

  palette: {
    primary: {
      main: pink[400],
      app: blue[200],
      header: '#e2e4ea',
      avatar: '#edf',
      title: '#008CFF',
      orange: '#b72f2fde;',
      blue: '#00C091',
    },
    secondary: {
      main: pink[600],
    },
  },

  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontWeightBold: 700,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});
