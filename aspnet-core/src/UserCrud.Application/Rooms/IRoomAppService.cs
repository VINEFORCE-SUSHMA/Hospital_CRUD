using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Rooms.Dtos;

namespace UserCrud.Rooms
{
    public interface IRoomAppService
    {
        Task<RoomDto> CreateAsync(CreateRoomDto input);
        Task<List<RoomDto>> GetAllAsync();
        Task<RoomDto> GetByIdAsync(long id);
        Task<RoomDto> UpdateAsync(long id, UpdateRoomDto input);
        Task DeleteAsync(long id);
    }
}
