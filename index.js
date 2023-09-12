const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

var host_url = "https://b2b.isovoxbooth.com"

app.get('/create', (req, res) => {
    var tax_exempt = false
    
    axios.get("https://abb5f7.myshopify.com/admin/api/2023-04/graphql.json",
        {
            headers: {
            'content-type': 'application/json',
            'X-Shopify-Access-Token': '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 '
            },
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
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
            variables:{
                    "input": {
                    "email":req.query.email,
                    "note": req.query.vatid,
                    "taxExempt": tax_exempt, 
                    
                }
            }
                })
            })
        .then((res) => (res.json())) 
        .then((resJson)=>{
            console.log(resJson);
            res.redirect(`${host_url}/cart/${req.query.itemlist}?checkout[email]=${req.query.email}`)
        })
        .catch((error) => {
            console.error(error); 
        }); 
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})