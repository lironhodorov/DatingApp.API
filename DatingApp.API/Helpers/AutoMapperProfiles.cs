using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>().
                ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.Age())).
                ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
            ;
            CreateMap<User, UserForDetailedDto>().
                ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.Age())).
                ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url)); ;
            CreateMap<Photo, PhotoForDetailedDto>();
        }
    }
}
