using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.PatientsAdmission.Dtos;

namespace UserCrud.PatientsAdmission
{
    
    public interface IPatientAdmissionAppService : IApplicationService
    {
        Task<List<PatientAdmissionDto>> GetAllAsync();
        Task<PatientAdmissionDto> GetAsync(long id);
        Task<PatientAdmissionDto> CreateAsync(CreatePatientAdmissionDto input);
        Task<PatientAdmissionDto> UpdateAsync(long id, UpdatePatientAdmissionDto input);
        Task DeleteAsync(long id); 
    }
}
