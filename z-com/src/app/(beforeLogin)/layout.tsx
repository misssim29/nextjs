import { ReactNode } from "react";
import styles from "@/app/(beforeLogin)/_component/main.module.css";
import RQProvider from "../_component/RQProvider";

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <RQProvider>
      <div className={styles.container}>
        {children}
        {modal}
      </div>
    </RQProvider>
  );
}

// 주소가 localhost:3001일 때는 children->page.tsx, modal->@modal/default.tsx
// 주소가 localhost:3001/i/flow/login 때는 chldren->i/flow/login/page.tsx, modal->@modal/i/flow/login/page.tsx
