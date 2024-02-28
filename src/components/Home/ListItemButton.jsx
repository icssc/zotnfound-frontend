import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import { IconButton, Tooltip, ButtonGroup } from "@chakra-ui/react";

export default function ListItemButton({
  switchState,
  addCallback,
  cancelCallback,
  ...props
}) {
  return (
    <ButtonGroup {...props}>
      <Tooltip
        label={switchState ? "Make Post" : "Cancel Post"}
        aria-label="Item Tooltip"
        placement="top"
        openDelay={500}
        closeOnClick
        closeOnPointerDown
        fontSize="xl"
      >
        {switchState ? (
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
        ) : (
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
        )}
      </Tooltip>
    </ButtonGroup>
  );
}
