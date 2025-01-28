import { Poppins as FontMono, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"], // Especificamos el subconjunto
  weight: ["400", "700"], // Especificamos los pesos que queremos usar
  variable: "--font-mono", // Si quieres aplicar un variable CSS para la fuente
});
