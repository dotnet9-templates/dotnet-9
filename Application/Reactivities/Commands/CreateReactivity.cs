using Application.Reactivities.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reactivities.Commands
{
    public class CreateReactivity
    {
        // Commands return a value here (the new ReactivityId) rather than Unit.
        // Strict CQRS discourages return values on commands, but returning the
        // new ID is a practical pattern that lets the controller respond with
        // the created resource's location or identifier.
        public class Command : IRequest<string>
        {
            // Only fields the client is allowed to supply come in via the DTO.
            // ReactivityId is absent from CreateReactivityDto so the domain
            // entity generates its own ID server-side.
            public required CreateReactivityDto ReactivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                // AutoMapper copies matching properties from the DTO onto a new Reactivity entity.
                // Because ReactivityId is not on the DTO, the entity retains its server-generated Guid.
                var reactivity = mapper.Map<Reactivity>(request.ReactivityDto);

                context.Reactivities.Add(reactivity);
                await context.SaveChangesAsync(cancellationToken);

                return reactivity.ReactivityId;
            }
        }
    }
}
