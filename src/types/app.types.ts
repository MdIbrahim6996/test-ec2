import { JwtPayload } from "jsonwebtoken";

export interface IJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  employeeId: string;
  phone: string;
  isBlocked: boolean;
  role: string;
}