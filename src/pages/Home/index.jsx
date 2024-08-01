import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./home.scss";

const HomePage = () => {
  const [ip, setIp] = useState("");
  const [ipInfo, setIpInfo] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    handleFetchIpInfo();
  };

  const handleFetchIpInfo = async () => {
    await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_gj4fDbZxydeZYTYJpcwzKCjdK537H&ipAddress=${ip}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((res) => setIpInfo([...ipInfo, res]));
  };

  return (
    <div className="home-page">
      <form className="ip-search" onSubmit={handleSearch}>
        <p className="title">آی پی مد نظر خود را پیدا کنید</p>
        <p className="description">
          اگر بتوانید آدرس IPv4 یا IPv6 یک کاربر اینترنت را بیابید، می توانید با
          استفاده از ابزار جستجوی IP ما، ایده ای از آن کشور یا جهان پیدا کنید.
          چه باید کرد: آدرس IP مورد نظر خود را در کادر زیر وارد کنید، سپس روی
          "دریافت جزئیات IP" کلیک کنید.
        </p>
        <div className="search-wrapper">
          <img className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="جستجو"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
          />
          <button
            className="search-button"
            type="submit"
            title="دریافت جزئیات IP"
          >
            search icon
          </button>
        </div>
      </form>
      {ipInfo.length ? (
        <div className="result-wrapper">
          {ipInfo.map((info) => (
            <div className="result-card">
              <span className="result-info">
                <p className="result-info-title">Ip Address:</p>
                <p className="result-info-value">{info?.ip}</p>
              </span>
              <span className="result-info">
                <p className="result-info-title">Country:</p>
                <p className="result-info-value">{info?.location?.country}</p>
              </span>
              <span className="result-info">
                <p className="result-info-title">Region:</p>
                <p className="result-info-value">{info?.location?.region}</p>
              </span>
              <span className="result-info">
                <p className="result-info-title">City:</p>
                <p className="result-info-value">{info?.location?.city}</p>
              </span>
              <span className="result-info">
                <p className="result-info-title">Latitude:</p>
                <p className="result-info-value">{info?.location?.lat}</p>
              </span>
              <span className="result-info">
                <p className="result-info-title">Longitude:</p>
                <p className="result-info-value">{info?.location?.lng}</p>
              </span>
              <div className="result-map">
                <MapContainer
                  center={[info?.location?.lat, info?.location?.lng]}
                  zoom={12}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </MapContainer>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
