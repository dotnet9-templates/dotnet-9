using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Queries
{
    public class GetReactivityList
    {
        public class Query : IRequest<List<Reactivity>> {}

        // inject the db context into the handler.
        public class Handler(AppDbContext context, ILogger<GetReactivityList> logger) : IRequestHandler<Query, List<Reactivity>>
        {
            public async Task<List<Reactivity>> Handle(Query request, CancellationToken cancellationToken)
            {
                try {
                    for (int i = 0; i < 10; i++) {
                    await Task.Delay(1000, cancellationToken);
                    logger.LogInformation($"Task {i} has completed");
                    }
                }
                catch (Exception) 
                {
                    logger.LogInformation("Task was cancelled");
                }
                return await context.Reactivities.ToListAsync(cancellationToken);
            }
        }
    }
}