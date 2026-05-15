import Image from "next/image";
import { Text } from "@netmetric/ui";

type UserAvatarProps = {
  displayName: string;
  avatarUrl?: string | null;
};

function initials(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "U";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserAvatar({ displayName, avatarUrl }: UserAvatarProps) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={`${displayName} avatar`}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full border border-border object-cover"
      />
    );
  }

  return (
    <div
      aria-label={`${displayName} default avatar`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted"
    >
      <Text className="text-sm font-semibold">{initials(displayName)}</Text>
    </div>
  );
}
