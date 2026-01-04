using Domain;
using MediatR;
using Persistence;

namespace Application.Reactivities.Commands
{
    public class CreateReactivity
    {
        // This command returns a string, which represents the newly created ReactivityId.
        // Although commands in CQRS often return Unit, MediatR allows commands to return values,
        // and returning an identifier is a common and valid pattern.
        public class Command : IRequest<string>
        {
            public required Reactivity Reactivity { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Reactivities.Add(request.Reactivity);

                await context.SaveChangesAsync(cancellationToken);

                // Return the ReactivityId after the entity has been persisted.
                // This value can be used by the controller (e.g., for routing or follow-up actions),
                // without returning the full entity to the client.
                return request.Reactivity.ReactivityId;
            }
        }
    }
}