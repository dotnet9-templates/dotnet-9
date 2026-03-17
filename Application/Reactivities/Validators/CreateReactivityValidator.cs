using Application.Reactivities.Commands;
using FluentValidation;

namespace Application.Reactivities.Validators;

// FluentValidation validator for the CreateReactivity.Command.
// ValidationBehavior<TRequest, TResponse> picks this up automatically via DI —
// it is never called directly from the handler or controller.
//
// Rules defined here run before Handle() executes, so invalid data never
// reaches the database layer.
public sealed class CreateReactivityValidator : AbstractValidator<CreateReactivity.Command>
{
    public CreateReactivityValidator()
    {
        // Each RuleFor targets a property on the inbound DTO via the Command wrapper.
        // NotEmpty() rejects null, empty string, and whitespace-only values.
        RuleFor(x => x.ReactivityDto.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.ReactivityDto.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(x => x.ReactivityDto.Category).NotEmpty().WithMessage("Category is required");
        RuleFor(x => x.ReactivityDto.City).NotEmpty().WithMessage("City is required");
        RuleFor(x => x.ReactivityDto.Venue).NotEmpty().WithMessage("Venue is required");
    }
}
