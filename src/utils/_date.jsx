// import dayjs from "dayjs";
// import  "dayjs/local/fa";
// import localizedFormat from "dayjs/plugin/localizedFormat";
// import jalaliPlugin from "jalali-moment";


// dayjs.extend(localizedFormat);
// dayjs.locale("fa");
// dayjs.extend(jalaliPlugin);
// export default dayjs;


import dayjs from "dayjs";

export default function _date(date)  {
    return dayjs(date).calendar("jalali").locale("fa").format("YY/MM/DD");
}

// import dayjs from 'dayjs'
// import React, { useState } from 'react'
// import jalaliday from "jalaliday";

// dayjs.extend(jalaliday);

// function _date() {
//     const [date, setDate] = useState(dayjs().calendar("jalali").format("YYYY/MM/DD"));

//     const handleChange = (e) => {
//         setDate(e.target.value);
//     };
//   return (
//     <div>
//       <input type="text" 
//       value={date}
//       onChange={handleChange}

//       />
//     </div>
//   )
// }

// export default _date
