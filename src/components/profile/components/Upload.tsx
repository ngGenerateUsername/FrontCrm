import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useRef, useState } from "react";
import { MdUpload } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { ChangeImage, fetchSingleUser } from "state/user/Users_Slice";
import { UploadFile } from "state/user/Upload_Slice";
import Dropzone from "./Dropzone";
export default function Upload(props: {
  used?: number;
  total?: number;
  [x: string]: any;
}) {
  const { used, total, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  const { status, record } = useSelector((state: any) => state.uploads);
  const dispatch = useDispatch();

  const imageupload = async () => {
    if (selectedFile == null) {
      alert("Veuillez sélectionner une image d'abord !");
    } else {
      const formData = new FormData();
      formData.append("dataFile", selectedFile);

      await dispatch(UploadFile(formData) as any)
        .unwrap()
        .then((res: any) =>
          dispatch(
            ChangeImage({
              idUser: localStorage.getItem("user"),
              image: res.file.filename,
            }) as any
          )
            .unwrap()
            .then((res: any) => 
              dispatch(fetchSingleUser(localStorage.getItem("user")) as any)
            )
        )

        .catch((error: Error) => console.log(error));
    }
  };
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  return (
    <Card {...rest} alignItems="right">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Flex
          align="center"
          justify="center"
          bg={bg}
          border="1px dashed"
          borderColor={borderColor}
          borderRadius="16px"
          w="100%"
          h="max-content"
          minH="100%"
          cursor="pointer"
          maxH={{ base: "100%", lg: "100%", "2xl": "100%" }}
          onClick={handleClick}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {selectedFile && (
            <Image
              boxSize="150px"
              objectFit="cover"
              src={URL.createObjectURL(selectedFile)}
              alt="Dan Abramov"
            />
          )}
          <Input
            hidden={true}
            type="file"
            ref={inputRef}
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileSelect}></Input>

          <Button variant="no-effects">
            <Box>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload Image
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                PNG, JPG et GIF sont autorisés
              </Text>
            </Box>
          </Button>
        </Flex>
      </Flex>
      <br></br>
      <Button variant="brand" fontWeight="500" onClick={imageupload}>
        Changer image
      </Button>
    </Card>
  );
}
