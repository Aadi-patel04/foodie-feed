import React, { useState, useRef } from 'react'
import '../../src/styles/CreateFood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MAX_SIZE_BYTES = 100 * 1024 * 1024 // 100MB

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileRef = useRef(null)

  const navigate = useNavigate()

  const handleVideoChange = (e) => {
    setError('')
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_SIZE_BYTES) {
      setError('File too large. Max 100MB allowed.')
      return
    }
    setVideoFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    if (file.size > MAX_SIZE_BYTES) {
      setError('File too large. Max 100MB allowed.')
      return
    }
    setVideoFile(file)
  }

  const clearForm = () => {
    setVideoFile(null)
    setName('')
    setDescription('')
    setError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const  handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('video', videoFile)

    const response = await axios.post('http://localhost:3000/api/food', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Upload response:', response.data)

    if (!videoFile) {
      setError('Please select a video to upload.')
      return
    }
    // placeholder: wire to upload API
    clearForm()
    navigate("/");
  }

  return (
    <div className="create-food-root">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <h1 className="cf-title">Create Meal Video</h1>

        <div className="cf-field">
          <label className="cf-label">Video</label>
          <div
            className={`cf-filebox ${dragActive ? 'drag-active' : ''} ${videoFile ? 'has-file' : 'empty'}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileRef}
              id="video"
              className="cf-input-file"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
            <div className="cf-filebox-inner">
              <div className="cf-file-icon" aria-hidden>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="4" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" fill="rgba(37,99,235,0.06)"/>
                  <path d="M17 7l4-3v16l-4-3" fill="currentColor" opacity="0.95"/>
                </svg>
              </div>
              <div className="cf-file-text">
                {videoFile ? (
                  <>
                    <div className="cf-file-name">{videoFile.name}</div>
                    <div className="cf-file-size">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</div>
                  </>
                ) : (
                  <div className="cf-file-placeholder">Tap to upload or drag and drop (max 100MB)</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {videoFile && (
          <div className="cf-preview">
            <video src={URL.createObjectURL(videoFile)} controls className="cf-video" />
            <div className="cf-preview-meta">{videoFile.name}</div>
          </div>
        )}

        <div className="cf-field">
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
        </div>

        <div className="cf-field">
          <label className="cf-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="cf-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description about the meal..."
            rows={4}
          />
        </div>

        {error && <div className="cf-error">{error}</div>}

        <div className="cf-actions">
          <button type="submit" className="btn primary cf-submit">Upload</button>
          <button type="button" className="btn ghost cf-cancel" onClick={clearForm}>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default CreateFood
