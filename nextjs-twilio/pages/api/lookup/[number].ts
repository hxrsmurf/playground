// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TriggerInstance } from 'twilio/lib/rest/api/v2010/account/usage/trigger'

interface Data {
  result: {
    caller_name: {
      caller_name: string
      caller_type: string
      error_code: number | null
    }
    country_code: string
    phone_number: string
    national_format: string
    carrier: {
      mobile_country_code: string
      mobile_network_code: TriggerInstance
      name: string
      type: string
      error_code: number | null
    }
    add_ons: string | null
    url: string
  }
}

const accountSid = process.env.TWILIO_API_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const twilio_base_api = 'https://lookups.twilio.com/v1/PhoneNumbers/'
  const country_code = '+1'
  const phone_number = req.query.number
  const lookup_type = '?Type=caller-name'
  const carrier_type = '?Type=carrier'
  const query_url = twilio_base_api + country_code + phone_number + lookup_type
  const query_url_carrier =
    twilio_base_api + country_code + phone_number + carrier_type

  // https://stackoverflow.com/a/51500400
  const query = await fetch(query_url, {
    method: 'GET',
    headers: {
      Authorization:
        'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64'),
    },
  })

  const query_carrier = await fetch(query_url_carrier, {
    method: 'GET',
    headers: {
      Authorization:
        'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64'),
    },
  })

  const result = await query.json()
  const result_carrier = await query_carrier.json()

  result['carrier'] = result_carrier['carrier']

  console.log(result)

  res.status(200).json({ result })
}