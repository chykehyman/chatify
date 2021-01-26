import SwtAlt2 from 'sweetalert2';

const Toast = SwtAlt2.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', SwtAlt2.stopTimer);
    toast.addEventListener('mouseleave', SwtAlt2.resumeTimer);
  },
});

const makeToast = (type, msg) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export default makeToast;
