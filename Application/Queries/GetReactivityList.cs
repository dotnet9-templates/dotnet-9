using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries
{
    public class GetReactivityList
    {
        public class Query : IRequest<List<Reactivity>> {}

        // inject the db context into the handler.
        public class Handler(AppDbContext context) : IRequestHandler<Query, List<Reactivity>>
        {
            public async Task<List<Reactivity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Reactivities.ToListAsync(cancellationToken);
            }
        }
    }
}