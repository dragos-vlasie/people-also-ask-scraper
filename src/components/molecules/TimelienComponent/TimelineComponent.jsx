import React, { useEffect } from "react";
import $ from "jquery";
import Image from "next/image";
import Barcelona from "../../../../public/images/Undedede2018-Barcelona.jpg";
import Porto from "../../../../public/images/Undedede2019-Porto.jpg";
import Seville from "../../../../public/images/Undedede2020-Seville.jpg";
import Bran from "../../../../public/images/Undedede2021-Bran.jpg";
// import Jordan from "../../../../public/images/Undedede2022-2-Jordan.jpg";
import Tenerife from "../../../../public/images/Undedede2022-Tenerife.jpg";
import Cluj from "../../../../public/images/Undedede2023-Cluj.jpg";
// import Japan from "../../../../public/images/Undedede2023-2-Japan.jpg";
import Japan from "../../../../public/images/h.png";
import Jordan from "../../../../public/images/z.jpg";
import { attributes, react as HomeContent } from '../../../../content/home.md'


const timeline = [
  {
    image: Cluj,
    year: "April 2023",
    title: "Roaring Twenties",
    text: "Lorem ipsum dolor site amet, consectetur adipscing elit, sed do eisumod tempor incididut ut labore et dolore magna aliqua. Ut enim ad mimim venjam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: Japan,
    year: "May 2023",
    title: "Japan",
    text: "Lorem ipsum dolor site amet, consectetur adipscing elit, sed do eisumod tempor incididut ut labore et dolore magna aliqua. Ut enim ad mimim venjam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: Jordan,
    year: "October 2022",
    title: "Jordan",
    text: "Lorem ipsum dolor site amet, consectetur adipscing elit, sed do eisumod tempor incididut ut labore et dolore magna aliqua. Ut enim ad mimim venjam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: Tenerife,
    year: "May 2022",
    title: "Tenerife",
    text: "Lorem ipsum dolor site amet, consectetur adipscing elit, sed do eisumod tempor incididut ut labore et dolore magna aliqua. Ut enim ad mimim venjam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: Bran,
    year: "January 2021",
    title: "Bran",
    text: "Lorem ipsum dolor site amet, consectetur adipscing elit, sed do eisumod tempor incididut ut labore et dolore magna aliqua. Ut enim ad mimim venjam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: Seville,
    year: "January 2020",
    title: "Seville",
    text: "Lorem ipsum dolor site amet, consectetur adipscing elit, sed do eisumod tempor incididut ut labore et dolore magna aliqua. Ut enim ad mimim venjam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: Porto,
    year: "May 2019",
    title: "Porto",
    text: "Lorem ipsum dolor site amet, consectetur adipscing elit, sed do eisumod tempor incididut ut labore et dolore magna aliqua. Ut enim ad mimim venjam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: Barcelona,
    year: "January 2018",
    title: "Barcelona",
    text: "Lorem ipsum dolor site amet, consectetur adipscing elit, sed do eisumod tempor incididut ut labore et dolore magna aliqua. Ut enim ad mimim venjam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

function TimeLineComponent(props) {


  function operateTimeline() {
    var timelineSwiper = new Swiper(".timeline .swiper-container", {
      direction: "vertical",
      speed: 1300,
      pagination: ".swiper-pagination",
      paginationBulletRender: function (swiper, index, className) {
        var year = document.querySelectorAll(".swiper-slide")[index].getAttribute("data-year");
        return '<span class="' + className + '">' + year + "</span>";
      },
      paginationClickable: true,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      breakpoints: {
        670: {
          direction: "horizontal",
        },
      },
    });
  }

  useEffect(() => {
    $(window).on("load resize", operateTimeline);
    operateTimeline();
    return () => {
      $(window).off("load resize");
    };
  }, []);

  return (
    <div className="timeline-container">
      <div className="timeline">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {attributes.timeline.map((trip) => (
              <div key={trip.title} className="swiper-slide" data-year={trip.year}>
                <div className="swiper-image">
                  <img src={trip.image} alt={trip.imageAlt} />
                </div>
                <div className="swiper-slide-content">
                  <span className="timeline-year">{trip.year}</span>
                  <h4 className="timeline-title">{trip.title}</h4>
                  <p className="timeline-text">{trip.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default TimeLineComponent;
