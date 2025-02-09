// src/components/FilterSelector.tsx
import React from "react";
import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface FilterSelectorProps {
  onSelectFilter: (filter: string, value: string) => void;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({ onSelectFilter }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Filter by
      </MenuButton>
      <MenuList>
        {/* Filter by Status */}
        <MenuItem onClick={() => onSelectFilter("Status", "Completed")}>
          Status: Completed
        </MenuItem>
        <MenuItem onClick={() => onSelectFilter("Status", "In Progress")}>
          Status: In Progress
        </MenuItem>

        {/* Filter by Priority */}
        <MenuItem onClick={() => onSelectFilter("Priority", "High")}>
          Priority: High
        </MenuItem>
        <MenuItem onClick={() => onSelectFilter("Priority", "Low")}>
          Priority: Low
        </MenuItem>

        {/* Filter by Due Date */}
        <MenuItem onClick={() => onSelectFilter("Due_date", "2025-01-01")}>
          Due Date: 2025-01-01
        </MenuItem>
        <MenuItem onClick={() => onSelectFilter("Due_date", "2025-02-01")}>
          Due Date: 2025-02-01
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FilterSelector;
