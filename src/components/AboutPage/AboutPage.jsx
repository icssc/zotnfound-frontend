import { React, useState, useEffect } from "react";
import { Button, Text, Flex, Stack, Icon, Image } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import zotnfound_win from "../../assets/images/zotnfound_win.png";
import zotnfound_ig from "../../assets/images/zotnfound_ig.png";
import small_logo from "../../assets/images/small_logo.png";
import login_page from "../../assets/images/login_page.jpg";
import about1 from "../../assets/images/about1.png";
import about2 from "../../assets/images/about2.png";
import about3 from "../../assets/images/about3.png";
import about4 from "../../assets/images/about4.png";
import { getItems, getLeaderboardCount } from "../../utils/ApiUtils";

export default function AboutPage() {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [data, setData] = useState([]);
  const [leaderboardCount, setLeaderboardCount] = useState(0);

  window.onresize = () => {
    setScreenWidth(window.screen.width);
  };

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    getItems().then((itemsData) => {
      setData(itemsData.data);
    });

    getLeaderboardCount().then((leaderboardData) => {
      setLeaderboardCount(leaderboardData.data);
    });
  }, []);

  return (
    <Flex
      alignItems={"center"}
      direction={"column"}
      height={"auto"}
      paddingTop={"1em"}
      gap={"1em"}
      width={"auto"}
      className="parent"
      overflowX={"hidden"}
    >
      <Stack
        direction={{ base: "column", md: "column", lg: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100vw"}
      >
        <Flex display={screenWidth < 992 ? "none" : "block"} marginLeft={10}>
          <Button onClick={handleClick} visibility={"hidden"}>
            <Icon as={ArrowBackIcon} marginRight={"2%"} />
            Return Home{" "}
          </Button>
        </Flex>
        <Flex alignItems={"center"} flexDir={{ md: "row", base: "column" }}>
          <Text fontSize={{ base: "2rem", md: "3rem" }} as="b" width={"10em"}>
            We are ZotnFound
          </Text>
          <Image w={"70px"} h={"70px"} src={small_logo} />
        </Flex>
        <Flex>
          <Button onClick={handleClick} marginRight={{ lg: 10 }}>
            <Icon as={ArrowBackIcon} marginRight={"2%"} />
            Return Home{" "}
          </Button>
        </Flex>
      </Stack>
      <Text
        fontSize={{ base: "1rem", md: "1.5rem" }}
        width={{ base: "20em", md: "40em" }}
      >
        @ZotnFound!
      </Text>
      <Flex
        direction={"row"}
        justifyContent="center"
        alignItems={"center"}
        gap={"1em"}
        width={"100vw"}
        bg={"#fffcf6"}
        mt={"1%"}
        mb={"1%"}
      >
        <Flex direction={"column"} m={"1%"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "2.4rem" }}>
            {data.filter((item) => item.islost).length}
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Lost Items</Text>
        </Flex>
        <Flex direction={"column"} m={"1%"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "2.4rem" }}>
            {data.filter((item) => !item.islost).length}
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Found Items</Text>
        </Flex>
        <Flex direction={"column"} m={"1%"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "2.4rem" }}>
            {data.filter((item) => item.isresolved).length}
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>
            Successful Returns
          </Text>
        </Flex>
        <Flex direction={"column"} m={"1%"}>
          <Text fontWeight={600} fontSize={{ base: "1.3rem", md: "2.4rem" }}>
            {leaderboardCount}
          </Text>
          <Text fontSize={{ base: "0.8rem", md: "1.2rem" }}>Active Users</Text>
        </Flex>
      </Flex>
      <Flex
        flexBasis={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        bg={"#fffcf6"}
        w="100vw"
      >
        <Text
          fontWeight={500}
          fontSize={{ base: "4xl", md: "4xl" }}
          mb={5}
          mt={"1%"}
        >
          Explore how ZotnFound works
        </Text>
        <Flex width={{ base: "100%", md: "60em" }} mb={10}>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
          >
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={about1} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Get Started - It's Simple & Easy
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Log in with your UCI email and start listing lost & found
                  items! {"(No need to sign up or create an account)."}
                </Text>
              </Flex>
            </SwiperSlide>
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={about2} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Navigate Around the Map
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Effortlessly navigate UCI's interactive map to efficiently
                  search for lost and found items. Explore the digital landscape
                  with ease as you locate and reclaim belongings!
                </Text>
              </Flex>
            </SwiperSlide>
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={about3} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Search for Lost & Found Items
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Utilize the easy to use filter and search bar to look up
                  specific items based off their name, description, type, or the
                  time estimate of when the item was lost/found.
                </Text>
              </Flex>
            </SwiperSlide>
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={about4} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Upload Your Items - Join the Community!
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Show off the different items that you may have found or lost.
                  Participate in helping return items back to the community and
                  stay on a lookout for any items that may be yours!
                </Text>
              </Flex>
            </SwiperSlide>
            <SwiperSlide>
              <Flex
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={login_page} />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "1.3rem", md: "1.6rem" }}
                  mt={"2%"}
                >
                  Contact Others and Connect
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", md: "1rem" }}
                  mt={"2%"}
                  maxW={"40em"}
                >
                  Meet people in the community and create new friends! Easily
                  contact people who may have found your items and vice versa.
                </Text>
              </Flex>
            </SwiperSlide>
          </Swiper>
        </Flex>
      </Flex>
      <Flex
        w={{ base: "80vw", md: "60vw" }}
        flexWrap={{ base: "none", md: "wrap" }}
        justifyContent={"space-between"}
        direction={{ base: "column", md: "row" }}
        h="100%"
        mb="3%"
      >
        <Flex
          flexBasis={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          mb={5}
        >
          <Text fontWeight={500} fontSize={{ base: "3xl", md: "4xl" }} mb={5}>
            Origin of ZotnFound
          </Text>
          <Text textAlign={"left"} fontSize={{ base: "0.8rem", md: "1rem" }}>
            Many people are constantly losing their belongings, whether that be
            their phones, keys, or watter bottles. This is especially true for
            UCI students on the UCI subreddit, where there are countless posts
            being created about lost and found items. Due to this problem, we
            decided to take matters into our own hands and created an Instagram
            account to help lost items return back to their original owners. We
            have so far helped over 10 people and gained over 300+ followers.
            The process on Instagram was very time consuming due to us having to
            manually go through each message and create a post on each
            individual item that was sent. Due to these restraints, we decided
            to create a platform that will allow people to post items that they
            found and lost. These posts had descriptions on the item and where
            they were last seen.
          </Text>
        </Flex>
        <Flex flexBasis={"50%"} justifyContent={"center"} alignItems={"center"}>
          <Image
            src={zotnfound_ig}
            minW="15em"
            h="15em"
            borderRadius={"2xl"}
            boxShadow={"2xl"}
          />
        </Flex>
        <Flex
          flexBasis={"50%"}
          justifyContent={"center"}
          alignItems={"center"}
          display={{ base: "none", md: "block" }}
          mt={"5%"}
        >
          <Image
            src={zotnfound_win}
            minW="15em"
            h="15em"
            borderRadius={"2xl"}
            boxShadow={"2xl"}
          />
        </Flex>
        <Flex
          flexBasis={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          mt={"5%"}
        >
          <Text fontWeight={500} fontSize={{ base: "3xl", md: "4xl" }} mb={5}>
            What makes ZotnFound special?
          </Text>
          <Text
            textAlign={"left"}
            fontSize={{ base: "0.8rem", md: "1rem" }}
            mb={5}
          >
            ZotnFound is an interactive lost and found website designed
            exclusively for students and faculty on campus. With its
            user-friendly platform, searchable databases, photo uploads, and
            communication protocols, finding lost belongings becomes stress-free
            and efficient. It's more than just a website; it fosters a sense of
            community and inspires connections between students through the
            shared experience of reuniting with their lost items.
          </Text>
        </Flex>
        <Flex
          flexBasis={"50%"}
          justifyContent={"center"}
          alignItems={"center"}
          display={{ base: "block", md: "none" }}
        >
          <Image src={zotnfound_win} borderRadius={"2xl"} boxShadow={"2xl"} />
        </Flex>
      </Flex>
    </Flex>
  );
}
