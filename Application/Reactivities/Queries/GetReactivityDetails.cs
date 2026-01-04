using Domain;
using MediatR;
using Persistence;

namespace Application.Queries
{
    public class GetReactivityDetails
    {
        public class Query : IRequest<Reactivity> 
        {
            public required string ReactivityId { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Reactivity>
        {
            public async Task<Reactivity> Handle(Query request, CancellationToken cancellationToken)
            {
                var reactivity = await context.Reactivities.FindAsync([request.ReactivityId], cancellationToken); // written this way to get rid of the ellipsis warning about cancellationToken.
                if (reactivity == null) throw new Exception("Reactivity not found");
                return reactivity;
            }
        }
    }
}