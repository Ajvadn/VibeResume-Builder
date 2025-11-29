import type { Metadata } from "next";
import {
    Outfit,
    Inter,
    Roboto,
    Open_Sans,
    Lato,
    Montserrat,
    Playfair_Display,
    Merriweather,
    Lora,
    Roboto_Mono,
    Fira_Code
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-roboto" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const merriweather = Merriweather({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-merriweather" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
    title: "Vibe Resume Maker",
    description: "Create ATS-friendly resumes with a vibe.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                outfit.className,
                outfit.variable,
                inter.variable,
                roboto.variable,
                openSans.variable,
                lato.variable,
                montserrat.variable,
                playfair.variable,
                merriweather.variable,
                lora.variable,
                robotoMono.variable,
                firaCode.variable
            )}>{children}</body>
        </html>
    );
}
