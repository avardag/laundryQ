import { useSnackbar } from "notistack";

export default function useSnack() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const successSnack = (message: string) =>
    enqueueSnackbar(message, {
      variant: "success",
    });

  const errorSnack = (message: string) =>
    enqueueSnackbar(message, {
      variant: "error",
    });

  return { successSnack, errorSnack, closeSnackbar };
}
