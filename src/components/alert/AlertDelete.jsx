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

export const AlertDelete2 = (title, contenido = <></>) => {
    swal({
        title: "¿Estas seguro?",
        text: "¿Este registro se eliminara, esta seguro de eliminarlo?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}