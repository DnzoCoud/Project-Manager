export interface LoginDto {
  email: string;
  password: string;
}

export interface ValidatePasswordDto {
  password: string; // Aquí se recibe la contraseña sin cifrar
  hash: string; // Aquí se recibe el hash de la contraseña
}
