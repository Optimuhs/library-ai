import { HistoryDisplay } from "./HistoryDisplay";

export const Profile = () => {
  return (
    <div>
      {/* heading */}
      <div>
        <h2>Student Name</h2> <h3>Student ID</h3>
        <div>
          <ul>
            <li>Grade</li>
            <li>Items Overdue</li>
            <li>Items Out</li>
            <li>Reservations Pending</li>
            <li>Responsible Party</li>
          </ul>
        </div>
      </div>

      {/* Books Display */}
      <h3>User Rental History</h3>
      <HistoryDisplay />
    </div>
  );
};
