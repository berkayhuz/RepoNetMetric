// <copyright file="IRefreshTokenService.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using NetMetric.Auth.Application.Descriptors;

namespace NetMetric.Auth.Application.Abstractions;

public interface IRefreshTokenService
{
    RefreshTokenDescriptor Generate();
    bool Verify(string refreshToken, string refreshTokenHash);
}
