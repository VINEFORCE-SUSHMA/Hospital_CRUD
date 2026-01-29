using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds.Dtos;

namespace UserCrud.Beds
{
    public interface IBedAppService : IApplicationService
    {
        Task<List<BedDto>> GetAllAsync();
        Task<BedDto> GetAsync(long id);
        Task<BedDto> CreateAsync(CreateBedDto input);
        Task<BedDto> UpdateAsync(long id, UpdateBedDto input);
        Task DeleteAsync(long id);
    }
}
