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
        <div>
          <AddBox />
          <span>
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
          horizontal: "center",
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
              <span>
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