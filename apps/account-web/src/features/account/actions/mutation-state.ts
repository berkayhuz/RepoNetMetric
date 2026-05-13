export type MutationState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
  data?: {
    setup?: {
      sharedKey: string;
      authenticatorUri: string;
    };
    recoveryCodes?: string[];
    mfaEnabled?: boolean;
  };
};

export const initialMutationState: MutationState = {
  status: "idle",
};
