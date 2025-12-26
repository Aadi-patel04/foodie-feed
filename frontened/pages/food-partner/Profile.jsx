import React, { useState, useEffect } from "react";
import "../../src/styles/Profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner.foodItems || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  
  return (
    <div className="ig-profile">
      {/* ================= PROFILE HEADER ================= */}
      <div className="ig-profile-header">
        {/* LEFT: AVATAR */}
        <div className="ig-avatar">
          <img
            src={
              profile?.avatarUrl ||
              "https://images.unsplash.com/photo-1609446605707-fb3732c2dbdc?w=600&auto=format&fit=crop&q=60"
            }
            alt={profile?.name || "Profile"}
          />
        </div>


        {/* RIGHT: DETAILS */}
        <div className="ig-details">
          <div className="ig-name-row">
            <h2>{loading ? "Loading..." : profile?.name || "Unknown"}</h2>
          </div>

          <p className="ig-address">
            {profile?.address || "Address not available"}
          </p>

          <p className="ig-bio">
            {profile?.bio || "No description provided."}
          </p>

          {/* STATS */}
          <div className="ig-stats">
            <div>
              <span className="label"> Total Meals</span>
              <strong>{profile?.totalMeals ?? videos.length}</strong>
            </div>
            <div>
              <span className="label">Customer served</span>
              <strong>{profile?.customersServed ?? "15K"}</strong>
            </div>
            <div>
              <span className="label">Rating</span>
              <strong>{profile?.rating ?? "—"}</strong>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="ig-actions">
            <button
              className={`ig-btn ${followed ? "secondary" : "primary"}`}
              onClick={() => setFollowed((f) => !f)}
            >
              {followed ? "Following" : "Follow"}
            </button>
            <button className="ig-btn secondary">Contact</button>
          </div>
        </div>
      </div>

      {/* ================= VIDEOS ================= */}
      <div className="ig-grid">
        {loading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <div className="ig-tile skeleton" key={i} />
          ))
        ) : videos.length === 0 ? (
          <p className="no-videos">No posts yet</p>
        ) : (
          videos.map((v) => (
            <div className="ig-tile" key={v._id}>
              <video
                src={v.video}
                muted
                loop
                playsInline
                preload="metadata"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
