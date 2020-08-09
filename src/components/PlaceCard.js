import React from "react";
//import { Rate } from "antd";

const PlaceCard = ({ info }) => {
  const {
    address,
    distanceText,
    name,
    openNow,
    photoUrl,
    price_level,
    rating,
    timeText,
  } = info;
  return (
    <div className="col-3 w-100 mx-4 my-4">
      <img
        src={photoUrl}
        className="image-wrapper-sm mb-2"
        alt="Boba Places"
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          height: "15rem",
          width: "100%",
        }}
      />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <span className="d-block mb-1">{address}</span>
          <span className="d-block">{distanceText}</span>
          <span className="d-block">{timeText}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
