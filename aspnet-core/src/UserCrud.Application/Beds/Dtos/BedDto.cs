using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Rooms.Dtos;

namespace UserCrud.Beds.Dtos
{
    public class BedDto : EntityDto<long>
    {
        public string BedNumber { get; set; }
        public long RoomId { get; set; }
        public string RoomName { get; set; } // from navigation property
        public bool IsOccupied { get; set; }
    }
}
