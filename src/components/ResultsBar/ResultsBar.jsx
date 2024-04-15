import { useContext, useCallback } from "react";
import "./ResultsBar.css";
import ResultCard from "../ResultCard/ResultCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import DataContext from "../../context/DataContext";
import { UserAuth } from "../../context/AuthContext";
import Fuse from "fuse.js";

export default function ResultsBar({
  search,
  findFilter,
  setFocusLocation,
  onResultsBarClose,
  setLeaderboard,
}) {
  const { data, setData } = useContext(DataContext);
  const { user } = UserAuth();

  // Define callback function to return filtered items
  const filterItem = useCallback(
    (item) => {
      return (
        search.toLowerCase() === "" ||
        (((findFilter.isLost && item.isLost) ||
          (findFilter.isFound && !item.isLost)) &&
          (findFilter.type === "everything" || findFilter.type === item.type) &&
          (findFilter.uploadDate === "" ||
            (item.itemDate && item.itemDate.includes(findFilter.uploadDate))) &&
          (!findFilter.isYourPosts || item.email === user.email) &&
          (findFilter.isShowReturned || !item.isResolved))
      );
    },
    [search, findFilter, user]
  );

  const mapItem = useCallback(
    (item) => (
      <Box
        key={item.location}
        onClick={() => {
          setFocusLocation(item.location);
        }}
        _hover={{ transform: "scale(0.99)" }}
        transition="transform .3s ease"
      >
        <ResultCard
          props={item}
          setData={setData}
          onResultsBarClose={onResultsBarClose}
          setLeaderboard={setLeaderboard}
        />
      </Box>
    ),
    [setFocusLocation, onResultsBarClose, setData, setLeaderboard]
  );

  const searchItemsOptions = {
    keys: ["name", "description"],
    threshold: 0.3, // Lower threshold for stricter matching
    includeScore: true, // To check relevance of matches
  };

  const fuse = new Fuse(data, searchItemsOptions);
  const results = fuse.search(search).map((result) => result.item);

  let allResults =
    search === ""
      ? data.filter(filterItem).map(mapItem)
      : results.filter(filterItem).map(mapItem);

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
      overflowX="hidden"
    >
      {allResults.length > 0 ? allResults : noResults}
    </Box>
  );
}
