import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import { IconButton, Tooltip, ButtonGroup } from "@chakra-ui/react";
import { useEffect } from "react";

export default function ListItemButton({
  switchState,
  addCallback,
  cancelCallback,
  ...props
}) {
  return (
    <ButtonGroup {...props}>
      {switchState ? (
        <Tooltip
          label="Make Post"
          aria-label="Add Item Tooltip"
          placement="top"
          openDelay={300}
          fontSize="xl"
        >
          <IconButton
            height={75}
            width={75}
            isRound={true}
            colorScheme="twitter"
            aria-label="Add Item"
            fontSize="30px"
            icon={<AddIcon />}
            onClick={addCallback}
          />
        </Tooltip>
      ) : (
        <Tooltip
          label="Cancel Post"
          aria-label="Cancel Item Tooltip"
          placement="top"
          openDelay={300}
          fontSize="xl"
        >
          <IconButton
            height={75}
            width={75}
            isRound={true}
            colorScheme="red"
            aria-label="Cancel Adding Item"
            fontSize="30px"
            icon={<CloseIcon />}
            onClick={cancelCallback}
          />
        </Tooltip>
      )}
    </ButtonGroup>
  );
}
