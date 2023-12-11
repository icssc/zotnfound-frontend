import React from "react";
import { Button, Flex, Heading, Stack, Image, Center } from "@chakra-ui/react";
import logo from "../../assets/images/logo.png";
import wallpaper from "../../assets/images/wallpaper.png";
import { UserAuth } from "../../context/AuthContext";

export default function Login() {
  // const [isSignUp, setIsSignUp] = React.useState(false);
  const { googleSignIn } = UserAuth();

  async function signInGoogle() {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack
      width={"100vw"}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={3} w={"full"} maxW={"md"}>
          <Center>
            <Image
              borderRadius="full"
              boxSize="300px"
              src={logo}
              alt="zotnfoundLogo"
            />
          </Center>
          <Heading fontSize={"3xl"} py="20px">
            {/* {isSignUp ? "Create ZotnFound Account" : "Welcome Back Anteater!"} */}
          </Heading>
          <Button
            onClick={signInGoogle}
            colorScheme={"green"}
            variant={"solid"}
          >
            SIGN IN WITH UCI
          </Button>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          width="100%"
          height="100vh"
          alt={"Login Image"}
          objectFit={"cover"}
          src={wallpaper}
        />
      </Flex>
    </Stack>
  );
}
