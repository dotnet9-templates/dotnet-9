using Application.Reactivities.Commands;
using Application.Reactivities.DTOs;
using FluentValidation;

namespace Application.Reactivities.Validators;

public sealed class CreateReactivityValidator : BaseReactivityValidator<CreateReactivity.Command, CreateReactivityDto>
{
    public CreateReactivityValidator() : base(x => x.ReactivityDto)
    {
    }
}