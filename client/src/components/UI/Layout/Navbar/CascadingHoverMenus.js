import { forwardRef, useContext, createContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import ChevronRight from '@material-ui/icons/ChevronRight';

import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  linkItem: {
    cursor: 'pointer',
    textAlign: 'center',
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const ParentPopupState = createContext(null);
const CascadingHoverMenus = ({ item, handleClick }) => {
  const popupState = usePopupState({
    popupId: 'demoMenu',
    variant: 'popover',
    deferOpenClose: true,
  });

  const classes = useStyles();

  return (
    <div>
      <Box
        {...bindHover(popupState)}
        className={classes.linkItem}
        display="flex"
        alignItems="center"
        marginX={1}
        style={{ fontSize: 16 }}
      >
        {item.text}
        {item?.icon && item.icon}
      </Box>
      {item.subMenu ? (
        <ParentPopupState.Provider value={popupState}>
          <Menu
            disableScrollLock={true}
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            getContentAnchorEl={null}
          >
            {item?.subMenu
              ? item.subMenu.map((subItem, i) => (
                  <Submenu
                    key={i}
                    style={{ display: subItem?.menus ? 'flex' : 'none' }}
                    popupId={subItem?.text}
                    title={subItem?.text}
                    icon={subItem?.icon}
                    subItem={subItem}
                    onClick={() => {
                      popupState.close();
                      subItem.onClick();
                    }}
                  >
                    <Container maxWidth="sm">
                      <Grid container>
                        {subItem?.menus
                          ? subItem.menus.map((tag, i) => (
                              <Grid
                                key={i}
                                item
                                sm={
                                  subItem.menus.length < 8
                                    ? 12
                                    : subItem.menus.length < 16
                                    ? 4
                                    : 3
                                }
                              >
                                <MenuItem onClick={popupState.close}>
                                  {tag}
                                </MenuItem>
                              </Grid>
                            ))
                          : null}
                      </Grid>
                    </Container>
                  </Submenu>
                ))
              : null}
          </Menu>
        </ParentPopupState.Provider>
      ) : null}
    </div>
  );
};

export default CascadingHoverMenus;

const submenuStyles = (theme) => ({
  menu: {
    marginTop: theme.spacing(-1),
  },
  title: {
    flexGrow: 1,
  },
  moreArrow: {
    marginRight: theme.spacing(-1),
  },
});

const Submenu = withStyles(submenuStyles)(
  // Unfortunately, MUI <Menu> injects refs into its children, which causes a
  // warning in some cases unless we use forwardRef here.
  forwardRef(
    (
      { classes, title, icon, subItem, onClick, popupId, children, ...props },
      ref
    ) => {
      const parentPopupState = useContext(ParentPopupState);
      const popupState = usePopupState({
        popupId,
        variant: 'popover',
        parentPopupState,
        deferOpenClose: true,
      });
      const isMenus = subItem.menus;
      return title ? (
        <ParentPopupState.Provider value={popupState}>
          <MenuItem
            {...bindHover(popupState)}
            selected={popupState.isOpen}
            ref={ref}
            onClick={onClick}
          >
            {icon && (
              <Box display="flex" alignItems="center">
                {icon}
                <Box style={{ opacity: 0 }}>-</Box>
              </Box>
            )}
            <Box className={classes.title}>{title}</Box>
            {isMenus ? <ChevronRight className={classes.moreArrow} /> : null}
          </MenuItem>
          <Menu
            {...bindMenu(popupState)}
            classes={{ paper: classes.menu }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            getContentAnchorEl={null}
            disableScrollLock={true}
            {...props}
          >
            {children}
          </Menu>
        </ParentPopupState.Provider>
      ) : null;
    }
  )
);
