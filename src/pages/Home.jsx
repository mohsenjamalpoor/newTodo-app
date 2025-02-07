import {
  Backdrop,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { addTask, deleteTask } from "../stor/taskSlice";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { TablePagination } from "@mui/material";
// import EditTask from "../components/EditTask";

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
  const [date, setDate] = useState("");
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
    setRowsPerPage(parseInt(event.target.value, 10));
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
        date,
      })
    );
    setShowModal(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          background:"#4f39f6"
        }}
      >
        <div>
          <h1>
            لیست کارها
          </h1>
        </div>
        <div>
          <Tooltip title="اضافه">
            <IconButton
              aria-label="add"
              onClick={() => setShowModal(true)}
              size="small"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="فیلتر">
            <IconButton
              aria-label="filter"
              onClick={toggleDrawer(true)}
              size="small"
            >
              <FilterAltOutlinedIcon />
            </IconButton>
          </Tooltip>
          <div
            sx={{ display: "flex", position: "relative", alignItems: "center" }}
          >
            <input
              type="text"
              placeholder="جستجو"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              sx={{
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Tooltip title="جستجو">
                <IconButton aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
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
                      <Tooltip title="حذف">
                        <IconButton onClick={() => handelDelete(task.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>

                      <Link to={`/edit/${task.id}`}>
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
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
          <div>
            <h1 className="text-center text-xl font-semibold text-gray-900 mb-5 ">
              کار جدید
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="نام کار"
                  className="font-semibold px-2 text-md py-2 border border-gray-400 rounded-md"
                />
              </div>
              <div>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="cursor-pointer border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                  name="اولویت"
                >
                  <option value="">اولویت</option>
                  <option value="High">زیاد</option>
                  <option value="Medium">متوسط</option>
                  <option value="Low">کم</option>
                </select>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="cursor-pointer border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                  name="وضعیت"
                >
                  <option value="">وضعیت</option>
                  <option value="Todo">کار</option>
                  <option value="Doing">در حال انجام</option>
                  <option value="Done">انجام شد</option>
                </select>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                  name="date"
                ></input>
              </div>
              <div
                sx={{ mt: 2 }}
                className="grid-cols-1	flex justify-between items-center mt-10 "
              >
                <button
                  type="submit"
                  className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  ذخیره
                </button>
                <Link to="/">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
                  >
                    خروج
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      <Drawer open={filter} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem>
              <div className="fixed top-6 right-1/2 translate-x-1/2 min-h-screen w-72  flex gap-10  flex-col bg-white">
                <div className="flex gap-4 justify-around items-center w-28">
                  <FilterAltOutlinedIcon />
                  <div className="bg-white">
                    <h2 className="font-bold whitespace-nowrap ">
                      لیست کار های من
                    </h2>
                    <h4 className="font-thin  text-sm">فیلتر ها</h4>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-slate-300 my-4 rounded-xl"></div>

                <div className="flex flex-col gap-10 ">
                  <div className="flex gap-4 justify-between">
                    <div>
                      <select className="cursor-pointer w-40 border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6">
                        <option value="All">همه</option>
                        <option value="High">زیاد</option>
                        <option value="Medium">متوسط</option>
                        <option value="Low">کم</option>
                      </select>
                    </div>
                    <div>
                      <select
                        id="status"
                        className="cursor-pointer w-40 border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
                      >
                        <option value="All">همه</option>
                        <option value="Todo">کار</option>
                        <option value="Doing">در حال انجام</option>
                        <option value="Done">انجام شد</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex mt-2 justify-center text-center">
                    <button className="w-18 border border-indigo-400  hover:bg-indigo-500 hover:text-white rounded-md py-2 px-2 text-md font-semibold mt-10">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <TablePagination
        component="div"
        count={100}
        page={page}
        dir="rtl"
        labelRowsPerPage="ردیف در هر صفحه"
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Home;
