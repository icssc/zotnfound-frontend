import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import { IconButton, Tooltip, ButtonGroup } from "@chakra-ui/react";

export default function ListItemButton({
  switchState,
  addCallback,
  cancelCallback,
  ...props
}) {
  return (
    <ButtonGroup {...props} zIndex={1000} variant="solid">
      <Tooltip
        label={switchState ? "Make Post" : "Cancel Post"}
        aria-label="Item Tooltip"
        placement="top"
        openDelay={300}
        closeOnClick
        closeOnPointerDown
        fontSize="xl"
      >
        {switchState ? (
          <IconButton
            height={75}
            width={75}
            isRound={true}
            backgroundColor="#74a2fa"
            color={"white"}
            _hover={{
              background: "#365fad",
            }}
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
