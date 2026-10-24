// import type { ReactNode } from "react";

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// export default function AuthLayout({
//   children,
// }: AuthLayoutProps) {
//   return (
//     <div className="min-h-screen bg-slate-100">
//       {children}
//     </div>
//   );
// }

// import type { ReactNode } from "react";

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// export default function AuthLayout({ children }: AuthLayoutProps) {
//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-900 antialiased">
//       {children}
//     </div>
//   );
// }


// import type { ReactNode } from "react";

// export default function AuthLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="min-h-screen bg-[#F4F6F8] text-slate-900 antialiased">
//       {children}
//     </div>
//   );
// }


import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#292D29] antialiased">
      {children}
    </div>
  );
}