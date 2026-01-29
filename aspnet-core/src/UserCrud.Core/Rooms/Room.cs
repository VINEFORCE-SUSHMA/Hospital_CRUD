using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserCrud.Rooms
{
  public class Room : FullAuditedEntity<long>
    {
        
        public string RoomNumber { get; set; } 
        public string RoomType { get; set; }  
        public int TotalBeds { get; set; }  
        public bool IsActive { get; set; }
    }
}
