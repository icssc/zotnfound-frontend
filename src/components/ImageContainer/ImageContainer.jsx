import { Image, Flex, Text } from "@chakra-ui/react";

export default function ImageContainer({ image, isresolved }) {
  return (
    <Flex
      w={{ base: "100%", md: 300 }}
      h={{ base: 350, md: 300 }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {isresolved && (
        <Flex
          backgroundColor={"rgba(255, 123, 0, 0.9)"}
          position={"absolute"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={30}
          flexDir={"column"}
          w={{ base: "100vw", md: 300 }}
        >
          <Text fontSize={18} as="b" color={"white"}>
            RETURNED
          </Text>
          <Text fontSize={15} color={"white"}>
            This item has been returned.
          </Text>
        </Flex>
      )}
      <Image
        w="100%"
        h="100%"
        rounded={"lg"}
        objectFit={"scale-down"}
        src={image}
        borderRadius={"lg"}
      />
    </Flex>
  );
}
