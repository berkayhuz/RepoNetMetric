import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@netmetric/ui";

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-sm leading-6">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}
