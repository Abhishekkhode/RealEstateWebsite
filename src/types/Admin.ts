export interface Admin {
  id?: string;
  email: string;
  name?: string;
  // role: 'admin' | 'super-admin';
  role:string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}