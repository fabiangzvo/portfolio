export interface ToastProps {
  content: string | React.ReactNode;
  icon: React.ReactNode;
  reset: () => void;
  timing?: number;
}
