import { RentalBookComp } from "./RentalBookComp";

export const RentalDisplay = () => {
  return (
    <div>
      {/* Rentals History */}
      <div>
        <h4>Previous Book Rentals</h4>
        <div>
          <RentalBookComp />
        </div>
      </div>
    </div>
  );
};
