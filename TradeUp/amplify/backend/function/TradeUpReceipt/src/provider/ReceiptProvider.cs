using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.S3;
using System.Collections.Generic;
using System;
using System.Text;
using System.IO;
using SixLabors.ImageSharp;


namespace TradeUpReceipt
{
 public class ReceiptProvider : IReceiptProvider
    {
        private readonly IAmazonDynamoDB dynamoDB;
        public ReceiptProvider (IAmazonDynamoDB dynamoDB){
            this.dynamoDB = dynamoDB;
        }

        //Admin View
        public async Task<ReceiptModel[]> GetAllReceipt()
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpReceipts-dev",
                IndexName = "decoyView-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":decoyView", new AttributeValue { S = "True" }},
                    
                },
                KeyConditionExpression = "decoyView = :decoyView",
                
            });

            if (result != null && result.Items != null){
                var items = new  List<ReceiptModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("receiptID", out var receiptID);
                    item.TryGetValue("itemID", out var itemID);
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("paymentMethod", out var paymentMethod);
                    item.TryGetValue("meetLocation", out var meetLocation);
                    item.TryGetValue("deliverLocation", out var deliverLocation);
                    item.TryGetValue("totalBill", out var totalBill);
                    item.TryGetValue("createdTime", out var createdTime);
                    item.TryGetValue("decoyView", out var decoyView);
                    
                    items.Add(new ReceiptModel{
                        receiptID = receiptID?.S,
                        itemID = itemID?.S,
                        userID = userID?.S,
                        paymentMethod = paymentMethod?.S,
                        meetLocation = meetLocation?.S,
                        deliverLocation = deliverLocation?.S,
                        totalBill = totalBill?.S,
                        createdTime = createdTime?.S,
                        decoyView = decoyView?.S
                    });
                }
                return items.ToArray();
            }
            return Array.Empty<ReceiptModel>();
        }
        //Admin view
        public async Task<ReceiptModel[]> GetReceiptByUserID(string inputUserID)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpReceipts-dev",
                IndexName = "userID-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":userID", new AttributeValue { S = inputUserID }},
                },
                KeyConditionExpression = "userID = :userID",
                
            });

            if (result != null && result.Items != null){
                var items = new  List<ReceiptModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("receiptID", out var receiptID);
                    item.TryGetValue("itemID", out var itemID);
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("paymentMethod", out var paymentMethod);
                    item.TryGetValue("meetLocation", out var meetLocation);
                    item.TryGetValue("deliverLocation", out var deliverLocation);
                    item.TryGetValue("totalBill", out var totalBill);
                    item.TryGetValue("createdTime", out var createdTime);
                    item.TryGetValue("decoyView", out var decoyView);
                    
                    items.Add(new ReceiptModel{
                        receiptID = receiptID?.S,
                        itemID = itemID?.S,
                        userID = userID?.S,
                        paymentMethod = paymentMethod?.S,
                        meetLocation = meetLocation?.S,
                        deliverLocation = deliverLocation?.S,
                        totalBill = totalBill?.S,
                        createdTime = createdTime?.S,
                        decoyView = decoyView?.S
                    });
                }
                return items.ToArray();
            }
            return Array.Empty<ReceiptModel>();
        }

        public async Task<bool> AddReceipt (ReceiptModel item)
        {
            var request = new PutItemRequest
            {
                TableName = "TradeUpReceipts-dev",
                Item = new Dictionary<string, AttributeValue>
                {
                    {"receiptID", new AttributeValue(item.receiptID)},
                    {"itemID", new AttributeValue(item.itemID)},
                    {"userID", new AttributeValue(item.userID)},
                    {"paymentMethod", new AttributeValue(item.paymentMethod)},
                    {"meetLocation", new AttributeValue(item.meetLocation)},
                    {"deliverLocation", new AttributeValue(item.deliverLocation)},
                    {"totalBill", new AttributeValue(item.totalBill)},
                    {"createdTime", new AttributeValue(item.createdTime)},
                    {"decoyView", new AttributeValue(item.decoyView)},
                }
            };

            var response = await dynamoDB.PutItemAsync(request);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

    }
}