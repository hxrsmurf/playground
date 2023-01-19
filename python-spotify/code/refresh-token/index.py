import logging
from functions.dynamodb import scan_table
from functions.parse import parse_scan_table

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    parse_results = parse_scan_table(scan_table())