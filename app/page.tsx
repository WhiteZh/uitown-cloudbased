import Link from "next/link";
import {coolJazzFont} from "@/lib/fonts";
import styles from "@/app/styles.module.css";

export default function Home() {
  return (
    <>
      <div className="mx-auto mt-16 max-w-screen-2xl px-5 flex flex-row text-white">
        <div className={`lg:block hidden rounded-2xl flex-grow min-w-[30rem] h-[48rem] ${styles.house_of_ui_img}`}></div>
        <div className={`text-center lg:max-w-[48rem] lg:text-left lg:pl-10 pt-12`}>
          <h4 className="font-thin text-sm">HI I'M UI-TOWN</h4>
          <h2 className="font-thin text-7xl text-[#D0C3F1] mt-16">
            A town of UI which brings your design to life.
          </h2>
          <h3 className={`tracking-widest leading-9 text-lg lg:max-w-lg ps-1.5 ${coolJazzFont.className} mt-16`}>
            "At UI-town, we offer a vast array of CSS and JS animations to elevate your web projects.
            Our dynamic animations and interactive effects make your user interfaces not just functional but truly captivating."
          </h3>
          <Link
              href={`/browse`}
              className="ms-0.5 w-40 mt-8 py-4 text-center rounded-full inline-block bg-[#D0C3F1] text-[rgb(85,26,139)] hover:text-white"
          >
            Enter
          </Link>
        </div>
      </div>
    </>
  );
}
