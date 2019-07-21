import { helpers } from "vuelidate/lib/validators";

export const supportedFileType = val => {
  if(!helpers.req(val)) return true

  const allowedFormats = ['jpg', 'png', 'jpeg']
  const extension = val.split('.').pop()
  return allowedFormats.includes(extension)
}