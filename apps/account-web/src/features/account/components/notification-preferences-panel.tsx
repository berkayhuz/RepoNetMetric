"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldLabel,
  Heading,
  Input,
  Text,
} from "@netmetric/ui";

import type { NotificationPreferencesResponse } from "@/lib/account-api";

import { updateNotificationPreferencesAction } from "../actions/notification-actions";
import { initialMutationState } from "../actions/mutation-state";
import { SecurityActionResult } from "./security-action-result";

type NotificationPreferencesPanelProps = {
  preferences: NotificationPreferencesResponse;
};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save preferences"}
    </Button>
  );
}

export function NotificationPreferencesPanel({ preferences }: NotificationPreferencesPanelProps) {
  const [state, formAction] = useActionState(
    updateNotificationPreferencesAction,
    initialMutationState,
  );

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <Heading level={3}>Notification preferences</Heading>
        <Text className="text-sm text-muted-foreground">
          Configure delivery channels per notification category.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preference settings</CardTitle>
          <CardDescription>Changes apply to future account notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SecurityActionResult
            state={state}
            successTitle="Preferences saved"
            errorTitle="Preferences update failed"
          />
          <form action={formAction} className="space-y-4">
            <div className="grid gap-3">
              {preferences.items.map((item) => {
                const key = `${item.channel}|${item.category}`;
                return (
                  <Field key={item.id}>
                    <FieldLabel htmlFor={`enabled-${item.id}`}>
                      {item.channel} - {item.category}
                    </FieldLabel>
                    <FieldContent>
                      <input type="hidden" name={`pref:${item.id}`} value={key} />
                      <Input
                        id={`enabled-${item.id}`}
                        name={`enabled:${key}`}
                        type="checkbox"
                        defaultChecked={item.isEnabled}
                        aria-label={`${item.channel} ${item.category} notification toggle`}
                      />
                    </FieldContent>
                  </Field>
                );
              })}
            </div>
            <SaveButton />
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
