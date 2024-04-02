import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { UserAuth } from "../../context/AuthContext";
import DataContext from "../../context/DataContext";

import { Spinner, useToast } from "@chakra-ui/react";

import {
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Text,
  Image,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { SettingsIcon, StarIcon } from "@chakra-ui/icons";
import upload from "../../assets/images/download.png";

import logout from "../../assets/logos/logout.svg";
import subscribe from "../../assets/logos/subscribe.svg";
import unsubscribe from "../../assets/logos/unsubscribe.svg";
import userlogo from "../../assets/logos/userlogo.svg";
import yourposts from "../../assets/logos/yourposts.svg";
import cookie from "../../assets/images/cookie.svg";

import Map from "../Map/Map";
import "./Home.css";
import Filter from "../Filter/Filter";
import ResultsBar from "../ResultsBar/ResultsBar";
import CreateModal from "../CreateModal/CreateModal";
import LoginModal from "../LoginModal/LoginModal";
import Leaderboard from "./Leaderboard";
import ZotNFoundLogoText from "./ZotNFoundLogoText";
import DateRangeFilter from "./DateRangeFilter";
import ListItemButton from "./ListItemButton";

export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const { user, logOut } = UserAuth();
  const [token, setToken] = useState("");

  const [subscription, setSubscription] = useState(false);

  const btnRef = useRef();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // CREATE MODAL
  // hoisted state
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();

  const {
    isOpen: isResultsBarOpen,
    onOpen: onResultsBarOpen,
    onClose: onResultsBarClose,
  } = useDisclosure();

  const {
    isOpen: isLeaderboardOpen,
    onOpen: onLeaderboardOpen,
    onClose: onLeaderboardClose,
  } = useDisclosure();

  const [findFilter, setFindFilter] = useState({
    type: "everything",
    isFound: true,
    islost: true,
    uploadDate: "",
    isYourPosts: false,
    isShowReturned: true,
  });

  function isFilterOff() {
    return (
      findFilter.type === "everything" &&
      findFilter.isFound === true &&
      findFilter.islost === true &&
      findFilter.uploadDate === "" &&
      search === "" &&
      !findFilter.isYourPosts &&
      findFilter.isShowReturned === true
    );
  }

  const [loading, setLoading] = useState(false);

  const [newAddedItem, setNewAddedItem] = useState({
    image: "",
    type: "",
    islost: true,
    name: "",
    description: "",
    itemdate: "",
    isresolved: false,
    ishelped: null,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const centerPosition = [33.6461, -117.8427];
  const [position, setPosition] = useState(centerPosition);
  const [focusLocation, setFocusLocation] = useState();
  const [uploadImg, setUploadImg] = useState("");
  // LOGIN MODAL
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();

  const subscribeToggle = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard/changeSubscription`,
        {
          email: user.email,
          subscription: !subscription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // verify auth
          },
        }
      );
      setSubscription(!subscription);
      toast({
        title: subscription
          ? "Succesfully Unsubscribed!"
          : "Succesfully Subscribed!", // just switched subscription
        description: subscription
          ? "You have been unsubscribed from the ZotNFound Newsletter"
          : "You have been subscribed to the ZotNFound Newsletter",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Something went wrong :(",
        description: "Error occurred while trying to unsubscribe",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  };

  // Define the callback function to handle a 'List an item' button click
  const handleListItemButtonClick = () => {
    if (user) {
      onOpenCreateModal();
      setNewAddedItem((prev) => ({ ...prev, islost: true }));
      setIsEdit(!isEdit);
    } else {
      onLoginModalOpen();
    }
  };

  const handleCancelItemButtonClick = () => {
    setNewAddedItem({
      image: "",
      type: "",
      islost: true,
      name: "",
      description: "",
      itemdate: "",
      isresolved: false,
      ishelped: null,
    });
    setUploadImg("");
    setIsCreate(true);
    setIsEdit(false);
    onClose();
  };

  // Sort the array by date
  data.sort(compareDates);

  //get data
  useEffect(() => {
    const getData = async () => {
      // Define the headers object
      const config = {
        headers: {
          // Include any other headers you need
          "User-Email": user?.email, // Custom header with the user's email
        },
      };

      // Request to get items with additional headers
      axios
        .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/`, config)
        .then((obj) => {
          setData(obj.data.map((item) => ({ ...item, id: item.id })));
        })
        .catch((err) => console.log(err));

      setLoading(true);
    };
    getData();
  }, [user]);

  //LEADERBOARD GET INFO
  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const { data: leaderboardData } = await axios.get(
          `${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard`
        );
        setLeaderboard(
          leaderboardData.map((item) => ({ ...item, id: item.id }))
        );
        // Check if the current user's email exists in the leaderboard
        const userEmailExists = leaderboardData.some(
          (entry) => entry.email === user?.email
        );
        // If it does not exist, add the user to the leaderboard
        if (!userEmailExists && user) {
          // added user to prevent race condition (user is undefined before auth resolves)
          await axios.post(
            `${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard/`,
            {
              email: user.email,
              points: 5, // You can modify this as per your requirements
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // verify auth
              },
            }
          );
          // Fetch the leaderboard again after insertion
          const { data: updatedLeaderboardData } = await axios.get(
            `${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard`
          );
          setLeaderboard(
            updatedLeaderboardData.map((item) => ({ ...item, id: item.id }))
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(true);
      }
    };

    if (user) {
      getLeaderboard();
      setSubscription(user.subscription);
    }
  }, [user, token]);

  // set token to auth
  useEffect(() => {
    if (user) {
      setToken(user.accessToken);
    }
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        data: data,
        setData: setData,
        token: token,
        setLoading: setLoading,
        isLoginModalOpen: isLoginModalOpen,
        onLoginModalClose: onLoginModalClose,
        onLoginModalOpen: onLoginModalOpen,
      }}
    >
      <Flex
        justifyContent="space-between"
        shadow="md"
        alignItems="center"
        className="big"
      >
        {/* LOGO + TEXT */}
        <ZotNFoundLogoText />

        {/* SEARCH BAR */}
        <HStack
          w={{ base: "100%", md: "40%" }}
          display={{ base: "none", md: "block" }}
        >
          <InputGroup mt="1%" size={{ base: "md", md: "lg" }} mb="1%" padding={8}>
            <InputLeftAddon children="🔎" />
            <Input
              type="teal"
              value={search}
              placeholder="Search Items ..."
              isDisabled={!loading}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </HStack>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          mr={7}
          gap={{ base: 3, md: 5 }}
        >
          {user ? (
            <>
              <Flex
                alignItems={"center"}
                gap={{ base: 1, md: 1.5 }}
                justifyContent={"center"}
                background={"#74a2fa"}
                padding={{ base: "5px", md: 1.5 }}
                borderRadius={"xl"}
                _hover={{
                  background: "#365fad",
                }}
                _active={{
                  background: "#365fad",
                }}
                cursor={"pointer"}
                onClick={onLeaderboardOpen}
              >
                <Image
                  ref={btnRef}
                  src={cookie}
                  h={{ base: "15px", md: "20px" }}
                  w={{ base: "15px", md: "25px" }}
                />
                <Text
                  as={"b"}
                  fontSize={{ base: "sm", md: "lg" }}
                  color={"white"}
                >
                  {user
                    ? leaderboard.find((u) => u.email === user.email)?.points
                    : 0}
                </Text>
              </Flex>
              <Menu>
                <MenuButton>
                  <Image
                    src={user?.photoURL}
                    h={{ base: "27px", md: "80px" }}
                    w={{ base: "27px", md: "80px" }}
                    borderRadius="100%"
                  />
                </MenuButton>

                {/* User Emblem Dropdown */}
                <MenuList zIndex={10000}>
                  <MenuItem _focus={{ bg: "white" }}>
                    <Image
                      boxSize="1.2rem"
                      src={userlogo}
                      alt="logoutbutton"
                      mr="12px"
                    />
                    {user?.email}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFindFilter((prev) => ({
                        ...prev,
                        isYourPosts: !prev.isYourPosts,
                      }));
                      onOpen();
                    }}
                  >
                    <Image
                      boxSize="1.2rem"
                      src={yourposts}
                      alt="logoutbutton"
                      mr="12px"
                    />
                    Your Posts
                  </MenuItem>

                  <MenuItem onClick={subscribeToggle}>
                    {subscription ? (
                      <>
                        <Image
                          boxSize="1.2rem"
                          src={unsubscribe}
                          alt="Unsubscribe from newsletter button"
                          mr="12px"
                        />
                        Unsubscribe
                      </>
                    ) : (
                      <>
                        <Image
                          boxSize="1.2rem"
                          src={subscribe}
                          alt="Subscribe from newsletter button"
                          mr="12px"
                        />
                        Subscribe
                      </>
                    )}
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <Image
                      boxSize="1.2rem"
                      src={logout}
                      alt="logoutbutton"
                      mr="12px"
                    />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button
              h={{ base: "6vh", md: "7vh" }}
              w={{ base: "30vw", md: "8vw" }}
              borderRadius={20}
              fontSize="xl"
              variant="outline"
              colorScheme="black"
              onClick={onLoginModalOpen}
            >
              Sign in
            </Button>
          )}

          <Flex display={{ base: "none", md: "block" }}>
            <CreateModal
              isOpen={isOpenCreateModal}
              onOpen={onOpenCreateModal}
              onClose={onCloseCreateModal}
              setIsCreate={setIsCreate}
              isCreate={isCreate}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setPosition={setPosition}
              centerPosition={centerPosition}
              newAddedItem={newAddedItem}
              setNewAddedItem={setNewAddedItem}
              setUploadImg={setUploadImg}
              uploadImg={uploadImg}
              upload={upload}
            />
          </Flex>
        </Flex>
      </Flex>

      {/* Mobile Search */}
      <Flex
        w="100%"
        display={{ base: "flex", md: "none" }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex width="95%">
          <InputGroup mt="3%" size={{ base: "md", md: "lg" }} mb="1%">
            <InputLeftAddon children="🔎" />
            <Input
              type="teal"
              value={search}
              placeholder="Search Items ..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Flex>

      <Flex
        position="relative"
        marginTop={{ base: "1vh", md: "2%" }}
        px={{ base: 0, md: "2%" }}
      >
        {/* <CreateModal /> */}
        <Flex
          width={{ base: "100vw", md: "75vw" }}
          padding={{ base: 3, md: 5 }}
          position="absolute"
          zIndex={1000}
          flexDirection="row"
          justifyContent="space-between"
        >
          {isEdit ? (
            <Flex>
              <Alert
                status="warning"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
                height="80px"
                border="3px red solid"
                borderRadius="20px"
                boxShadow="xl"
              >
                <AlertIcon />
                <AlertTitle>Click on the Map to place your item 📍</AlertTitle>
              </Alert>
            </Flex>
          ) : (
            <Flex gap="4">
              <ButtonGroup
                variant="outline"
                colorScheme="#74a2fa"
                color="#5f85cf"
                spacing={3}
                // boxShadow="5px 2px 9px rgba(0, 0, 0, 0.2);"
              >
                <Button
                  backgroundColor="white"
                  onClick={onOpen}
                  size="lg"
                  gap={1}
                  fontSize={{ base: "xl", md: "2xl" }}
                  borderRadius={"lg"}
                  borderWidth={2}
                  leftIcon={<SettingsIcon />}
                >
                  Filter
                </Button>
                <DateRangeFilter />
              </ButtonGroup>

              <Filter
                setFindFilter={setFindFilter}
                findFilter={findFilter}
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
              />

              <Button
                display={{ md: "none" }}
                background={"#74a2fa"}
                color={"white"}
                onClick={onResultsBarOpen}
                fontSize="2xl"
                boxShadow="7px 7px 14px #666666"
                size="lg"
                gap={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <StarIcon />
              </Button>

              <Drawer
                isOpen={isResultsBarOpen}
                placement="right"
                onClose={onResultsBarClose}
                size="full"
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton size="lg" />
                  <DrawerHeader>
                    {isFilterOff() ? (
                      <Text fontSize="2xl">All Posts</Text>
                    ) : (
                      <Flex alignItems="center" gap={1}>
                        <Text fontSize="2xl" color="green">
                          Filter: ON
                        </Text>
                        <SettingsIcon color="green" />
                      </Flex>
                    )}
                  </DrawerHeader>
                  <DrawerBody overflow="hidden">
                    <Flex width="100%" flexDir="column">
                      <Flex>
                        <InputGroup
                          mb="1%"
                          width="90%"
                          mx="auto"
                          size={{ base: "md", md: "lg" }}
                        >
                          <InputLeftAddon children="🔎" />
                          <Input
                            type="teal"
                            value={search}
                            placeholder="Search Items ..."
                            isDisabled={!loading}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </InputGroup>

                        <Button
                          colorScheme="green"
                          size="md"
                          fontSize="xl"
                          mr={3}
                          onClick={onOpen}
                        >
                          <SettingsIcon />
                        </Button>
                      </Flex>

                      <ResultsBar
                        search={search}
                        findFilter={findFilter}
                        setFocusLocation={setFocusLocation}
                        onResultsBarClose={onResultsBarClose}
                        setLeaderboard={setLeaderboard}
                      />
                    </Flex>
                  </DrawerBody>
                  <DrawerFooter></DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Flex>
          )}
        </Flex>

        <Flex position="absolute">
          <ListItemButton
            switchState={!isEdit}
            addCallback={handleListItemButtonClick}
            cancelCallback={handleCancelItemButtonClick}
            position="absolute"
            right={10}
            bottom={10}
          />
          <Map
            newAddedItem={newAddedItem}
            setNewAddedItem={setNewAddedItem}
            isEdit={isEdit}
            email={user?.email}
            setIsEdit={setIsEdit}
            search={search}
            findFilter={findFilter}
            setIsCreate={setIsCreate}
            isCreate={isCreate}
            centerPosition={centerPosition}
            position={position}
            setPosition={setPosition}
            focusLocation={focusLocation}
            setFocusLocation={setFocusLocation}
            setUploadImg={setUploadImg}
            uploadImg={uploadImg}
            upload={upload}
            setLeaderboard={setLeaderboard}
          />
        </Flex>
        <Flex
          position="absolute"
          top={0}
          right={5}
          display={{ base: "none", md: "flex" }}
        >
          <ResultsBar
            search={search}
            findFilter={findFilter}
            setFocusLocation={setFocusLocation}
            setLeaderboard={setLeaderboard}
          />
        </Flex>
        <Box
          display={{ base: "block", md: "none" }}
          position="fixed"
          bottom="2.5%"
          width="100vw"
        >
          <CreateModal
            setIsCreate={setIsCreate}
            isCreate={isCreate}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setPosition={setPosition}
            centerPosition={centerPosition}
            newAddedItem={newAddedItem}
            setNewAddedItem={setNewAddedItem}
            setUploadImg={setUploadImg}
            uploadImg={uploadImg}
            upload={upload}
          />
        </Box>
      </Flex>
      {!loading && (
        <Flex
          width="100%"
          height="83vh"
          bg="gray"
          opacity="0.8"
          justifyContent="center"
          alignItems="center"
          zIndex={1000000000}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="yellow"
            color="blue"
            size="xl"
          />
        </Flex>
      )}
      <LoginModal />
      <Leaderboard
        onOpen={onLeaderboardOpen}
        isOpen={isLeaderboardOpen}
        onClose={onLeaderboardClose}
        btnRef={btnRef}
        leaderboard={leaderboard}
        user={user}
      />
    </DataContext.Provider>
  );
}
