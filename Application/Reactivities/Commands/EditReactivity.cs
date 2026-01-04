using Domain;
using MediatR;
using Persistence;

namespace Application.Reactivities.Commands
{
    public class EditReactivity
    {
        public class Command: IRequest
        {
            public required Reactivity Reactivity { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var reactivity = await context.Reactivities.FindAsync([request.Reactivity.ReactivityId], cancellationToken) ?? throw new Exception("Reactivity not found");

                reactivity.Title = request.Reactivity.Title;

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}