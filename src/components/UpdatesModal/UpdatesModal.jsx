import { useCallback, useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
  
export const latestUpdate = '20240302';
export const lastUpdateSeen = 'none'; // latest update seen by user

function needsUpdate() {
  return localStorage.getItem(lastUpdateSeen) != latestUpdate;
}

export default function UpdatesModal() {
  const [isOpen, setOpen] = useState(needsUpdate()); // on page load, display user updates if needed

    const updateKey = useCallback(() => {
      localStorage.setItem(lastUpdateSeen, latestUpdate); // change date of last update seen by user
      setOpen(false);
  }, []);

    return (
      <>
        <Modal isOpen={isOpen} size = {'lg'} onClose={updateKey}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Features @ ZotNFound!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              [Updates go here]
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={updateKey}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }