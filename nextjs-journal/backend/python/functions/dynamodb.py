import boto3
import os
import json
import concurrent.futures

from dotenv import load_dotenv

load_dotenv()

table = os.getenv("TABLE")

print(f"DynamoDB Table: {table}")

client = boto3.client("dynamodb")

user = os.getenv("USER")


def check_exists_dynamodb(items):
    list_of_items = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=None) as executor:
        future_items = {executor.submit(query, item["title"]): item for item in items}

    for future in concurrent.futures.as_completed(future_items):
        future_item = future_items[future]
        try:
            exists = future.result()
            if exists == 0:
                print(f"Not found in DynamoDB:", future_item["title"])
                list_of_items.append(future_item)
            else:
                print(f"Found in DynamoDB:", future_item["title"])
        except Exception as e:
            print("Future Exception:", e)

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
    with concurrent.futures.ThreadPoolExecutor(max_workers=None) as executor:
        future_items = {executor.submit(put_item, item): item for item in items}


def put_item(item):
    try:
        response = client.put_item(
            TableName=table,
            Item={
                "user_id": {"S": user},
                "content": {"S": json.dumps(item["contents"])},
                "title": {"S": item["title"]},
                "year": {"S": item["title"][:4]},
                "raw": {"S": json.dumps(item)},
            },
        )
        print(f"Put Item to DynamoDB:", {item["title"]})
    except Exception as e:
        print(f"Failed to Put Item: {item}")


def get_item():
    pass


def scan():
    pass


def filter_item():
    pass
