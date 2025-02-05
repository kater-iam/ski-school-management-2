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
import {
  LessonsList,
  LessonsCreate,
  LessonsEdit,
  LessonsShow,
} from "./pages/lessons";
import {
  InstructorSchedulesList,
  InstructorSchedulesCreate,
  InstructorSchedulesEdit,
  InstructorSchedulesShow,
} from "./pages/instructor_schedules";
import {
  ProfilesList,
  ProfilesCreate,
  ProfilesEdit,
  ProfilesShow,
} from "./pages/profiles";
import { DashboardPage } from "./pages/dashboard";
import { DashboardOutlined } from "@ant-design/icons";

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
                  name: "dashboard",
                  list: "/dashboard",
                  meta: {
                    icon: <DashboardOutlined />,
                    label: "ダッシュボード"
                  }
                }, {
                  name: "lessons",
                  list: "/lessons",
                  create: "/lessons/create",
                  edit: "/lessons/edit/:id",
                  show: "/lessons/show/:id",
                  meta: {
                    label: "レッスン"
                  }
                }, {
                  name: "instructor_schedules",
                  list: "/instructor_schedules",
                  create: "/instructor_schedules/create",
                  edit: "/instructor_schedules/edit/:id",
                  show: "/instructor_schedules/show/:id",
                  meta: {
                    label: "インストラクタースケジュール"
                  }
                }, {
                  name: "lesson_schedules",
                  list: "/lesson_schedules",
                  create: "/lesson_schedules/create",
                  edit: "/lesson_schedules/edit/:id",
                  show: "/lesson_schedules/show/:id",
                  meta: {
                    label: "レッスンスケジュール"
                  }
                }, {
                  name: "reservations",
                  list: "/reservations",
                  create: "/reservations/create",
                  edit: "/reservations/edit/:id",
                  show: "/reservations/show/:id",
                  meta: {
                    label: "予約"
                  }
                }, {
                  name: "profiles",
                  list: "/profiles",
                  create: "/profiles/create",
                  edit: "/profiles/edit/:id",
                  show: "/profiles/show/:id",
                  meta: {
                    label: "プロフィール"
                  }
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
                      element={<NavigateToResource resource="dashboard" />}
                    />
                    <Route path="/dashboard" element={<DashboardPage />} />
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
                    <Route path="/lessons">
                      <Route index element={<LessonsList />} />
                      <Route path="create" element={<LessonsCreate />} />
                      <Route path="edit/:id" element={<LessonsEdit />} />
                      <Route path="show/:id" element={<LessonsShow />} />
                    </Route>
                    <Route path="/instructor_schedules">
                      <Route index element={<InstructorSchedulesList />} />
                      <Route path="create" element={<InstructorSchedulesCreate />} />
                      <Route path="edit/:id" element={<InstructorSchedulesEdit />} />
                      <Route path="show/:id" element={<InstructorSchedulesShow />} />
                    </Route>
                    <Route path="/profiles">
                      <Route index element={<ProfilesList />} />
                      <Route path="create" element={<ProfilesCreate />} />
                      <Route path="edit/:id" element={<ProfilesEdit />} />
                      <Route path="show/:id" element={<ProfilesShow />} />
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
