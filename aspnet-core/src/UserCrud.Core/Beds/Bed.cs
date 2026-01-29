using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Rooms;

namespace UserCrud.Beds
{
    public class Bed : Entity<long>
    {
       
        public long RoomId { get; set; }  // Foreign Key to Room
        public string BedNumber { get; set; }

        public bool IsOccupied { get; set; }

        // Navigation property
        public Room Room { get; set; }
    }
}
