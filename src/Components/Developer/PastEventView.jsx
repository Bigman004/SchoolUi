import { useState, useEffect } from "react";
import DeveloperNav from "./DeveloperNav";
import "../Teacher/ReviewAttendancePage.css";
import { useNavigate } from "react-router-dom";

const PastEventView = () => {
  const [dateList, setDateList] = useState([]);
  const startTerm = new Date("2026-05-17");
  const endTerm = new Date("2026-05-30");
  const navigate = useNavigate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const result = [];
    let currentMonth = startTerm.getMonth();
    const endMonth = endTerm.getMonth();

    while (currentMonth <= endMonth) {
      const daysInMonth = [];

      // Fix 1: Use getFullYear() with parentheses
      let totalDays = new Date(
        startTerm.getFullYear(),
        currentMonth + 1,
        0,
      ).getDate();
      if (currentMonth === endTerm.getMonth()) {
        totalDays = endTerm.getDate();
      }

      let day = currentMonth === startTerm.getMonth() ? startTerm.getDate() : 1;

      while (day <= totalDays) {
        // Fix 2: Correct Date argument order — new Date(year, month, day)
        daysInMonth.push(new Date(startTerm.getFullYear(), currentMonth, day));
        day++;
      }

      result.push({ month: currentMonth, days: daysInMonth });
      currentMonth++;
    }

    setDateList(result);
  }, []);

  const handleClick = (date) => {
    // Fix 3: Use actual date values from the Date object
    const str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    navigate(`/review_event/${str}`);
  };

  return (
    <>
      <DeveloperNav />
      <div className="review-attendance-page">
        <h1>Review Attendance</h1>
        {dateList.map(({ month, days }, index) => {
          // Fix 4: Calculate the weekday offset for the first day in this month's slice
          const firstDayOfWeek = days[0].getDay();

          return (
            <div className="month-container" key={index}>
              <h2 className="month-label">{monthNames[month]}</h2>
              <div className="month">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div className="day-header" key={d}>
                    {d}
                  </div>
                ))}

                {/* Fix 5: Add blank spacer cells so the first day lands on the right column */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div className="day-spacer" key={`spacer-${i}`} />
                ))}

                {days.map((date, dateIndex) => (
                  <div
                    className="action-sec"
                    key={dateIndex}
                    onClick={() => handleClick(date)}
                  >
                    {/* Fix 6: Render the day number, not the Date object */}
                    {date.getDate()}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PastEventView;
