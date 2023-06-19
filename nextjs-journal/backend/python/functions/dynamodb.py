import boto3
import os

from dotenv import load_dotenv

load_dotenv()

table = os.getenv("TABLE")

print(f'DynamoDB Table: {table}')


def put_item():
    pass


def get_item():
    pass


def scan():
    pass


def filter_item():
    pass
