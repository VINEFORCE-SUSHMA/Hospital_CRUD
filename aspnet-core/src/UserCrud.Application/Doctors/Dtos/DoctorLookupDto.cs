using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Doctors.Dtos
{
    public class DoctorLookupDto
    {
        public long Id { get; set; }
        public string FullName { get; set; }
        public string DoctorCode { get; set; }
        public string Specialization { get; set; }
    }
}
