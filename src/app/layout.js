/* eslint-disable @next/next/no-sync-scripts */
import Navigation from "@/components/navigation";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import App from "@/Wrappers/app";

export const metadata = {
  title: "Organic Mind",
  description: "Personalized to do app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
      </head>
      <body className="flex">
        <App>{children}</App>
      </body>
    </html>
  );
}
