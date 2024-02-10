import { useState, useEffect } from "react";
import { Flex, Text, Input, Button, Link, IconButton } from "@chakra-ui/react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface FileInputProps {
  onFilesSelected: (files: File[]) => void;
  onFilesSubmit: () => void;
}

interface SelectedFile {
  file: File;
  firstPageImage: string | null;
}

const FileInput: React.FC<FileInputProps> = ({
  onFilesSelected,
  onFilesSubmit,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  useEffect(() => {
    const loadPDFPages = async (file: File) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        const firstPage = await pdf.getPage(1);
        const viewport = firstPage.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await firstPage.render({
          canvasContext,
          viewport,
        }).promise;

        const image = canvas.toDataURL("image/png");

        const updatedFiles = selectedFiles.map((fileObj) => {
          if (fileObj.file === file) {
            return { ...fileObj, firstPageImage: image };
          }
          return fileObj;
        });

        setSelectedFiles(updatedFiles);
      };
      reader.readAsArrayBuffer(file);
    };

    selectedFiles.forEach((fileObj) => {
      if (fileObj.file.type === "application/pdf" && !fileObj.firstPageImage) {
        loadPDFPages(fileObj.file);
      }
    });
  }, [selectedFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const newFiles = Array.from(fileList);
      setSelectedFiles((prevFiles) => {
        const updatedFiles: SelectedFile[] = newFiles.map((file) => ({
          file,
          firstPageImage: file.type === "application/pdf" ? null : "",
        }));
        const allFiles = [...prevFiles, ...updatedFiles];
        onFilesSelected(allFiles.map(fileObj => fileObj.file));
        return allFiles;
      });
    }
  };
  const removeFile = (file: File) => {
    const updatedFiles = selectedFiles.filter((fileObj) => fileObj.file !== file);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles.map(fileObj => fileObj.file));
  };

  const handleFilesSubmit = () => {
    onFilesSubmit();
  };

  return (
    <Flex alignItems="flex-start" flexDirection="column">
      <Input
        type="file"
        display="none"
        onChange={handleFileChange}
        id="file-upload"
        multiple
      />
      <label htmlFor="file-upload">
        <Button as="span" colorScheme="blue" size="sm" mb={2}>
          Choisir un fichier
        </Button>
      </label>
      {selectedFiles.length > 0 && (
        <Flex alignItems="flex-start" flexDirection="column">
          <Text>Fichiers sélectionnés:</Text>
          {selectedFiles.map((fileObj, index) => (
            <Flex key={index} alignItems="center" mt={2}>
              <IconButton
                icon={<FaTimes />}
                size="xs"
                colorScheme="red"
                aria-label="Supprimer le fichier"
                onClick={() => removeFile(fileObj.file)}
                mr={2}
              />
              {fileObj.file.type === "application/pdf" && fileObj.firstPageImage && (
                <img
                  src={fileObj.firstPageImage}
                  alt={fileObj.file.name}
                  style={{ width: "48px", height: "48px", marginRight: "8px" }}
                />
              )}
              <Link
                href={URL.createObjectURL(fileObj.file)}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="sm"
                color="blue.500"
              >
                {fileObj.file.name}
              </Link>
            </Flex>
          ))}
          <Button
            colorScheme="green"
            size="sm"
            leftIcon={<FaPaperPlane />}
            mt={2}
            onClick={handleFilesSubmit}
          >
            Envoyer les fichiers
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default FileInput;
