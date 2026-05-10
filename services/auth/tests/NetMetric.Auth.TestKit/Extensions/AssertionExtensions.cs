using System.Net;
using FluentAssertions;

namespace NetMetric.Auth.TestKit.Extensions;

public static class AssertionExtensions
{
    public static void ShouldHaveStatus(this HttpResponseMessage response, HttpStatusCode expected)
    {
        response.StatusCode.Should().Be(expected);
    }
}

