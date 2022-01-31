//import { Recaptcha } from "recaptcha";
import env from "./env";

const Recaptcha = require("recaptcha");

Recaptcha.prototype.validate = function (data = {}) {
  const rcptcha = Object.create(this)
  rcptcha.data = data

  return new Promise((ful: any, rej: any) => {
    rcptcha.verify(function (success: any, error_code: any) {
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