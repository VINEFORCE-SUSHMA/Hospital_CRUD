using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.patients.Dtos;
using UserCrud.Patients;

namespace UserCrud.patients
{
    public interface IpatientAppService
    {
        Task<PatientDto> CreateAsync(createpatientDto input);
        Task<List<PatientDto>> GetAllAsync();
        Task<PatientDto> GetByIdAsync(long id);
        Task<PatientDto> UpdateAsync(long id, updatepatientDto input);
        Task DeleteAsync(long id);


    }
}
