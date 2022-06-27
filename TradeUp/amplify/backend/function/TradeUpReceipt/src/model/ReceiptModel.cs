using System.Collections.Generic;
namespace TradeUpReceipt
{ 
        public class ReceiptModel
        {
                public string receiptID {get; set;}
                public string itemID {get; set;}
                public string buyerID {get; set;}
                public string sellerID {get; set;}
                public string paymentMethod {get; set;}
                public string meetLocation {get; set;}
                public string deliverLocation {get; set;}
                public string totalBill {get; set;}
                public string createdTime {get; set;}
                public string decoyView {get; set;}
        }

}
