import mongoose from 'mongoose'
import gridfsStream from 'gridfs-stream'

let gfs

export function initGridFS(conn) {
  gfs = gridfsStream(conn.db, mongoose.mongo)
  gfs.collection('uploads') // Set collection name to 'uploads'
  console.log('GridFS connection established')
}

export { gfs } // Export gfs to use it in other modules
