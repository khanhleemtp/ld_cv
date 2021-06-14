import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateApply } from '../../features/Apply/ApplySlice';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const headCells = [
  {
    id: '1',
    numeric: false,
    disablePadding: true,
    label: 'Ứng viên',
  },
  { id: '2', numeric: true, disablePadding: false, label: 'Email' },
  { id: '3', numeric: true, disablePadding: false, label: 'Thông tin' },
  { id: '6', numeric: true, disablePadding: false, label: 'Hành động' },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
    textTransform: 'capitalize',
  },
  chip: {
    textTransform: 'capitalize',
    margin: 2,
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar>
      <Box>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tiêu đề: Danh sách ứng viên
        </Typography>
      </Box>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingTop: theme.spacing(2),
    },
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function CompanyTable({ rows }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleResponse = (status, user, id) => () => {
    return dispatch(
      updateApply({
        id,
        status,
        cb: () => history.go(0),
        user,
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} rowCount={rows?.length} />
            {!rows ? (
              <div>Không có ai ứng tuyển</div>
            ) : (
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell align="right"> {row?.user?.name}</TableCell>
                        <TableCell align="right">{row?.user?.email}</TableCell>
                        <TableCell align="right">
                          {row?.resumes?.map((resume) => (
                            <Box key={resume._id} margin={1}>
                              <Link to={'/dashboard/resumes/' + resume._id}>
                                Xem CV
                              </Link>
                              <Typography
                                variant="body2"
                                color="primary"
                                gutterBottom
                              >
                                Vai trò: {resume?.header?.title}
                              </Typography>
                              {resume?.tags?.map((tag) => (
                                <Chip
                                  label={tag}
                                  key={tag}
                                  clickable
                                  className={classes.chip}
                                />
                              ))}
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="medium"
                            variant="outlined"
                            onClick={handleResponse(
                              'accept',
                              row?.user?.id,
                              row?.id
                            )}
                          >
                            Chấp nhận
                          </Button>
                          <Button
                            size="medium"
                            color="primary"
                            variant="outlined"
                            style={{ marginLeft: 4 }}
                            onClick={handleResponse(
                              'reject',
                              row?.user?.id,
                              row?.id
                            )}
                          >
                            Từ chối
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
