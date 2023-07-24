import { Alert } from "@mui/material"

export type ErrorBannerProps = {
  customMessage?: string;
};

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ customMessage }) => {
  return (
    <Alert severity="error" variant="outlined">
      {customMessage || "We're sorry, something went wrong. Please try again."}
    </Alert>
  )
}
