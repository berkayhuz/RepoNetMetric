import { AccountFooter } from "@/features/account/components/account-footer";
import { AccountHeader } from "@/features/account/components/account-header";

type AccountShellProps = {
  children: React.ReactNode;
};

export function AccountShell({ children }: AccountShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only left-4 top-4 z-50 rounded-md bg-background px-3 py-2 focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>
      <AccountHeader />
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <AccountFooter />
    </div>
  );
}
