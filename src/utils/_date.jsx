import dayjs from 'dayjs';


function _date(date) {
  return dayjs(date).calender("jalali").locale('fa').format('YYYY/MM/DD');
   
  
}

export default _date
