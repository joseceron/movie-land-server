import { BcryptHandler } from '@domain/utils/bcryptHandler'
import bcrypt from 'bcryptjs'

export class BcryptTextHandler implements BcryptHandler {
  async encrypt (text: string): Promise<string> {
    const textEncrypted = await bcrypt.hash(text, 8)
    return textEncrypted
  }

  async compare (text: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(text, hash)
    return isMatch
  }
}
