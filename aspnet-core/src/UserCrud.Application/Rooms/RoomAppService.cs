using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Rooms.Dtos;

namespace UserCrud.Rooms
{
    public class RoomAppService : ApplicationService, IRoomAppService
    {
        private readonly IRepository<Room, long> _roomRepository;
        private readonly IMapper _mapper;

        public RoomAppService(IRepository<Room, long> roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }

        public async Task<List<RoomDto>> GetAllAsync()
        {
            var rooms = await _roomRepository.GetAllListAsync();
            return _mapper.Map<List<RoomDto>>(rooms);
        }

        public async Task<RoomDto> GetByIdAsync(long id)
        {
            var room = await _roomRepository.GetAsync(id);
            return _mapper.Map<RoomDto>(room);
        }

        public async Task<RoomDto> CreateAsync(CreateRoomDto input)
        {
            var room = _mapper.Map<Room>(input);
            await _roomRepository.InsertAsync(room);
            return _mapper.Map<RoomDto>(room);
        }

        public async Task<RoomDto> UpdateAsync(long id, UpdateRoomDto input)
        {
            var room = await _roomRepository.GetAsync(id);
            _mapper.Map(input, room);
            return _mapper.Map<RoomDto>(room);
        }

        public async Task DeleteAsync(long id)
        {
            await _roomRepository.DeleteAsync(id);
        }

    }
}
