using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds;
using UserCrud.Doctors;
using UserCrud.Patients;

namespace UserCrud.PattientsAdmission
{
   public class PatientAdmission : FullAuditedEntity<long> // long Id
    {    
            // Foreign Keys
            public long PatientId { get; set; }
        public long DoctorId { get; set; }
        public long BedId { get; set; }

        // Admission details
        public DateTime AdmissionDate { get; set; }
        public DateTime? DischargeDate { get; set; }
        public string Diagnosis { get; set; }
        public string Status { get; set; }

        // Navigation properties
        public virtual patient Patient { get; set; }
        public virtual Doctor Doctor { get; set; }
        public virtual Bed Bed { get; set; }
    }
}

