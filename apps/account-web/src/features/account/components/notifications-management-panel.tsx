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
import type { AccountDateSettings } from "@/lib/account-date";

import { markAllNotificationsAsReadAction } from "../actions/notification-actions";
import { initialMutationState } from "../actions/mutation-state";
import { NotificationList } from "./notification-list";
import { NotificationPreferencesPanel } from "./notification-preferences-panel";
import { SecurityActionResult } from "./security-action-result";
import { tAccountClient } from "@/lib/i18n/account-i18n";

type NotificationsManagementPanelProps = {
  notifications: AccountNotificationsResponse;
  preferences: NotificationPreferencesResponse;
  activeFilter: "all" | "unread" | "read";
  dateSettings: AccountDateSettings;
};

function MarkAllButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant="outline">
      {pending
        ? tAccountClient("account.common.updating")
        : tAccountClient("account.notifications.markAllRead")}
    </Button>
  );
}

export function NotificationsManagementPanel({
  notifications,
  preferences,
  activeFilter,
  dateSettings,
}: NotificationsManagementPanelProps) {
  const [markAllState, markAllAction] = useActionState(
    markAllNotificationsAsReadAction,
    initialMutationState,
  );
  const filterLabels: Record<"all" | "unread" | "read", string> = {
    all: tAccountClient("account.common.all"),
    unread: tAccountClient("account.notifications.unreadLabel"),
    read: tAccountClient("account.notifications.readLabel"),
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.notifications.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.notifications.managementDescription")}
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.notifications.filtersTitle")}</CardTitle>
          <CardDescription>
            {tAccountClient("account.notifications.filtersDescription")}
          </CardDescription>
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
            successTitle={tAccountClient("account.notifications.updated")}
            errorTitle={tAccountClient("account.notifications.bulkActionFailed")}
          />
          <form action={markAllAction}>
            <input type="hidden" name="confirm" value="mark-all-read" />
            <MarkAllButton />
          </form>
        </CardContent>
      </Card>

      <NotificationList notifications={notifications} dateSettings={dateSettings} />
      <NotificationPreferencesPanel preferences={preferences} />
    </section>
  );
}
