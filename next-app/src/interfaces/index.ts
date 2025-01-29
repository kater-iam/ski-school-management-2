import { BaseKey } from "@refinedev/core";

export interface ILessonLevel {
  id: BaseKey;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ILesson {
  id: BaseKey;
  level_id: BaseKey;
  name: string;
  description: string;
  duration: number;
  max_participants: number;
  created_at: string;
  updated_at: string;
}

export interface ILessonSchedule {
  id: BaseKey;
  lesson_id: BaseKey;
  instructor_id: BaseKey;
  start_time: string;
  end_time: string;
  status: "open" | "closed";
  created_at: string;
  updated_at: string;
}

export interface IReservation {
  id: BaseKey;
  schedule_id: BaseKey;
  user_id: BaseKey;
  status: "confirmed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface IProfile {
  id: BaseKey;
  user_id: BaseKey;
  first_name: string;
  last_name: string;
  phone: string;
  emergency_contact: string;
  created_at: string;
  updated_at: string;
}

export interface IUserLevel {
  id: BaseKey;
  user_id: BaseKey;
  level_id: BaseKey;
  achieved_date: string;
  instructor_comment: string | null;
  created_at: string;
  updated_at: string;
} 