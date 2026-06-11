import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "./providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santu Connect — Le réseau des entrepreneurs marseillais",
  description:
    "Rejoignez la communauté entrepreneuriale marseillaise. Annuaire, événements et connexions pour faire avancer vos projets.",
  openGraph: {
    title: "Santu Connect — Réseau entrepreneurial à Marseille",
    description:
      "Trouvez vos alliés, participez aux événements et grandissez avec le réseau des entrepreneurs marseillais.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} ${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-santu-canvas text-santu-ink antialiased dark:bg-[#0a1219] dark:text-zinc-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
