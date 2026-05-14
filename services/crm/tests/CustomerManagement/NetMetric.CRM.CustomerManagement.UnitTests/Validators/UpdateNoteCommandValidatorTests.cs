using NetMetric.CRM.CustomerManagement.Application.Features.Notes.Commands.UpdateNote;
using NetMetric.CRM.CustomerManagement.Application.Validators;

namespace NetMetric.CRM.CustomerManagement.Tests.Validators;

public sealed class UpdateNoteCommandValidatorTests
{
    [Fact]
    public void Should_Fail_When_Title_Is_Empty()
    {
        var validator = new UpdateNoteCommandValidator();
        var result = validator.Validate(new UpdateNoteCommand
        {
            NoteId = Guid.NewGuid(),
            Title = string.Empty,
            Content = "content"
        });

        Assert.False(result.IsValid);
    }
}
