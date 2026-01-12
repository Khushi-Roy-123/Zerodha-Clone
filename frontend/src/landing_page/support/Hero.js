import React from "react";

function Hero() {
  return (
      <div id="supportHero">
        <div className="p-5 " id="supportWrapper">
          <h4>Support Portal</h4>
          <a href="">Track Tickets</a>
        </div>
        <div className="row p-5 m-3">
          <div className="col-6 p-3">
            <h1 className="fs-3">
              Search for an answer or browse help topics to create a ticket
            </h1>
            <input
              placeholder="Eg. how do I activate F&O"
              style={{
                width: "90%",
                padding: "15px 20px",
                border: "none",
                borderRadius: "5px",
                marginTop: "20px",
                marginBottom: "20px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                fontSize: "1rem"
              }}
            />
            <br />
          <a href="">Track account opening</a>
          <a href="">Track segment activation</a>
          <a href="">Intraday margins</a>
          <a href="">Kite user manual</a>
        </div>
        <div className="col-6 p-3">
          <h1 className="fs-3">Featured</h1>
          <ol>
            <li>
              <a href="">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Hero;
