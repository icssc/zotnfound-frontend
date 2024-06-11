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
import { useState, useContext, useCallback } from "react";

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

  const handleFeedback = useCallback(async () => {
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
        .then(console.log("Success"))
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
  }, [token, setLoading, props, feedbackHelped, setData, email, setLeaderboard]);

  const handleNoButtonClick = useCallback(() => {
    setFeedbackHelped(false);
  }, []);

  const handleYesButtonClick = useCallback(() => {
    setFeedbackHelped(true);
  }, []);

  const handleCloseButtonClick = useCallback(() => {
    handleFeedback();
    onClose();
    infoOnClose();
  }, [handleFeedback, onClose, infoOnClose]);

  const handleModalOnClose = useCallback(() => {
    if (feedbackHelped === null) {
        onClose();
      } else {
        onClose();
        infoOnClose();
      }
  }, [feedbackHelped, onClose, infoOnClose]);

  const feedbackRequestModal = (
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
          onClick={handleNoButtonClick}
        >
          No 👎
        </Button>
        <Button
          colorScheme="green"
          onClick={handleYesButtonClick}
        >
          Yes 👍
        </Button>
      </ModalFooter>
    </ModalContent>
  );

  const feedbackHelpedModal = (
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
          onClick={handleCloseButtonClick}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalOnClose}
    >
      <ModalOverlay />
      {feedbackHelped === null ? feedbackRequestModal : feedbackHelpedModal}
    </Modal>
  );
}
