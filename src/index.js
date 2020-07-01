const getToken = (onSuccess) => {
  const url = 'https://token-factory.onfido.com/sdk_token'
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.setRequestHeader('Authorization', 'BASIC ' + process.env.SDK_TOKEN_FACTORY_SECRET)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText)
      onSuccess(data.message)
    }
  }
  request.send()
}

window.onload = async function() {
  const {init} = await import('onfido-sdk-ui')

  getToken((token) => {
    window.onfidoOut = init({
      useModal: false,
      token,
      onComplete: function(data) {
        // callback for when everything is complete
        console.log("Everything is complete", data);
      },
      steps: [
        {
          type:'welcome',
          options:{
            title:'Open your new bank account'
          }
        },
        {
          type: 'document',
          options: {
            documentTypes: {
              passport: true,
              driving_licence: true,
              national_identity_card: true
            }
          }
        },
        'face',
        'complete'
      ]
    })
  })
};


require("./style.css")
