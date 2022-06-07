import { useState } from "react";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as Item,
} from "@mui/material";
import { CheckBox, CheckBoxOutlined, AddBox } from "@mui/icons-material";
import { itemsMenu } from "./items";

const MenuItems = ({ items, selectedItem }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    selectedItem(item);
    setAnchorEl(null);
  };

  return (
    <div>
      <button onClick={handleClick}>
      <div className="flex flex-row gap-1 items-center">
      <AddBox/>
          <span className="font-montserrat text-xs text-gray-700 mr-10">
            Agregar más opciones
          </span>
        </div>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {items.map((item) => (
          <Item onClick={() => handleClose(item)}>
            <ListItemIcon>
              {item.selected ? <CheckBox /> : <CheckBoxOutlined />}
            </ListItemIcon>
            <ListItemText>
            <span className="text-gray-700 font-montserrat font-semibold text-xs">
                {item.title}
              </span>
            </ListItemText>
          </Item>
        ))}
      </Menu>
    </div>
  );
};

export default MenuItems;