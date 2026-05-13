"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type {
  AccountNotificationsResponse,
  NotificationPreferencesResponse,
} from "@/lib/account-api";

import { markAllNotificationsAsReadAction } from "../actions/notification-actions";
import { initialMutationState } from "../actions/mutation-state";
import { NotificationList } from "./notification-list";
import { NotificationPreferencesPanel } from "./notification-preferences-panel";
import { SecurityActionResult } from "./security-action-result";

type NotificationsManagementPanelProps = {
  notifications: AccountNotificationsResponse;
  preferences: NotificationPreferencesResponse;
  activeFilter: "all" | "unread" | "read";
};

function MarkAllButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant="outline">
      {pending ? "Updating..." : "Mark all as read"}
    </Button>
  );
}

export function NotificationsManagementPanel({
  notifications,
  preferences,
  activeFilter,
}: NotificationsManagementPanelProps) {
  const [markAllState, markAllAction] = useActionState(
    markAllNotificationsAsReadAction,
    initialMutationState,
  );
  const filterLabels: Record<"all" | "unread" | "read", string> = {
    all: "All",
    unread: "Unread",
    read: "Read",
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Notifications</Heading>
        <Text className="text-muted-foreground">
          Review account events, manage read state, and update notification preferences.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters and bulk actions</CardTitle>
          <CardDescription>Choose a filter and apply bulk actions when needed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["all", "unread", "read"] as const).map((filter) => (
              <Link
                key={filter}
                href={filter === "all" ? "/notifications" : `/notifications?filter=${filter}`}
              >
                <Button variant={activeFilter === filter ? "default" : "outline"} size="sm">
                  {filterLabels[filter]}
                </Button>
              </Link>
            ))}
          </div>
          <SecurityActionResult
            state={markAllState}
            successTitle="Notifications updated"
            errorTitle="Bulk action failed"
          />
          <form action={markAllAction}>
            <input type="hidden" name="confirm" value="mark-all-read" />
            <MarkAllButton />
          </form>
        </CardContent>
      </Card>

      <NotificationList notifications={notifications} />
      <NotificationPreferencesPanel preferences={preferences} />
    </section>
  );
}
