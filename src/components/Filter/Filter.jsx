import { useState, useEffect, useCallback } from "react";

import {
  Switch,
  Box,
  Stack,
  Radio,
  RadioGroup,
  Text,
  Flex,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
} from "@chakra-ui/react";
import "./Filter.css";
import { UserAuth } from "../../context/AuthContext";

export default function Filter({ findFilter, setFindFilter, onClose, isOpen }) {
  const [value, setValue] = useState("everything");
  const { user } = UserAuth();

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setFindFilter((prev) => ({ ...prev, type: value }));
  }, [value]);

  const handleIsLost = useCallback(() => {
    setFindFilter((prev) => ({
      ...prev,
      islost: !prev.islost,
    }));
  }, []);

  const handleIsFound = useCallback(() => {
    setFindFilter((prev) => ({
      ...prev,
      isFound: !prev.isFound,
    }))
  }, [])

  const handleIsShowReturned = useCallback(() => {
    setFindFilter((prev) => ({
      ...prev,
      isShowReturned: !prev.isShowReturned,
    }));
  }, [])

  const handleIsYourPosts = useCallback(() => {
    setFindFilter((prev) => ({
      ...prev,
      isYourPosts: !prev.isYourPosts,
    }));
  }, [])

  const handleUploadDate = useCallback((e) => {
    setFindFilter((prev) => ({
      ...prev,
      uploadDate: e.target.value,
    }));
  })
  
  const handleCancel = useCallback(() => {
    setFindFilter({
      type: "everything",
      isFound: true,
      islost: true,
      uploadDate: "",
      isYourPosts: false,
      isShowReturned: true,
    });
    onClose();
  }, [])
  
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader fontSize="4xl">Filter Markers</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" p="10px" pt="0">
              <form>
                <Flex mb="15px">
                  <Switch
                    colorScheme="red"
                    size="lg"
                    defaultChecked={findFilter.islost}
                    onChange={handleIsLost}
                  />
                  <Text mb="0px" ml="50px" fontSize="xl">
                    Lost
                  </Text>
                </Flex>

                <Flex mb="20px">
                  <Switch
                    colorScheme="green"
                    size="lg"
                    onChange={handleIsFound}
                    defaultChecked={findFilter.isFound}
                  />
                  <Text mb="0px" ml="50px" fontSize="xl">
                    Found
                  </Text>
                </Flex>
                <Flex mb="20px">
                  <Switch
                    colorScheme="yellow"
                    size="lg"
                    onChange={handleIsShowReturned}
                    defaultChecked={findFilter.isShowReturned}
                  />
                  <Text mb="0px" ml="50px" fontSize="xl">
                    Returned
                  </Text>
                </Flex>

                <Flex mb="15px">
                  <Switch
                    colorScheme="blue"
                    size="lg"
                    defaultChecked={findFilter.isYourPosts}
                    isDisabled={!user}
                    onChange={handleIsYourPosts}
                  />
                  <Text
                    mb="0px"
                    ml="50px"
                    fontSize="xl"
                    color={!user && "gray"}
                  >
                    Your Posts
                  </Text>
                </Flex>

                <Text fontSize="xl" fontWeight="bold" mb="15px">
                  Select Specific Item:
                </Text>
                <Box>
                  <RadioGroup onChange={setValue} value={value}>
                    <Stack>
                      <Radio
                        defaultChecked
                        size="lg"
                        value="everything"
                        className="text--spacing"
                      >
                        Everything
                      </Radio>
                      <Radio
                        size="lg"
                        value="headphone"
                        className="text--spacing"
                      >
                        Headphones
                      </Radio>
                      <Radio size="lg" value="wallet" className="text--spacing">
                        Wallet
                      </Radio>
                      <Radio size="lg" value="key" className="text--spacing">
                        Keys
                      </Radio>
                      <Radio size="lg" value="phone" className="text--spacing">
                        Phone
                      </Radio>
                      <Radio size="lg" value="others" className="text--spacing">
                        Others
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Text fontSize="xl" fontWeight="bold" mt="15px">
                  Found/Lost Date:
                </Text>
                <Input
                  onChange={handleUploadDate}
                  mt="10px"
                  type="date"
                  value={findFilter.uploadDate}
                />
              </form>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
