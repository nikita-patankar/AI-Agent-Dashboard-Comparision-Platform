import Swal from "sweetalert2";

export const swal = Swal.mixin({
  buttonsStyling: false,

  customClass: {
    popup: "rounded-2xl",

    confirmButton:
      "mx-2 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700",

    cancelButton:
      "mx-2 rounded-lg bg-gray-300 px-5 py-2 text-black hover:bg-gray-400",
  },
});