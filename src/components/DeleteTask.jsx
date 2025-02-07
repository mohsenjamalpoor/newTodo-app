// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { useDispatch, useSelector } from "react-redux";

// import { useState } from "react";
// import { FaTrash } from "react-icons/fa6";
// import { deleteTask } from "../stor/taskSlice";

// function DeleteTask({ task }) {
//   const [isDelete, setIsDeleting] = useState(false);
//   const tasks = useSelector((state) => state.tasks);

//   const dispatch = useDispatch();

//   const handelDelete = (id) => {
//     dispatch(deleteTask({ id }));
//   };
//   return (
//     <div>
//       {isDelete ? (
//         <div className=" absolute bottom-60 left-120  bg-white p-4 border rounded-md shadow-lg z-10 text-center">
//           <div>
//             <h1 className="text-center font-bold">
//               Are you sure you want to delete this task?
//             </h1>
//           </div>
//           <div className="grid-cols-1	flex justify-between items-center mt-10 ">
//             <button
//               onClick={() => setIsDeleting(false)}
//               className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
//             >
//               Close
//             </button>
//             <button
//               onClick={() => handelDelete(task.id)}
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//             >
//               YES
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <button
//             className="cursor-pointer text-4xl text-gray-300 hover:bg-green-300 rounded-full p-2"
//             onClick={() => setIsDeleting(true)}
//           >
//             <FaTrash size={20} />
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default DeleteTask;
