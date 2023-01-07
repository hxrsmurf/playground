# Database Structure

Use AWS DynamoDB
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-modeling-nosql-B.html

## Tables - DynamoDB
### Table

- PK: users
- SK: uuidv4

### Global Secondary Index
- PK: SK (uuidv4)
- Attributes:
  - email
  - name
  - encryption keys

## Tables - RDS
### User Table
- uuidv4
- Email
- Name
- Encryption key(s)
  - May move this to another table?

### Password Table
Like Keepass

- uuidv4 mapping
- title
- username
- password
- url
- notes