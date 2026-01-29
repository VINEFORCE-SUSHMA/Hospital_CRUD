using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using AutoMapper;
using UserCrud.Beds.Dtos;

namespace UserCrud.Beds
{
    public class BedMapperProfile : Profile
{
    public BedMapperProfile()
    {
        CreateMap<Bed, BedDto>()
            .ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.Room));

        CreateMap<CreateBedDto, Bed>();
        CreateMap<UpdateBedDto, Bed>();


    }
}
    }

