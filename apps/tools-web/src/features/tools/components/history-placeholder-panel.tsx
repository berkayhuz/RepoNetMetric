import Link from "next/link";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@netmetric/ui";

import { toolsEnv } from "@/lib/tools-env";

type HistoryPlaceholderPanelProps = {
  runId?: string;
};

export function HistoryPlaceholderPanel({ runId }: HistoryPlaceholderPanelProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>History is coming in a later phase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTitle>Not implemented yet</AlertTitle>
            <AlertDescription>
              Authenticated history, saved artifacts, and downloads will be wired in the next
              backend-integrated phase.
            </AlertDescription>
          </Alert>
          {runId ? (
            <p className="text-sm text-muted-foreground">Requested history entry: {runId}</p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={toolsEnv.authUrl}>Sign in</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to tools catalog</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
