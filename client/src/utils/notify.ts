import { toast } from "sonner";

const TOAST_DURATION = 4000;

export const notify = {
  // Exito
  success: (message: string) => {
    toast.success(message, {
      duration: TOAST_DURATION,
    });
  },

  // Error
  error: (message: string) => {
    toast.error(message, {
      duration: 6000,
    });
  },

  // Promesas
  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      // Aquí configuras el estilo global de las promesas si quieres
    });
  },

  // Info
  info: (message: string) => {
    toast.info(message);
  },
};
