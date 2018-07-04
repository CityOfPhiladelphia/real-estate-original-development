import { stripIndent } from 'common-tags'

import { EPAY_APPLICATION_ID } from '@/config'

export function formatCurrency (input) {
  return input.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function generateEpayPayload ({
  accountNumber,
  totalDue,
  itemDescription,
  ownerName,
  addressStreet,
  addressCity,
  addressState,
  addressZip,
  addressCountry
}) {
  const now = new Date().toISOString()

  return stripIndent`
  <?xml version="1.0" encoding="utf-16"?>
    <BillingStatement xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <ApplicationID>${EPAY_APPLICATION_ID}</ApplicationID>
      <AccountNumber />
      <BillNumber>${accountNumber}</BillNumber>
      <StatementNumber />
      <BillingDate>${now}</BillingDate>
      <DueDate>${now}</DueDate>
      <TotalDue>${totalDue}</TotalDue>
      <DepartMentId>0</DepartMentId>
      <Fund>0</Fund>
      <PaymentDate>0001-01-01T00:00:00</PaymentDate>
      <Quantity>0</Quantity>
      <ItemAmount>0</ItemAmount>
      <TotalAmountdue>0</TotalAmountdue>
      <PartialPaymentFlag>false</PartialPaymentFlag>
      <ReceiptpresentFlag>false</ReceiptpresentFlag>
      <Details>
        <BillingStatementDetail>
          <ItemDate>${now}</ItemDate>
          <ItemDescription>${itemDescription}</ItemDescription>
          <Charges>${totalDue}</Charges>
          <Credits>0</Credits>
        </BillingStatementDetail>
      </Details>
      <Customers>
        <Customer>
          <FirstName>${ownerName}</FirstName>
          <MiddleName />
          <LastName />
          <BillingAddress>
            <Address>
              <AddressLine1>${addressStreet}</AddressLine1>
              <City>${addressCity}</City>
              <State>${addressState}</State>
              <PostalCode>${addressZip}</PostalCode>
              <Country>${addressCountry}</Country>
            </Address>
          </BillingAddress>
        </Customer>
      </Customers>
    </BillingStatement>
  `
}
