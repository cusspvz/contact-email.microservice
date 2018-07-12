import 'dotenv/config'
export const { env } = process
export default env

handleDefault('EMAIL_PREVENT_GROUPING', '1')
handleDefault('EMAIL_DEFAULT_SUBJECT', 'You have a new contact request')


function handleDefault ( name, defaultValue ) {
  if ( typeof env[name] == 'undefined' || env[name] == '' ) {
    env[name] = defaultValue
  }
}