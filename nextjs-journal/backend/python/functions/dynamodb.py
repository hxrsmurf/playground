import boto3
import os

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
        if result_query == 0:
            list_of_items.append(item)
    return list_of_items


def query(title):
    # print("Querying for:", title)
    response = client.query(
        TableName=table,
        IndexName="user_id-title",
        KeyConditionExpression="user_id = :user_id and title = :title",
        ExpressionAttributeValues={":user_id": {"S": user}, ":title": {"S": title}},
    )
    return response["Count"]


def put_item():
    pass


def get_item():
    pass


def scan():
    pass


def filter_item():
    pass
