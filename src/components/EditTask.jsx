/* eslint-disable react/prop-types */
// import { useState } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";


import { MdEdit } from "react-icons/md";
import { editTask } from "../stor/taskSlice";


function EditTask({ task }) {
  
  const [isEdit, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [date, setDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority);


  const [status, setStatus] = useState(task.status);
  const dispatch = useDispatch();
  
  const handleEdit = () => {
    setIsEditing(false);
    dispatch(editTask({id: task.id, name, priority, status, date }));
  };

  return (
    <>
      {isEdit ? (
        <div className="absolute bottom-60 left-120 bg-white p-4 border rounded-md shadow-lg z-10 text-center">
          <h1 className="text-center text-xl font-bold mb-3 ">Edit Task</h1>

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
              <option value="">Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="cursor-pointer border border-gray-400 rounded-md py-2 px-2 text-md font-semibold mt-6"
              name="status"
            >
              <option value="">Status</option>
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
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
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            className="cursor-pointer text-4xl text-gray-300 hover:bg-green-300 rounded-full p-2"
            onClick={() => setIsEditing(true)}
          >
            <MdEdit size={20} />
          </button>
        </>
      )}
    </>
  );
}

export default EditTask;
