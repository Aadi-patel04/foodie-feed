import React from 'react'
import '../../src/styles/HomeReels.css'
import { Link } from 'react-router-dom'

const Saved = () => {
  return (
    <div className="reels-container" style={{background:'#000', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{color:'#fff', textAlign:'center', padding:'24px'}}>
        <h2 style={{marginBottom:8}}>Saved</h2>
        <p style={{opacity:0.85}}>You haven't saved any posts yet.</p>
        <div style={{marginTop:18}}>
          <Link to="/" style={{color:'#fff', textDecoration:'none', background:'#7a3b3b', padding:'8px 14px', borderRadius:10}}>Go to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Saved
