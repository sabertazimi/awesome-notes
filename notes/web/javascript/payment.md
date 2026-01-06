---
sidebar_position: 41
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, JavaScript, ECMAScript]
---

# Web Payment

[Payment API](https://web.dev/life-of-a-payment-transaction):

```ts
async function doPaymentRequest() {
  try {
    // new PaymentRequest(paymentMethods, paymentDetails);
    const request = new PaymentRequest(
      [
        {
          supportedMethods: 'https://bobpay.xyz/pay',
        },
      ],
      {
        total: {
          label: 'total',
          amount: { value: '10', currency: 'USD' },
        },
      }
    )
    const response = await request.show()
    await validateResponse(response)
  } catch (err) {
    // AbortError, SecurityError
    console.error(err)
  }
}

async function validateResponse(response) {
  try {
    const errors = await checkAllValuesAreGood(response)

    if (errors.length) {
      await response.retry(errors)
      return validateResponse(response)
    }

    await response.complete('success')
  } catch (err) {
    // Something went wrong…
    await response.complete('fail')
  }
}

doPaymentRequest()
```

[![Web Payment Workflow](./figures/web-payment-workflow.webp)](https://web.dev/setting-up-a-payment-method)
