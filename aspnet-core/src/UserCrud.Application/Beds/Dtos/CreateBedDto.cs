using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Beds.Dtos
{
    public class CreateBedDto
    {public string BedNumber { get; set; }
        public long RoomId { get; set; }
        public bool IsOccupied { get; set; }
    }
}
