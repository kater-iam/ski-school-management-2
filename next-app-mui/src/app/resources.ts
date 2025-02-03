import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "reservations",
    list: "/reservations",
    show: "/reservations/show/:id",
    create: "/reservations/create",
    edit: "/reservations/edit/:id",
  },
  {
    name: "lesson-schedules",
    list: "/lesson-schedules",
    show: "/lesson-schedules/show/:id",
    create: "/lesson-schedules/create",
    edit: "/lesson-schedules/edit/:id",
  },
  {
    name: "profiles",
    list: "/profiles",
    show: "/profiles/show/:id",
    create: "/profiles/create",
    edit: "/profiles/edit/:id",
  }
]; 