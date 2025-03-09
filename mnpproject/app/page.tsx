'use client'
import { redirect } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function Page() {
  const { user } = useUser();
  if (!user) {
    redirect("/main-landing");
  }
  if (user?.role === "manager") {
    redirect("/manager-landing");
  } else if (user?.role === "artist"){
    redirect("/main-landing");
  }
}
