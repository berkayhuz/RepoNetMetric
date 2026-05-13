import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@netmetric/ui";
import Link from "next/link";

export function ToolsHero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <Badge className="w-fit" variant="secondary">
            Public Tools Platform
          </Badge>
          <CardTitle className="text-3xl">
            Fast tools that run where your data is: your browser
          </CardTitle>
          <CardDescription>
            Use tools as a guest with local downloads, or sign in to explicitly save output history
            to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/qr-generator">Try QR Generator</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
