using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.patients.Dtos;
using UserCrud.Patients;

namespace UserCrud.patients
{
    public class PatientAppService : ApplicationService, IpatientAppService
    {
    

        private readonly IRepository<patient, long> _patientRepository;
        private readonly IMapper _mapper;

        public PatientAppService(
            IRepository<patient, long> patientRepository,
            IMapper mapper)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        // Get all patients
        public async Task<List<PatientDto>> GetAllAsync()
        {
            var patients = await _patientRepository.GetAllListAsync();
            return _mapper.Map<List<PatientDto>>(patients);
        }

        // Get patient by ID
        public async Task<PatientDto> GetByIdAsync(long id)
        {
            var patient = await _patientRepository.GetAsync(id);
            return _mapper.Map<PatientDto>(patient);
        }

        // Create patient
        public async Task<PatientDto> CreateAsync(createpatientDto input)
        {
            var patient = _mapper.Map<patient>(input);
            //patient.CreatedAt = DateTime.UtcNow;

            await _patientRepository.InsertAsync(patient);
            return _mapper.Map<PatientDto>(patient);
        }

        // Update patient
        public async Task<PatientDto> UpdateAsync(long id, updatepatientDto input)
        {
            var patient = await _patientRepository.GetAsync(id);
            _mapper.Map(input, patient);

            return _mapper.Map<PatientDto>(patient);
        }

        // Delete patient
        public async Task DeleteAsync(long id)
        {
            await _patientRepository.DeleteAsync(id);
        }
    }
}
