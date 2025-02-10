

import dayjs from "dayjs";

export default function _date(date)  {
    return dayjs(date).calendar("jalali").locale("fa").format("YY/MM/DD");
}

