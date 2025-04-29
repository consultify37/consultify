export const sendMail = async ({ from, to, subject, text, html, attachments, website }) => {
  var p = new Promise(async (resolve, reject) => {
    try {
      const { TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo')
      var apiInstance = new TransactionalEmailsApi()
      var apiKey = apiInstance.authentications['apiKey']
      apiKey.apiKey = process.env.BREVO_API_KEY
      
      var sendSmtpEmail = new SendSmtpEmail()

      sendSmtpEmail.subject = subject
      sendSmtpEmail.htmlContent = html || null
      sendSmtpEmail.textContent = text || null
      sendSmtpEmail.sender = { "name": website, "email": from }
      sendSmtpEmail.to = [ { "email": to } ]
      
      if (attachments) {
        sendSmtpEmail.attachment = attachments
      }

      const response = await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log(to)
      console.log('BREVO API called successfully. Returned data: ' + JSON.stringify(response))
      resolve(response)
    } catch (e) {
      console.error(e.body ? e.body : e)
      reject(e)
    }
  })

  return p
}