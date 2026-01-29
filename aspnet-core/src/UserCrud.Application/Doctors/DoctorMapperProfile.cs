using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Doctors.Dtos;

namespace UserCrud.Doctors
{
    internal class DoctorMapperProfile : Profile
    {
        public DoctorMapperProfile()
        {
            CreateMap<Doctor, DoctorDto>();
            CreateMap<CreateDoctorDto, Doctor>();
            CreateMap<UpdateDoctorDto, Doctor>();
        }
    }
}

