using System.Collections.Generic;
namespace TradeUpCentre
{ 
        public class CentreModel
        {
                public string centreID {get; set;}
                public string centreName {get; set;}
                public string centreAddress {get; set;}
                public List<string> centreCoordinate {get; set;}
                public string centreDescription {get; set;}
                public string centreStatus {get; set;}
                public string createdTime {get; set;}
                public string centreImage {get; set;}
        }

}
