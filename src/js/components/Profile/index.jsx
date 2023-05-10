import Venues from "../Venues/index";
import { handleAvatarImgError } from "../../helpers/placeholder";
import { useGoBack } from "../../hooks/tools/useGoBack";

function UserProfile({ userData, venuesData, isLoadingVenues, isErrorVenues, setShowUserProfile, user }) {
  const goBack = useGoBack();

  function showProfile() {
    setShowUserProfile(false);
  }

  return (
    <main className="pt-72 bg-[#FDFDFD] w-3.5/7 mx-auto xl:w-desktop mb-14">
      {user.name !== userData.name ? (
        <div className="hover:underline hover:cursor-pointer" onClick={goBack}>
          Back
        </div>
      ) : (
        <div className="hover:underline hover:cursor-pointer" onClick={showProfile}>
          Back to
        </div>
      )}
      <h1 className="text-5xl font-medium mt-14">Profile</h1>
      <figure className="w-[6rem] h-[6rem] md-sm:w-[9rem] md-sm:h-[9rem] mt-14">
        <img className="object-cover w-full h-full rounded-full" src={userData.avatar} alt={userData.name} onError={handleAvatarImgError} />
      </figure>
      <div className="flex flex-col gap-1 pb-4 border-b-2 border-gray mt-14">
        <h2 className="text-3xl font-medium md-sm:text-4xl">{userData.name}</h2>
        <p>Email: {userData.email}</p>
        <p>Status: {userData.venueManager ? <span className="font-bold text-ocean">Renter</span> : <span className="font-bold text-ocean">Vacationist</span>}</p>
      </div>
      {venuesData.length < 1 ? <div className="mt-4">Currently no rented venues</div> : <Venues data={venuesData} isLoading={isLoadingVenues} isError={isErrorVenues} />}
    </main>
  );
}

export default UserProfile;