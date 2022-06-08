import { useState, Fragment } from "react";
import {
  ListItemIcon,
  ListItemText,
  Typography,
  Menu,
  Button,
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
        <AddBox color="error" /><Typography variant="h5" sx={{ pl: 1 }}>Agregar Opción</Typography>
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
          <Item key={item} onClick={() => handleClose(item)}>
            <ListItemIcon>
              {item.selected ? <CheckBox color="error" /> : <CheckBoxOutlined color="error" />}
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5">{item.title}</Typography>
            </ListItemText>
          </Item>
        ))}
      </Menu>
    </Fragment>
  );
};

export default MenuItems;