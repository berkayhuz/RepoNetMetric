import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

import type { AccountNotificationsResponse } from "@/lib/account-api";
import type { AccountDateSettings } from "@/lib/account-date";

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
          <CardTitle>Notifications</CardTitle>
          <CardDescription>No notifications available for this filter.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Notification summary</CardTitle>
          <CardDescription>Overview of current notification state.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-3">
          <Text className="text-sm text-muted-foreground">Total: {notifications.totalCount}</Text>
          <Text className="text-sm text-muted-foreground">Unread: {notifications.unreadCount}</Text>
          <Text className="text-sm text-muted-foreground">Read: {notifications.readCount}</Text>
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
