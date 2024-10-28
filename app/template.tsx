"use client";

import { useEffect } from "react";
import NextAuthProvider from "@/Providers/NextAuthProvider";
import { Providers } from "@/redux/store/provider";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
// import ChatBox from "./component/ChatBox";

const Template = ({ children }: { children: React.ReactNode }) => {
  // Font Resizer---Start
  let resizeWindow = () => {
    if (window) {
      var perc = window.innerWidth / 118.9375;
      if (window.innerWidth > 1200) {
        document.body.style.fontSize = `${perc}px`;
      }
    }
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  // Font Resizer---End
  return (
    <>
      <Providers>
        <TawkMessengerReact
          propertyId="66ed49cee5982d6c7bb17c23"
          widgetId="1i87egk2q"
        />
        <NextAuthProvider>{children}</NextAuthProvider>
        {/* <ChatBox data={"#"} /> */}

        {/* <ChatBox data={data?.data} /> */}
      </Providers>
    </>
  );
};

export default Template;

// "use client";

// import { useEffect } from "react";

// const Template = ({ children }: { children: React.ReactNode }) => {
//     // Font Resizer---Start
//     let resizeWindow = () => {
//         if (window) {
//             var perc = window.innerWidth / 118.9375;
//             if (window.innerWidth > 1200) {
//                 document.body.style.fontSize = `${perc}px`;
//             }
//         }
//     };

//     useEffect(() => {
//         resizeWindow();
//         window.addEventListener("resize", resizeWindow);
//         return () => window.removeEventListener("resize", resizeWindow);
//     }, []);

//     // Font Resizer---End
//     return (
//         <>
//             {children}
//         </>
//     );
// };

// export default Template;
