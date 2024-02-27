import { React } from "react";
import { Flex } from "@chakra-ui/react";
import TypeCard from "../Type/TypeCard";
import { iconsMap } from "../Map/MapIcons";

export default function TypeSelector(props) {
  const types = {
    headphone: iconsMap["headphone"][props.newAddedItem.islost].options.iconUrl,
    phone: iconsMap["phone"][props.newAddedItem.islost].options.iconUrl,
    wallet: iconsMap["wallet"][props.newAddedItem.islost].options.iconUrl,
    key: iconsMap["key"][props.newAddedItem.islost].options.iconUrl,
    others: iconsMap["others"][props.newAddedItem.islost].options.iconUrl,
  };

  const typeContainers = Object.keys(types).map((type) => (
    <TypeCard
      key={type}
      type={type}
      icon={types[type]}
      newAddedItem={props.newAddedItem}
      setNewAddedItem={props.setNewAddedItem}
    />
  ));

  return (
    <Flex
      w={{ xl: "700px", lg: "600px" }}
      flexWrap={"wrap"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={{ base: "30px" }}
      gap={{ md: 10, base: 4 }}
      m={0}
    >
      {typeContainers}
    </Flex>
  );
}
