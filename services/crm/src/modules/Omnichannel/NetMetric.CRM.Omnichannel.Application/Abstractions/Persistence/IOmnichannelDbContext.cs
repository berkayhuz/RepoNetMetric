using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.Omnichannel.Domain.Entities;

namespace NetMetric.CRM.Omnichannel.Application.Abstractions.Persistence;

public interface IOmnichannelDbContext
{
    DbSet<ChannelAccount> Accounts { get; }
    DbSet<ChannelConversation> Conversations { get; }
    DbSet<ChannelMessage> Messages { get; }
    DbSet<ConversationNote> Notes { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
