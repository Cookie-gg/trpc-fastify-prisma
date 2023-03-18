"use client";

import { trpc } from "~/libs/tprc";
import styles from "./page.module.css";
import { Inter } from "next/font/google";
import { FormEvent, useCallback, useState } from "react";
import { clientCookies } from "~/libs/cookies-next";

const inter = Inter({ subsets: ["latin"] });

const Signin: React.FC = () => {
  const [msg, setMsg] = useState<string | null>(null);
  const submit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const email = formData["email"];
      const password = formData["password"];
      if (typeof email !== "string" || typeof password !== "string")
        throw new Error("Invalid value");
      const { token, refreshToken } = await trpc.user.signin.mutate({
        body: { email, password },
      });
      clientCookies().token.set(token);
      clientCookies().refreshToken.set(refreshToken);
    } catch (err) {
      err instanceof Error && setMsg(err.message);
    }
  }, []);

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <form className={styles.form} onSubmit={submit}>
        <input type="text" name="email" placeholder="Your email" />
        <input type="text" name="password" placeholder="Your password" />
        <button type="submit">Sign in</button>
        {msg && <p>{msg}</p>}
      </form>
    </main>
  );
};

export default Signin;
