import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const Editor: React.FC = () => {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    const uploadFile = async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data.url; // Return the URL of the uploaded file
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    };

    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.getModule('toolbar').addHandler('image', () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            const range = quill.getSelection();
            const url = await uploadFile(file);
            quill.insertEmbed(range.index, 'image', url);
            quill.setSelection(range.index + 1, 0);
          }
        };
        input.click();
      });
    }
  }, []);

  return <ReactQuill ref={quillRef} />;
};

export default Editor;
