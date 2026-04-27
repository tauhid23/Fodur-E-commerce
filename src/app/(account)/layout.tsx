import { redirect } from "next/navigation";

// Replace with your real auth check (next-auth, clerk, etc.)
async function getSession() {
  return null; // your session logic here
}

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const session = await getSession();

//   if (!session) redirect("/login");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Optional: account sidebar/nav here */}
      {children}
    </div>
  );
}