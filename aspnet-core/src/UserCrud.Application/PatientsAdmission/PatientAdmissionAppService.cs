using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds;
using UserCrud.Doctors;
using UserCrud.Patients;
using UserCrud.PatientsAdmission.Dtos;
using UserCrud.PattientsAdmission;

namespace UserCrud.PatientsAdmission
{
    public class PatientAdmissionAppService : ApplicationService,
       IPatientAdmissionAppService
    {
        private readonly IRepository<PatientAdmission, long> _admissionRepository;
        private readonly IRepository<patient, long> _patientRepository;
        private readonly IRepository<Doctor, long> _doctorRepository;
        private readonly IRepository<Bed, long> _bedRepository;
        private readonly IMapper _mapper;

        public PatientAdmissionAppService(
            IRepository<PatientAdmission, long> admissionRepository,
            IRepository<patient, long> patientRepository,
            IRepository<Doctor, long> doctorRepository,
            IRepository<Bed, long> bedRepository,
            IMapper mapper)
        {
            _admissionRepository = admissionRepository;
            _patientRepository = patientRepository;
            _doctorRepository = doctorRepository;
            _bedRepository = bedRepository;
            _mapper = mapper;
        }

        // Get all admissions
        public async Task<List<PatientAdmissionDto>> GetAllAsync()
        {
            var list = await _admissionRepository.GetAll()
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .Include(a => a.Bed)
                .ToListAsync();

            return _mapper.Map<List<PatientAdmissionDto>>(list);
        }

        // Get single admission by ID
        public async Task<PatientAdmissionDto> GetAsync(long id)
        {
            var admission = await _admissionRepository.GetAll()
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .Include(a => a.Bed)
                .FirstOrDefaultAsync(a => a.Id == id);

            return _mapper.Map<PatientAdmissionDto>(admission);
        }

        // Create new admission
        public async Task<PatientAdmissionDto> CreateAsync(CreatePatientAdmissionDto input)
        {
            // FK validation
            var patient = await _patientRepository.GetAsync(input.PatientId);
            var doctor = await _doctorRepository.GetAsync(input.DoctorId);
            var bed = await _bedRepository.GetAsync(input.BedId);

            var admission = _mapper.Map<PatientAdmission>(input);
            await _admissionRepository.InsertAsync(admission);

            return _mapper.Map<PatientAdmissionDto>(admission);
        }

        // Update existing admission
        public async Task<PatientAdmissionDto> UpdateAsync(long id, UpdatePatientAdmissionDto input)
        {
            var admission = await _admissionRepository.GetAsync(id);

            // FK validation
            var patient = await _patientRepository.GetAsync(input.PatientId);
            var doctor = await _doctorRepository.GetAsync(input.DoctorId);
            var bed = await _bedRepository.GetAsync(input.BedId);

            _mapper.Map(input, admission);

            return _mapper.Map<PatientAdmissionDto>(admission);
        }

        // Delete admission
        public async Task DeleteAsync(long id)
        {
            await _admissionRepository.DeleteAsync(id);
        }
    }
}
