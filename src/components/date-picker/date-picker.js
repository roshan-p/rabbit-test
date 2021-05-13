import React from "react";
import DatePicker from "react-datepicker";

const DatePickerComponent = ({ selectedDate, onSelectDate }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  const oneWeek = new Date(today);
  oneWeek.setDate(oneWeek.getDate() + 7);
  return (
    <DatePicker
      minDate={tomorrow}
      maxDate={oneWeek}
      selected={selectedDate}
      onChange={(date) => onSelectDate(date, tomorrow, dayAfter)}
    />
  );
};

export default DatePickerComponent;
