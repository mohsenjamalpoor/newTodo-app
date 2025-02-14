/* eslint-disable react/prop-types */
// import { useState } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

// import { MdEdit } from "react-icons/md";
import { editTask } from "../store/taskSlice";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import _date from "../utils/_date";

function EditTask({ task }) {
  const [isEdit, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [date, setDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority);

  const [status, setStatus] = useState(task.status);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(false);
    dispatch(
      editTask({ id: task.id, name, priority, status, date: _date(date) })
    );
  };

  return (
    <>
      {isEdit ? (
        <Box
          sx={{
            position: "absolute",
            left:"50%",
            top:'50%',
            border: "1px solid",
            zIndex: 10,
            textAlign: "center",
            bgcolor: "#fff",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            transform: "translate(-50%, -50%)",
  
          }}
        >
          <Typography variant="h4">ویرایش</Typography>

          <div className="grid grid-cols-1">
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
            <Button onClick={handleEdit} variant="contained" type="submit">
              ذخیره
            </Button>
            <Link to="/">
              <Button
                variant="outlined"
                color="error"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                خروج
              </Button>
            </Link>
          </Typography>
        </Box>
      ) : (
        <>
          <Tooltip
            sx={[
              {
                "&:hover": {
                  color: "green",
                },
              },
            ]}
            title="ویرایش"
          >
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
}

export default EditTask;
