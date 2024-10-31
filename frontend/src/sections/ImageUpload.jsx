import { useState, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Draggable from 'react-draggable'
import 'react-resizable/css/styles.css'

export const ImageUpload = ({ onImageSelect, previewUrl }) => {
  const [preview, setPreview] = useState(previewUrl)
  const [showModal, setShowModal] = useState(false)
  const [bounds, setBounds] = useState({ top: 0, left: 0, bottom: 0, right: 0 })
  const imageRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageSelect(file)
      }
      reader.readAsDataURL(file)
      setShowModal(true)
    }
  }

  const handleModalClose = () => setShowModal(false)

  const handleDragStart = (e, data) => {
    const img = imageRef.current
    if (img) {
      const rect = img.getBoundingClientRect()
      const frame = document
        .getElementById('image-frame')
        .getBoundingClientRect()
      setBounds({
        left: -(rect.width - frame.width),
        top: -(rect.height - frame.height),
        right: 0,
        bottom: 0,
      })
    }
  }

  return (
    <div className='text-center mb-3'>
      {preview && (
        <>
          <img
            src={preview}
            className='mb-3'
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
            alt='Profile'
          />
          <Modal show={showModal} onHide={handleModalClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Adjust Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                id='image-frame'
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  margin: '0 auto',
                  border: '2px solid #ddd',
                }}
              >
                <Draggable bounds={bounds} onStart={handleDragStart}>
                  <img
                    ref={imageRef}
                    src={preview}
                    style={{
                      cursor: 'move',
                      width: 'auto',
                      height: '200%',
                      position: 'relative',
                    }}
                    alt='Profile Preview'
                  />
                </Draggable>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleModalClose}>
                Done
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      <Form.Group controlId='profileImage'>
        <Form.Label className='btn btn-outline-secondary'>
          {preview ? 'Change Profile Picture' : 'Upload Profile Picture'}
          <Form.Control
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </Form.Label>
      </Form.Group>
    </div>
  )
}

export default ImageUpload
