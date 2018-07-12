import { Recaptcha } from 'recaptcha'
import env from './env'


Recaptcha.prototype.validate = function (data = {}) {
  const rcptcha = Object.create(this)
  rcptcha.data = data

  return new Promise((ful, rej) => {
    rcptcha.verify(function (success, error_code) {
      if ( success ) {
        ful()
      } else {
        rej( error_code )
      }
    })
  })
}

const recaptcha = env.RECAPTCHA && new Recaptcha(env.RECAPTCHA_PUBLIC_KEY, env.RECAPTCHA_PRIVATE_KEY)
export default recaptcha