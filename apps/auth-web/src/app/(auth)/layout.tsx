import { AuthFooter } from "@/features/navigation/components/auth-footer";
import { AuthHeader } from "@/features/navigation/components/auth-header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AuthHeader />
      {children}
      <AuthFooter />
    </div>
  );
}
