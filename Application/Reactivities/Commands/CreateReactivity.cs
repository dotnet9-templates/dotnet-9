using Application.Reactivities.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reactivities.Commands
{
    public class CreateReactivity
    {
        // Command returns a string (the new ReactivityId) rather than Unit.
        // In strict CQRS, commands don't return values — but MediatR allows it,
        // and returning the new ID is a practical pattern that lets the controller
        // redirect or respond with the created resource's identifier.
        public class Command : IRequest<string>
        {
            // The DTO carries only the fields the client is allowed to supply.
            // ReactivityId is deliberately absent from CreateReactivityDto —
            // the domain entity generates its own ID server-side.
            public required CreateReactivityDto ReactivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                // AutoMapper copies matching properties from the DTO onto a new Reactivity entity.
                // Because ReactivityId is not on the DTO, the entity keeps its own Guid.NewGuid() value.
                var reactivity = mapper.Map<Reactivity>(request.ReactivityDto);
                context.Reactivities.Add(reactivity);

                await context.SaveChangesAsync(cancellationToken);

                // reactivity.ReactivityId — must reference the object property, not a bare variable.
                // Returned to the controller so it can include the new ID in the response.
                return reactivity.ReactivityId;
            }
        }
    }
}