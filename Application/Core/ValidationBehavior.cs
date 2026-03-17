using FluentValidation;
using MediatR;

namespace Application.Core;

// MediatR pipeline behavior that runs FluentValidation before every handler.
// Registered as an open generic via AddOpenBehavior(typeof(ValidationBehavior<,>)),
// so it automatically wraps every IRequest<TResponse> in the assembly —
// no per-handler wiring needed.
//
// The IValidator<TRequest> is injected as optional (= null default). When no
// validator exists for a given command/query, the behavior short-circuits
// and passes straight through to the handler without any overhead.
public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        // No validator registered for this request type — skip validation entirely.
        if (validator == null) return await next(cancellationToken);

        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        // Throw before the handler executes so the database is never touched with invalid data.
        // FluentValidation.ValidationException carries the full list of field errors,
        // which a later exception-handling middleware can convert into a 400 response.
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        return await next(cancellationToken);
    }
}
