import LoginForm from "./login-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export const runtime = "nodejs";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  const initialNotice =
    error === "CredentialsSignin"
      ? "Email or password is incorrect."
      : error
        ? "Sign-in could not be completed. Please try again."
        : "";

  return <LoginForm initialNotice={initialNotice} />;
}
