export const postUser = async (fb, location) => {
  // const url = new URL(`${import.meta.env.VITE_URI_BACKEND}/partners/api/v1/users`)

  const userObj = {
    names: [fb.get('name'), fb.get('mid_name')],
    surnames: [fb.get('first_surname'), fb.get('second_surname')],
    document: {
      type: "RFC",
      value: fb.get('rfc')
    },
    birthDate: fb.get('birthdate'),
    gender: fb.get('gender'),
    email: fb.get('email'),
    phoneNumber: `+52${fb.get('phone')}`,
    socioeconomicData: {
      incomeMonthlyAvg: {
        amount: fb.get('payment'),
        currency: "MXN"
      },
      economicDependents: fb.get('dependents') // min: 0, max: 10
    },
    addressData: {
      country: "MX",
      city: location?.city || fb.get('city'),
      state: location?.state || fb.get('state'),
      neighborhood: location?.neighborhood || fb.get('neighborhood'),
      street: location?.street || fb.get('street'),
      number: location?.num_ext || fb.get('outside'), //numero exterior
      zipCode: location?.cp || fb.get('cp')
    }
  }
  console.log('userobj',userObj)
  // var myHeaders = new Headers();
  // myHeaders.append("x-kavak-token-type", "urn:kavak:token-type:apikey");
  // myHeaders.append("Authorization", `${import.meta.env.VITE_API_KEY}`);
  // myHeaders.append("Content-Type", "application/json");

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: JSON.stringify(userObj),
  //   redirect: 'follow'
  // };

  // return fetch(url, {
  //   requestOptions
  // })

  return {}
}

export const postProfile = async (code, id) => {
  var myHeaders = new Headers();
  myHeaders.append("x-kavak-token-type", "urn:kavak:token-type:apikey");
  myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "authorizationCode": `${code}`
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${import.meta.env.VITE_URI_BACKEND}/partners/api/v1/users/${id}/profile`, requestOptions)
}

export const getAmount = async () => {
  var myHeaders = new Headers();
  myHeaders.append("x-kavak-token-type", "urn:kavak:token-type:apikey");
  myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${import.meta.env.VITE_BASE_URL}/partners/api/v1/users/:userId/max-amount`, requestOptions)
}