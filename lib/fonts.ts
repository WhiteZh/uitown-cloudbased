import localFont from "next/font/local";
import {Roboto, Zhi_Mang_Xing} from "next/font/google";

export const coolJazzFont = localFont({
    src: "../fonts/Cooljazz.ttf",
});

export const zhiMangXingFont = Zhi_Mang_Xing({
    weight: "400",
    subsets: ['latin'],
})

export const robotoFont = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ['latin'],
});