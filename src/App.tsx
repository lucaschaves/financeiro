import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { ProfileProvider } from "./context/ProfileContext";
import { TransactionProvider } from "./context/TransactionContext";
import { DashboardPage } from "./pages/DashboardPage";
import { TransactionsPage } from "./pages/TransactionsPage";

export default function App() {
  return (
    <NextUIProvider>
      <ProfileProvider>
        <TransactionProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <div className="p-8">
                <div className="max-w-7xl mx-auto">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route
                      path="/transactions"
                      element={<TransactionsPage />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </TransactionProvider>
      </ProfileProvider>
    </NextUIProvider>
  );
}
