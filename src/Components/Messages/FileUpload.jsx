import { useState } from 'react'

const FileUpload = () => {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const { file } = await response.json()

          console.log('File ID:', file._id)
          setMessage('File uploaded successfully')
        } else {
          setMessage('File upload failed')
        }
      } catch (error) {
        setMessage('Error uploading file: ' + error.message)
      }
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  )
}

export default FileUpload
