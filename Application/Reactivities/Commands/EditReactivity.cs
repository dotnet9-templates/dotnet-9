using Application.Core;
using Application.Reactivities.DTOs;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Reactivities.Commands
{
    public class EditReactivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditReactivityDto ReactivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var reactivity = await context.Reactivities.FindAsync([request.ReactivityDto.ReactivityId], cancellationToken);

                if (reactivity == null) return Result<Unit>.Failure("Reactivity not found", 404);

                mapper.Map(request.ReactivityDto, reactivity);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the reactivity", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}