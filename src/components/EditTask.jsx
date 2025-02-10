/* eslint-disable react/prop-types */
// import { useState } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

// import { MdEdit } from "react-icons/md";
import { editTask } from "../stor/taskSlice";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

function EditTask({ task }) {
  const [isEdit, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [date, setDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority);

  const [status, setStatus] = useState(task.status);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(false);
    dispatch(editTask({ id: task.id, name, priority, status, date }));
  };

  return (
    <>
      {isEdit ? (
        <Box sx={{position:'absolute', left:"480px", zIndex:2}} className="absolute bottom-60 left-120 bg-white p-4 border rounded-md shadow-lg z-10 text-center">
          <Typography  variant="h3">

          ویرایش
          </Typography>

          <div className="grid grid-cols-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Task Name"
              className="font-semibold px-2 text-md py-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="cursor-pointer border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
              name="priority"
            >
              <option value="اولویت">اولویت</option>
              <option value="زیاد">زیاد</option>
              <option value="متوسط">متوسط</option>
              <option value="کم">کم</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="cursor-pointer border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
              name="status"
            >
              <option value="وضعیت">وضعیت</option>
              <option value="کار">کار</option>
              <option value="در حال انجام">در حال انجام</option>
              <option value="انجام شد">انجام شد</option>
            </select>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
              name="date"
            ></input>
          </div>
          <div className="grid-cols-1	flex justify-between items-center mt-10 ">
            <button
              type="submit"
              className="bg-blue-500  hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleEdit}
            >
              ذخیره
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
            >
              خروج
            </button>
          </div>
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
            title="Edit"
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
