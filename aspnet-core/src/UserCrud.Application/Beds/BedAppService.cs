using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Beds.Dtos;
using UserCrud.Rooms;
using UserCrud.Rooms.Dtos;

namespace UserCrud.Beds
{
    public class BedAppService : ApplicationService, IBedAppService
    {
        private readonly IRepository<Bed, long> _bedRepository;
        private readonly IRepository<Room, long> _roomRepository;
        private readonly IMapper _mapper;

        public BedAppService(
            IRepository<Bed, long> bedRepository,
            IRepository<Room, long> roomRepository,
            IMapper mapper)
        {
            _bedRepository = bedRepository;
            _roomRepository = roomRepository;
            _mapper = mapper;
        }


        public async Task<ListResultDto<RoomLookupDto>> GetRoomLookupAsync()
        {
            var rooms = await _roomRepository
                .GetAll()
                .Select(r => new RoomLookupDto
                {
                    Id = r.Id,
                    RoomNumber = r.RoomNumber
                })
                .ToListAsync();

            return new ListResultDto<RoomLookupDto>(rooms);
        }

        public async Task<List<BedDto>> GetAllAsync()
        {
            var beds = await _bedRepository.GetAll()
                .Include(b => b.Room)
                .ToListAsync();

            return _mapper.Map<List<BedDto>>(beds);
        }

        public async Task<BedDto> GetAsync(long id)
        {
            var bed = await _bedRepository.GetAll()
                .Include(b => b.Room)
                .FirstOrDefaultAsync(b => b.Id == id);

            return _mapper.Map<BedDto>(bed);
        }

        public async Task<BedDto> CreateAsync(CreateBedDto input)
        {
            var room = await _roomRepository.GetAsync(input.RoomId); // FK validation

            var bed = _mapper.Map<Bed>(input);
            await _bedRepository.InsertAsync(bed);

            return _mapper.Map<BedDto>(bed);
        }

        public async Task<BedDto> UpdateAsync(long id, UpdateBedDto input)
        {
            var bed = await _bedRepository.GetAsync(id);
            var room = await _roomRepository.GetAsync(input.RoomId); // FK validation

            _mapper.Map(input, bed);

            return _mapper.Map<BedDto>(bed);
        }

        public async Task DeleteAsync(long id)
        {
            await _bedRepository.DeleteAsync(id);
        }
    }
}
    

