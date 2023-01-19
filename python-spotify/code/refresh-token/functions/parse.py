def parse_scan_table(Items):
    list_items = []

    for item in Items:
        list_items.append(
            {
                'id': item['id']['S'],
                'access_token': item['access_token']['S'],
                'refresh_token': item['refresh_token']['S']
            }
        )

    return list_items