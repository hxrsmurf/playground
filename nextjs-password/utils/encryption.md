# Description

Uses Crypto-JS library to encrypt the master key/password and email.

# Master Key/Password
1. User enters master key/password
2. Encryption SHA256 that and then AES256 that and stores as a cookie
3. Input text is encrypted using the SHA256 value since it stays the same, AES256 appears to change everytime
  - encrypt input with SHA256 value via AES 256
4. Decryption decrypts cookie via AES256 and views the password then


