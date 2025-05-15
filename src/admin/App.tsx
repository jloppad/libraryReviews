import { Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { customDataProvider } from "./dataProvider.ts"; 
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header/index.tsx";
import { ColorModeContextProvider } from "./contexts/color-mode/index.tsx";

// BOOKS
import { BookList } from "./pages/books/list.tsx";
import { BookCreate } from "./pages/books/create.tsx";
import { BookEdit } from "./pages/books/edit.tsx";
import { BookShow } from "./pages/books/show.tsx";

// USERS
import { UserList } from "./pages/users/list.tsx";
import { UserCreate } from "./pages/users/create.tsx";
import { UserEdit } from "./pages/users/edit.tsx";
import { UserShow } from "./pages/users/show.tsx";

// COMMENTS
import { CommentList } from "./pages/comments/list.tsx";
import { CommentCreate } from "./pages/comments/create.tsx";
import { CommentEdit } from "./pages/comments/edit.tsx";
import { CommentShow } from "./pages/comments/show.tsx";

// RATINGS
import { RatingList } from "./pages/ratings/list.tsx";
import { RatingCreate } from "./pages/ratings/create.tsx";
import { RatingEdit } from "./pages/ratings/edit.tsx";
import { RatingShow } from "./pages/ratings/show.tsx";

// BOOK IMAGES
import { BookImageList } from "./pages/bookImages/list.tsx";
import { BookImageCreate } from "./pages/bookImages/create.tsx";
import { BookImageEdit } from "./pages/bookImages/edit.tsx";
import { BookImageShow } from "./pages/bookImages/show.tsx";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
            <Refine
                  dataProvider={customDataProvider}
                  notificationProvider={useNotificationProvider}
                  routerProvider={routerBindings}
                  resources={[
                    {
                      name: "books",
                      list: "/books",
                      create: "/books/create",
                      edit: "/books/edit/:id",
                      show: "/books/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },
                    {
                      name: "users",
                      list: "/users",
                      create: "/users/create",
                      edit: "/users/edit/:id",
                      show: "/users/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },
                    {
                      name: "comments",
                      list: "/comments",
                      create: "/comments/create",
                      edit: "/comments/edit/:id",
                      show: "/comments/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },
                    {
                      name: "ratings", 
                      list: "/ratings",
                      create: "/ratings/create",
                      edit: "/ratings/edit/:id",
                      show: "/ratings/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },
                    {
                      name: "book_images",  
                      list: "/book_images",
                      create: "/book_images/create",
                      edit: "/book_images/edit/:id",
                      show: "/book_images/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "GM7fiQ-Qvin00-Th9D1S",
                  }}
                >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2 
                        Header={() => <Header sticky />}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        Title={() => (
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px" }}>
                            <img src="./favicon.ico" alt="logo" style={{ width: 30, height: 30 }} />
                            <span style={{ fontWeight: "bold", fontSize: "14px", color: "white"}}>
                              Library Reviews Admin
                            </span>
                          </div>
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="users" />}
                    />
                    <Route path="/admin" element={<NavigateToResource resource="users" />} />
                    <Route path="/books">
                      <Route index element={<BookList />} />
                      <Route path="create" element={<BookCreate />} />
                      <Route path="edit/:id" element={<BookEdit />} />
                      <Route path="show/:id" element={<BookShow />} />
                    </Route>
                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
                    </Route>
                    <Route path="/comments">
                      <Route index element={<CommentList />} /> 
                      <Route path="create" element={<CommentCreate />} />
                      <Route path="edit/:id" element={<CommentEdit />} /> 
                      <Route path="show/:id" element={<CommentShow />} /> 
                    </Route>
                    <Route path="/ratings"> 
                      <Route index element={<RatingList />} /> 
                      <Route path="create" element={<RatingCreate />} /> 
                      <Route path="edit/:id" element={<RatingEdit />} /> 
                      <Route path="show/:id" element={<RatingShow />} /> 
                    </Route>
                    <Route path="/book_images">  
                      <Route index element={<BookImageList />} />
                      <Route path="create" element={<BookImageCreate />} />
                      <Route path="edit/:id" element={<BookImageEdit />} />
                      <Route path="show/:id" element={<BookImageShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
