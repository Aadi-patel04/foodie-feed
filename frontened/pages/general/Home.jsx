import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../src/styles/HomeReels.css";
import axios from "axios";

const Home = () => {
  const containerRef = useRef(null);
  const [reels, setReels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => setReels(res.data.foodItems))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!reels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (!video) return;

          entry.isIntersecting
            ? video.play().catch(() => {})
            : video.pause();
        });
      },
      { threshold: 0.7 }
    );

    const sections = containerRef.current.querySelectorAll(".reel");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [reels]);

  return (
    <div className="reels-container" ref={containerRef}>
      {reels.map((reel) => (
        <section className="reel" key={reel._id}>
          <video
            src={reel.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="reel-video"
          />

          <div className="reel-gradient" />

          <div className="reel-overlay bottom">
            <p>{reel.description}</p>
            <Link to={`/food-partner/${reel.foodPartner}`} className="reel-button">
              Visit Store
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
