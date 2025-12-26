import React, { useState } from 'react'
import '../../src/styles/CreateFood.css'

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) setVideoFile(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Submitting:\nName: ${name}\nDescription: ${description}\nVideo: ${videoFile?.name || 'none'}`)
  }

  return (
    <div className="create-food-root">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <h1 className="cf-title">Create Meal Video</h1>

        <label className="cf-label" htmlFor="video">Video</label>
        <input
          id="video"
          className="cf-input cf-file"
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
        />

        {videoFile && (
          <div className="cf-preview">
            <video src={URL.createObjectURL(videoFile)} controls width="100%" />
            <div className="cf-preview-meta">{videoFile.name}</div>
          </div>
        )}

        <label className="cf-label" htmlFor="name">Name</label>
        <input
          id="name"
          className="cf-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Butter Chicken Bowl"
          required
        />

        <label className="cf-label" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="cf-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description about the meal..."
          rows={4}
        />

        <div className="cf-actions">
          <button type="submit" className="btn primary cf-submit">Upload</button>
          <button
            type="button"
            className="btn ghost cf-cancel"
            onClick={() => { setVideoFile(null); setName(''); setDescription('') }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateFood
