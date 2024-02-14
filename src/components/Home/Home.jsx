import React, { useState, useEffect, useRef, useCallback } from "react";
import Map from "../Map/Map";
import "./Home.css";
import Filter from "../Filter/Filter";
import ResultsBar from "../ResultsBar/ResultsBar";
import CreateModal from "../CreateModal/CreateModal";
import LoginModal from "../LoginModal/LoginModal";
import Leaderboard from "./Leaderboard";

import instagram from "../../assets/logos/instagram.svg";
import { UserAuth } from "../../context/AuthContext";
import DataContext from "../../context/DataContext";
import { Spinner, useToast } from "@chakra-ui/react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
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
import { SettingsIcon, ChevronDownIcon, StarIcon } from "@chakra-ui/icons";
import logo from "../../assets/images/small_logo.png";
import upload from "../../assets/images/download.png";

import logout from "../../assets/logos/logout.svg";
import unsubscribe from "../../assets/logos/unsubscribe.svg";
import userlogo from "../../assets/logos/userlogo.svg";
import yourposts from "../../assets/logos/yourposts.svg";
import cookie from "../../assets/images/cookie.svg";

import axios from "axios";

export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const { user, logOut } = UserAuth();
  const [token, setToken] = useState("");
  const btnRef = useRef();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [uploadImg, setUploadImg] = useState("");
  const [DateRangeFilter, setDateRangeFilter] = useState("Date Range Filter");
  // LOGIN MODAL
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();

  const unsubscribeEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard/changeSubscription`,
        {
          email: user.email,
          subscription: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // verify auth
          },
        }
      );
      console.log(result);
      toast({
        title: "Succesfully Unsubscribed!",
        description: "You have been unsubscribed from the ZotnFound Newsletter",
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

  // retrieve a list of items ALL TIME
  const retrieveItemsAllTime = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/`)
      .then((obj) => {
        setData(obj.data.map((item) => ({ ...item, id: item.id })));
        setDateRangeFilter("All");
      })
      .catch((err) => console.log(err));
  },[]);

  // retrieve a list of items from the last 7 days
  const retrieveItemsWithinWeek = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/week`)
      .then((obj) => {
        setData(obj.data.map((item) => ({ ...item, id: item.id })));
        setDateRangeFilter("Last 7 Days");
      })
      .catch((err) => console.log(err));
  },[]);

  // retrieve a list of items from the last 2 weeks
  const retrieveItemsWithinTwoWeeks = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/two_weeks`)
      .then((obj) => {
        setData(obj.data.map((item) => ({ ...item, id: item.id })));
        setDateRangeFilter("Last 14 Days");
      })
      .catch((err) => console.log(err));
  },[]);

  // retrieve a list of items from the last month
  const retrieveItemsWithinMonth = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/month`)
      .then((obj) => {
        setData(obj.data.map((item) => ({ ...item, id: item.id })));
        setDateRangeFilter("Last 30 Days");
      })
      .catch((err) => console.log(err)); 
  },[]);

  // retrieve a list of items from the last year
  const retrieveItemsWithinYear = useCallback(() => {
    console.log("year got entered here 1");
    axios
      .get(`${process.env.REACT_APP_AWS_BACKEND_URL}/items/year`)
      .then((obj) => {
        console.log("year got entered here 2");
        setData(obj.data.map((item) => ({ ...item, id: item.id })));
        setDateRangeFilter("This Year");
      })
      .catch((err) => console.log("Error Here", err));
  },[]);

  
  //LEADERBOARD GET INFO
  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const { data: leaderboardData } = await axios.get(
          `${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard/`
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
            `${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard/`
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
    }
  }, [user, token]);

  // set token to auth
  useEffect(() => {
    if (user) {
      setToken(user.accessToken);
    }
  }, [user]);



  window.onresize = () => {
    setScreenWidth(window.screen.width);
  };

  return (
    <DataContext.Provider
      value={{
        data: data,
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
        <Flex
          alignItems="center"
          w={{ base: "20%", md: "20%" }}
          className="med"
          minWidth={{ base: "125px", md: "315px" }}
        >
          <Image
            width={{ base: "50px", md: "100px" }}
            src={logo}
            mb="5%"
            mt="3%"
            ml="10%"
            display={screenWidth < 350 ? "None" : "inline"}
          />
          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              size={{ base: "4xl", md: "4xl" }}
              ml="3%"
              fontSize={{ base: "xl", md: "4xl" }}
              background="white"
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
              ZotnFound
            </MenuButton>

            {/* ZotnFound Logo/Text Dropdown */}
            <MenuList zIndex={10000}>
              <MenuItem
                alignItems={"center"}
                justifyContent={"center"}
                as={"a"}
                href="https://www.instagram.com/zotnfound/"
              >
                @ZotnFound
                <Image
                  src={instagram}
                  maxWidth="10%"
                  maxHeight="10%"
                  ml="5%"
                ></Image>
              </MenuItem>
              <MenuItem
                alignItems={"center"}
                justifyContent={"center"}
                as={"a"}
                href="/update"
              >
                News
              </MenuItem>
              <MenuItem
                alignItems={"center"}
                justifyContent={"center"}
                as={"a"}
                href="/about"
              >
                About
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <HStack
          w={{ base: "100%", md: "40%" }}
          display={{ base: "none", md: "block" }}
        >
          <InputGroup mt="1%" size={{ base: "md", md: "lg" }} mb="1%">
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
                    h={{ base: "50px", md: "80px" }}
                    w={{ base: "50px", md: "80px" }}
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

                  <MenuItem onClick={unsubscribeEmail}>
                    <Image
                      boxSize="1.2rem"
                      src={unsubscribe}
                      alt="unsubscribe from newsletter button"
                      mr="12px"
                    />
                    Unsubscribe
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
              <Button
                backgroundColor="white"
                variant="outline"
                boxShadow="7px 7px 14px #666666,
                -7px -7px 14px #ffffff;"
                color="#74a2fa"
                onClick={onOpen}
                fontSize={{ base: "xl", md: "2xl" }}
                size="lg"
                gap={2}
                borderRadius={"lg"}
              >
                <SettingsIcon />
                Filter
              </Button>
              <Filter
                setFindFilter={setFindFilter}
                findFilter={findFilter}
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
              />
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  backgroundColor="white"
                  variant="outline"
                  boxShadow="7px 7px 14px #666666,
                -7px -7px 14px #ffffff;"
                  color="#74a2fa"
                  fontSize={{ base: "xl", md: "2xl" }}
                  size="lg"
                  // gap={2}
                  borderRadius={"lg"}
                >
                  {DateRangeFilter}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={retrieveItemsAllTime}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    onClick={retrieveItemsWithinYear}
                  >
                    This Year
                  </MenuItem>
                  <MenuItem 
                  onClick={retrieveItemsWithinWeek}
                  >
                    Last 7 Days
                  </MenuItem>
                  <MenuItem
                    onClick={retrieveItemsWithinTwoWeeks}
                  >
                    Last 14 Days
                  </MenuItem>
                  <MenuItem
                    onClick={retrieveItemsWithinMonth}
                  >
                    Last 30 Days
                  </MenuItem>
                </MenuList>
              </Menu>

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
                        setData={setData}
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
          <Map
            newAddedItem={newAddedItem}
            setNewAddedItem={setNewAddedItem}
            isEdit={isEdit}
            email={user?.email}
            setIsEdit={setIsEdit}
            search={search}
            findFilter={findFilter}
            setData={setData}
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
            setData={setData}
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
