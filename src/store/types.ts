import User from "@/types/User";

export interface RootState {
  isLoggedIn: boolean;
  user: User | null;
}
