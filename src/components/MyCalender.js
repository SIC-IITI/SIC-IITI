import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CustomCalendar.css';

const getSundayClassName = ({ date, view }) => {
  if (view === 'month' && date.getDay() === 0) { // 0 is Sunday
    return 'sunday-tile';
  }
};

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex justify-center p-4">
      <Calendar 
        onChange={setDate} 
        value={date}
        locale="en-GB"
        tileClassName={getSundayClassName}
      />
    </div>
  );
}

export default MyCalendar;