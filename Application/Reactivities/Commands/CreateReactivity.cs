using Application.Core;
using Application.Reactivities.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reactivities.Commands
{
    public class CreateReactivity
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateReactivityDto ReactivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var reactivity = mapper.Map<Reactivity>(request.ReactivityDto);

                context.Reactivities.Add(reactivity);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<string>.Failure("Failed to create the reactivity", 400);

                return Result<string>.Success(reactivity.ReactivityId);
            }
        }
    }
}
