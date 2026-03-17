using Application.Core;
using MediatR;
using Persistence;

namespace Application.Reactivities.Commands
{
    public class DeleteReactivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string ReactivityId { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var reactivity = await context.Reactivities.FindAsync([request.ReactivityId], cancellationToken);

                if (reactivity == null) return Result<Unit>.Failure("Reactivity not found", 404);

                context.Remove(reactivity);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the reactivity", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}