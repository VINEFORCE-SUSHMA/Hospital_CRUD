using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.patients.Dtos;
using UserCrud.Patients;

namespace UserCrud.patients
{

    public class patient_MapperProfile : Profile
    {
        public patient_MapperProfile()
        {
            CreateMap<patient, PatientDto>();
            CreateMap<createpatientDto, patient>();
            CreateMap<updatepatientDto, patient>();
        }
    }
}
