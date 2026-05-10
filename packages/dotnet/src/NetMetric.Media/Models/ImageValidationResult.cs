namespace NetMetric.Media.Models;

public sealed record ImageValidationResult(
    bool IsValid,
    string? FailureReason,
    string? CanonicalContentType,
    string? Extension);