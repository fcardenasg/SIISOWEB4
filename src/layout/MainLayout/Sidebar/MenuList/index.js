// project imports
import NavGroup from './NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const systemMenu = window.localStorage.getItem('systemMenu');
    const menuRender = JSON.parse(systemMenu);

    const navItems = menuRender?.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <></>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
