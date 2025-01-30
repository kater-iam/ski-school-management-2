import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider } from "./providers";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Login } from "./pages/login";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { LessonList } from "./pages/lessons/list";
import { LessonCreate } from "./pages/lessons/create";
import { LessonEdit } from "./pages/lessons/edit";
import { LessonShow } from "./pages/lessons/show";
import { ReservationList } from "./pages/reservations/list";
import { ReservationCreate } from "./pages/reservations/create";
import { ReservationEdit } from "./pages/reservations/edit";
import { ReservationShow } from "./pages/reservations/show";
import { ProfileList } from "./pages/profiles/list";
import { ProfileCreate } from "./pages/profiles/create";
import { ProfileEdit } from "./pages/profiles/edit";
import { ProfileShow } from "./pages/profiles/show";
import { UserLevelList } from "./pages/user-levels/list";
import { UserLevelCreate } from "./pages/user-levels/create";
import { UserLevelEdit } from "./pages/user-levels/edit";
import { UserLevelShow } from "./pages/user-levels/show";

function App() {
  return (
    (<BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider}
            authProvider={authProvider}
            resources={[
              {
              name: "lesson_levels",
              list: "/lesson-levels",
              create: "/lesson-levels/create",
              edit: "/lesson-levels/edit/:id",
              show: "/lesson-levels/show/:id",
              meta: {
                canDelete: true,
              },
            },  {
              name: "lesson_schedules",
              list: "/lesson-schedules",
              create: "/lesson-schedules/create",
              edit: "/lesson-schedules/edit/:id",
              show: "/lesson-schedules/show/:id",
              meta: {
                canDelete: true,
              },
            },
            {
              name: "lessons",
              list: "/lessons",
              create: "/lessons/create",
              edit: "/lessons/edit/:id",
              show: "/lessons/show/:id",
              meta: {
                canDelete: true,
              },
            },{
              name: "profiles",
              list: "/profiles",
              create: "/profiles/create",
              edit: "/profiles/edit/:id",
              show: "/profiles/show/:id",
              meta: {
                canDelete: true,
              },
            }, {
              name: "reservations",
              list: "/reservations",
              create: "/reservations/create",
              edit: "/reservations/edit/:id",
              show: "/reservations/show/:id",
              meta: {
                canDelete: true,
              },
            },{
              name: "user_levels",
              list: "/user_levels",
              create: "/user_levels/create",
              edit: "/user_levels/edit/:id",
              show: "/user_levels/show/:id"
            }]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<Login />}>
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route index element={<Home />} />
                <Route path="/lessons">
                  <Route index element={<LessonList />} />
                  <Route path="create" element={<LessonCreate />} />
                  <Route path="edit/:id" element={<LessonEdit />} />
                  <Route path="show/:id" element={<LessonShow />} />
                </Route>
                <Route path="/reservations">
                  <Route index element={<ReservationList />} />
                  <Route path="create" element={<ReservationCreate />} />
                  <Route path="edit/:id" element={<ReservationEdit />} />
                  <Route path="show/:id" element={<ReservationShow />} />
                </Route>
                <Route path="/profiles">
                  <Route index element={<ProfileList />} />
                  <Route path="create" element={<ProfileCreate />} />
                  <Route path="edit/:id" element={<ProfileEdit />} />
                  <Route path="show/:id" element={<ProfileShow />} />
                </Route>
                <Route path="/user-levels">
                  <Route index element={<UserLevelList />} />
                  <Route path="create" element={<UserLevelCreate />} />
                  <Route path="edit/:id" element={<UserLevelEdit />} />
                  <Route path="show/:id" element={<UserLevelShow />} />
                </Route>
              </Route>
            </Routes>
          </Refine>
          <RefineKbar />
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>)
  );
}

export default App; 
