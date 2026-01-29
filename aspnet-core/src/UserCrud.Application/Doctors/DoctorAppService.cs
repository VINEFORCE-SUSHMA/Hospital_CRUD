using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Doctors.Dtos;

namespace UserCrud.Doctors
{
   public class DoctorAppService : ApplicationService, IDoctorAppService

    {
        private readonly IRepository<Doctor, long> _doctorRepository;
        private readonly IMapper _mapper;

        public DoctorAppService(
            IRepository<Doctor, long> doctorRepository,
            IMapper mapper)
        {
            _doctorRepository = doctorRepository;
            _mapper = mapper;
        }

        public async Task<List<DoctorDto>> GetAllAsync()
        {
            var doctors = await _doctorRepository.GetAllListAsync();
            return _mapper.Map<List<DoctorDto>>(doctors);
        }

        public async Task<DoctorDto> GetByIdAsync(long id)
        {
            var doctor = await _doctorRepository.GetAsync(id);
            return _mapper.Map<DoctorDto>(doctor);
        }

        public async Task<DoctorDto> CreateAsync(CreateDoctorDto input)
        {
            var doctor = _mapper.Map<Doctor>(input);
            await _doctorRepository.InsertAsync(doctor);
            return _mapper.Map<DoctorDto>(doctor);
        }

        public async Task<DoctorDto> UpdateAsync(long id, UpdateDoctorDto input)
        {
            var doctor = await _doctorRepository.GetAsync(id);
            _mapper.Map(input, doctor);
            return _mapper.Map<DoctorDto>(doctor);
        }

        public async Task DeleteAsync(long id)
        {
            await _doctorRepository.DeleteAsync(id);
        }
    }
}
