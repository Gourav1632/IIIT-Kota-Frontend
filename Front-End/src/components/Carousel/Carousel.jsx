import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import EventCard from "./EventCard/EventCard";
import "./Carousel.css"
import EventPopUp from "./EventPopUp/EventPopUp";

function Carousel() {
  const [events, setEvents] = useState([]);
  const [selectedEvent,setSelectedEvent] = useState(null)
  const [isDragging, setIsDragging] = useState(false);
  
  // Fetching events info
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get("https://webteam-assignments.onrender.com/events");
        setEvents(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
  }, []);

  const handleEventClick = (event)=>{
    if (!isDragging) {
      setSelectedEvent(event);
    }
  }
  const closeModal = () => {
    setSelectedEvent(null);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover : true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    // To not open the popup while dragging
    beforeChange: () => setIsDragging(true), 
    afterChange: () => setIsDragging(false), 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="carousel">
    <div className="slider-container">
      <div className="title">Events</div>
      <Slider {...settings}>
      {events.map((event, index) => (
        <div onClick={()=> handleEventClick(event)} className="event">
          <EventCard key={index} img={event.imageurl} date={event.date} title={event.title} />
        </div>
        ))}
      </Slider>
    </div>
    {selectedEvent && <EventPopUp event={selectedEvent} onClose={closeModal} />}
    </div>
  );
}

export default Carousel;
