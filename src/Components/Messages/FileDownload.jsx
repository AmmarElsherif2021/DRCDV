// eslint-disable-next-line react/prop-types
const FileDownload = ({ filename }) => {
  const handleClick = () => {
    window.open(`/files/${filename}`, '_blank')
  }

  return <button onClick={handleClick}>Download</button>
}

export default FileDownload
