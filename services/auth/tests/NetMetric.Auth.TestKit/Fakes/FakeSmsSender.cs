namespace NetMetric.Auth.TestKit.Fakes;

public sealed class FakeSmsSender
{
    private readonly List<SmsEnvelope> _messages = [];

    public IReadOnlyCollection<SmsEnvelope> Messages => _messages;

    public void Send(string phoneNumber, string message)
    {
        _messages.Add(new SmsEnvelope(phoneNumber, message));
    }

    public sealed record SmsEnvelope(string PhoneNumber, string Message);
}

