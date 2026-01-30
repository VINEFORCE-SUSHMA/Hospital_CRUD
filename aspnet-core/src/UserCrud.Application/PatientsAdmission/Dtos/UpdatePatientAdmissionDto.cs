using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.PatientsAdmission.Dtos
{
    public class UpdatePatientAdmissionDto
    {
        public long PatientId { get; set; }
        public long DoctorId { get; set; }
        public long BedId { get; set; }

        public DateTime AdmissionDate { get; set; }
        public DateTime? DischargeDate { get; set; }

        public string Diagnosis { get; set; }
        public string Status { get; set; }
    }
}

