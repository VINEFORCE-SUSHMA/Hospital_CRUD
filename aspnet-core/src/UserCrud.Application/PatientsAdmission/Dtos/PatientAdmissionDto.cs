using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.PatientsAdmission.Dtos
{
    public class PatientAdmissionDto : EntityDto<long>
    {
     

        public long PatientId { get; set; }
        public string PatientName { get; set; }
        public int PatientGender { get; set; } // Gender enum value

        public long DoctorId { get; set; }
        public string DoctorName { get; set; }

        public long BedId { get; set; }
        public string BedNumber { get; set; }

        public DateTime AdmissionDate { get; set; }
        public DateTime? DischargeDate { get; set; }
        public string Diagnosis { get; set; }
        public string Status { get; set; }
    }
}
