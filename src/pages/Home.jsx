import {
  alpha,
  AppBar,
  Backdrop,
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
// import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { addTask, deleteTask } from "../stor/taskSlice";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { TablePagination } from "@mui/material";
import EditTask from "../components/EditTask";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import _date from "../utils/_date";
import dayjs from "dayjs";

// import EditTask from "../components/EditTask";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  left: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

//

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 4,
  bgcolor: "#fff",
  border: "2px solid",
  boxShadow: 24,
  p: 4,
};

function Home() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // صفحه بندی

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0);
  };

  //  حذف کردن کار ها

  const handelDelete = (id) => {
    dispatch(deleteTask({ id }));
  };

  //  فیلتر کردن
  const toggleDrawer = (newFilter) => () => {
    setFilter(newFilter);
  };

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTask({
        id: tasks[tasks.length - 1].id + 1,
        name,
        priority,
        status,
        date: _date(date),
      })
    );
    setDate(dayjs());
    setShowModal(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 1 }}
            >
              <ChecklistRtlIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              لیست کار های من
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="جستجو..."
                onChange={(e) => setSearch(e.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Tooltip
              sx={[
                {
                  "&:hover": {
                    color: "#fff",
                  },
                },
              ]}
              title="اضافه"
            >
              <IconButton
                aria-label="add"
                onClick={() => setShowModal(true)}
                size="small"
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip
              sx={[
                {
                  "&:hover": {
                    color: "#fff",
                  },
                },
              ]}
              title="فیلتر"
            >
              <IconButton
                aria-label="filter"
                onClick={toggleDrawer(true)}
                size="small"
              >
                <FilterAltOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>

      <TableContainer>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead sx={{ background: "#d1d5dc" }}>
            <TableRow sx={{ border: "1px solid" }}>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                شماره
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                نام{" "}
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                اولویت
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                وضعیت
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                مهلت
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                عملکرد
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            {tasks
              .filter((task) => {
                return search.toLocaleLowerCase() === ""
                  ? task
                  : task.name.toLocaleLowerCase().includes(search);
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      borderLeft: "1px solid #9e9e9e",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      borderLeft: "1px solid #9e9e9e",
                    }}
                  >
                    {task.name}
                  </TableCell>
                  <TableCell sx={{ borderLeft: "1px solid #9e9e9e" }}>
                    <Box
                      sx={{
                        bgcolor:
                          task.priority === "زیاد"
                            ? "#f44336"
                            : task.priority === "متوسط"
                              ? "#ffc600"
                              : task.priority === "کم" && "#9e9e9e",
                        fontSize: "18px",
                        textAlign: "center",
                        color: "#fff",
                        borderRadius: 5,
                        pr: 3,
                        pl: 3,
                        pb: 1,
                        pt: 1,
                      }}
                    >
                      {task.priority}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderLeft: "1px solid #9e9e9e" }}>
                    <Box
                      sx={{
                        bgcolor:
                          task.status === "کار"
                            ? "#2196f3"
                            : task.status === "در حال انجام"
                              ? "#4caf50"
                              : task.status === "انجام شده" && "#ff9800",
                        fontSize: "18px",
                        textAlign: "center",
                        color: "#fff",
                        borderRadius: 5,
                        pr: 3,
                        pl: 3,
                        pb: 1,
                        pt: 1,
                      }}
                    >
                      {task.status}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderLeft: "1px solid #9e9e9e" }}>
                    <Box
                      sx={{
                        fontSize: "18px",
                        textAlign: "center",
                        borderRadius: 2,
                        pr: 3,
                        pl: 3,
                        pb: 1,
                        pt: 1,
                      }}
                    >
                      {task.date}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div
                      sx={{
                        fontSize: "18px",
                        textAlign: "center",
                        borderRadius: 2,
                        pr: 3,
                        pl: 3,
                        pb: 1,
                        pt: 1,
                      }}
                    >
                      <Tooltip
                        sx={[
                          {
                            "&:hover": {
                              color: "red",
                            },
                          },
                        ]}
                        title="حذف"
                      >
                        <IconButton onClick={() => handelDelete(task.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>

                      <EditTask task={task} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableHead>
        </Table>
      </TableContainer>

      {/* اضافه کردن کار */}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
              mb: "30px",
            }}
            variant="h4"
          >
            کار جدید
          </Typography>

          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="نام کار"
                  sx={{ width: "100%" }}
                  size="small"
                  variant="outlined"
                />
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">اولویت</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    label="اولویت"
                  >
                    <MenuItem value="زیاد">زیاد</MenuItem>
                    <MenuItem value="متوسط">متوسط</MenuItem>
                    <MenuItem value="کم">کم</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">وضعیت</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="وضعیت"
                  >
                    <MenuItem value="کار">کار</MenuItem>
                    <MenuItem value="در حال انجام">در حال انجام</MenuItem>
                    <MenuItem value="انجام شده">انجام شده</MenuItem>
                  </Select>
                </FormControl>

                <Input
                  sx={{ height: "47px" }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  name="date"
                />
              </div>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 4,
                }}
                variant="div"
              >
                <Button variant="contained" type="submit">
                  ذخیره
                </Button>
                <Link to="/">
                  <Button
                    variant="outlined"
                    color="error"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    خروج
                  </Button>
                </Link>
              </Typography>
            </form>
          </div>
        </Box>
      </Modal>

      <Drawer open={filter} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem>
              <div>
                <div>
                  <IconButton
                    sx={{
                      bgcolor: "#2196f3",
                    }}
                    size="small"
                  >
                    <FilterAltOutlinedIcon />
                  </IconButton>

                  <div sx={{ bgcolor: "white", ml: "40px" }}>
                    <h3
                      sx={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      لیست کار های من
                    </h3>
                    <Typography
                      sx={{
                        fontWeight: "light",
                        fontSize: "14px",
                        textAlign: "center",
                        pt: 2,
                      }}
                      variant="h2"
                    >
                      فیلتر ها
                    </Typography>
                  </div>
                </div>

                <Divider sx={{ my: 2 }} />

                <div>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-helper-label">
                        اولویت
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="اولویت"
                      >
                        <MenuItem value="همه">همه</MenuItem>
                        <MenuItem value="زیاد">زیاد</MenuItem>
                        <MenuItem value="متوسط">متوسط</MenuItem>
                        <MenuItem value="کم">کم</MenuItem>
                      </Select>
                    </FormControl>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-simple-select-helper-label">
                          وضعیت
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="وضعیت"
                        >
                          <MenuItem value="همه">همه</MenuItem>
                          <MenuItem value="کار">کار</MenuItem>
                          <MenuItem value="در حال انجام">در حال انجام</MenuItem>
                          <MenuItem value="انجام شده">انجام شده</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <Button
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      mr: "35px",
                    }}
                    variant="contained"
                  >
                    reset
                  </Button>
                </div>
              </div>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={tasks.length}
        page={page}
        labelRowsPerPage="تعداد سطر در هر صفحه"
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from} - ${to} از ${count}`
        }
        sx={{
          direction: "rtl",
          "& .MuiTablePagination-actions": { direction: "ltr" },
        }}
      />
    </>
  );
}

export default Home;
