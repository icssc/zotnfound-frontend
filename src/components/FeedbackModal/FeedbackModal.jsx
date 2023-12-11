import {
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import DataContext from "../../context/DataContext";
import { useState, useContext } from "react";

export default function FeedbackModal({
  setData,
  infoOnClose,
  isOpen,
  onClose,
  props,
  setLeaderboard,
  email,
}) {
  const [feedbackHelped, setFeedbackHelped] = useState(null);
  const { setLoading, token } = useContext(DataContext);
  async function handleFeedback() {
    if (!token) {
      return;
    }
    setLoading(false);
    axios
      .put(
        `${process.env.REACT_APP_AWS_BACKEND_URL}/items/${props.id}`,
        {
          ...props,
          isresolved: true,
          ishelped: feedbackHelped,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // verify auth
          },
        }
      )
      .then(() => console.log("Success"))
      .catch((err) => console.log(err));

    setData((prevItems) => {
      if (prevItems && prevItems.length > 0) {
        return prevItems.map((item) => {
          if (item.id === props.id) {
            item.isresolved = true;
            item.ishelped = feedbackHelped;
          }
          return item;
        });
      }
      return prevItems;
    });

    // Update the leaderboard
    const pointsToAdd = props.islost ? 2 : 5;

    axios.put(
      `${process.env.REACT_APP_AWS_BACKEND_URL}/leaderboard`,
      {
        email: email,
        pointsToAdd: pointsToAdd,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // verify auth
        },
      }
    );

    setLeaderboard((prev) =>
      prev.map((u) =>
        u.email === email ? { ...u, points: (u.points || 0) + pointsToAdd } : u
      )
    );

    setLoading(true);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (feedbackHelped === null) {
          onClose();
        } else {
          onClose();
          infoOnClose();
        }
      }}
    >
      <ModalOverlay />
      {feedbackHelped === null ? (
        <ModalContent>
          <ModalHeader
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            ⚠️ Feedback ⚠️
          </ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Text>Did ZotnFound help with resolving your item?</Text>
          </Flex>
          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                setFeedbackHelped(false);
              }}
            >
              No 👎
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                setFeedbackHelped(true);
              }}
            >
              Yes 👍
            </Button>
          </ModalFooter>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalHeader
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            ❤️ Thank You For Your Feedback ❤️
          </ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Text>Your feedback has been recorded.</Text>
          </Flex>
          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleFeedback();
                onClose();
                infoOnClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}
