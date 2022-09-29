import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const options = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
}

const T = MySwal.mixin(options)

const SimpleToast = {
  success: title => T.fire({ icon: 'success', title }),
  info: title => T.fire({ icon: 'info', title }),
  warning: title => T.fire({ icon: 'warning', title }),
  error: title => T.fire({ icon: 'error', title }),
}

export default SimpleToast
