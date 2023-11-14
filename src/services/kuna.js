export const postUser = async (fb, location) => {
  const url = new URL(`${import.meta.env.VITE_URL_BACKEND}/api/kuna/create_user`)
  console.log('url', 'entro')

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
        amount: parseInt(fb.get('payment')),
        currency: "MXN"
      },
      economicDependents: parseInt(fb.get('dependents')), // min: 0, max: 10
      downPayment: parseInt(fb.get('down_payment')),
      maritalStatus: fb.get('marital_status'),
      employmentStatus: fb.get('employment_status')
    },
    addressData: {
      country: "MX",
      city: location?.city || fb.get('city'),
      state: location?.state || fb.get('state'),
      neighborhood: location?.neighborhood || fb.get('neighborhood'),
      street: location?.street || fb.get('street'),
      number: location?.num_ext || fb.get('outside'), //numero exterior
      zipCode: location?.cp || fb.get('cp'),
      livingType: fb.get('living_type'),
      residentYears: fb.get('resident_years')
    },
    vtexId: fb.get('id_vtex')
  }
  console.log('userobj', userObj)
  var myHeaders = new Headers();
  myHeaders.append("Api-Key", `${import.meta.env.VITE_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append('Authorization', `Bearer ${import.meta.env.VITE_TOKEN}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(userObj),

  };

  return fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(userObj)
  })

}

export const postProfile = async (code, id) => {
  const url = new URL(`${import.meta.env.VITE_URL_BACKEND}/api/kuna/create_profile/${id}`)

  var myHeaders = new Headers();
  myHeaders.append("Api-Key", `${import.meta.env.VITE_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append('Authorization', `Bearer ${import.meta.env.VITE_TOKEN}`)

  var raw = JSON.stringify({
    "authorizationCode": `${code}`
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: raw
  })
}

/*----- GET -----*/

export const getAmount = async (id) => {
  console.log('user id',id)
  const url = new URL(`${import.meta.env.VITE_URL_BACKEND}/api/kuna/max-amount/${id}`)
  console.log('url', url)
  var myHeaders = new Headers();
  myHeaders.append("Api-Key", `${import.meta.env.VITE_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append('Authorization', `Bearer ${import.meta.env.VITE_TOKEN}`)

  var requestOptions = {
    headers: myHeaders,
  };

  return fetch(url, requestOptions)
}

export const getUser = async (vtexId, userId) => {
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/api/kuna/get_user`)
  url.searchParams.set('vtexId', vtexId)
  url.searchParams.set('userId', userId)

  var myHeaders = new Headers();
  myHeaders.append("Api-Key", `${import.meta.env.VITE_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append('Authorization', `Bearer ${import.meta.env.VITE_TOKEN}`)

  var requestOptions = {
    headers: myHeaders,
  };

  return fetch(url, requestOptions)
}