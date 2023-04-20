import { Link } from "react-router-dom";
import { useGet } from "../../hooks/service/get";
import { venues } from "../../helpers/constant";

import StarIcon from "../../../assets/interface/icons8-star-32.png";

import ImageCollage from "./ImageCollage/index.jsx";

function Venues() {
  const { data, isLoading, isError } = useGet(venues);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
console.log(data);

  return (
    <section className="grid grid-rows-1 gap-8 my-8 auto-rows-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((venue) => {
        return (
          <Link to={`/venue/${venue.id}`} key={venue.id} className="p-4 hover:bg-stone-200 rounded-xl hover:shadow-md">
            <ImageCollage images={venue.media[0]} name={venue.name} />
              <div className="flex items-center justify-between mt-2">
                <h2 className="font-semibold sm:truncate">{venue.name}</h2>
                <span className="flex items-center gap-1">
                  <figure className="w-7">
                  <img  src={StarIcon} alt="star" />
                  </figure>
                  <p>3.5</p>
                </span>
              </div>

              <div className="flex flex-col gap-1">
              <p>location</p>
              <p className="flex-grow">{venue.updated}</p>
              <div className="flex gap-4">
                <h3 className="font-semibold">{venue.price} kr</h3>
                <p>night</p>
              </div>
              </div>
          </Link>
        );
      })}
    </section>
  );
}

export default Venues;