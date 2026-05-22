import RightDrawer from "components/components/RightDrawer";

const ListComment = ({ open, onClose }) => {
    return (
        <RightDrawer
            open={open}
            onClose={onClose}
            title="Comentarios"
        >

        </RightDrawer>
    );
}

export default ListComment;