using MediatR;
using Persistence;

namespace Application.Reactivities.Commands
{
    public class DeleteReactivity
    {
        public class Command: IRequest
        {
            public required string ReactivityId { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var reactivity = await context.Reactivities.FindAsync([request.ReactivityId], cancellationToken) ?? throw new Exception("Reactivity not found");

                context.Remove(reactivity);

                await context.SaveChangesAsync(cancellationToken);

            }
        }
    }
}