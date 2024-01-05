import { useContext, useCallback } from "react";
import "./ResultsBar.css";
import ResultCard from "../ResultCard/ResultCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import DataContext from "../../context/DataContext";
import { UserAuth } from "../../context/AuthContext";
export default function ResultsBar({
  search,
  findFilter,
  setData,
  setFocusLocation,
  onResultsBarClose,
  setLeaderboard,
}) {
  const { data } = useContext(DataContext);
  const { user } = UserAuth();
  const filterItem = useCallback((item) => {
    return (
    (search.toLowerCase() === "" ||
      item.name.toLowerCase().includes(search)) &&
    (findFilter.islost === item.islost ||
      findFilter.isFound === !item.islost) &&
    (findFilter.type === "everything" || findFilter.type === item.type) &&
    (findFilter.uploadDate === "" ||
      (item.itemdate && item.itemdate.includes(findFilter.uploadDate))) &&
    (!findFilter.isYourPosts ||
      (findFilter.isYourPosts && item.email === user.email)) &&
    (findFilter.isShowReturned || !item.isresolved)
  );
}, [search, findFilter.isFound, findFilter.isShowReturned, findFilter.isYourPosts, findFilter.islost, findFilter.type, findFilter.uploadDate, user]);

  const mapItem = useCallback((item) => {
    return (
      <Box
        key={item.location}
        onClick={() => {
          setFocusLocation(item.location);
        }}
        _hover={{
          transform: "scale(0.99)",
        }}
      >
        <ResultCard
          props={item}
          setData={setData}
          onResultsBarClose={onResultsBarClose}
          setLeaderboard={setLeaderboard}
        />
      </Box>
    );
  }, [setFocusLocation, onResultsBarClose, setData, setLeaderboard]);

  const allResults = data
    .filter(filterItem)
    .map(mapItem);

  const noResults = (
    <Flex
      height="80%"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="4xl" as="b" color="gray">
        No Items
      </Text>
    </Flex>
  )

  return (
    <Box
      paddingX="5px"
      width={{ base: "90vw", md: "21vw" }}
      height="80vh"
      overflowY="scroll"
      overflowX={"hidden"}
    >
      {allResults.length > 0 ? allResults : noResults}
    </Box>
  );
}
