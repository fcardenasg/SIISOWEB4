import PropTypes from 'prop-types';
import swal from 'sweetalert';

export const AlertDelete = (title) => {
    swal(
        {
            title: "Good job!",
            text: title,
            icon: "success",
            button: "Aww yiss!",
        }
    )
}