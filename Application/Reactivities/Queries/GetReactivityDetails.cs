using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Queries
{
    public class GetReactivityDetails
    {
        public class Query : IRequest<Result<Reactivity>>
        {
            public required string ReactivityId { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Reactivity>>
        {
            public async Task<Result<Reactivity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var reactivity = await context.Reactivities.FindAsync([request.ReactivityId], cancellationToken);

                if (reactivity == null) return Result<Reactivity>.Failure("Reactivity not found", 404);

                return Result<Reactivity>.Success(reactivity);
            }
        }
    }
}