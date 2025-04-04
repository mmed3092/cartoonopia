import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { queryClient } from "./api/QueryClient"
import { ComparisonProvider } from "./contexts/ComparisonContext.tsx"
import { AuthProvider } from "./contexts/AuthContext.tsx"
import { QueryClientProvider } from "@tanstack/react-query"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ComparisonProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ComparisonProvider>
    </AuthProvider>
  </React.StrictMode>
)
