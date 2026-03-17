using Application.Reactivities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    // AutoMapper profile that registers all object-to-object mappings for the application.
    // AutoMapper uses these mappings to copy matching property values between types,
    // eliminating manual property-by-property assignment boilerplate.
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Used by the EditReactivity command to copy updated values onto an existing tracked entity.
            CreateMap<Reactivity, Reactivity>();

            // Maps the inbound CreateReactivityDto (from the client POST request) onto a new Reactivity domain entity.
            // ReactivityId is not present on the DTO, so AutoMapper leaves the domain entity's
            // server-generated ReactivityId untouched.
            CreateMap<CreateReactivityDto, Reactivity>();
            CreateMap<EditReactivityDto, Reactivity>();
        }
    }
}