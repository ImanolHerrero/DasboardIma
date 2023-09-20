export interface User {
    createdAt: string;
    deletedAt: string | null;
    email: string;
    id: string;
    image: string | null;
    otpCounter: number;
    otpSecret: string | null;
    password: string;
    premium: boolean;
    updatedAt: string;
    username: string;
  }