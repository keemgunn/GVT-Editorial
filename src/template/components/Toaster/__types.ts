export {}
declare global {

  type ToastType = 'message' | 'alert' | 'error' | 'warning' | 'positive';

  interface ToastData {
    id: string;
    message: string;
    type: ToastType;
    timer: boolean;
  }

}