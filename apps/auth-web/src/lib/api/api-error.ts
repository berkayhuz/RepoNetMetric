import type { ProblemDetails } from "./problem-details";

export class ApiError extends Error {
  public readonly status: number;
  public readonly problem: ProblemDetails | undefined;

  public constructor(message: string, status: number, problem?: ProblemDetails) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.problem = problem;
  }
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return (
      error.problem?.detail ??
      error.problem?.title ??
      error.message ??
      "Operation could not be completed."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error.";
}
