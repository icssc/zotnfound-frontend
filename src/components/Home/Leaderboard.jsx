import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import goldmedal from "../../assets/images/gold-medal.png";

export default function Leaderboard({
  isOpen,
  onOpen,
  onClose,
  btnRef,
  leaderboard,
  user,
}) {
  let point =
    user && leaderboard
      ? leaderboard.find((u) => u.email === user.email)
      : null;

  if (point) {
    point = point.points;
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent height={"60vh"}>
          <DrawerCloseButton />

          <DrawerBody>
            <Flex justify={"center"} mb={4}>
              <Text as={"b"} fontSize={"3xl"}>
                Ranking 🏆
              </Text>
            </Flex>
            {user && (
              <Flex justifyContent={"center"} alignItems={"center"} mb={5}>
                <Text
                  as={"b"}
                  fontSize={"xl"}
                  color={"white"}
                  background={"brown"}
                  p={3}
                  borderRadius={"xl"}
                  boxShadow={"lg"}
                >
                  You have {point} cookies 🍪
                </Text>
              </Flex>
            )}
            {leaderboard && (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                flexDir={"column"}
                gap={5}
              >
                <Flex
                  w={{ base: "100%", md: "500px" }}
                  padding={5}
                  px={{ base: 3, md: 5 }}
                  background={"#5c5be5"}
                  color={"white"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderRadius={"xl"}
                  boxShadow={"7px 7px 14px #a8a8a8"}
                >
                  <Flex alignItems={"center"} gap={{ base: 2, md: 5 }}>
                    <Text as={"b"} fontSize={"4xl"}>
                      1
                    </Text>
                    <Text as={"b"} fontSize={{ base: "sm", md: "lg" }}>
                      {leaderboard[0]?.email}
                    </Text>
                  </Flex>

                  <Flex alignItems={"center"}>
                    <Text as={"b"} fontSize={{ base: "3xl", md: "4xl" }}>
                      {leaderboard[0]?.points}
                    </Text>
                    <Image
                      className="gold-medal"
                      src={goldmedal}
                      alt="gold medal"
                      w={"5vh"}
                      h={"5vh"}
                    />
                  </Flex>
                </Flex>
                <Flex
                  w={{ base: "100%", md: "500px" }}
                  p={{ base: 3, md: 5 }}
                  background={"white"}
                  color={"black"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderRadius={"xl"}
                  boxShadow={"7px 7px 14px #a8a8a8"}
                >
                  <Flex alignItems={"center"} gap={{ base: 2, md: 5 }}>
                    <Text as={"b"} fontSize={"4xl"}>
                      2
                    </Text>
                    <Text as={"b"} fontSize={{ base: "sm", md: "lg" }}>
                      {leaderboard[1]?.email}
                    </Text>
                  </Flex>

                  <Flex>
                    <Text as={"b"} fontSize={{ base: "3xl", md: "4xl" }}>
                      {leaderboard[1]?.points} 🍪
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  w={{ base: "100%", md: "500px" }}
                  p={{ base: 3, md: 5 }}
                  background={"white"}
                  color={"black"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderRadius={"xl"}
                  boxShadow={"7px 7px 14px #a8a8a8"}
                >
                  <Flex alignItems={"center"} gap={{ base: 2, md: 5 }}>
                    <Text as={"b"} fontSize={"4xl"}>
                      3
                    </Text>
                    <Text as={"b"} fontSize={{ base: "sm", md: "lg" }}>
                      {leaderboard[2]?.email}
                    </Text>
                  </Flex>

                  <Flex>
                    <Text as={"b"} fontSize={{ base: "3xl", md: "4xl" }}>
                      {leaderboard[2]?.points} 🍪
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
