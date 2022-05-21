import axios from 'axios'
import { useState } from 'react'

const CHUNK_SIZE = 6000000
const CLOUDINARY_UPLOAD_PRESET = 'memeboard'
const CLOUDINARY_UPLOAD_API =
  'https://api.cloudinary.com/v1_1/pmsantos/auto/upload'

export default function useUpload() {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = async (file) => {
    let resource

    setProcessing(true)
    setProgress(0)

    if (file.size < CHUNK_SIZE) {
      resource = await sendOnce(file)
    } else {
      resource = await sendInChunks(file)
    }

    const { url, audio } = resource.data

    const media = await axios.post('/api/media', {
      type: resource.data.resource_type,
      url: resource.data.secure_url,
      width: resource.data.width,
      height: resource.data.height,
      duration: resource.data.duration,
      has_audio: audio && Object.keys(audio).length !== 0,
      poster:
        resource.data.resource_type === 'video'
          ? `${url.substr(0, url.lastIndexOf('.'))}.jpg`
          : null,
    })

    setProcessing(false)
    setProgress(100)

    return media.data.data
  }

  const sendRequest = async (file, options = {}) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    return axios.post(CLOUDINARY_UPLOAD_API, formData, options)
  }

  const sendOnce = async (file) => {
    return sendRequest(file, {
      onUploadProgress: ({ loaded, total }) =>
        setProgress(Math.round((loaded * 100) / total)),
    })
  }

  const sendInChunks = async (file) => {
    const uniqueUploadId = +new Date()

    for (let start = 0; start < file.size; start += CHUNK_SIZE) {
      let end = start + CHUNK_SIZE <= file.size ? start + CHUNK_SIZE : file.size

      const headers = {
        'X-Unique-Upload-Id': uniqueUploadId,
        'Content-Range': `bytes ${start}-${end - 1}/${file.size}`,
      }

      const response = await sendRequest(file.slice(start, end), { headers })

      setProgress(Math.round((end * 100) / file.size))

      if (end === file.size) {
        return response
      }
    }
  }

  return {
    upload,
    processing,
    progress,
  }
}
