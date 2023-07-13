import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout.jsx";
import { store, persistor } from "@/lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
