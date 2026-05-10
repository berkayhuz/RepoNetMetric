namespace NetMetric.Auth.TestKit.Fakes;

public sealed class FakeEmailSender
{
    private readonly List<EmailEnvelope> _messages = [];

    public IReadOnlyCollection<EmailEnvelope> Messages => _messages;

    public void Send(string to, string subject, string body)
    {
        _messages.Add(new EmailEnvelope(to, subject, body));
    }

    public sealed record EmailEnvelope(string To, string Subject, string Body);
}

