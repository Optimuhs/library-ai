import { RentalDisplay } from "./RentalDisplay";
import { ReservationDisplay } from "./ReservationDisplay";

export const HistoryDisplay = () => {
  return (
    <div>
      {/* Display Book History */}
      {/* Past Rentals */}

      <RentalDisplay />
      {/* Past Reservations */}
      <ReservationDisplay />
    </div>
  );
};
