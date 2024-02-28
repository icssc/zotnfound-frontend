import { useContext, useCallback } from "react";
import "./ResultsBar.css";
import ResultCard from "../ResultCard/ResultCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import DataContext from "../../context/DataContext";
import { UserAuth } from "../../context/AuthContext";
export default function ResultsBar({
  search,
  findFilter,
  setFocusLocation,
  onResultsBarClose,
  setLeaderboard,
}) {
  const { data, setData } = useContext(DataContext);
  const { user } = UserAuth();

  // Define callback function to return filtered items (filtered according to search bar and filter markers)
  const filterItem = useCallback(
    (item) => {
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
    },
    [
      search,
      findFilter.isFound,
      findFilter.isShowReturned,
      findFilter.isYourPosts,
      findFilter.islost,
      findFilter.type,
      findFilter.uploadDate,
      user,
    ]
  );

  // Define callback function to display filtered items as individual result cards in the results bar
  const mapItem = useCallback(
    (item) => {
      return (
        <Box
          key={item.location}
          onClick={() => {
            setFocusLocation(item.location);
          }}
          _hover={{
            transform: "scale(0.99)",
          }}
          transition="transform .3s ease"
        >
          <ResultCard
            props={item}
            setData={setData}
            onResultsBarClose={onResultsBarClose}
            setLeaderboard={setLeaderboard}
          />
        </Box>
      );
    },
    [setFocusLocation, onResultsBarClose, setData, setLeaderboard]
  );

  const allResults = data.filter(filterItem).map(mapItem);

  // Define JSX for empty results bar (no result cards)
  const noResults = (
    <Flex height="80%" width="100%" justifyContent="center" alignItems="center">
      <Text fontSize="4xl" as="b" color="gray">
        No Items
      </Text>
    </Flex>
  );

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
