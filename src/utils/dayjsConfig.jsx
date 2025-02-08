import dayjs from "dayjs";
import  "dayjs/local/fa";
import localizedFormat from "dayjs/plugin/localizedFormat";
import jalaliPlugin from "jalali-moment";


dayjs.extend(localizedFormat);
dayjs.locale("fa");
dayjs.extend(jalaliPlugin);
export default dayjs;