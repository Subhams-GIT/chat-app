import upload from '../Routes/upload';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { Request } from 'express';



export function UploadImge(req:Request,res:any){
    try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

   
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'my-app-uploads' },
      (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        return res.json({ public_id: result?.public_id, url: result?.secure_url });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);

  } catch (err: any) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed.' });
  }
} 
