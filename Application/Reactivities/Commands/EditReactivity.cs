using AutoMapper;
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
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var reactivity = await context.Reactivities.FindAsync([request.Reactivity.ReactivityId], cancellationToken) ?? throw new Exception("Reactivity not found");

                mapper.Map(request.Reactivity, reactivity);

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}