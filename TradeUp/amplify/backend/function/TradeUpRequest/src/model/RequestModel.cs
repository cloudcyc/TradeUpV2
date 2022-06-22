using System.Collections.Generic;
namespace TradeUpRequest
{ 
        public class RequestModel
        {
                public string requestID {get; set;}
                public string requestTradeItemName {get; set;}
                public string requestTradeItemDesc {get; set;}
                public string requestTradeDate {get; set;}
                public string requestTradeStatus {get; set;}
                public string requestTradeToID {get; set;}
                public string requestTradeFromID {get; set;}
                public string requestItemID {get; set;}
                public string requestMeetLocation {get; set;}
                public List<string> requestMeetCoordinate {get; set;}
                public string requestImage {get; set;}

        }

}
