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
      .then((res) =>
        setReels(
          (res.data.foodItems || []).map((r) => ({
            ...r,
            likes: r.likes || 0,
            saves: r.saves || 0,
            comments: r.comments || 0,
            liked: false,
            saved: false,
            
          }))
        )
      )
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

  const toggleLike = (id) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r._id !== id) return r;
        const liked = !r.liked;
        return { ...r, liked, likes: liked ? (r.likes || 0) + 1 : Math.max((r.likes || 1) - 1, 0) };
      })
    );
  };

  const toggleSave = (id) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r._id !== id) return r;
        const saved = !r.saved;
        return { ...r, saved, saves: saved ? (r.saves || 0) + 1 : Math.max((r.saves || 1) - 1, 0) };
      })
    );
  };

  const addComment = (id) => {
    setReels((prev) =>
      prev.map((r) => (r._id !== id ? r : { ...r, comments: (r.comments || 0) + 1 }))
    );
  };

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
            <p className="reel-description">{reel.description}</p>
            <Link to={`/food-partner/${reel.foodPartner}`} className="reel-button">
              visit store
            </Link>
          </div>

          <div className="action-bar">
            <button
              className={"action-button" + (reel.liked ? " liked" : "")}
              aria-label="likes"
              onClick={() => toggleLike(reel._id)}
            >
              <svg viewBox="0 0 24 24" fill={reel.liked ? "#f43f5e" : "none"} xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7-4.35-9-7.1C-0.18 9.84 3 4 7.5 6.5 9.6 7.8 12 10 12 10s2.4-2.2 4.5-3.5C21 4 24.18 9.84 21 13.9 19 16.65 12 21 12 21z" stroke={reel.liked ? "#f43f5e" : "#fff"} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className="action-count">{reel.likes || 0}</div>
            </button>

            <button
              className={"action-button" + (reel.saved ? " saved" : "")}
              aria-label="save"
              onClick={() => toggleSave(reel._id)}
            >
              <svg viewBox="0 0 24 24" fill={reel.saved ? "#fff" : "none"} xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v20l-6-4-6 4V2z" stroke={reel.saved ? "#fff" : "#fff"} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className="action-count">{reel.saves || 0}</div>
            </button>

            <button className="action-button" aria-label="comments" onClick={() => addComment(reel._id)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className="action-count">{reel.comments || 0}</div>
            </button>
          </div>
        </section>
      ))}

      <nav className="bottom-nav" role="navigation">
        <Link to="/" className="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>home</span>
        </Link>

        <Link to="/saved" className="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v20l-6-4-6 4V2z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>saved</span>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
