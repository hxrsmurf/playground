import boto3
import os
import json

from dotenv import load_dotenv

load_dotenv()

table = os.getenv("TABLE")

print(f"DynamoDB Table: {table}")

client = boto3.client("dynamodb")

user = os.getenv("USER")


def check_exists_dynamodb(items):
    list_of_items = []
    for item in items:
        title = item["title"]
        result_query = query(title)
        if result_query == 1:
            list_of_items.append(item)
        else:
            print(f"Found in DynamoDB: {title}")
        break
    return list_of_items


def query(title):
    print("Querying DynamoDB for:", title)
    response = client.query(
        TableName=table,
        IndexName="user_id-title",
        KeyConditionExpression="user_id = :user_id and title = :title",
        ExpressionAttributeValues={":user_id": {"S": user}, ":title": {"S": title}},
    )
    return response["Count"]


def add_to_dynamodb(items):
    for item in items:
        print("Adding to DynamoDB:", item["title"])
        client.put_item(
            TableName=table,
            Item={
                "user_id": {"S": user},
                "content": {"S": json.dumps(item["contents"])},
                "title": {"S": item["title"]},
                "year": {"S": item["title"][:4]},
                "raw": {"S": json.dumps(item)},
            },
        )


def get_item():
    pass


def scan():
    pass


def filter_item():
    pass
