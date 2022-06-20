using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.S3;
using System.Collections.Generic;
using System;
using System.Text;
using System.IO;
using SixLabors.ImageSharp;


namespace TradeUpItem
{
 public class ItemProvider : IItemProvider
    {
        private readonly IAmazonDynamoDB dynamoDB;
        public ItemProvider (IAmazonDynamoDB dynamoDB){
            this.dynamoDB = dynamoDB;
        }

        //Member View
        public async Task<ItemModel[]> GetActiveItemByModeAsync(string inputItemMode)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpItems-dev",
                IndexName = "itemMode-itemCategory-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":itemMode", new AttributeValue { S = inputItemMode }},
                    {":itemStatus", new AttributeValue { S = "Active" }}
                },
                KeyConditionExpression = "itemMode = :itemMode",
                FilterExpression = "itemStatus = :itemStatus"
            });

            if (result != null && result.Items != null){
                var items = new  List<ItemModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("itemID", out var itemID);
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("itemCategory", out var itemCategory);
                    item.TryGetValue("itemDate", out var itemDate);
                    item.TryGetValue("itemDesc", out var itemDesc);
                    item.TryGetValue("itemMode", out var itemMode);
                    item.TryGetValue("itemName", out var itemName);
                    item.TryGetValue("itemPrice", out var itemPrice);
                    item.TryGetValue("itemStatus", out var itemStatus);
                    
                    items.Add(new ItemModel{
                        itemID = itemID?.S,
                        userID = userID?.S,
                        itemCategory = itemCategory?.S,
                        itemDate = itemDate?.S,
                        itemDesc = itemDesc?.S,
                        itemMode = itemMode?.S,
                        itemName = itemName?.S,
                        itemPrice = itemPrice?.S,
                        itemStatus = itemStatus?.S
                    });
                }
                return items.ToArray();
            }
            return Array.Empty<ItemModel>();
        }
        //Admin view
        public async Task<ItemModel[]> AdminGetAllItemByModeAsync(string inputItemMode)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpItems-dev",
                IndexName = "itemMode-itemCategory-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":itemMode", new AttributeValue { S = inputItemMode }}
                    
                },
                KeyConditionExpression = "itemMode = :itemMode",
            });

            if (result != null && result.Items != null){
                var items = new  List<ItemModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("itemID", out var itemID);
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("itemCategory", out var itemCategory);
                    item.TryGetValue("itemDate", out var itemDate);
                    item.TryGetValue("itemDesc", out var itemDesc);
                    item.TryGetValue("itemMode", out var itemMode);
                    item.TryGetValue("itemName", out var itemName);
                    item.TryGetValue("itemPrice", out var itemPrice);
                    item.TryGetValue("itemStatus", out var itemStatus);
                    
                    items.Add(new ItemModel{
                        itemID = itemID?.S,
                        userID = userID?.S,
                        itemCategory = itemCategory?.S,
                        itemDate = itemDate?.S,
                        itemDesc = itemDesc?.S,
                        itemMode = itemMode?.S,
                        itemName = itemName?.S,
                        itemPrice = itemPrice?.S,
                        itemStatus = itemStatus?.S
                    });
                }
                return items.ToArray();
            }
            return Array.Empty<ItemModel>();
        }

        public async Task<ItemModel[]> GetActiveItemByModeAndCategoryAsync(string inputItemMode, string inputItemCategory)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpItems-dev",
                IndexName = "itemMode-itemCategory-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":itemMode", new AttributeValue { S = inputItemMode }},
                    {":itemCategory", new AttributeValue { S = inputItemCategory }},
                    {":itemStatus", new AttributeValue { S = "Active" }}
                },
                KeyConditionExpression = "itemMode = :itemMode AND itemCategory = :itemCategory",
                FilterExpression = "itemStatus = :itemStatus"
            });

            if (result != null && result.Items != null){
                var items = new  List<ItemModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("itemID", out var itemID);
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("itemCategory", out var itemCategory);
                    item.TryGetValue("itemDate", out var itemDate);
                    item.TryGetValue("itemDesc", out var itemDesc);
                    item.TryGetValue("itemMode", out var itemMode);
                    item.TryGetValue("itemName", out var itemName);
                    item.TryGetValue("itemPrice", out var itemPrice);
                    item.TryGetValue("itemStatus", out var itemStatus);
                    
                    items.Add(new ItemModel{
                        itemID = itemID?.S,
                        userID = userID?.S,
                        itemCategory = itemCategory?.S,
                        itemDate = itemDate?.S,
                        itemDesc = itemDesc?.S,
                        itemMode = itemMode?.S,
                        itemName = itemName?.S,
                        itemPrice = itemPrice?.S,
                        itemStatus = itemStatus?.S
                    });
                }
                return items.ToArray();
            }
            return Array.Empty<ItemModel>();
        }

        public async Task<ItemModel[]> GetActiveItemByModeAndCategoryUserIDExistAsync(string inputItemMode, string inputItemCategory, string inputUserID)
        {
                var result = await dynamoDB.QueryAsync(new QueryRequest{
                    TableName = "TradeUpItems-dev",
                    IndexName = "itemMode-itemCategory-index",
                    ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                        {":itemMode", new AttributeValue { S = inputItemMode }},
                        {":itemCategory", new AttributeValue { S = inputItemCategory }},
                        {":itemStatus", new AttributeValue { S = "Active" }},
                        {":userID", new AttributeValue { S = inputUserID }},
                    },
                    KeyConditionExpression = "itemMode = :itemMode AND itemCategory = :itemCategory",
                    FilterExpression = "itemStatus = :itemStatus AND userID <> :userID"
                });

                if (result != null && result.Items != null){
                    var items = new  List<ItemModel>();
                    foreach (var item in result.Items){
                        item.TryGetValue("itemID", out var itemID);
                        item.TryGetValue("userID", out var userID);
                        item.TryGetValue("itemCategory", out var itemCategory);
                        item.TryGetValue("itemDate", out var itemDate);
                        item.TryGetValue("itemDesc", out var itemDesc);
                        item.TryGetValue("itemMode", out var itemMode);
                        item.TryGetValue("itemName", out var itemName);
                        item.TryGetValue("itemPrice", out var itemPrice);
                        item.TryGetValue("itemStatus", out var itemStatus);
                        
                        items.Add(new ItemModel{
                            itemID = itemID?.S,
                            userID = userID?.S,
                            itemCategory = itemCategory?.S,
                            itemDate = itemDate?.S,
                            itemDesc = itemDesc?.S,
                            itemMode = itemMode?.S,
                            itemName = itemName?.S,
                            itemPrice = itemPrice?.S,
                            itemStatus = itemStatus?.S
                        });
                    }
                    return items.ToArray();
                }
                return Array.Empty<ItemModel>();
        }
        public async Task<bool> AddItemWithImageAsync (ItemModel item)
        {
            var request = new PutItemRequest
            {
                TableName = "TradeUpItems-dev",
                Item = new Dictionary<string, AttributeValue>
                {
                    {"itemID", new AttributeValue(item.itemID)},
                    {"userID", new AttributeValue(item.userID)},
                    {"itemCategory", new AttributeValue(item.itemCategory)},
                    {"itemDate", new AttributeValue(item.itemDate)},
                    {"itemDesc", new AttributeValue(item.itemDesc)},
                    {"itemMode", new AttributeValue(item.itemMode)},
                    {"itemName", new AttributeValue(item.itemName)},
                    {"itemPrice", new AttributeValue(item.itemPrice)},
                    {"itemStatus", new AttributeValue(item.itemStatus)},
                }
            };
            
            byte[] ImageBytes = Convert.FromBase64String(item.itemImage);
            string decodedString = Encoding.UTF8.GetString(ImageBytes);
            Image image = Image.Load(ImageBytes);
            var client = new AmazonS3Client();
            using (var stream = new MemoryStream(ImageBytes)){
                await client.PutObjectAsync(new Amazon.S3.Model.PutObjectRequest
                {
                                BucketName = "tradeups3/ItemAsset",
                                Key = $"{item.itemID}.jpg",
                                ContentType = "image/jpeg",
                                InputStream = stream,
                                CannedACL = S3CannedACL.PublicRead

                });
            }

            var response = await dynamoDB.PutItemAsync(request);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

        //Add without Image
        public async Task<bool> AddItemWithoutImageAsync (ItemModel item)
        {
            var request = new PutItemRequest
            {
                TableName = "TradeUpItems-dev",
                Item = new Dictionary<string, AttributeValue>
                {
                    {"itemID", new AttributeValue(item.itemID)},
                    {"userID", new AttributeValue(item.userID)},
                    {"itemCategory", new AttributeValue(item.itemCategory)},
                    {"itemDate", new AttributeValue(item.itemDate)},
                    {"itemDesc", new AttributeValue(item.itemDesc)},
                    {"itemMode", new AttributeValue(item.itemMode)},
                    {"itemName", new AttributeValue(item.itemName)},
                    {"itemPrice", new AttributeValue(item.itemPrice)},
                    {"itemStatus", new AttributeValue(item.itemStatus)},
                }
            };
            var response = await dynamoDB.PutItemAsync(request);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }
            public async Task<bool> DeleteSelectedItemWithImageAsync(String inputItemID){
            var request = new DeleteItemRequest
                {
                    TableName = "TradeUpItems-dev",
                    Key = new Dictionary<string,AttributeValue>() {
                         { "inputItemID", new AttributeValue { S = inputItemID } },
                        //  { "userID", new AttributeValue { S = inputUserID } }
                     },
                };
            var response = await dynamoDB.DeleteItemAsync(request);
            await DeleteImageByIDAsync(inputItemID);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        } 

        public async Task<bool> DeleteSelectedItemWithoutImageAsync(String inputItemID, String inputUserID){
            var request = new DeleteItemRequest
                {
                    TableName = "TradeUpItems-dev",
                    Key = new Dictionary<string,AttributeValue>() {
                         { "itemID", new AttributeValue { S = inputItemID } },
                         { "userID", new AttributeValue { S = inputUserID } }
                     },
                };
            var response = await dynamoDB.DeleteItemAsync(request);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

        public async Task<bool> DeleteImageByIDAsync(String inputItemID){
            var client = new AmazonS3Client();
            
            var request = new Amazon.S3.Model.DeleteObjectRequest{
                            BucketName = "tradeups3/ItemAsset",
                            Key = $"{inputItemID}.jpg"
            };

            var response = await client.DeleteObjectAsync(request);
            Console.WriteLine(response.HttpStatusCode);

            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        } 

        
    }
}