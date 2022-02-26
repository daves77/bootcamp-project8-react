import React from 'react'
import {Box} from '@mui/system'
import {useDropzone} from 'react-dropzone'


export default function Dropzone() {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone()

  return (
    <Box>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag n drop</p>
      </div>
    </Box>
  )
}