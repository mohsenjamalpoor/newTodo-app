import {
  alpha,
  AppBar,
  Backdrop,
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
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
import MenuIcon from "@mui/icons-material/Menu";
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(2);

  // صفحه بندی

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
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
        date:_date(date),
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
              <MenuIcon />
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
              <TableCell sx={{ border: "1px solid", textAlign: "right" }}>
                #
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "right" }}>
                نام{" "}
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "right" }}>
                اولویت
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "right" }}>
                وضعیت
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "right" }}>
                مهلت
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "right" }}>
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
              .map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {task.name}
                  </TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.date}</TableCell>
                  <TableCell>
                    <div>
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
                    <MenuItem value="انجام شد">انجام شد</MenuItem>
                  </Select>
                </FormControl>

                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                  name="date"
                >

                  
                </input>
               
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
                  <IconButton size="small">
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
                    <h4
                      sx={{
                        fontWeight: "light",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      فیلتر ها
                    </h4>
                  </div>
                </div>

                <div>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-helper-label">
                        همه
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
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
                          همه
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                        >
                          <MenuItem value="همه">همه</MenuItem>
                          <MenuItem value="کار">کار</MenuItem>
                          <MenuItem value="در حال انجام">در حال انجام</MenuItem>
                          <MenuItem value="انجام">انجام</MenuItem>
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
        component="div"
        count={20}
        page={page}
        // sx={{dir}}
        labelRowsPerPage="ردیف در هر صفحه"
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Home;
