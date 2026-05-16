import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

import type { AccountNotificationsResponse } from "@/lib/account-api";
import type { AccountDateSettings } from "@/lib/account-date";
import { tAccountClient } from "@/lib/i18n/account-i18n";

import { NotificationItem } from "./notification-item";

type NotificationListProps = {
  notifications: AccountNotificationsResponse;
  dateSettings: AccountDateSettings;
};

export function NotificationList({ notifications, dateSettings }: NotificationListProps) {
  if (notifications.items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.notifications.title")}</CardTitle>
          <CardDescription>{tAccountClient("account.notifications.emptyTitle")}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.notifications.summaryTitle")}</CardTitle>
          <CardDescription>
            {tAccountClient("account.notifications.summaryDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-3">
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.notifications.totalLabel")}: {notifications.totalCount}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.notifications.unreadLabel")}: {notifications.unreadCount}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.notifications.readLabel")}: {notifications.readCount}
          </Text>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {notifications.items.map((item) => (
          <NotificationItem key={item.id} item={item} dateSettings={dateSettings} />
        ))}
      </div>
    </section>
  );
}
