import { redirect } from "next/navigation";

export default function AdminRootPage() {
  redirect("/admin/dashboard");

  // This component will not be rendered because of the redirect.
  // It's just here to satisfy Next.js's requirement for a default export.
  return null;
}
