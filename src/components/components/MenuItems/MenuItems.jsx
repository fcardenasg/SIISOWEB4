import { useState, Fragment } from "react";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  Button,
  Checkbox,
  MenuItem as Item,
} from "@mui/material";
import { CheckBox, CheckBoxOutlined, AddBox } from "@mui/icons-material";

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
    <Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AddBox /> Agregar más opciones
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items.map((item) => (
          <Item onClick={() => handleClose(item)}>
            <ListItemIcon>
              {/* {item.selected ? <CheckBox /> : <CheckBoxOutlined />} */}
              <Checkbox size="10" checked={item.selected} />
            </ListItemIcon>
            <ListItemText>
              {item.title}
            </ListItemText>
          </Item>
        ))}
      </Menu>
    </Fragment>
  );
};

export default MenuItems;