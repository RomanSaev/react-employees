import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ConfigProvider, theme } from "antd"
import { store } from "./app/store"
import { Paths } from "./paths"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import "./index.css"

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <h1>Employees App</h1>
  },
  {
    path: Paths.login,
    element: <Login />
  },
  {
    path: Paths.register,
    element: <Register />
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider theme={{
          algorithm: theme.darkAlgorithm
        }}>
          <RouterProvider router={router}/>
        </ConfigProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
