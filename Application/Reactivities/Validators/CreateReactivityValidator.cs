using Application.Reactivities.Commands;
using FluentValidation;

namespace Application.Reactivities.Validators;

public sealed class CreateRectivityValidator : AbstractValidator<CreateReactivity.Command>
{
    public CreateRectivityValidator()
    {
        RuleFor(x => x.ReactivityDto.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.ReactivityDto.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(x => x.ReactivityDto.Category).NotEmpty().WithMessage("Category is required");
        RuleFor(x => x.ReactivityDto.City).NotEmpty().WithMessage("City is required");
        RuleFor(x => x.ReactivityDto.Venue).NotEmpty().WithMessage("Venue is required");
    }

}