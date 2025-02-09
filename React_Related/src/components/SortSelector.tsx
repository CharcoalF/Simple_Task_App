import React from "react";
import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface SortSelectorProps {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const SortSelector: React.FC<SortSelectorProps> = ({
  onSelectSortOrder,
  sortOrder,
}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Sort by {sortOrder || "None"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectSortOrder("Priority")}>
          Priority
        </MenuItem>
        <MenuItem onClick={() => onSelectSortOrder("Due_date")}>
          Due Date
        </MenuItem>
        <MenuItem onClick={() => onSelectSortOrder("Status")}>Status</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
