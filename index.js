const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

var host_url = "https://b2b.isovoxbooth.com"

app.get('/create', async (req, res) => {
    var tax_exempt = false
    

        axios
            .post("https://abb5f7.myshopify.com/admin/api/2023-04/graphql.json", {
            query: `mutation customerCreate($input: CustomerInput!) {
                customerCreate(input: $input) {
                userErrors {
                    field
                    message
                }
                customer {
                    id
                    email
                    phone
                    taxExempt
                    acceptsMarketing
                    firstName
                    lastName
                    smsMarketingConsent {
                    marketingState
                    marketingOptInLevel
                    }
                    addresses {
                    address1
                    city
                    country
                    phone
                    zip
                    }
                    note
                }
                }
        } `,
            variables: {
                            "input": {
                            "email":req.query.email,
                            "note": req.query.vatid,
                            "taxExempt": tax_exempt, 
                            
                        }
                    },
            }, {headers: {
                'content-type': 'application/json',
                'X-Shopify-Access-Token': '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 '
                }})
            .then(resJson => {console.log(resJson)})
            .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})