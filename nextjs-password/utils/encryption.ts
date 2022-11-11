var CryptoJS = require('crypto-js')

export async function sha256Email(email: string) {
  console.log('Encrypting: ', email)
  return CryptoJS.SHA256(email).toString()
}

//https://cryptojs.gitbook.io/docs/#pbkdf2
export async function pbkdf2(string: string) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8)
  const key512Bits = CryptoJS.PBKDF2(string, salt, {
    keySize: 512 / 32,
  })
  console.log(key512Bits)
}

export async function aes256String(string: string) {
  const encrypted = CryptoJS.AES.encrypt(string, process.env.CRYPTO_SECRET)
  //const decrypted = CryptoJS.AES.decrypt(encrypted, process.env.CRYPTO_SECRET)
  return encrypted
}

export async function decryptServerSideMasterKey(string: string) {
  const bytes = CryptoJS.AES.decrypt(string, process.env.CRYPTO_SECRET)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}

export async function customAES256Key(string: string, key: string) {
  const encrypted = CryptoJS.AES.encrypt(string, key)
  return encrypted.toString()
}

export async function decryptCustomAES256Key(string: string, key: string) {
  const decrypted_key = decryptServerSideMasterKey(key, process.env.CRYPTO_SECRET)
  const encrypted = CryptoJS.AES.decrypt(string, decrypted_key)
  const original = encrypted.toString(CryptoJS.enc.Utf8)
  return original
}
