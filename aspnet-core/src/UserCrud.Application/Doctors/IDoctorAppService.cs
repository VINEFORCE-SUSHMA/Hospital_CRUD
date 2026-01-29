using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Doctors.Dtos;

namespace UserCrud.Doctors
{
   public interface IDoctorAppService
    {
        Task<DoctorDto> CreateAsync(CreateDoctorDto input);
        Task<List<DoctorDto>> GetAllAsync();
        Task<DoctorDto> GetByIdAsync(long id);
        Task<DoctorDto> UpdateAsync(long id, UpdateDoctorDto input);
        Task DeleteAsync(long id);
    }
}
