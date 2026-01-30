using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds;
using UserCrud.Doctors;
using UserCrud.Patients;
using UserCrud.PatientsAdmission;
using UserCrud.PatientsAdmission.Dtos;
using UserCrud.PattientsAdmission;


namespace UserCrud.PatientsAdmission
{
    public class PatientAdmissionMapperProfile : Profile
    {
        public PatientAdmissionMapperProfile()

        {
            CreateMap<PatientAdmission, PatientAdmissionDto>()
                    .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.FullName))
                    .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor.FullName))
                    .ForMember(dest => dest.BedNumber, opt => opt.MapFrom(src => src.Bed.BedNumber));

            // Create / Update DTO -> Entity
            CreateMap<CreatePatientAdmissionDto, PatientAdmission>();
            CreateMap<UpdatePatientAdmissionDto, PatientAdmission>();
        }
    }

}