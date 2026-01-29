using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Rooms.Dtos
{
   public class UpdateRoomDto
    {
        public long Id { get; set; }
        public string RoomNumber { get; set; }
        public string RoomType { get; set; }
        public int TotalBeds { get; set; }
        public bool IsActive { get; set; }
    }
}
