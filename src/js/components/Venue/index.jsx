import { useState } from "react";
import { useGoBack } from "../../hooks/tools/useGoBack";
import { openBooking } from "../../hooks/bookingModal";
import { getItem } from "../../localStorage/getItem";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/service/api";
import { venues } from "../../helpers/constant";
import { useDispatch, useSelector } from "react-redux";
import { convertDate } from "../../helpers/convertDate";

import SliderComponent from "../Slider";
import LocationComponent from "../Location";
import ProfileCard from "./../Card/Profile";
import EditForm from "../EditForm";
import BookingModal from "../Booking/Modal";
import BookingDate from "../BookingDate";

import StarIcon from "../../../assets/interface/icons8-star-32.png";
import WifiIcon from "../../../assets/interface/meta/icons8-wifi-64.png";
import BreakfastIcon from "../../../assets/interface/meta/icons8-breakfast-64.png";
import ParkingIcon from "../../../assets/interface/meta/icons8-parking-64.png";
import PetsIcon from "../../../assets/interface/meta/icons8-pets-64.png";
import { openLoginModal } from "../../hooks/loginModal";

function Venue({ venueData }) {
  const isModalOpen = useSelector((state) => state.booking?.isOpen);
  const isLoggedIn = useSelector((state) => state.userAuth?.isLoggedIn);

  const dispatch = useDispatch();
  const goBack = useGoBack();
  const date = convertDate(venueData.updated);
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  const { apiData } = useApi(venues + id);
  const user = getItem("user");

  function deleteVenue() {
    const method = "DELETE";
    apiData(null, method);
    goBack();
  }

  function handleShowForm() {
    setShowForm(true);
  }

  if (showForm) {
    return <EditForm setShowForm={setShowForm} venueData={venueData} />;
  }

  return (
    <>
      {isModalOpen && <BookingModal open={isModalOpen} venueId={venueData.id} venueGuests={venueData.maxGuests} bookingsArray={venueData.bookings} />}
      <section className="pt-60 pb-20 w-3.5/7 mx-auto xl:w-desktop text-xl md-sm:text-2xl">
        <div className="mb-4 hover:underline hover:cursor-pointer" onClick={goBack}>
          Back
        </div>
        <SliderComponent images={venueData.media} name={venueData.name} />
        <div className="flex items-center justify-between mt-2">
          <h2 className="mb-2 font-semibold sm:truncate">{venueData.name}</h2>
          <span className="flex items-center gap-1">
            <figure className="w-7">
              <img src={StarIcon} alt="star" />
            </figure>
            <p>3.5</p>
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <LocationComponent location={venueData.location} id={venueData.id} />
          <p>Published: {date}</p>
          <p>Max guests: {venueData.maxGuests}</p>
          <div className="flex justify-end gap-4">
            {venueData.meta.wifi && (
              <figure className="w-10 md-sm:w-12">
                <img src={WifiIcon} alt="wifi" />
              </figure>
            )}
            {venueData.meta.pets && (
              <figure className="w-10 md-sm:w-12">
                <img src={PetsIcon} alt="pets" />
              </figure>
            )}
            {venueData.meta.parking && (
              <figure className="w-10 md-sm:w-12">
                <img src={ParkingIcon} alt="parking" />
              </figure>
            )}
            {venueData.meta.breakfast && (
              <figure className="w-10 md-sm:w-12">
                <img src={BreakfastIcon} alt="breakfast" />
              </figure>
            )}
          </div>
          <p className="pt-2 border-t border-gray">{venueData.description}</p>

          <section className="fixed inset-x-0 p-6 border bottom-[7.5rem] border-light-gray bg-white z-50 md:bottom-0">
            <div className="flex items-center justify-between mx-auto w-4/7 xl:w-desktop">
              <div className="flex flex-wrap gap-4">
                <h3 className="font-semibold">{venueData.price} kr</h3>
                <p>night</p>
              </div>
              <div>
                {isLoggedIn ? (
                  <button onClick={() => dispatch(openBooking())} className="px-4 py-2 font-medium text-white shadow-3xl rounded-xl bg-ocean hover:bg-opacity-90">
                    Book venue
                  </button>
                ) : (
                  <button onClick={() => dispatch(openLoginModal())} className="px-4 py-2 font-medium text-white shadow-3xl rounded-xl bg-ocean hover:bg-opacity-90">
                    Book venue
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="w-full mt-20">
            <ProfileCard owner={venueData.owner} />
          </section>
          {user.name === venueData.owner.name && (
            <section>
              <div className="flex gap-4 mt-2">
                <button className="flex-1 p-2 border rounded-lg bg-error hover:cursor-pointer" type="button" onClick={deleteVenue}>
                  Delete
                </button>
                <button onClick={handleShowForm} className="flex-1 p-2 border rounded-lg bg-success hover:cursor-pointer" type="button">
                  Edit
                </button>
              </div>
              <h2 className="mt-5 mb-5 text-3xl font-medium text-center">Bookings</h2>
              {venueData.bookings.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {venueData.bookings.map((booking, index) => (
                    <div className="flex flex-col items-center justify-between min-h-[8rem] gap-2 px-4 py-2 rounded-xl shadow-3xl" key={index}>
                      <p>Guests - {booking.guests}</p>
                      <div className="flex gap-4">
                        <p>Period:</p>
                        <BookingDate dateFrom={booking.dateFrom} dateTo={booking.dateTo} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">You currently have no bookings for this venue</p>
              )}
            </section>
          )}
        </div>
      </section>
    </>
  );
}

export default Venue;
