using Application.Reactivities.Commands;
using Application.Reactivities.DTOs;
using FluentValidation;

namespace Application.Reactivities.Validators;

public sealed class EditReactivityValidator : BaseReactivityValidator<EditReactivity.Command, EditReactivityDto>
{
    public EditReactivityValidator() : base(x => x.ReactivityDto)
    {
        RuleFor(x => x.ReactivityDto.ReactivityId)
            .NotEmpty().WithMessage("ReactivityId is required");
    }
}