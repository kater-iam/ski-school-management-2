import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import {
  ReservationsCreate,
  ReservationsEdit,
  ReservationsList,
  ReservationsShow,
} from "./pages/reservations";
import {
  LessonSchedulesCreate,
  LessonSchedulesEdit,
  LessonSchedulesList,
  LessonSchedulesShow,
} from "./pages/lesson_schedules";
import { supabaseClient } from "./utility";

function App() {
  return (
    (<BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider}
                resources={[{
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                }, {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                }, {
                  name: "lessons",
                  list: "/lessons",
                  create: "/lessons/create",
                  edit: "/lessons/edit/:id",
                  show: "/lessons/show/:id"
                }, {
                  name: "instructor_schedules",
                  list: "/instructor_schedules",
                  create: "/instructor_schedules/create",
                  edit: "/instructor_schedules/edit/:id",
                  show: "/instructor_schedules/show/:id"
                }, {
                  name: "lesson_schedules",
                  list: "/lesson_schedules",
                  create: "/lesson_schedules/create",
                  edit: "/lesson_schedules/edit/:id",
                  show: "/lesson_schedules/show/:id"
                }, {
                  name: "reservations",
                  list: "/reservations",
                  create: "/reservations/create",
                  edit: "/reservations/edit/:id",
                  show: "/reservations/show/:id"
                }, {
                  name: "profiles",
                  list: "/profiles",
                  create: "/profiles/create",
                  edit: "/profiles/edit/:id",
                  show: "/profiles/show/:id"
                }, {
                  name: "user_levels",
                  list: "/user_levels",
                  create: "/user_levels/create",
                  edit: "/user_levels/edit/:id",
                  show: "/user_levels/show/:id"
                }, {
                  name: "lesson_levels",
                  list: "/lesson_levels",
                  create: "/lesson_levels/create",
                  edit: "/lesson_levels/edit/:id",
                  show: "/lesson_levels/show/:id"
                }]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "4plyes-K5CjSp-Al5rrU",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="reservations" />}
                    />
                    <Route path="/reservations">
                      <Route index element={<ReservationsList />} />
                      <Route path="create" element={<ReservationsCreate />} />
                      <Route path="edit/:id" element={<ReservationsEdit />} />
                      <Route path="show/:id" element={<ReservationsShow />} />
                    </Route>
                    <Route path="/lesson_schedules">
                      <Route index element={<LessonSchedulesList />} />
                      <Route path="create" element={<LessonSchedulesCreate />} />
                      <Route path="edit/:id" element={<LessonSchedulesEdit />} />
                      <Route path="show/:id" element={<LessonSchedulesShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                            initialValues: {
                              email: "admin@kater.jp",
                              password: "password123",
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>)
  );
}

export default App;
