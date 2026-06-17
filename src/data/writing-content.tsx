// Educational article bodies for the Writing section.
//
// This is the "learn" library: tool-agnostic, practitioner-grade pieces on how
// to reconcile data syncs between systems — concepts, manual methods,
// spreadsheets, AI assistance, and system-specific guides. Metadata (date,
// category, reading time) lives in writing-entries.ts; full bodies live here,
// keyed by the same slug. The renderer is components/WritingArticle.tsx.

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'callout'; kind: 'tip' | 'warning' | 'note'; text: string }
  | { t: 'code'; text: string }
  | { t: 'quote'; text: string }

export type FaqItem = { q: string; a: string }

export type Article = {
  slug: string
  title: string
  description: string
  keywords: string[]
  lead: string
  blocks: Block[]
  faq?: FaqItem[]
}

const articles: Article[] = [
  {
    slug: 'marketplace-payout-reconciliation',
    title: 'Marketplace payout reconciliation: the clearing account that makes every platform tie out',
    description:
      'Marketplace and gateway deposits never match the sales in your books, and they were never meant to — the platform bundles many orders into one payout, nets out fees, refunds, chargebacks, and reserves, then pays days later. Trying to match a deposit to your sales is the wrong fight. Give each marketplace its own clearing account, post the settlement report into it, and reconcile the account balance instead of the deposit: the balance should equal money the platform still owes you (in-transit payouts plus reserves), and anything left over is your exception list. This guide covers the journal entries, a step-by-step reconciliation, a worked settlement example, the exceptions to chase, and where the method tops out.',
    keywords: [
      'marketplace payout reconciliation',
      'payment gateway deposits don\'t match quickbooks',
      'reconcile marketplace deposits to gl',
      'clearing account for marketplace payouts',
      'amazon stripe paypal clearing account',
      'settlement report reconciliation',
      'gross vs net deposit reconciliation',
      'reconcile gateway payouts to bank',
    ],
    lead: 'Here is the move that ends the fight: stop trying to make a marketplace deposit equal your sales. It never will, and it was never supposed to. A bookkeeper in [r/Bookkeeping](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) named the symptom exactly — ["the bank deposit from Stripe/Shopify/PayPal is lower than the sales showing in QuickBooks, and then I have to dig through fees, refunds, chargebacks, and timing differences to figure out what happened."](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) The dig is the problem. Give each marketplace its own clearing account, post the settlement report into it, and the account does the digging for you. What is left over in the balance is the only thing you ever have to explain — and most months it explains itself.',
    blocks: [
      {
        t: 'p',
        text: 'Someone asked the exact right question in [r/Netsuite](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/): ["For example, for Amazon, we receive a settlement report showing all the payments for a specific period for multiple invoices. Should we create a bank clearing account for Amazon where the customer payments will be posted?"](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/) Yes. That is the answer. But the top reply just plugged a tool — ["I run thousands upon thousands of records monthly through Celigo reconciliation products. Probably saves us 80 hours a month in man hours."](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/) Maybe it does. It still does not tell you how the clearing account works, or how to tell when it is lying to you. That is what is missing everywhere this gets asked, so that is what this is.',
      },
      { t: 'h2', text: 'Why marketplace deposits never match QuickBooks' },
      {
        t: 'p',
        text: 'The most useful reply in that gateway-deposits thread gave the diagnosis in one breath: ["the mismatch is usually because QBO records the gross sale amount but your bank gets the net deposit after processing fees. if you\'re recording both and trying to match them 1:1 they\'ll never line up."](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) Correct, and it stops one step short. Knowing the deposit is net is not the same as having a way to prove a specific deposit is the right net. For that you need somewhere to land the difference.',
      },
      {
        t: 'p',
        text: 'Three structural facts make the gap permanent, and all three are normal. A payout is a batch, not a sale — the platform takes a window of transactions and wires you one number. The platform nets out its cut before paying: [processing fees, refunds, chargebacks, and dispute fees all come out of the payout](https://help.shopify.com/en/manual/payments/chargebacks), and [refunds you issue are deducted from the next available payout](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/lower-or-missing-payouts), not the one the original sale was in. And the cash lands days late — [a Stripe payout settles a day or two after the charges it bundles](https://docs.stripe.com/reports/balance), Amazon settles roughly every two weeks. A bookkeeper pricing a WooCommerce client summed up the moving parts better than any vendor page: ["the painful part is the settlement mess: shopify / woocommerce reports, paypal, cards, zelle/cashapp, fees, refunds, holds, bank deposits, and clearing balances."](https://reddit.com/r/Bookkeeping/comments/1t0k52r/how_much_would_you_charge_for_monthly_bookkeeping/) Note the last two words. The people who have done this already think in clearing balances. We are just going to make it deliberate. (For the Shopify-specific version of this gap, see [why Shopify deposits never match your sales](/notes/why-shopify-deposits-never-match-sales).)',
      },
      { t: 'h2', text: 'The fix: one clearing account per marketplace' },
      {
        t: 'p',
        text: 'A [clearing account](https://en.wikipedia.org/wiki/Clearing_account) is a holding account on your books for money that is in motion — earned but not yet settled to cash. Give each platform its own: Amazon Clearing, Stripe Clearing, PayPal Clearing, Shopify Payments Clearing. You book gross sales as revenue and route the receivable through that platform\'s clearing account. Every deduction the settlement report lists — fees, refunds, chargebacks, reserves — also posts to that clearing account. When the payout lands, the deposit clears it. The deposit no longer has to match your sales; it only has to clear an account whose balance you can read.',
      },
      {
        t: 'p',
        text: 'This is not a clever trick — it is the method the platforms assume you are using. Stripe\'s own reconciliation docs describe the recommended setup as modeling ["their Stripe balance as a temporary clearing account in their accounting system,"](https://docs.stripe.com/reports/payout-reconciliation) then reconciling each payout against the batch of transactions in it. It is also the grown-up version of the [QuickBooks Undeposited Funds account](https://quickbooks.intuit.com/learn-support/en-us/help-article/bank-deposits/whats-undeposited-funds-account/L6Jan3iRK_US_en_US), which the top answer in one [r/Netsuite](https://reddit.com/r/Netsuite/comments/1llf6m4/can_someone_explain_undeposited_funds_vs/) thread explained plainly: ["you accept credit card and you close your batch for the day, you get 1 deposit entry into your bank account even though you had say 20 credit card customer payments."](https://reddit.com/r/Netsuite/comments/1llf6m4/can_someone_explain_undeposited_funds_vs/) Undeposited Funds batches one processor\'s payments; a named clearing account per platform does the same thing but keeps each platform\'s fees and reserves isolated, which is the only way the balance stays readable once you sell on more than one.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'A clearing account holds known, in-transit amounts that clear on a schedule. That is different from a suspense account, which holds amounts you cannot yet classify. Marketplace payouts belong in a clearing account — you know exactly what they are; you are just waiting for the cash. Keep genuine mysteries (an unidentified deposit, a fee you cannot source) out of it, or the balance stops meaning anything.',
      },
      { t: 'h2', text: 'The journal entries, per platform per period' },
      {
        t: 'p',
        text: 'The whole method is three postings and one balance check. Booked at gross, deductions taken from the settlement report, cash clearing the rest:',
      },
      {
        t: 'code',
        text: 'Per marketplace, per settlement period\n--------------------------------------\n1) On sale (gross):\n   Dr  Marketplace Clearing        gross sales\n       Cr  Sales revenue                         gross sales\n\n2) From the settlement report (deductions):\n   Dr  Processing fees (expense)    fees\n   Dr  Refunds / contra-revenue     refunds\n   Dr  Chargebacks + dispute fees   adjustments\n       Cr  Marketplace Clearing                  fees + refunds + adjustments\n\n3) On payout (cash):\n   Dr  Bank                         net deposit\n       Cr  Marketplace Clearing                  net deposit\n\nClearing balance after the payout posts\n   = gross - (fees + refunds + adjustments) - net deposit\n\n   == 0   if the payout covered exactly this period with nothing held\n   != 0   should equal: in-transit payouts (settled, cash not yet arrived)\n                        + reserves / holds the platform is still sitting on\n          anything beyond that is your exception',
      },
      { t: 'h2', text: 'What the clearing balance should be (it is usually not zero)' },
      {
        t: 'p',
        text: 'This is the part the "record gross, deduct fees" advice never gets to. A clearing account that reads zero at month-end is not the goal, and chasing it to zero is how people waste an evening. The balance should equal the money the platform genuinely still owes you: payouts that have been earned but not yet wired (in transit), plus any reserve or hold the platform is sitting on. [Reserves and rolling holds are normal](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/lower-or-missing-payouts) — that money is yours, it just has not moved yet. So you reconcile the balance, not the deposit: take the clearing balance, subtract what you can account for as in-transit and reserves, and whatever remains is the only thing worth your attention.',
      },
      { t: 'h2', text: 'Reconcile a marketplace payout, step by step' },
      {
        t: 'p',
        text: 'Same shape for every platform — only the report column names change. If a sync already posts these entries for you, the steps become a verification instead of data entry, which is exactly what you want to be doing.',
      },
      {
        t: 'ol',
        items: [
          'Pull two files: the settlement / payout report for the period (Stripe\'s [payout reconciliation report](https://docs.stripe.com/reports/payout-reconciliation), Amazon\'s flat-file settlement, your Shopify Payments payout export) and your bank transactions.',
          'Clean the exports first. A payout ID that Excel autoconverted to a number, a comma-as-decimal, or a stray encoding mark will silently break every match downstream — these are the [CSV gotchas that quietly wreck a reconciliation](/notes/csv-gotchas-encoding-delimiters). The payout ID is the [primary ID](/notes/what-we-mean-when-we-say-primary-id) the whole reconciliation joins on; protect it.',
          'Foot each payout on the report itself: confirm gross − fees − refunds − adjustments equals the net the platform says it paid. If the platform\'s own report does not foot, stop — that is a data problem to escalate, not a books problem to force.',
          'Post the three entries to that platform\'s clearing account (gross to revenue, deductions from the report, net deposit from the bank) — or let your tool post them and spot-check one period by hand.',
          'Match each net payout on the report to a bank line, on amount and date, or on payout ID if the bank line carries one. This is the cash-side tie-out covered in [bank reconciliation, step by step](/notes/bank-reconciliation-step-by-step).',
          'Read the clearing balance. Subtract known in-transit payouts and reserves. The remainder is your exception list for the period — work only those rows. A clean close is a balance you can fully explain, not a balance of zero.',
        ],
      },
      { t: 'h2', text: 'A worked example: one settlement period' },
      {
        t: 'p',
        text: 'Say a marketplace settles a two-week window. The report breaks down like this, and the deposit that hit your bank was 4,310:',
      },
      {
        t: 'table',
        head: ['Settlement line', 'Amount', 'Posts to'],
        rows: [
          ['Gross product sales', '6,200', 'Dr Clearing / Cr Revenue'],
          ['Processing + platform fees', '(930)', 'Dr Fees / Cr Clearing'],
          ['Refunds settled this period', '(540)', 'Dr Refunds / Cr Clearing'],
          ['Chargeback + dispute fee', '(120)', 'Dr Chargebacks / Cr Clearing'],
          ['Reserve held by platform', '(300)', 'stays in Clearing (not paid yet)'],
          ['Net deposit to bank', '4,310', 'Dr Bank / Cr Clearing'],
        ],
      },
      {
        t: 'p',
        text: 'Gross 6,200, minus fees 930, refunds 540, chargebacks 120, and a 300 reserve the platform held back, leaves 4,310 — which matches the deposit. After all three entries post, the clearing account is not zero; it holds 300. That 300 is the reserve, and it is supposed to be there. You did not lose it and you do not chase it. When the reserve releases next period, that payout clears it and the balance returns to whatever the new in-transit amount is. The reconciliation is done the moment you can say, in one sentence, what the balance is.',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Reconcile at the payout level, not the order level. You do not match 4,000 orders to the bank — you match a handful of payouts, and let the orders roll up to their payout total inside the report. That is the difference between a 20-minute close and a lost Saturday. A downloadable per-payout sheet with the gross-to-net columns already laid out is in the [reconciliation spreadsheet template](/notes/reconciliation-spreadsheet-template).',
      },
      { t: 'h2', text: 'When the clearing account will not tie' },
      {
        t: 'p',
        text: 'When the leftover balance is bigger than your known reserves and in-transit, it is almost always one of a short list. An Amazon seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) described the lived version — ["payments come in but when it\'s time to reconcile, things just don\'t line up. Delays, mismatched payouts, and manual back-and-forth every week."](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) The usual culprits:',
      },
      {
        t: 'ul',
        items: [
          'The payout window straddles month-end — sales in one month, cash in the next. That is in-transit timing, not an error; it is the residual that should be there.',
          'A fee or refund was booked to the wrong account, so clearing never received the credit. The clearing balance is off by exactly that fee.',
          'A refund settled for a sale from a prior period that you booked net the first time, so the gross was never in clearing to net against.',
          'A sync double-posted the payout, or dropped one — common when an integration "runs" but silently skips records. See [reconciling Shopify orders against your ERP](/notes/reconcile-shopify-orders-against-your-erp) for the dropped-record pattern.',
          'FX: the sale, the fee, and the settlement converted at different rates, leaving a real-looking gap that is just revaluation. That is its own discipline — see [multi-currency reconciliation](/notes/multi-currency-reconciliation).',
        ],
      },
      { t: 'h2', text: 'What about A2X, Synder, Celigo?' },
      {
        t: 'p',
        text: 'They automate exactly this. A2X is the community default for posting Shopify and Amazon settlements to QuickBooks or Xero; Synder gets named when a native integration breaks; Celigo shows up for NetSuite at volume, which is what that r/Netsuite reply was praising. They all do the same job under the hood — parse the settlement report and post the clearing-account journal entries so you do not key them by hand. That is a fair trade and often worth it. The reason to understand the method anyway is simple: a tool that posts entries you cannot read is a tool you cannot audit. Know what the clearing balance should be, and you can check the tool instead of trusting it — which is also the first thing [an auditor will ask you to show](/notes/what-auditors-look-for).',
      },
      { t: 'h2', text: 'Where this method tops out' },
      {
        t: 'p',
        text: 'One clearing account per platform is the right tool for a handful of platforms and a monthly or weekly close. It strains when you are running many marketplaces at once, when you need daily cash visibility rather than period-end truth, when reserves are multi-currency, or when an auditor wants the trail across thousands of individual payouts. At that point the per-platform balance is still correct, but reading it by hand stops scaling — the same way a spreadsheet does once the partial payments and bundled deposits pile up. The structure does not change when you outgrow doing it by hand; only who does the posting does. Get the clearing accounts right first, and every later tool — or model — has something correct to check itself against.',
      },
    ],
    faq: [
      {
        q: 'Should I record marketplace sales at gross or net?',
        a: 'Gross. Book the full sale as revenue and route it through the platform clearing account, then post fees, refunds, and chargebacks separately from the settlement report. Recording only the net deposit hides what you paid in fees and makes per-product margin analysis impossible, because you can no longer see what each sale actually cost you to collect.',
      },
      {
        q: 'Do I need a separate clearing account for each marketplace?',
        a: 'Yes, one per platform or processor. A single shared clearing account mixes Amazon reserves with Stripe fees with PayPal holds, and the balance becomes unreadable — you cannot tell which platform owes you what. A separate account per platform keeps each balance meaningful, which is the entire point of the method.',
      },
      {
        q: 'Why is my clearing account not zero at month-end?',
        a: 'It usually should not be. A clearing account holds money in motion, so at any close it should equal the payouts that have been earned but not yet wired to your bank, plus any reserve or hold the platform is still sitting on. Reconcile the balance to those known amounts rather than forcing it to zero — a balance you can explain in one sentence is a reconciled balance.',
      },
      {
        q: 'Is a clearing account the same as undeposited funds?',
        a: 'Same idea, different scale. Undeposited Funds is the built-in QuickBooks account for batching one processor\'s payments so they match a single bank deposit. A named clearing account per platform does the same batching but isolates each platform\'s fees, refunds, and reserves, which is what keeps the balance readable once you sell on more than one marketplace.',
      },
      {
        q: 'How is this different from just matching the deposit in my bank feed?',
        a: 'Bank-feed matching confirms that cash arrived and ties it to a category. It does not prove the cash equals what the platform actually owed you after fees, refunds, and reserves. The clearing account proves it: gross in, deductions out, deposit clears the rest, and the leftover balance is the exact amount still in transit or held. Bank matching tells you money showed up; the clearing account tells you the right amount showed up.',
      },
    ],
  },
  {
    slug: 'amazon-settlement-reconciliation',
    title: 'Amazon settlement reconciliation: matching disbursements to your ERP when the reserve hides the rest',
    description:
      'Your Amazon disbursement never matches your sales because it is a two-week batch paid net of referral fees, FBA fees, refunds, and ad spend, minus a reserve Amazon holds back — so matching the deposit to a sales total is a fight you cannot win. The settlement report is the source of truth: it lists every financial event in the period and foots to the disbursement by construction. Reconcile it with one Amazon clearing account — book gross sales through it, post every deduction from the report, let the disbursement clear most of the balance — and the leftover is the reserve. Then prove the reserve with a roll-forward: beginning reserve plus what was held this period minus what released equals the reserve at the top of the next settlement. This guide covers the report structure, the journal entries, the reserve roll-forward, a worked settlement example, the Amazon-specific exceptions, and where the method tops out.',
    keywords: [
      'amazon settlement reconciliation',
      'reconcile amazon disbursements to erp',
      'amazon settlement report reconciliation',
      'amazon account level reserve reconciliation',
      'why amazon payout doesn\'t match sales',
      'amazon clearing account quickbooks xero',
      'fba fees referral fees reconciliation',
      'amazon dd+7 reserve reconciliation',
    ],
    lead: 'Here is the part that changes everything: with Amazon, you are not reconciling sales against a deposit. You are reconciling a settlement report against itself. A seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) described the usual mess — ["Orders get shipped, payments come in but when it\'s time to reconcile, things just don\'t line up. Delays, mismatched payouts, and manual back-and-forth every week."](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) The thread\'s top answer was a link to a Discord server. So here is the actual method. Amazon\'s deposit is short and late on purpose — it nets out referral and FBA fees, holds back a reserve, and pays on a two-week clock. The settlement report already foots to that deposit. Your job is to prove the part it keeps — the reserve — and show it carries into the next report. Do that, and the chaos becomes one number you can name.',
    blocks: [
      { t: 'h2', text: 'Why your Amazon disbursement never matches your sales' },
      {
        t: 'p',
        text: 'Three structural facts make the gap permanent, and all three are normal. A disbursement is a batch over a settlement period, not a single sale — Amazon takes a window of activity and wires you one number. Amazon subtracts its cut first: [referral fees, FBA fulfillment and storage fees, refunds, and advertising spend](https://sellercentral.amazon.com/help/hub/reference/external/G200989190) all come out before the money moves. And it holds back a reserve. A bookkeeper running four marketplaces in [r/Accounting](https://reddit.com/r/Accounting/comments/1ry3frk/anyone_else_doing_ecom_accounting_for_a_client_on/) summed up the feeling exactly — ["Amazon holds reserves and releases them on some schedule only Amazon understands."](https://reddit.com/r/Accounting/comments/1ry3frk/anyone_else_doing_ecom_accounting_for_a_client_on/) It is less mysterious than that, but the instinct is right: a chunk of your money is parked, on purpose.',
      },
      {
        t: 'p',
        text: 'The reserve comes in two layers, and it helps to name them. First is the standard delivery-date reserve: Amazon now holds an order\'s funds until seven days after delivery — DD+7. Amazon\'s own migration notice, quoted in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1ntxhno/migration_to_dd7_on_march_12_2026/), spelled out why: ["Moving your reserve setting to DD+7 provides time for you to accrue fees and other costs before disbursement."](https://reddit.com/r/FulfillmentByAmazon/comments/1ntxhno/migration_to_dd7_on_march_12_2026/) A seller on that thread put the cash-flow cost plainly — ["this will add 8 to 14 days to cash flow planning."](https://reddit.com/r/FulfillmentByAmazon/comments/1ntxhno/migration_to_dd7_on_march_12_2026/) Second is the account-level reserve, a dynamic hold for estimated returns and claims that can, in a bad month, swallow the whole payout. A seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/149er0c/account_level_reserve/) watched it happen: ["Amazon is now saying my entire balance is for the account level reserve and no payment is being made."](https://reddit.com/r/FulfillmentByAmazon/comments/149er0c/account_level_reserve/) Neither reserve means money is lost. Both mean the deposit is always smaller than the period\'s sales — so reconciling one against the other directly is a fight you cannot win.',
      },
      { t: 'h2', text: 'The settlement report is the source of truth — read it that way' },
      {
        t: 'p',
        text: 'Before any matching, internalize one fact a seller stated in an Amazon-to-Xero thread in [r/AmazonSeller](https://reddit.com/r/AmazonSeller/comments/166hli3/headaches_importing_syncing_amazon_sales_into/): ["On the Amazon side your books are/should be based on your Amazon settlement reports. These are final and do not change."](https://reddit.com/r/AmazonSeller/comments/166hli3/headaches_importing_syncing_amazon_sales_into/) That is the whole game. The [settlement / Payment Date Range report](https://sellercentral.amazon.com/help/hub/reference/external/G200989190) in Seller Central is the ledger — not your order export. It lists every financial event in the period: orders, refunds, referral fees, FBA fees, storage, ad charges, reserve movements, and the disbursement, and it foots to the net Amazon paid. Reconcile against your order count or your gross sales and you will never tie. Reconcile against the settlement report and it ties by construction — because Amazon built it to.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'The settlement report comes two ways: a summary (account-level totals — sales, fees, refunds, reserve movement, disbursement) and a transaction detail (every order-level line). Reconcile the summary to your books and to the bank. Keep the detail to explain a single exception when one shows up. Do not try to post thousands of order lines — post the summary totals, and let the detail answer questions only when they are asked.',
      },
      { t: 'h2', text: 'The fix: one Amazon clearing account, settlement by settlement' },
      {
        t: 'p',
        text: 'The method is the same [clearing-account model that makes every marketplace tie out](/notes/marketplace-payout-reconciliation), applied to Amazon\'s specific line items. A [clearing account](https://en.wikipedia.org/wiki/Clearing_account) is a holding account for money that is earned but not yet settled to cash. Open one — Amazon Clearing — and route everything through it. Book gross sales as revenue through the account. Post every deduction the settlement report lists — referral fees, FBA fees, refunds, ad spend, chargebacks — to that account. When the disbursement lands, it clears most of the balance. What is left is the reserve, and it is supposed to be there. (For the Shopify-specific version of the same gross-versus-net gap, see [why Shopify deposits never match your sales](/notes/why-shopify-deposits-never-match-sales).)',
      },
      {
        t: 'code',
        text: 'Per settlement period, into Amazon Clearing\n-------------------------------------------\n1) Sales (gross):\n   Dr  Amazon Clearing             gross sales\n       Cr  Sales revenue                        gross sales\n\n2) Deductions from the settlement report:\n   Dr  Referral fees (expense)     referral fees\n   Dr  FBA fees (expense)          fulfillment + storage\n   Dr  Refunds / contra-revenue    refunds\n   Dr  Advertising (expense)       sponsored ads spend\n       Cr  Amazon Clearing                      fees + refunds + ads\n\n3) Disbursement (cash):\n   Dr  Bank                        net disbursement\n       Cr  Amazon Clearing                      net disbursement\n\nAmazon Clearing balance after posting\n   = gross - (referral + FBA + refunds + ads) - net disbursement\n   = the amount Amazon held back\n\n   should equal:  delivery-date (DD+7) reserve\n                + account-level reserve\n                + any settled disbursement still in transit\n   anything beyond that is your exception',
      },
      { t: 'h2', text: 'The reserve is not a mystery — prove it with a roll-forward' },
      {
        t: 'p',
        text: 'This is the part every thread skips. An accountant in [r/AmazonSeller](https://reddit.com/r/AmazonSeller/comments/1ebzn0v/reconcile_account_level_reserve/) asked the exact right question and got no real answer: ["I am an accountant in a small company so I need details not high level overview. How do I reconcile the Account Level Reserve?"](https://reddit.com/r/AmazonSeller/comments/1ebzn0v/reconcile_account_level_reserve/) Here it is. Amazon\'s settlements are continuous — each report opens with the prior period\'s ending reserve and closes with a new one. So you do not hunt for the reserve; you roll it forward. Beginning reserve, plus what was newly held this period, minus what was released, equals the ending reserve — and that ending number must equal the reserve shown at the top of the next settlement. If it ties, the reserve is proven, not guessed.',
      },
      {
        t: 'code',
        text: 'Account-level + DD+7 reserve roll-forward\n-----------------------------------------\n  Beginning reserve        (top of THIS settlement report)\n+ Amounts newly reserved   (orders delivered < 7 days ago; account-level holds)\n- Amounts released         (prior reserves now disbursed)\n= Ending reserve           (must equal the reserve line at the TOP of the NEXT report)\n\n  Ending reserve == next report\'s beginning reserve  -> reserve proven\n  Ending reserve != next report\'s beginning reserve  -> that gap is your exception',
      },
      {
        t: 'p',
        text: 'The cadence is what makes a sale and its cash land in different reports. A seller in that same thread confirmed the rhythm — ["The automated disbursement is indeed every 14 days"](https://reddit.com/r/AmazonSeller/comments/1ebzn0v/reconcile_account_level_reserve/) — and Amazon\'s payment terms, as another seller quoted them, explain the seven-day piece: ["Professional Sellers are paid every two weeks for orders delivered at least 7 days from the latest estimated delivery date."](https://reddit.com/r/AmazonSeller/comments/1ebzn0v/reconcile_account_level_reserve/) Tie periods to periods, not sales to days, and the timing stops looking like an error.',
      },
      { t: 'h2', text: 'Reconcile an Amazon settlement, step by step' },
      {
        t: 'p',
        text: 'Same shape every period — only the report\'s date range changes. If a sync already posts these entries for you, the steps become a verification instead of data entry, which is exactly what you want to be doing.',
      },
      {
        t: 'ol',
        items: [
          'Pull two files: the settlement report for the period (the summary and, if you want the detail on hand, the transaction view) from Seller Central, and your bank transactions.',
          'Clean the exports first. A settlement ID or order ID that Excel autoconverted to a number, or a stray encoding mark in a product title, will silently break every match downstream — these are the [CSV gotchas that quietly wreck a reconciliation](/notes/csv-gotchas-encoding-delimiters). The settlement ID and order ID are the [primary IDs](/notes/what-we-mean-when-we-say-primary-id) the whole reconciliation joins on; protect them.',
          'Foot the settlement report against itself: confirm beginning balance + sales − referral fees − FBA fees − refunds − ad spend ± reserve movement equals the disbursement Amazon says it paid. If Amazon\'s own report does not foot, stop — that is a data-pull problem to fix, not a books problem to force.',
          'Post the summary to Amazon Clearing: gross to revenue, each deduction to its own expense or contra account, the disbursement from the bank — or let your tool post them and spot-check one period by hand.',
          'Match the disbursement to a bank line on amount and date, or on settlement ID if the bank memo carries one. This is the cash-side tie covered in [bank reconciliation, step by step](/notes/bank-reconciliation-step-by-step).',
          'Roll the reserve forward and confirm the ending reserve equals the next report\'s opening reserve. Then read the clearing balance: it should equal the reserve plus any settled disbursement still in transit. The remainder is your exception list — work only those rows.',
        ],
      },
      { t: 'h2', text: 'A worked example: one settlement period' },
      {
        t: 'p',
        text: 'Say a two-week settlement. The summary breaks down like this, and the disbursement that hit your bank was 6,540:',
      },
      {
        t: 'table',
        head: ['Settlement line', 'Amount', 'Posts to'],
        rows: [
          ['Gross product sales', '12,000', 'Dr Clearing / Cr Revenue'],
          ['Referral fees', '(1,800)', 'Dr Referral fees / Cr Clearing'],
          ['FBA fulfillment + storage fees', '(1,400)', 'Dr FBA fees / Cr Clearing'],
          ['Refunds settled this period', '(700)', 'Dr Refunds / Cr Clearing'],
          ['Sponsored Products ad spend', '(560)', 'Dr Advertising / Cr Clearing'],
          ['Reserve held (DD+7 + account level)', '(1,000)', 'stays in Clearing (not paid yet)'],
          ['Net disbursement to bank', '6,540', 'Dr Bank / Cr Clearing'],
        ],
      },
      {
        t: 'p',
        text: 'Gross 12,000, minus referral fees 1,800, FBA fees 1,400, refunds 700, and ad spend 560, leaves 7,540 earned. Amazon held 1,000 of that in reserve, so 6,540 hit the bank — which matches the deposit. After all three entries post, Amazon Clearing is not zero; it holds 1,000. That 1,000 is the reserve, and it is supposed to be there. You did not lose it and you do not chase it. When the reserve releases next period, that disbursement clears it, and the balance returns to whatever the new reserve is. The reconciliation is done the moment you can say, in one sentence, what the balance is: it is the reserve.',
      },
      { t: 'h2', text: 'When the settlement will not tie' },
      {
        t: 'p',
        text: 'When the leftover balance is bigger than your known reserve and in-transit, it is almost always one of a short list. A new seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1l1btd6/new_amazon_seller_and_hence_seeking_inputs_on/) hit the classic version — ["the Disbursement Report and the Repository Report (which tracks unit-wise sales and realization) aren\'t lining up."](https://reddit.com/r/FulfillmentByAmazon/comments/1l1btd6/new_amazon_seller_and_hence_seeking_inputs_on/) The usual culprits:',
      },
      {
        t: 'ul',
        items: [
          'Deferred versus settled timing: an order is delivered but still inside its DD+7 window, so it is in the period\'s sales but not yet in the disbursement. That is in-transit, not an error — it belongs in the reserve and rolls forward.',
          'The report straddles month-end — earned in one month, paid in the next. Real timing residual; it lives in the in-transit bucket, not in an exception you chase.',
          'A fee or ad charge posted to the wrong account, so clearing never received the credit. The balance is off by exactly that amount.',
          'Multiple marketplaces (US, CA, MX, or the EU) settling in different currencies and converting at different rates — a real-looking gap that is just revaluation. That is its own discipline; see [multi-currency reconciliation](/notes/multi-currency-reconciliation).',
          'A sync double-posted a settlement or dropped one — common when an integration "runs" but silently skips records. The dropped-record pattern is the same one in [reconciling Shopify orders against your ERP](/notes/reconcile-shopify-orders-against-your-erp).',
          'Two settlements with the same total, one unexplained — verify the IDs are distinct, because a [near-duplicate the ID hides](/notes/fuzzy-matching-records) reads as a phantom exception.',
        ],
      },
      { t: 'h2', text: 'What about A2X, Link My Books, Synder?' },
      {
        t: 'p',
        text: 'They automate exactly this — parse the settlement report and post the clearing-account entries so you do not key them by hand. A2X is the community default for posting Amazon settlements to QuickBooks or Xero; the others show up for specific stacks. It is a fair trade and often worth it. The reason to understand the method anyway is the one that seller named: your books are based on the settlement report, and those reports "are final and do not change," so a tool that posts entries you cannot read is a tool you cannot audit. Know what the reserve roll-forward should produce and you can check the tool instead of trusting it — which is also the first thing [an auditor will ask you to show](/notes/what-auditors-look-for). The same logic carries to the ERP side, where the settlement totals have to agree with [inventory and the GL in NetSuite](/notes/netsuite-reconciliation-inventory-and-gl) and with [the AR subledger](/notes/ar-ap-reconciliation).',
      },
      { t: 'h2', text: 'Where this method tops out' },
      {
        t: 'p',
        text: 'One clearing account and a settlement-by-settlement roll-forward is the right tool for a seller on one or two marketplaces closing monthly or per settlement. It strains when you run many marketplaces and currencies at once, when you need daily cash visibility instead of period-end truth, or when an auditor wants the trail across thousands of order-level lines under each disbursement. The structure stays correct; reading it by hand stops scaling — the same way a spreadsheet does once partial payments and bundled deposits pile up. A workbook saves the answer but not the reasoning, and the [reconciliation spreadsheet template](/notes/reconciliation-spreadsheet-template) only stretches so far across formats. Get the clearing account and the reserve roll-forward right first, and every later tool — or model — has something correct to check itself against.',
      },
    ],
    faq: [
      {
        q: 'Why doesn\'t my Amazon disbursement match my sales?',
        a: 'Because the disbursement is a batch over a settlement period, not a single sale. Amazon bundles the period\'s activity, subtracts referral fees, FBA fulfillment and storage fees, refunds, and advertising spend, then holds back a reserve, and pays the net on a roughly two-week cycle. So the deposit is smaller than the sales it represents and arrives later. You reconcile the settlement report — which foots to the disbursement by construction — rather than trying to make a deposit equal a sales total.',
      },
      {
        q: 'What is the Amazon account-level reserve and how do I reconcile it?',
        a: 'It is a dynamic hold Amazon keeps to cover estimated returns and claims, on top of the standard delivery-date (DD+7) reserve. You reconcile it with a roll-forward: beginning reserve, plus amounts newly held this period, minus amounts released, equals the ending reserve — and that ending number must equal the reserve shown at the top of the next settlement report. If it ties, the reserve is proven rather than assumed. Settlements are continuous, so each report\'s opening reserve is the prior report\'s closing reserve.',
      },
      {
        q: 'Should I reconcile every Amazon order or just the settlement?',
        a: 'The settlement. A period may contain thousands of orders but only one disbursement and one summary. The orders only need to roll up to the summary totals; the summary is what you tie to your books and the bank deposit. Keep the order-level transaction detail to explain a specific exception when one appears, not as the thing you reconcile line by line.',
      },
      {
        q: 'What is DD+7 and why did my payouts slow down?',
        a: 'DD+7, the delivery-date-based reserve, means Amazon releases an order\'s funds seven days after confirmed delivery rather than at shipment or order. Combined with the standard two-week disbursement cycle, the cash for a sale can sit roughly two weeks behind the sale itself. It is a timing change, not a loss — the funds appear as deferred or reserved and release on schedule, which is why a reserve roll-forward, not panic, is the right response.',
      },
      {
        q: 'Do I need a separate clearing account just for Amazon?',
        a: 'Yes. A shared clearing account mixes Amazon\'s reserve and FBA fees with other processors\' holds, and the balance stops meaning anything. A dedicated Amazon Clearing account keeps the reserve readable, which is the entire point: after the disbursement posts, the balance should equal the reserve plus any settled disbursement still in transit, and nothing else. A balance you can explain in one sentence is a reconciled balance.',
      },
    ],
  },
  {
    slug: 'reconciliation-spreadsheet-template',
    title: 'A free reconciliation spreadsheet template for Shopify and Stripe payouts (and how to actually use it)',
    description:
      'A growing store asks the same question every quarter: is reconciliation still just a manual Excel job, or is there a sheet I can use? There is, and you can download it here. But the reason most home-built master sheets fail is that they try to match sales straight to the bank deposit — two numbers that are never equal, because a payout bundles many orders, nets out fees and refunds, and lands days after the sale. The fix is structure, not effort: put the payout statement in the middle and reconcile in two hops — orders to the payout on gross, payout to the bank on net. This walks through the template column by column, the formulas that roll orders up to a payout, and how to read the one column that matters: the difference.',
    keywords: [
      'reconciliation spreadsheet template',
      'shopify payout reconciliation template',
      'payout reconciliation excel',
      'stripe payout reconciliation spreadsheet',
      'free reconciliation template',
      'reconcile shopify payouts to bank',
      'ecommerce reconciliation master sheet',
      'gross net deposit reconciliation',
    ],
    lead: 'A store doing real volume eventually asks the question one [r/ecommerce](https://reddit.com/r/ecommerce/comments/1r568lr/how_are_growing_d2c_brands_handling_payout/) poster put plainly: ["For brands doing decent volume, is this mostly handled in Excel manually? Or are there tools people rely on?"](https://reddit.com/r/ecommerce/comments/1r568lr/how_are_growing_d2c_brands_handling_payout/) The honest answer is that a spreadsheet handles it fine for a long time — if it is built right. The best community answer to that thread says exactly what to do and stops just short of how: most brands ["create one clean master sheet that pulls Shopify payouts and gateway fees weekly and reconcile against bank deposits line by line. The no cost fix is discipline and a clear process owner."](https://reddit.com/r/shopify/comments/1r566ne/how_are_growing_d2c_brands_handling_payout/) Correct. But nobody ever hands over the sheet. So here it is — and the one structural decision that separates a master sheet that ties out from one that quietly lies to you.',
    blocks: [
      {
        t: 'callout',
        kind: 'tip',
        text: 'Free download: a no-macro reconciliation master sheet — one row per payout, with the gross-to-net columns and the difference formula already laid out — [reconciliation-master-sheet.csv](/downloads/reconciliation-master-sheet.csv). Open it in Excel or Google Sheets, delete the three example rows, paste your payouts. Nothing to buy.',
      },
      { t: 'h2', text: 'Is there a reconciliation spreadsheet template I can just use?' },
      {
        t: 'p',
        text: 'Yes — [the one above](/downloads/reconciliation-master-sheet.csv) — and for most stores a sheet is the right tool well past the point people assume they have outgrown it. The reason home-built versions fail is almost never the formulas. It is that they reconcile the wrong two things: total sales against the bank deposit. Those two numbers will never be equal, and no amount of XLOOKUP fixes that, because they are not supposed to be equal. The template is built around the number that sits between them — the payout — and that single change is what makes it tie.',
      },
      {
        t: 'p',
        text: 'Everything below explains how to use it: why sales and the deposit diverge, the structure that resolves it, the six steps to build it from your own exports, and how to read the only column that needs your attention.',
      },
      { t: 'h2', text: 'Why your sales never equal the bank deposit' },
      {
        t: 'p',
        text: 'A bookkeeper in [r/Bookkeeping](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) described the exact trap the master sheet has to avoid: ["I keep running into situations where the bank deposit from Stripe/Shopify/PayPal is lower than the sales showing in QuickBooks, and then I have to dig through fees, refunds, chargebacks, and timing differences to figure out what happened."](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) The most useful reply named the cause without dressing it up: ["the mismatch is usually because QBO records the gross sale amount but your bank gets the net deposit after processing fees. if you\'re recording both and trying to match them 1:1 they\'ll never line up."](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/)',
      },
      {
        t: 'p',
        text: 'That is the whole problem in two sentences. A single payout is not one sale — it is a batch. The processor takes a window of transactions, subtracts its [processing fees, refunds you issued, and any chargebacks or dispute fees](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/lower-or-missing-payouts), and wires you the net. [Refunds you process come out of the next available payout](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/refunds), not the one the sale was in, so the timing never lines up cleanly either. Stripe works the same way: [a single deposit bundles many charges with fees already deducted](https://docs.stripe.com/payments/balances), settling a day or two after the sale. So the deposit is smaller than the sales it represents, it covers a different set of orders than any single day, and it arrives late. Three reasons it cannot match — and all three are normal. We cover the mechanics of the gap in more depth in [why Shopify deposits never match your sales](/notes/why-shopify-deposits-never-match-sales); here we just build the sheet that absorbs it.',
      },
      { t: 'h2', text: 'The structure that makes the master sheet work' },
      {
        t: 'p',
        text: 'Stop trying to match sales to the bank in one jump. Insert the payout statement as a middle ledger and reconcile in two hops: orders roll up to a payout on gross amounts, and the payout ties to the bank on the net. The payout is the pivot both sides agree on — every order belongs to exactly one payout, and every payout is exactly one bank deposit.',
      },
      {
        t: 'code',
        text: 'The two-hop model\n-----------------\n  Hop 1   Orders in the payout window  -->  Payout statement   (match on GROSS)\n  Hop 2   Payout statement             -->  Bank deposit       (match on NET)\n\n  Expected net  =  Gross sales  -  Refunds  -  Processing fees  -  Adjustments\n  Difference    =  Bank deposit  -  Expected net\n\n  Difference == 0   -> matched, ignore it\n  Difference != 0   -> exception, the only rows you work',
      },
      {
        t: 'p',
        text: 'The master sheet is one row per payout. The columns are nothing more than the line items the processor already nets out, plus the two it computes for you:',
      },
      {
        t: 'table',
        head: ['Column', 'Where it comes from', 'What it is for'],
        rows: [
          ['Payout ID', 'Payout / settlement report', 'The [primary ID](/notes/what-we-mean-when-we-say-primary-id) for the whole row — the key both hops join on'],
          ['Payout date (bank)', 'Bank statement', 'When the deposit actually landed, not when the sale closed'],
          ['Gross sales', 'Orders in that payout', 'The top of the funnel — what the orders totalled before anything was taken out'],
          ['Refunds', 'Payout report', 'Refunds settled in this payout (often from earlier sales)'],
          ['Processing fees', 'Payout report', 'The processor\'s cut for this batch'],
          ['Adjustments', 'Payout report', 'Chargebacks, dispute fees, reserves, corrections'],
          ['Expected net', 'Formula', 'Gross − Refunds − Fees − Adjustments — what the deposit should be'],
          ['Bank deposit', 'Bank statement', 'What actually hit the account'],
          ['Difference', 'Formula', 'Bank − Expected net — your exception flag'],
          ['Status / Notes', 'You', 'Matched, or what you found when it was not'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Reconcile at the payout level, not the order level. You do not need to match 4,000 individual orders to the bank — you need to match 30 payouts. The orders only have to roll up correctly to their payout total (hop 1); the payout is what you tie to cash (hop 2). This is the difference between a 20-minute reconciliation and a lost afternoon.',
      },
      { t: 'h2', text: 'How to build it from your own exports, in six steps' },
      {
        t: 'p',
        text: 'The procedure assumes a Shopify or Stripe payout export and your bank transactions. It is the same shape for any processor — only the column names change.',
      },
      {
        t: 'ol',
        items: [
          'Export two files: the payout (settlement) report for the period, and your bank transactions. Most payout reports already break out gross, fees, refunds, and adjustments per payout — if so, hop 1 is done for you.',
          'Clean the exports before anything else. A leading apostrophe, a region\'s comma-as-decimal, or a payout ID that Excel autoconverted to a number will silently break every match downstream — these are the [CSV gotchas that quietly wreck a reconciliation](/notes/csv-gotchas-encoding-delimiters). Import via Power Query and set column types explicitly rather than double-clicking the CSV.',
          'Make one row per payout in the master sheet. Paste the payout report\'s gross, refunds, fees, and adjustments into their columns, keyed on Payout ID.',
          'If your report does not pre-total gross sales, roll the orders up yourself with SUMIFS — sum each order\'s amount where its payout ID matches the row. One formula, filled down.',
          'Add the two computed columns: Expected net = Gross − Refunds − Fees − Adjustments, and Difference = Bank deposit − Expected net. Pull the Bank deposit in from the bank file on Payout ID, or match it by amount and date if the bank line has no ID.',
          'Filter Difference to everything that is not zero. That short list is your entire job for the period. Tag each one in Notes, fix the source, and re-pull. A clean run is every row at zero.',
        ],
      },
      {
        t: 'p',
        text: 'The two formulas are the only mechanics worth writing down. Gross roll-up and the difference, in Excel terms:',
      },
      {
        t: 'code',
        text: 'Hop 1 — roll orders up to the payout (only if the report does not):\n  Gross sales for a payout:\n  =SUMIFS(Orders[Amount], Orders[PayoutID], [@PayoutID])\n\nThe two computed columns:\n  Expected net = [@[Gross sales]] - [@Refunds] - [@[Processing fees]] - [@Adjustments]\n  Difference   = [@[Bank deposit]] - [@[Expected net]]\n\nPull the bank deposit in by Payout ID (if the bank line carries it):\n  =XLOOKUP([@PayoutID], Bank[Reference], Bank[Amount], "NO BANK LINE")',
      },
      {
        t: 'p',
        text: '[SUMIFS](https://support.microsoft.com/en-us/office/sumifs-function-c9e748f5-7ea7-455d-9406-611cebce642b) does the gross roll-up; [Power Query](https://support.microsoft.com/en-us/office/about-power-query-in-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a) does the cleaning and, once you are comfortable, the whole import so next month is a refresh instead of a rebuild. The [XLOOKUP that pulls the bank deposit](/notes/reconcile-two-files-in-excel-with-xlookup) is the same join used in any two-file reconciliation, and if a payout has no matching bank line at all, that is a [set-difference](/notes/find-missing-rows-in-excel-countif-match) you want surfaced, not hidden — which is why the formula returns "NO BANK LINE" instead of an error.',
      },
      { t: 'h2', text: 'Reading the difference column: what each exception means' },
      {
        t: 'p',
        text: 'A non-zero difference is not a mistake in your sheet — it is the sheet doing its job. It means the deposit and what you expected disagree, and the gap itself usually tells you why. The common cases, and where to look:',
      },
      {
        t: 'table',
        head: ['What the difference looks like', 'Most likely cause', 'Where to fix it'],
        rows: [
          ['Deposit short by a round-ish amount', 'A chargeback or dispute fee deducted but not yet booked in your Adjustments column', 'Open the payout statement and find the deduction; add it to Adjustments'],
          ['Deposit short by a small percentage', 'Processing fees under-counted, or a fee tier you missed', 'Re-pull fees from the payout report; do not estimate them'],
          ['Expected net higher than the deposit, refund-sized', 'A refund settled in this payout from an earlier sale', 'Normal timing — record the [refund in the payout it settled in](/notes/why-shopify-deposits-never-match-sales), not the original'],
          ['Payout has no bank line at all', 'Timing — the deposit lands in the next period; or it is in transit', 'Carry it open and match it next run; do not force it'],
          ['Difference is tiny and never the same twice', 'Rounding or an FX conversion on a cross-currency payout', 'Expected on [multi-currency payouts](/notes/multi-currency-reconciliation); set a small tolerance, do not chase pennies'],
          ['Two payouts, same amount, one unexplained', 'A duplicate or a miskeyed payout ID', 'A [near-duplicate the ID hides](/notes/fuzzy-matching-records) — verify the IDs are distinct'],
        ],
      },
      {
        t: 'p',
        text: 'The discipline is the one the original thread named — "discipline and a clear process owner" — made concrete: every period, you work the difference column to zero and keep the sheet. Worked the same way each month, it doubles as your [month-end tie-out](/notes/tick-and-tie-checklist) and the [evidence an auditor asks for](/notes/what-auditors-look-for): a payout-by-payout trail from cash back to the orders, with every exception named and resolved rather than plugged.',
      },
      { t: 'h2', text: 'When the spreadsheet starts to creak' },
      {
        t: 'p',
        text: 'Be honest about the ceiling. The master sheet holds up while you have one or two processors, a clean payout ID on every line, and one person who owns the weekly run. It starts to strain when partial payments and bundled deposits stop lining up to a single key — the point where XLOOKUP quietly gives up — when a third and fourth channel arrive each with their own export format, or when someone other than the owner has to trust the number without re-deriving it by hand. A workbook saves the answer; it does not save the reasoning, and once other people depend on that reasoning it has to live somewhere more repeatable.',
      },
      {
        t: 'p',
        text: 'None of that is a reason to skip the sheet. It is the right first tool, it teaches you exactly where your money goes, and the [manual method underneath it](/notes/how-to-reconcile-two-systems-by-hand) is the same method any tool automates. Build the sheet, run it for a few months, and you will know precisely what a dedicated reconciliation system would have to do to earn its place — because you will have done it by hand first.',
      },
    ],
    faq: [
      {
        q: 'Is there a free reconciliation spreadsheet template I can download?',
        a: 'Yes. This page links a no-macro CSV master sheet with one row per payout: gross sales, refunds, processing fees, adjustments, an expected-net column, the bank deposit, and a difference column that flags exceptions. Open it in Excel or Google Sheets, delete the example rows, and paste your own payouts. There is nothing to buy and no signup.',
      },
      {
        q: 'Why does my Shopify or Stripe deposit never match my sales total?',
        a: 'Because a payout is a batch, not a single sale. The processor bundles many orders, subtracts its processing fees, your refunds, and any chargebacks, and deposits the net — and it lands a day or two after the sale. So the deposit is smaller than the sales it represents, covers a different set of orders than any one day, and arrives late. All three are normal. You reconcile by matching at the payout level, not by forcing sales to equal the deposit.',
      },
      {
        q: 'Should I reconcile every order or just the payouts?',
        a: 'Reconcile the payouts. You might have thousands of orders but only a few dozen payouts in a period. The orders only need to roll up correctly to their payout total; the payout is what you tie to the bank deposit. Matching at the payout level turns a multi-hour job into a short one and is the single biggest reason a master sheet ties out quickly.',
      },
      {
        q: 'What does a non-zero difference in the sheet mean?',
        a: 'It means the actual deposit and your expected net disagree, and that is the sheet working as intended. The size and direction usually point at the cause: a deposit short by a round amount is often an unbooked chargeback; a small-percentage gap is usually undercounted fees; a refund-sized gap is normally a refund settling from an earlier sale. Work only the non-zero rows, fix the source, and re-pull until every difference is zero.',
      },
      {
        q: 'When should I move off the spreadsheet to a dedicated tool?',
        a: 'When the structure stops fitting: multiple processors and channels with different export formats, partial payments and bundled deposits that no longer map to a single key, or other people who need to trust the number without re-deriving it. A spreadsheet saves the answer but not the reasoning, and once a team depends on that reasoning it needs to live somewhere more repeatable and auditable than a cell formula.',
      },
    ],
  },
  {
    slug: 'ar-ap-reconciliation',
    title: 'AR and AP reconciliation: tying the subledger to the GL control account (and why they drift)',
    description:
      'The aged AR or AP report is supposed to equal its general-ledger control account, and most months it does — which is exactly why the months it does not catch people off guard. A subledger drifts from its control account when something posts to the control account without going through the subledger: a manual journal entry straight to AR or AP, an entry booked into the wrong period, a misapplied payment, or a currency revaluation. Reconciling AR and AP is really two jobs — tie the aging total to the control-account balance every close and run down any gap, and on the AP side match each invoice to its purchase order and receipt before it is ever paid. Here is what makes them diverge and the method to keep them tied.',
    keywords: [
      'ar ap reconciliation',
      'subledger to gl reconciliation',
      'accounts receivable reconciliation',
      'accounts payable reconciliation',
      'aged ar gl control account',
      'reconcile subledger to general ledger',
      'three way match accounts payable',
      'ap aging tie to gl',
    ],
    lead: 'Someone learning NetSuite hit a step in the close that did not make sense: run the Aged AR and Aged AP reports and "reconcile" them to the general ledger. Their honest reaction — ["I assume that the sub ledgers (accounts receivable and accounts payable) will always match the balance sheet"](https://reddit.com/r/Netsuite/comments/1huosmu/is_it_necessary_to_reconcile_subledger_reports/) — is the right instinct and the trap at once. Usually they do match. The reason you reconcile anyway is the months they quietly do not, because the ways an [AR or AP subledger drifts from its control account](https://en.wikipedia.org/wiki/Controlling_account) are invisible until you tie them out: a manual journal entry posted straight to the control account, an invoice booked into the wrong period, a payment applied to the wrong customer. None of it errors. The total just stops agreeing with the detail. Here is what actually makes them diverge, the method to tie the aging to the GL every close, and the second half of AP reconciliation that catches a bad invoice before you ever pay it.',
    blocks: [
      { t: 'h2', text: 'Doesn\'t the subledger always equal the balance sheet?' },
      {
        t: 'p',
        text: 'Almost always — and "almost" is the entire reason the step exists. The poster\'s confusion is worth quoting because nearly everyone starts here:',
      },
      {
        t: 'quote',
        text: 'I found this confusing since I assume that the sub ledgers (accounts receivable and accounts payable) will always match the balance sheet.',
      },
      {
        t: 'p',
        text: 'The mechanics are simple once you name the parts. Your [AR control account](https://www.accountingcoach.com/blog/accounts-receivable-control-account-subsidiary-ledger) is a single summary line in the general ledger; the aged AR report is the [subsidiary ledger](https://en.wikipedia.org/wiki/Controlling_account) behind it — every open invoice, customer by customer — that should add up to that one GL number. They tie when every entry reaches AR through the subledger: an invoice raised, a payment applied. They drift the moment something touches the control account without going through a customer or vendor — a manual journal entry straight to AR, an entry stamped with the wrong date, a payment applied to the wrong account. The aging still totals what the invoices say; the GL totals something else; and the gap between them is the reconciliation. So the subledger does not "always match" — it matches when nothing bypassed it, and tying it out every close is how you prove nothing did.',
      },
      { t: 'h2', text: 'What actually makes a subledger drift from the GL' },
      {
        t: 'p',
        text: 'Before you treat a subledger-to-GL gap as a mystery, know the short list of things that cause it. Every one of them is an entry that hit the control account on a different path than the detail did.',
      },
      {
        t: 'table',
        head: ['What happened', 'What you see', 'Where it belongs'],
        rows: [
          ['Manual journal entry posted straight to the AR/AP control account', 'GL control balance moves; no matching invoice or bill in the aging', 'Reverse it and post through the subledger, or move it to the correct account — the control account should not take direct entries'],
          ['Invoice or bill booked into the wrong period', 'Aging as of the cutoff and the GL balance disagree by that document', 'Re-date it to the document date so the period it lands in is correct'],
          ['Payment applied to the wrong customer/vendor or left unapplied', 'Control balance is right; the aging shows the wrong open items', 'Re-apply the payment to the correct invoice; an [unapplied receipt](/notes/why-shopify-deposits-never-match-sales) sits in a holding account until it is'],
          ['Write-off or credit memo booked on one side only', 'One ledger reflects the adjustment, the other does not', 'Post the matching entry so both move together'],
          ['Foreign-currency revaluation', 'The base-currency control balance revalues; the original-currency aging does not', 'Expected — reconcile in the [transaction currency first](/notes/multi-currency-reconciliation), let the FX fall out separately'],
          ['Duplicate bill entered under a slightly different number', 'AP aging and the GL both overstate by the doubled bill', 'Catch it with a [duplicate test](/notes/fuzzy-matching-records); void the duplicate'],
        ],
      },
      {
        t: 'p',
        text: 'A commenter on that NetSuite thread landed near the right framing — that the exercise is "more of a \'review\' of the sub ledger to make sure the right things are posted in the right period" — and that is half of it. It is a review, yes, but it is also a tie-out: when the aging and the control account disagree, one of the rows above happened, and "review" is how you find which. Another reply pointed at the most common culprit, dating: getting "the transaction date [to] match the actual date on the vendors document" is what keeps a bill from landing in the wrong period and breaking the tie in the first place.',
      },
      { t: 'h2', text: 'How to reconcile AR or AP to the GL, step by step' },
      {
        t: 'p',
        text: 'The method is the same for both ledgers — receivables or payables — and it is a [set-difference](/notes/find-missing-rows-in-excel-countif-match) between the detail and the summary, run as of one date. Do it top to bottom.',
      },
      {
        t: 'ol',
        items: [
          'Fix one cutoff date. Run the aged AR (or AP) report and the GL control-account balance as of the exact same date. A different "as of" on each side manufactures a difference that is not real.',
          'Compare the two totals. The aging total should equal the control-account balance. If it does, you are not done — scan the aging for stale items, but the tie holds.',
          'If they disagree, list the GL entries to the control account that have no match in the subledger. These are the manual journal entries and direct postings — the prime suspects.',
          'List the subledger entries that fall in a different period than the GL. These are the wrong-date postings; re-date them to the document date.',
          'Classify each difference by cause using the table above, and correct it on the side that is wrong — never plug the gap to force a tie.',
          'Keep the reconciliation with the aging report and the GL detail attached, so next close starts from a proven balance.',
        ],
      },
      {
        t: 'code',
        text: 'The identity you are proving\n----------------------------\n  Aged AR report total   ==  AR control account balance   (same date)\n  Aged AP report total   ==  AP control account balance   (same date)\n\nWhen they disagree:\n  difference  =  entries that hit the GL control account\n                 without flowing through the subledger\n                 +  subledger entries posted in the wrong period',
      },
      {
        t: 'p',
        text: 'Tying the subledgers to the GL is step four of a [month-end close](/notes/tick-and-tie-checklist) for a reason — it sits on top of cash and clearing, which you prove first. And it is a standard audit ask, not an optional nicety: the trail from the aging back to the control account is exactly the evidence an [auditor wants](/notes/what-auditors-look-for) when they test whether AR and AP are real.',
      },
      { t: 'h2', text: 'The other half of AP reconciliation: match the invoice before you pay it' },
      {
        t: 'p',
        text: 'Tying AP to the GL proves what is on the books is consistent. It says nothing about whether a bill should have been paid in the first place. That is the second reconciliation on the payables side, and it runs before payment, not at close. Someone on [r/Accounting](https://reddit.com/r/Accounting/comments/1tkdbo4/how_do_ap_teams_handle_freight_invoice/), asking how accounts payable teams handle carrier invoices at volume, named it:',
      },
      {
        t: 'quote',
        text: 'We process a lot of carrier invoices and manual reconciliation against POs is becoming a bottleneck. Are there tools or processes that work well for catching billing discrepancies before payment?',
      },
      {
        t: 'p',
        text: 'The control they are reaching for is the [three-way match](https://www.netsuite.com/portal/resource/articles/accounting/three-way-matching.shtml): before a bill is paid, line it up against the purchase order (what you agreed to buy) and the receiving record (what actually arrived). Quantity, price, and terms have to agree across all three. It is the same [primary-ID](/notes/what-we-mean-when-we-say-primary-id) discipline as any reconciliation — the PO number is the key that joins the three documents — and a mismatch is a billing error you catch before the money leaves, not after.',
      },
      {
        t: 'p',
        text: 'For freight specifically, the most useful reply in that thread flagged why a plain three-way match is not enough:',
      },
      {
        t: 'quote',
        text: 'for freight, the hard part is matching the invoice against the rate card, accessorials, fuel surcharge, delivery zone, and exceptions. normal 2-way or 3-way matching catches duplicates and missing POs, but it won\'t',
      },
      {
        t: 'p',
        text: 'Right — and the gap they trail off on is the point. A standard match confirms the invoice ties to a PO and a receipt; it does not recompute whether the carrier billed the agreed rate. Carrier invoices need a fourth check against the rate card and accessorials, because the discrepancy is usually a correct-looking line at the wrong price, not a missing one. A doubled bill, meanwhile, is the [duplicate the invoice number hides](/notes/fuzzy-matching-records) — it slips a one-to-one match when the second copy carries a slightly different number, and it inflates both the AP aging and the GL until someone tests for it.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A three-way match that "passes" only proves the invoice, PO, and receipt agree with each other — not that the price was right or that the bill is unique. Two true controls still have to run alongside it: a rate check on anything priced from a schedule (freight, utilities, usage-based bills), and a duplicate test on vendor, amount, and date. Passing the match is not the same as the bill being correct.',
      },
      { t: 'h2', text: 'Doing the tie-out in a spreadsheet' },
      {
        t: 'p',
        text: 'For a few accounts at monthly cadence, this is a spreadsheet job. Export the aged AR (or AP) detail to one sheet and the GL control-account activity to another, key both on the invoice or bill number, and [match the two lists](/notes/reconcile-two-files-in-excel-with-xlookup). The rows that appear in the GL but not the aging are your direct-to-control-account entries; the rows in the aging but not the GL are the wrong-period or unposted ones. That is the same [missing-row check](/notes/find-missing-rows-in-excel-countif-match) you would run on any two files, and it is the [manual reconciliation method](/notes/how-to-reconcile-two-systems-by-hand) pointed at a subledger.',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Reconcile by period, not just by total. Two errors in opposite directions — a missing invoice and a duplicate of the same amount — net to zero, so the totals tie while the detail is wrong. Matching invoice by invoice, not balance to balance, is what surfaces the offsetting pair.',
      },
      { t: 'h2', text: 'When the monthly tie-out outgrows the spreadsheet' },
      {
        t: 'p',
        text: 'A spreadsheet tie-out is right for a few accounts you close by hand. It strains when the subledgers carry thousands of open items, when the same reconciliation runs weekly, when multiple currencies revalue, or when someone else has to trust the result without rebuilding it — the same ceiling an [inventory subledger hits against the GL](/notes/netsuite-reconciliation-inventory-and-gl) at scale. The method does not change; you just want the matching rules and the classification preserved as a repeatable, auditable process rather than rebuilt from exports each month. If you reach for help there, keep the [AI on the setup and the explanation and the arithmetic in code you can audit](/notes/can-an-ai-agent-reconcile-your-data), so the tie between the aging and the GL stays one you can defend to an auditor.',
      },
    ],
    faq: [
      {
        q: 'Does the AR or AP subledger always equal the general ledger?',
        a: 'It should, and usually does — but not always, which is why you reconcile. The aged AR or AP subledger ties to its GL control account only when every entry reached the control account through the subledger. A manual journal entry posted directly to the control account, a document booked in the wrong period, or a misapplied payment makes the two disagree, and tying them out each close is how you catch it.',
      },
      {
        q: 'Why doesn\'t my aged AR report match the AR control account?',
        a: 'Almost always because something hit the control account on a different path than the detail. The usual causes are a manual journal entry posted straight to the control account, an invoice or payment booked into the wrong period, a payment applied to the wrong customer, or a foreign-currency revaluation. List the GL entries with no matching invoice and the subledger entries in the wrong period, and the gap resolves into those.',
      },
      {
        q: 'What is the difference between a subledger and a control account?',
        a: 'The control account is a single summary line in the general ledger — total accounts receivable, say. The subledger, or subsidiary ledger, is the detail behind it: every open invoice by customer. The subledger detail should always add up to the control account balance, and reconciling AR or AP is proving that it does.',
      },
      {
        q: 'What is three-way matching in accounts payable?',
        a: 'Three-way matching compares a vendor invoice against its purchase order and the receiving record before the bill is paid, confirming that quantity, price, and terms agree across all three. It catches billing errors and duplicate or unauthorized invoices before money leaves, as opposed to the subledger-to-GL tie-out, which checks the books after the fact.',
      },
      {
        q: 'How often should I reconcile AR and AP to the general ledger?',
        a: 'Every month-end close, as part of tying the subledgers to the GL after cash and clearing accounts are proven. Reconciling monthly keeps any difference to a short, recent list you can still explain; letting it slide turns a small wrong-period entry into a year-end mystery nobody remembers.',
      },
    ],
  },
  {
    slug: 'multi-currency-reconciliation',
    title: 'Multi-currency reconciliation: how to tell an FX difference from a real one',
    description:
      'A multi-currency "mismatch" is usually three legitimate things stacked together: the exchange rate moved between invoice and payment, intermediary banks took a cut in transit, and the settlement date landed in a different period than the charge. Reconcile in your base currency and you can never tell which is which. The fix is to match in the original transaction currency first, where the amounts should tie to the cent, then let the converted difference fall out as a foreign-exchange gain or loss instead of hunting for a missing transaction. Here is the method, step by step.',
    keywords: [
      'multi-currency reconciliation',
      'foreign currency reconciliation',
      'fx gain loss reconciliation',
      'international payment reconciliation',
      'reconcile payments in multiple currencies',
      'wire transfer reconciliation fees',
      'settlement date fx mismatch',
      'currency conversion reconciliation',
    ],
    lead: 'You owed a supplier `EUR 10,000`. Your bank shows `USD 10,847` left the account, the supplier says they were short-paid, and your accounting system — set to [reconcile](/notes/how-to-reconcile-two-systems-by-hand) in dollars — flags the invoice as unmatched. Now you are staring at a difference you cannot explain. Nothing is actually broken. A multi-currency difference is almost never one number; it is three legitimate things stacked on top of each other — the exchange rate moved between the invoice and the payment, intermediary banks took a cut in transit, and the settlement date landed in a different period than the charge. Reconcile in your base currency and you can never tell which is which. The fix is almost boringly simple: match in the original transaction currency first, where the amounts should tie to the cent, then treat the converted difference as a [foreign-exchange gain or loss](https://corporatefinanceinstitute.com/resources/accounting/foreign-exchange-gain-loss/), not a missing transaction. Here is the whole method.',
    blocks: [
      { t: 'h2', text: 'Why a base-currency report makes everything look broken' },
      {
        t: 'p',
        text: 'The reconciliations that error out are the easy ones. The expensive ones balance to a number you cannot account for. In a single currency, a difference is a difference — a [missing row](/notes/find-missing-rows-in-excel-countif-match), a short payment, a duplicate. Across currencies, the same gap can be three unrelated, perfectly legitimate things at once, and your base-currency view collapses all three into one unexplained figure. An operator on [r/Accounting](https://reddit.com/r/Accounting/comments/1simaqd/every_international_wire_we_send_creates_hours_of/) described exactly how an international wire does this:',
      },
      {
        t: 'quote',
        text: 'Payment initiates, something in the correspondent chain takes a cut we didn\'t anticipate, the amount that lands is different from what we sent, the settlement date doesn\'t match the initiation date',
      },
      {
        t: 'p',
        text: 'The thread\'s answers were "Sounds like shitty processes" and a suggestion to find a provider with flat, upfront fees — fair advice for next time, useless for the wire you already sent. The reason it "breaks our reconciliation the same way every time," in the poster\'s words, is that the dollar figure on your statement is the end of a chain of independent changes. Pull them apart and each one has an obvious home — and none of them is the "unmatched transaction" your tool thinks it found.',
      },
      { t: 'h2', text: 'The three things hiding inside one mismatch' },
      {
        t: 'p',
        text: 'Before you treat a multi-currency difference as a discrepancy, separate it into its parts. Almost every "the numbers don\'t match" in foreign currency is some mix of these three, and only one of them is ever an actual error to chase.',
      },
      {
        t: 'table',
        head: ['What changed', 'What you see', 'Why it is legitimate, not an error', 'Where it belongs'],
        rows: [
          ['Exchange rate moved', 'the invoice was `EUR 10,000`; the value booked at invoice date and the value at payment date differ in your base currency', 'The rate on the invoice date is not the rate on the payment date — that movement is a real realized [FX gain or loss](https://corporatefinanceinstitute.com/resources/accounting/foreign-exchange-gain-loss/), not money gone missing', 'A realized FX gain/loss account — an output of the reconciliation, not a row to hunt'],
          ['Fees deducted in transit', 'the amount sent is larger than the amount received', 'Correspondent banks in the chain each take a cut, and the bank\'s [exchange-rate spread](https://en.wikipedia.org/wiki/Bid%E2%80%93ask_spread) is baked into the rate you got — both are real costs, charged by design', 'Bank fees / FX expense, grossed up as its own line — the same trap as [why your payout never matches sales](/notes/why-shopify-deposits-never-match-sales)'],
          ['Settlement date lag', 'the charge sits in one period; the cash lands in the next', 'The transaction and its settlement revalue at different rates and can fall on opposite sides of month-end', 'A per-currency clearing account that holds the in-transit amount until it settles'],
        ],
      },
      { t: 'h2', text: 'Reconcile in the original currency first' },
      {
        t: 'p',
        text: 'Here is the rule that makes the other three legible: never reconcile in your base currency until you have reconciled in the currency the transaction actually happened in. In the source currency, the invoice, the payment, and the receipt should agree to the cent — there is no rate in the way to blur them. So a difference there is a real one, and a difference that only appears after conversion is FX, not a [missing transaction](/notes/what-we-mean-when-we-say-primary-id). That single ordering decision is what lets you tell the two apart.',
      },
      {
        t: 'ol',
        items: [
          'Match in the transaction currency. Line up the invoice, the payment, and the receipt in their original currency — `EUR` to `EUR`, `GBP` to `GBP`. The amounts should tie exactly. If they do not, that is a genuine discrepancy — a partial payment, a short-pay, a duplicate — and you investigate it the ordinary way.',
          'Gross up the fees as their own line. Book the full invoice amount, then post the wire charge, the intermediary deduction, and the FX spread as separate bank-fee and FX-expense lines. Never net them into the invoice — netting is what makes the invoice look "wrong".',
          'Convert each side at its own correct rate. Book the invoice at the rate on the invoice date and the settlement at the rate on the settlement date, using one canonical rate source and cadence (see below).',
          'Let the base-currency difference fall out as FX. After steps 1 to 3, the leftover gap in your base currency is the realized foreign-exchange gain or loss. Post it to that account. It is a result of the reconciliation, not an exception inside it.',
          'Revalue open items at period-end. For invoices still outstanding at close, revalue the foreign-currency balance at the closing rate; the movement is an unrealized FX gain/loss until the cash actually moves.',
        ],
      },
      {
        t: 'p',
        text: 'The distinction in steps 4 and 5 — [realized vs. unrealized](https://corporatefinanceinstitute.com/resources/accounting/foreign-exchange-gain-loss/) — is the one piece of FX accounting worth internalizing: a realized gain or loss is locked in when the cash settles, an unrealized one is the paper movement on a balance still open at close. Most accounting systems can post both automatically if you turn the setting on — NetSuite, for instance, only books the revaluation if [Revalue Open Balances](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N1409370.html) is enabled on the account. Off by default, it quietly leaves your foreign balances frozen at old rates.',
      },
      {
        t: 'code',
        text: 'Anatomy of one foreign-currency payment\n----------------------------------------\nInvoice                 : EUR 10,000.00\n  booked @ 1.0820       : USD 10,820.00   (AP, invoice-date rate)\nPaid                    : USD 10,847.00   (settlement-date rate, incl. spread)\n  base-currency gap     : USD     27.00   -> realized FX + bank spread\nWire fee                : USD     30.00   -> bank fees\nIntermediary deduction  : taken from cash in transit -> supplier short-paid\n\nMatch test\n----------\n  original currency : EUR 10,000 invoiced = EUR 10,000 owed   -> ties\n  base-currency gap : posts to FX gain/loss + bank fees, NOT "unmatched"',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'An FX difference is not a missing transaction. If you make the base-currency numbers tie by plugging the gap — forcing a match or dumping it in a suspense account — you erase a real gain or loss and leave a clearing account that never empties. The gap is supposed to be there. Name it FX and move on. This is the multi-currency version of the [balanced-is-not-the-same-as-correct](/notes/what-auditors-look-for) trap.',
      },
      { t: 'h2', text: 'Fix the inputs that silently differ' },
      {
        t: 'p',
        text: 'The method above assumes your systems at least agree on the basics. In multi-currency they usually do not, and the drift is invisible until close. A controller running a 14-country month-end laid out the failure mode on [r/Accounting](https://reddit.com/r/Accounting/comments/1t65w9c/12_currencies_3_erps_and_we_still_handkey_fx/), in a thread titled "12 currencies, 3 ERPs, and we still hand-key FX adjustments at month end":',
      },
      {
        t: 'quote',
        text: 'each one pulls FX rates from a different source on a different cadence. NetSuite uses end-of-month rate, SAP uses average',
      },
      {
        t: 'p',
        text: 'That is the whole problem in one line: two correct systems disagree because they are converting with different rates, and no amount of re-matching fixes a rate mismatch. Another commenter\'s workaround — "We still do it outside the system but it\'s only one translation layer" — is the right instinct (one place where conversion happens), done by hand. Standardize these four inputs and most of the month-end FX scramble disappears:',
      },
      {
        t: 'ul',
        items: [
          'One canonical rate source and cadence. Pick a single FX rate provider and a single timing rule — daily close, month-end, or period average — and apply it across every system. Mismatched rate sources are the single biggest reason two right answers disagree.',
          'A currency code on every amount. Tag every figure with its [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code — `USD`, `EUR`, `JPY` — never a bare number or a `$` that could be USD, CAD, AUD, or SGD. A loose currency symbol in a [CSV export](/notes/csv-gotchas-encoding-delimiters) also quietly breaks numeric parsing, so the amount stops being a number at all.',
          'Fees grossed up, never netted. Record the gross invoice and the deductions separately. The moment a fee is netted into an amount, the amount no longer matches anything and you are back to chasing a phantom difference.',
          'A per-currency clearing account. Hold in-transit foreign cash in a clearing account by currency until it settles, so the [settlement-date lag](/notes/bank-reconciliation-step-by-step) lives somewhere visible instead of floating as an unexplained variance.',
        ],
      },
      { t: 'h2', text: 'Where it still bites: platforms and wires' },
      {
        t: 'p',
        text: 'Two places make all of this worse — your sales platforms and the wires themselves. On the sales side, the payout is already converted before you see it. A store owner on [r/ecommerce](https://reddit.com/r/ecommerce/comments/1s2p85q/whats_the_best_payment_processor_for_an/) put the cost plainly:',
      },
      {
        t: 'quote',
        text: 'Every time Shopify pays out in a non-USD currency, Stripe auto-converts and takes like 1-2% on top of everything else.',
      },
      {
        t: 'p',
        text: 'The [payout you receive](https://help.shopify.com/en/manual/payments/shopify-payments/store-currency/payouts-in-multiple-currencies) is net of an FX conversion and a [conversion fee](https://help.shopify.com/en/manual/payments/shopify-payments/store-currency/currency-conversion-calculation), layered on top of the processing-fee and refund netting you already untangle for every payout. Stripe documents the same split between the [presentment currency and the settlement currency](https://docs.stripe.com/payouts/multicurrency-settlement): you can only avoid the conversion by holding a balance in that currency. So reconcile the payout per currency, in its presentment currency, before you convert — the same order as everything else here, and the same discipline as [reconciling any payout against sales](/notes/why-shopify-deposits-never-match-sales).',
      },
      {
        t: 'p',
        text: 'On the wire side, the poster\'s "the amount that lands is different from what we sent" is the intermediary-fee chain plus the bank\'s spread. The lever most people miss is the charge option: paying [OUR](https://en.wikipedia.org/wiki/Wire_transfer) (you absorb every fee, the full amount arrives) instead of the SHA default (the chain deducts from the transfer in flight) makes the deduction predictable and bookable instead of a surprise on the supplier\'s end. A poster on [r/Bookkeeping](https://reddit.com/r/Bookkeeping/comments/1obkb1m/how_do_you_avoid_hidden_bank_fees_on/) named the reconciliation cost of getting this wrong:',
      },
      {
        t: 'quote',
        text: 'Between my bank\'s wide exchange rate spread and random deductions along the way, reconciliation has become a nightmare.',
      },
      {
        t: 'p',
        text: 'The thread\'s answer was to switch to a cheaper provider — reasonable for the cost, beside the point for the books. Reconciliation does not need the fee to be small; it needs it to be predictable and posted to a line, not silently shaved off the rate. As one commenter on a [separate scaling thread](https://reddit.com/r/smallbusiness/comments/1tl8prz/is_payment_reconciliation_supposed_to_get_this/) put it, "the transfer itself usually isn\'t even the problem. It\'s trying to match everything afterward." The method above is the "afterward".',
      },
      { t: 'h2', text: 'When a spreadsheet stops keeping up' },
      {
        t: 'p',
        text: 'A two-file, single-currency match is fine in [Excel](/notes/reconcile-two-files-in-excel-with-xlookup), and most reconciliations should start there. Multi-currency strains it: every match now carries a rate, a date, and a fee; the same close runs every month across a dozen currencies; and eventually someone has to show an auditor how a base-currency number was reached from a foreign invoice three rates ago. That is where hand-keyed FX adjustments — the exact thing the controller above was still doing — stop being sustainable. [Forgiving matching](/notes/fuzzy-matching-records) on the keys, one documented rate source, and a process that records its own reasoning matter more than any formula. Whether you do that in a workbook, a script, or [a tool that can read the files for you](/notes/can-an-ai-agent-reconcile-your-data), the rule does not change: reconcile in the original currency, then let the FX fall out where it belongs.',
      },
    ],
    faq: [
      {
        q: 'Should I reconcile in my base currency or the original transaction currency?',
        a: 'Start in the original transaction currency. In the currency the invoice and payment actually happened in, the amounts should match to the cent, so any difference there is a real discrepancy worth investigating. Convert to your base currency only after that match holds, and treat the converted difference as a foreign-exchange gain or loss rather than a missing transaction.',
      },
      {
        q: 'Why doesn\'t the amount that arrives match the amount I sent?',
        a: 'On an international wire, correspondent and intermediary banks in the chain each deduct a fee from the amount in transit, and your bank\'s exchange-rate spread is built into the rate you got. So the amount that lands is smaller than the amount you sent, by design. Record the difference as a bank fee and FX cost, grossed up as its own line, instead of forcing the invoice to match the net cash.',
      },
      {
        q: 'Is a foreign-exchange gain or loss an error I need to fix?',
        a: 'No. When the exchange rate moves between the date you booked an invoice and the date it settles, the base-currency value legitimately changes. That movement is a realized FX gain or loss and belongs in its own account. If you plug the gap to make the numbers tie, you erase a real result and leave a clearing account that never clears.',
      },
      {
        q: 'Which exchange rate should I use — the invoice date or the payment date?',
        a: 'Both, for their own purpose. Book the invoice at the rate on the invoice date and the settlement at the rate on the payment date; the difference between them is the realized gain or loss. For invoices still open at period-end, revalue the balance at the closing rate, which produces an unrealized gain or loss until the cash moves. The key is to pick one rate source and one cadence and use it consistently.',
      },
      {
        q: 'How do I stop multi-currency FX from dragging out month-end close?',
        a: 'Standardize the inputs before you reconcile: one canonical rate source and timing rule applied across every system, an ISO 4217 currency code on every amount, fees grossed up rather than netted, and a per-currency clearing account that holds in-transit cash until it settles. Most multi-currency close pain comes from two correct systems using different rate sources, not from the math itself.',
      },
    ],
  },
  {
    slug: 'csv-gotchas-encoding-delimiters',
    title: 'CSV gotchas that silently break a reconciliation: encoding, delimiters, and mangled IDs',
    description:
      'The dangerous CSV problems are the silent ones: Excel drops leading zeros, turns long order IDs into scientific notation, garbles encoding, splits on the wrong delimiter, or reinterprets dates by locale. None of it errors — the match just stops matching. Here are the traps, why each is invisible, and a two-minute check that catches them before they cost you an evening.',
    keywords: [
      'csv reconciliation problems',
      'excel csv leading zeros dropped',
      'csv encoding utf-8 windows-1252',
      'csv delimiter semicolon',
      'import csv excel keep as text',
      'scientific notation order id csv',
      'csv gotchas reconciliation',
    ],
    lead: 'The CSV opened fine. The rows look right. So why does your reconciliation suddenly show two hundred orders [missing](/notes/find-missing-rows-in-excel-countif-match) that you know shipped? Because somewhere between the export and the match, the file quietly changed your data and didn\'t tell you. Excel dropped the leading zeros off your SKUs, turned a 16-digit order ID into 1.23E+15, read a European export\'s semicolons as one giant column, or decided 04/05 meant April when it meant May. None of that throws an error. The match just stops matching. Here is the short list of CSV traps that do this, why each one is invisible, and a two-minute check that catches them before they eat your evening.',
    blocks: [
      { t: 'h2', text: 'Why a clean-looking file lies to you' },
      {
        t: 'p',
        text: 'The CSV problems that error out are the easy ones — the import fails, you see a red message, you fix it in minutes. The expensive ones are silent. The file opens, every row is present, the totals look plausible. But the [key column](/notes/what-we-mean-when-we-say-primary-id) — the field your match depends on — has quietly changed shape. A reconciliation keyed on that column then reports differences that are not real: rows flagged "only in system A" that are sitting right there in system B under a mangled key. You go hunting for missing orders that never went anywhere. An operator on [r/ecommerce](https://reddit.com/r/ecommerce/comments/1pxre20/how_are_you_handling_data_silos_between_shopify/) described the version of this that happens across channels:',
      },
      {
        t: 'quote',
        text: 'your Shopify customer data doesn\'t match your amazon reports and inventory data is scattered across different CSVs.',
      },
      {
        t: 'p',
        text: 'Their one-line verdict — "It\'s absolute hell" — is the sound of a match failing for a reason the grid will not show you. So before you treat a difference as a difference, rule out the file. Here is what to rule out.',
      },
      { t: 'h2', text: 'The gotchas, in the order they bite' },
      {
        t: 'table',
        head: ['Gotcha', 'What you see', 'Why the match breaks', 'How to stop it'],
        rows: [
          ['Leading zeros dropped', '`00421` becomes `421`', 'The key no longer equals the same SKU on the other side, so the row reads as missing', 'Import the column as [text](https://support.microsoft.com/en-us/office/keeping-leading-zeros-and-large-numbers-1bf7b935-36e1-4985-842f-5dfa51f85fe7) — never open the file by double-click'],
          ['Long IDs in scientific notation', 'a 16-digit order ID shows as `1.23E+15`', 'The trailing digits are gone, so two different IDs collapse to one or match nothing', 'Same fix — force the column to text on [import](https://support.microsoft.com/en-us/office/keeping-leading-zeros-and-large-numbers-1bf7b935-36e1-4985-842f-5dfa51f85fe7)'],
          ['Encoding mismatch (mojibake)', '`café` shows as `cafÃ©`, `€` as `â‚¬`', 'Any key or name holding the garbled character stops matching', 'Open as [UTF-8](https://en.wikipedia.org/wiki/Mojibake); the [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) default is the usual culprit'],
          ['A UTF-8 byte-order mark', 'an invisible marker before the first header', 'The first header (often the key) silently fails to match its mapping', 'Save as plain UTF-8 without the [BOM](https://en.wikipedia.org/wiki/Byte_order_mark), or strip the leading bytes'],
          ['Wrong delimiter', 'every row lands in one column', 'There is no key column at all, so nothing matches', '[RFC 4180](https://www.rfc-editor.org/rfc/rfc4180.html) says comma, but EU exports use semicolons and many use tabs — set the [delimiter](https://en.wikipedia.org/wiki/Comma-separated_values) on import'],
          ['Unquoted comma inside a field', '`Smith, Jr.` splits into two columns', 'Every column after it shifts right, so the wrong field becomes the key', 'A correct export [quotes fields that contain commas](https://www.rfc-editor.org/rfc/rfc4180.html) — re-export, or set the delimiter explicitly'],
          ['Ambiguous dates', '`04/05/2026`', 'One file reads April, the other May, so matched rows look like mismatches', 'Import dates as text or standardize to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) `YYYY-MM-DD` before matching'],
          ['Trailing / invisible whitespace', '`1001 ` looks identical to `1001`', 'An exact-match comparison fails on the hidden space', '[TRIM](/notes/reconcile-two-files-in-excel-with-xlookup) the key, or clean it on import'],
          ['Text vs number type', '`1001` as text is not `1001` as a number', 'A type-strict match treats them as two different keys', 'Decide one type for the key and enforce it on both files'],
        ],
      },
      {
        t: 'p',
        text: 'Most of these trace back to a single moment: the instant Excel is allowed to guess what your columns are. Take that decision away from it and the list above mostly disappears.',
      },
      { t: 'h2', text: 'The one habit that prevents most of them: never let Excel guess' },
      {
        t: 'p',
        text: 'Double-clicking a CSV opens it with automatic type detection switched on. That is the moment your leading zeros vanish and your long IDs go scientific. The fix is to import the file instead of opening it, and to tell Excel the key column is text before it reads a single row.',
      },
      {
        t: 'ol',
        items: [
          'Open Excel first. Do not double-click the CSV. On the Data tab, choose [From Text/CSV](https://support.microsoft.com/en-us/office/import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba) and pick the file.',
          'In the preview, set Data Type Detection to "Do not detect data types" — or use the [Text Import Wizard](https://support.microsoft.com/en-us/office/text-import-wizard-c5b02af6-fda1-4440-899f-f78bafe41857) and set the ID/key and date columns to Text.',
          'Check the File Origin shows UTF-8. If accented characters or the € sign look garbled, it was saved as Windows-1252 — change the origin or re-export.',
          'Confirm the delimiter split the columns correctly. If everything sits in column one, switch the delimiter to semicolon or tab.',
          'Load, then run your match. The key column now holds exactly what the source system exported.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Open the raw file in a plain text editor (Notepad, TextEdit, VS Code) before Excel ever touches it. In thirty seconds you can see the true delimiter, whether the encoding is clean, and whether the quotes are balanced — none of which the Excel grid shows you, because by then the damage is already done.',
      },
      { t: 'h2', text: 'What "save as CSV UTF-8" actually fixes (and what it doesn\'t)' },
      {
        t: 'p',
        text: 'When a NetSuite import kept failing on an [inventory worksheet](https://reddit.com/r/Netsuite/comments/1tx1vrd/inventory_adjustment_worksheet_import/), two of the most useful replies were about the file, not the system. The first named the trap nobody can see:',
      },
      {
        t: 'quote',
        text: 'Double check there are no spaces behind the characters in the cells. That one has gotten me before and was basically invisible.',
      },
      {
        t: 'p',
        text: 'The second pointed straight at encoding:',
      },
      {
        t: 'quote',
        text: 'Sometimes there are weirdness with UTF-8 vs Windows 1252 character set but that\'s usually with punctuation characters not digits in InternalID.',
      },
      {
        t: 'p',
        text: 'Both are right, and together they show why "just save it as CSV UTF-8" is half an answer. Saving as UTF-8 fixes the [mojibake](https://en.wikipedia.org/wiki/Mojibake) — the garbled accents and symbols that come from a file written in [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) and read as Unicode, or the reverse. It does nothing about trailing spaces, type coercion, or a wrong delimiter. And a UTF-8 file saved with a [byte-order mark](https://en.wikipedia.org/wiki/Byte_order_mark) can corrupt the very first header — usually your key — so the column maps to nothing. Encoding is one trap on the list, not the list.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Trailing and leading whitespace is the single most common silent break, because it is literally invisible in the cell. `1001 ` and `1001` look identical and fail every exact match. Run the key through TRIM on both files before you compare anything.',
      },
      { t: 'h2', text: 'Dates: the trap that survives every other fix' },
      {
        t: 'p',
        text: 'You can fix the encoding, force the IDs to text, and get the delimiter right, and dates will still quietly betray you. `04/05/2026` is April 5th to a US export and the 4th of May to most of the rest of the world. When two files disagree about which, every matched row with a date check reads as a mismatch. A seller juggling US and German marketplace reports put it plainly:',
      },
      {
        t: 'quote',
        text: 'the reports are formatted differently (date formats mess me up every time)',
      },
      {
        t: 'p',
        text: 'The durable fix is to stop trusting the locale. Import date columns as text so Excel cannot reinterpret them, then standardize to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) — `YYYY-MM-DD` — which is unambiguous by design because it leads with the year. Match on the standardized column, never the raw one.',
      },
      { t: 'h2', text: 'Settlement and marketplace files: same traps, higher stakes' },
      {
        t: 'p',
        text: 'Settlement and payout exports — Amazon, Stripe, Shopify — carry the worst combination of these traps at once: long transaction IDs, multiple currencies and locales, decimal commas, and embedded commas inside descriptions. When someone on [r/Netsuite](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/) asked how to record marketplace customer payments from a settlement report, the community\'s reflex was to throw a tool at it:',
      },
      {
        t: 'quote',
        text: 'I run thousands upon thousands of records monthly through Celigo reconciliation products.',
      },
      {
        t: 'p',
        text: 'That is a fair option at volume — integration platforms like Celigo or A2X do ingest these files and post the journals for you. But a tool does not repair a malformed export; it matches on whatever the file actually contains. Feed it a key mangled by scientific notation and it reconciles wrong, just faster and at scale. Whether you do it by hand or buy the platform, the file has to be clean first — and a settlement file is also a [netted, bundled batch](/notes/why-shopify-deposits-never-match-sales), so once the CSV is sound you are reconciling the payout, not the orders.',
      },
      { t: 'h2', text: 'A two-minute sanity check before you match' },
      {
        t: 'p',
        text: 'Run this on every file before you trust a single comparison. It is faster than chasing a phantom difference for an hour later.',
      },
      {
        t: 'ol',
        items: [
          'Row count: does the imported row count equal the source report\'s row count? A gap means the parser split or merged rows.',
          'Key type: is the key column text, with leading zeros intact and no `E+` anywhere in it?',
          'Spot-check three known IDs: pick three records you know and confirm they survived the import character-for-character.',
          'Raw view: open the file in a text editor — confirm the delimiter, that the encoding is clean (no `Ã` or `â‚¬` garble), and that quotes are balanced.',
          'Dates: are all dates in one unambiguous format before you compare them?',
        ],
      },
      {
        t: 'p',
        text: 'This is the same discipline as cleaning your key in a [spreadsheet](/notes/reconcile-two-files-in-excel-with-xlookup) — done one step earlier, at the door, before a bad column gets into the workbook at all.',
      },
      { t: 'h2', text: 'When the file is clean and the match still fails' },
      {
        t: 'p',
        text: 'If you have ruled out the CSV and rows still will not reconcile, the problem has moved up a layer. Either the [key itself is wrong or non-unique](/notes/what-we-mean-when-we-say-primary-id) — a repeating order number, a missing second field — or the two systems genuinely disagree, and you are now doing real [reconciliation](/notes/how-to-reconcile-two-systems-by-hand) rather than fighting a parser. That is the good kind of difference: the kind worth investigating. CSV hygiene just makes sure every difference you chase is a real one. And where the same export lands on your desk every week, the cleaning belongs in a repeatable step, not re-done by hand each time it costs you an evening.',
      },
    ],
    faq: [
      {
        q: 'Why does Excel drop the leading zeros from my CSV?',
        a: 'Because opening a CSV by double-click lets Excel auto-detect column types, and it reads a zero-padded value like 00421 as the number 421. Import the file through the Data tab\'s From Text/CSV instead, and set that column to Text before loading, so the value is preserved exactly.',
      },
      {
        q: 'Why is my long order ID showing as 1.23E+15?',
        a: 'Excel converted a number longer than 15 digits to scientific notation and discarded the trailing digits, so the ID is no longer accurate. Force the column to Text on import. Once the digits are gone they cannot be recovered, so you must re-import from the original file.',
      },
      {
        q: 'My CSV opens as one big column — what went wrong?',
        a: 'The file uses a delimiter Excel did not expect, usually a semicolon (common in European exports where the comma is the decimal separator) or a tab. Use From Text/CSV and set the delimiter explicitly so the columns split correctly.',
      },
      {
        q: 'Why do accented characters or symbols show up as garbage like cafÃ©?',
        a: 'That is mojibake — the file was written in one character encoding and read in another, most often a Windows-1252 file read as UTF-8 or the reverse. Re-open or re-export the file as UTF-8 and the characters resolve.',
      },
      {
        q: 'How do I stop dates from flipping between day and month when I import?',
        a: 'Import date columns as text so Excel cannot reinterpret them by locale, then convert them to the ISO 8601 format YYYY-MM-DD, which is unambiguous because it leads with the year. Match on the standardized column rather than the raw one.',
      },
    ],
  },
  {
    slug: 'why-shopify-deposits-never-match-sales',
    title: 'Why Shopify deposits never match your sales (and how to reconcile payouts instead)',
    description:
      'A Shopify or Stripe deposit is a netted, bundled, time-shifted settlement batch — so it can never equal your sales. Here is how to reconcile payouts the right way: match the deposit to the payout report, the payout to its components through a clearing account, and gross charges to sales by period.',
    keywords: [
      'shopify payout reconciliation',
      'why shopify deposits do not match sales',
      'stripe payout reconciliation',
      'payment gateway deposit mismatch',
      'ecommerce settlement reconciliation',
      'clearing account shopify payouts',
    ],
    lead: 'Your Shopify deposit hits the bank: $4,812.67. Your sales dashboard says you did $5,400 that day. Nothing is broken — you are comparing two numbers that were never going to be equal. A payout is not a list of your orders. It is a batch of charges, refunds, fees, and chargebacks, netted together and paid on the processor\'s clock, not yours. The moment you stop matching the deposit to your sales and start reconciling the payout against its own report, this stops being a [month-end](/notes/bank-reconciliation-step-by-step) nightmare and turns into arithmetic. Here is the method.',
    blocks: [
      { t: 'h2', text: 'Why the deposit can\'t match your sales' },
      {
        t: 'p',
        text: 'A store owner on [r/smallbusiness](https://reddit.com/r/smallbusiness/comments/1jnznxu/shopify_payouts_are_a_nightmare_to/) laid it out cleanly: a payout is not just a deposit. It folds in order payments, partial refunds, gift cards, discounts, chargebacks, shipping adjustments, and platform fees, all at once. Their one-line summary of the result is the line every ecommerce bookkeeper knows by heart.',
      },
      { t: 'quote', text: 'The bank deposit never matches the gross order value.' },
      {
        t: 'p',
        text: 'That is not a bug in Shopify, your bank, or your bookkeeping. The deposit and your sales disagree for three structural reasons, and all three are working as designed.',
      },
      {
        t: 'table',
        head: ['Why it won\'t match', 'What is actually happening'],
        rows: [
          ['Net, not gross', 'The deposit is what is left after [processing fees](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/pay-periods-and-fees) come out. Your books record the gross sale, so the two differ by at least the fee.'],
          ['Bundled, not per-order', 'One payout settles many transactions at once — charges, refunds, gift cards, [chargebacks](https://en.wikipedia.org/wiki/Chargeback), and adjustments — as a single net figure, not one number per order.'],
          ['Timing-shifted', 'A sale today lands in a payout that clears days later, and [reserves or holds](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/lower-or-missing-payouts) push it further out. A day\'s deposit and a day\'s sales cover different transactions.'],
        ],
      },
      {
        t: 'p',
        text: 'The most useful answer in one [r/Bookkeeping thread](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) gets the first reason exactly right:',
      },
      {
        t: 'quote',
        text: 'the mismatch is usually because QBO records the gross sale amount but your bank gets the net deposit after processing fees. if you\'re recording both and trying to match them 1:1 they\'ll never line up.',
      },
      {
        t: 'p',
        text: 'Right — and it does not stop at fees. Refunds, chargebacks, gift-card redemptions, and reserve movements stack on top, and the timing lag means the period never lines up either. So the fix is not a better lookup. It is changing what you match.',
      },
      { t: 'h2', text: 'Reconcile the payout, not the order' },
      {
        t: 'p',
        text: 'Stop tying the bank deposit to your sales. Reconcile it against the payout report instead — the one Shopify exposes under Finance, Payouts, or the [payout reconciliation report](https://docs.stripe.com/payouts/reconciliation) Stripe and most processors publish — keyed on the [payout ID](/notes/what-we-mean-when-we-say-primary-id). The payout is the natural unit: it is what actually hit your bank, and it is the only record that already knows about every fee, refund, and chargeback bundled into that deposit. A commenter in that same nightmare thread, doing roughly 30,000 orders a month, described the alternative:',
      },
      {
        t: 'quote',
        text: 'We have an accounting team that is manually reconciling each payout to all the orders every day and it is becoming a lot of pain.',
      },
      {
        t: 'p',
        text: 'Matching every payout back to every order by hand is the hard way, and it does not scale. The payout report already did that bundling for you. Your job is to verify it in layers.',
      },
      { t: 'h2', text: 'The three layers, in order' },
      {
        t: 'p',
        text: 'A payout reconciliation is really three reconciliations stacked, and they get easier as you climb. Do them in this order.',
      },
      { t: 'h3', text: 'Layer 1 — bank deposit to payout' },
      {
        t: 'p',
        text: 'Match each deposit in your bank feed to a payout on the report by payout ID, date, and net amount. This is a clean one-to-one match — exactly the kind of [set difference](/notes/find-missing-rows-in-excel-countif-match) a spreadsheet handles well — and it catches the bank-side problems first: a payout that never arrived, a deposit recorded twice, or one still in transit across a weekend.',
      },
      { t: 'h3', text: 'Layer 2 — payout to its components' },
      {
        t: 'p',
        text: 'For each payout, confirm the arithmetic of the batch. Shopify\'s payout export gives you Amount, Fee, and Net [columns](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/view-details); Stripe\'s [payout reconciliation report](https://docs.stripe.com/reports/payout-reconciliation) breaks the batch into reporting categories with gross and fee. The identity you are checking:',
      },
      {
        t: 'code',
        text: '  gross charges\n  − refunds\n  − chargebacks and dispute fees\n  − processing fees\n  ± balance adjustments\n  ± reserve held / released\n  ─────────────────────────────\n  = net payout  (the bank deposit)',
      },
      {
        t: 'p',
        text: 'If that adds up, the deposit is explained in full — and you book it as a journal entry through a clearing account (next section), not as one lump of revenue.',
      },
      { t: 'h3', text: 'Layer 3 — gross charges to recorded sales' },
      {
        t: 'p',
        text: 'Only this layer touches order-level data, and you do it by period, not by deposit. Sum the gross charges across every payout in the month, add what is still in transit at the cutoff, and tie that to the gross sales your [storefront or ERP](/notes/reconcile-shopify-orders-against-your-erp) recorded for the same period. This is an accrual check: [revenue belongs to the period of the sale](https://en.wikipedia.org/wiki/Revenue_recognition), not the period the cash landed. Match the cash to the sale and you end up wrong in both months.',
      },
      { t: 'h2', text: 'Use a clearing account so the two sides don\'t have to tie 1:1' },
      {
        t: 'p',
        text: 'The mechanism that makes all three layers work is a [clearing account](https://en.wikipedia.org/wiki/Clearing_account) — a holding account that absorbs the netting and the timing. Record the gross sale into the clearing account when the order is placed. When the payout lands, move the net amount into the bank and route the fees, refunds, and chargebacks to their own accounts, which empties the clearing account for those orders. Gross sales and the net deposit never have to equal each other directly; the clearing account holds the difference until it resolves.',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'At any moment, the clearing-account balance should equal payouts in transit plus any reserve being held. If it equals something else, that gap is your exception list — start there instead of re-checking matches that already tied.',
      },
      { t: 'h2', text: 'Multiple processors? One lane each.' },
      {
        t: 'p',
        text: 'Shopify Payments, [Stripe](https://docs.stripe.com/payouts/reconciliation), PayPal, and Amazon each settle on their own [schedule](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/payout-timing), with their own payout IDs, fee structure, and report. They do not share a transaction ID, so there is no clean way to net them together — and you should not try. Give each processor its own clearing account and reconcile it in its own lane. A multi-channel [seller](https://reddit.com/r/ecommerce/comments/1sp1f7j/the_real_cost_of_multichannel_selling_that_nobody/) named the per-processor tax of getting this wrong:',
      },
      {
        t: 'quote',
        text: 'Stripe fees are netted out — I have to manually gross them back up.',
      },
      {
        t: 'p',
        text: 'Reserves make it worse: some processors hold back a slice of money you have already earned but cannot yet account for, so the in-transit balance in that lane is real and has to be tracked, not ignored. Keeping the lanes separate is what stops one processor\'s timing quirk from contaminating another\'s reconciliation.',
      },
      { t: 'h2', text: 'Where the settlement tools fit' },
      {
        t: 'p',
        text: 'You do not have to build Layer 2 by hand. Tools like A2X and Link My Books read the settlement file and post a summarized journal — gross sales, fees, refunds — straight into [QuickBooks or an ERP](/notes/netsuite-reconciliation-inventory-and-gl), which is exactly the per-payout journal above, automated. Synder is the one people reach for when a native accounting integration mis-imports. They are legitimate and they save real hours. Just read recommendations with clear eyes — in the nightmare thread, the top reply was a question:',
      },
      {
        t: 'quote',
        text: 'Have you looked at A2X? I\'m the Director of Operations at a boutique cloud based accounting firm called Accounting Elements and we use A2X to connect Shopify to our clients\' books.',
      },
      {
        t: 'p',
        text: 'Useful, but it is a recommendation from someone whose firm runs on the tool, not a neutral verdict. And it helps to know what these tools do and do not do: they post clean numbers to your general ledger, which answers the accounting question. They do not tell you whether your store, your [OMS](/notes/reconcile-your-oms-against-the-source-of-truth), and your processor agree on what actually sold — that reconciliation is still yours, and it is the one [auditors](/notes/what-auditors-look-for) ask about.',
      },
      { t: 'h2', text: 'A working sequence' },
      {
        t: 'ol',
        items: [
          'Pull the payout report for the period and key it on payout ID (Shopify: Finance, Payouts; Stripe and others: the payout reconciliation report).',
          'Layer 1: match each bank deposit to a payout by ID and net amount; resolve missing or duplicated deposits before anything else.',
          'Layer 2: for each payout, confirm gross − refunds − chargebacks − fees ± adjustments ± reserve = net, and book it as a journal through a clearing account.',
          'Layer 3: sum gross charges for the period, add what is in transit, and tie it to gross sales in your store or ERP on an accrual basis.',
          'Check that the clearing-account balance equals payouts in transit plus reserves, and investigate only the remainder.',
        ],
      },
      {
        t: 'p',
        text: 'Run it in that order and "the deposits never match" stops being a mystery. It resolves into a fee line, a timing lag, and a short list of real exceptions — which is all it ever was. The deposit was never going to equal your sales. Reconcile the payout instead, and it does not have to.',
      },
    ],
    faq: [
      {
        q: 'Why is my Shopify payout less than my sales?',
        a: 'Because the payout is the net deposit after Shopify takes processing fees and subtracts any refunds, chargebacks, and reserve holds since the last payout. Your sales figure is gross. The two differ by the fees and adjustments, plus a timing gap, because a sale is usually paid out a few days later.',
      },
      {
        q: 'How do I reconcile Shopify payouts to my bank?',
        a: 'Match each bank deposit to a payout on the Shopify payout report by payout ID and net amount, confirm the payout breaks down into gross charges minus refunds, chargebacks, and fees, and book it as a journal through a clearing account. Then tie gross charges for the period to your recorded sales as a separate, period-level check.',
      },
      {
        q: 'Why don\'t Stripe or PayPal deposits match my books either?',
        a: 'For the same reason: each is a net settlement batch of many transactions on its own timing, not a per-order payment. Reconcile each processor in its own lane against its own payout report, with its own clearing account, and never net them together.',
      },
      {
        q: 'Should a single bank deposit ever equal one order total?',
        a: 'Almost never. A payout bundles many orders, refunds, and fees into one net figure and pays on the processor schedule. Expecting a deposit to equal an order — or even a single day of sales — is the root of most payout reconciliation pain.',
      },
      {
        q: 'What is a clearing account and why use one for payouts?',
        a: 'A clearing account is a temporary holding account that absorbs the gap between when you record a sale and when the cash arrives net of fees. You post gross sales to it at order time and clear it when the payout lands, routing fees and refunds to their own accounts. Its balance should equal money earned but not yet paid out.',
      },
    ],
  },
  {
    slug: 'what-auditors-look-for',
    title: 'What auditors look for in a reconciliation — and how to be ready before they ask',
    description:
      'An auditor is not checking whether your reconciliation balances. They are checking whether you can prove it. What audit-ready actually means: every reconciling item identified, explained, and supported; a clear trail from the bank or subledger back to the general ledger; and a documented preparer-and-reviewer sign-off. The specific evidence auditors ask for, the reconciling items that draw the most scrutiny, why a zero variance can still fail, and how to leave the trail during the monthly close so year-end is not a fire drill.',
    keywords: [
      'what auditors look for reconciliation',
      'audit-ready reconciliation',
      'reconciliation supporting documentation',
      'reconciling items audit',
      'preparer reviewer sign-off',
      'balance sheet reconciliation audit',
      'subledger to GL reconciliation',
      'stale reconciling items',
    ],
    lead: 'Someone on r/Accounting finally asked the quiet question out loud — ["Why do accountants hate reconciliations?"](https://reddit.com/r/Accounting/comments/1mcea6v/why_do_accountants_hate_reconciliations/) — and the thread mostly answered with a shrug. Here is the part that actually helps you: an auditor is not checking whether your reconciliation balances. They are checking whether you can prove it. A clean zero with no trail behind it is worth almost nothing to them; a small, explained, supported difference is fine. The work that makes a reconciliation hold up is the exact work people skip when they are racing the close — naming every reconciling item, backing it with a document, and getting a second set of eyes on it. Do that during the month and year-end stops being a fire drill. Here is what auditors actually look for, item by item, and how to leave the trail as you go.',
    blocks: [
      { t: 'h2', text: 'What is an auditor actually testing?' },
      {
        t: 'p',
        text: 'Start with the thing most explanations get wrong. The auditor is not re-performing your reconciliation to see if they land on the same number. They are testing whether the reconciliation worked as a [control](https://oacp.upenn.edu/audit/audit101/internal-controls-guidance/operational-internal-controls/): does the general ledger balance tie to an independent source, are the differences between them identified and explained, and is there evidence that a competent person checked the work. A [reconciliation](https://en.wikipedia.org/wiki/Reconciliation_%28accounting%29) is only doing its job when it answers all three.',
      },
      {
        t: 'p',
        text: 'This is why "it reconciles, I checked" is not an answer. Public-company audit standards are explicit on the point — under the PCAOB\'s [audit-evidence standard](https://pcaobus.org/oversight/standards/auditing-standards/details/AS1105), asking a person whether something reconciled does not, on its own, count as sufficient evidence. The reconciliation has to stand on documents, not on your word. That single idea drives everything an auditor asks for next.',
      },
      { t: 'h2', text: 'A balanced reconciliation and an audit-ready one are not the same thing' },
      {
        t: 'p',
        text: 'Here is the trap, and it is worth saying plainly: a reconciliation that nets to zero can still be wrong, and a green checkmark can hide the error that sinks you. A commenter on a thread about reconciliations that "say MATCHED but hide duplicates" described it exactly — they "stopped trusting the green checkmarks in standard reconciliation templates" and "learned the hard way when auditors found duplicate vendor payments that looked clean because amounts offset perfectly" ([r/Accounting](https://reddit.com/r/Accounting/comments/1stpdxk/tired_of_excel_reconciliations_that_say_matched/)). Two offsetting errors net to zero. A duplicate payment and a missed credit cancel out. The total ties and the detail is garbage.',
      },
      {
        t: 'p',
        text: 'The opposite failure is just as common: making the number tie by force. When a close gets compressed, the temptation is to "stop reconciling the small stuff" — a habit a skeptical reply on an [FP&A thread](https://reddit.com/r/FPandA/comments/1rwyar6/whats_actually_in_your_saas_finance_stack_that/) flagged as "cutting corners on the audit trail." A round-number plug labeled "adjustment to balance" is not a reconciled account; it is an unexplained difference wearing a disguise, and it is one of the first things a reviewer pulls.',
      },
      {
        t: 'p',
        text: 'The duplicate-payment case is not rare, and it is catchable. Offsetting amounts are exactly what slips past one-to-one matching, which is why catching them is a [fuzzy-matching](/notes/fuzzy-matching-records) problem, not a "look harder" problem. The reconciliation that survives an audit is the one where the total ties and every line under it is real.',
      },
      { t: 'h2', text: 'The five things an auditor wants to see' },
      {
        t: 'p',
        text: 'Strip away the jargon and an audit-ready reconciliation has five parts. Miss any one and the reconciliation is, in audit terms, incomplete — even when the math is perfect. This is the checklist a reviewer runs, so run it on yourself first.',
      },
      {
        t: 'table',
        head: ['What they want', 'What good looks like', 'The red flag'],
        rows: [
          ['Two balances and their sources', 'The GL balance and the independent source (bank statement, subledger, processor report) as of the same date', 'One number alone; or two numbers with no stated source'],
          ['Every reconciling item, itemized', 'Each difference listed as its own line with a clear description', 'A single lump "difference" with no breakdown'],
          ['Support behind each item', 'A document or reference for every reconciling item — the outstanding check, the deposit in transit, the fee report', 'Items you "know" are right but cannot point to'],
          ['Aging on open items', 'How long each unresolved item has sat, with an owner and a resolution path', 'Items carried for months with no date and no owner'],
          ['Preparer and reviewer sign-off', 'Evidence two different people prepared and reviewed it, within the close calendar', 'Prepared and "reviewed" by the same person, or no review at all'],
        ],
      },
      {
        t: 'p',
        text: 'Institutions that get audited constantly publish exactly this expectation. Yale\'s [balance-sheet reconciliation and certification](https://your.yale.edu/policies-procedures/procedures/1101-pr04-balance-sheet-ledger-account-reconciliation-certification) policy and Stanford\'s [account reconciliation and attestation](https://adminguide.stanford.edu/chapters/financial-administration/account-balance-reconciliation-and-attestation/account-balance) guidance both require the same shape: compare the ledger to an independent source, document and support every reconciling item, and have someone other than the preparer certify it. If you want a free, specific model, those two are it.',
      },
      { t: 'h2', text: 'The reconciling items that draw the most scrutiny' },
      {
        t: 'p',
        text: 'Auditors do not spread their attention evenly. A few kinds of reconciling item get pulled first, because they are where errors and fraud hide. Know them and you know where to spend your own review time.',
      },
      {
        t: 'ul',
        items: [
          'Stale items. A difference carried forward 60 or 90 days with no owner and no resolution path reads as an unresolved error — or worse, something nobody understands anymore. Age every open item and chase the old ones.',
          'Round-number plugs. Anything that exactly offsets the difference — a tidy "$1,200.00 adjustment to balance" — invites the question you do not want: what is this, really?',
          'Offsetting pairs. Two items that cancel to zero, like a duplicate charge and a missed credit, can mask two separate mistakes. A net of zero is not proof the detail is clean.',
          'Items cleared with no note. Clearing a difference during a busy close without writing down why creates a gap that compounds; by year-end nobody remembers, and the auditor is the one left asking.',
          'Differences you created on the bank side. In a well-run book the bank is rarely the source of an entry, so a reconciling item that traces back to your own duplicated or miscoded posting is more concerning than a genuine timing difference like an outstanding check.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A reconciliation that has balanced to exactly zero every month for a year is not automatically clean — it can mean nobody is looking hard enough to surface the real differences. A suspiciously perfect history sometimes earns more scrutiny, not less.',
      },
      { t: 'h2', text: 'Who signs off — and why it cannot be the same person' },
      {
        t: 'p',
        text: 'The single control auditors check most reliably is also the one small teams skip most often: the person who prepares the reconciliation should not be the person who approves it. This is [separation of duties](https://en.wikipedia.org/wiki/Separation_of_duties), and it exists because a second independent look catches honest errors and deters the dishonest ones. A reconciliation with no reviewer is, to an auditor, a reconciliation that no control operated on.',
      },
      {
        t: 'p',
        text: 'A [former auditor answering a bookkeeper on r/Bookkeeping](https://reddit.com/r/Bookkeeping/comments/11l3md1/reconciling_paypal_to_qbo_without_bank_connection/) put the same point bluntly: "You shouldn\'t be the sole decision maker!" Their advice for an audit was concrete — show "where the transactions are happening" and "how they get into the books," and be ready to "export PP activity to Excel, group it together, and show how it all reconciles." That is the whole game: a documented path from the source system to the general ledger, checked by someone other than you.',
      },
      {
        t: 'p',
        text: 'On a one- or two-person team, true separation is hard — but "hard" is not "skip it." The reviewer can be an owner, an outside accountant, or a manager who spends ten minutes scanning the reconciling items and initials the work. What matters to the auditor is evidence that a second person actually looked, not who they report to. And this is the one part [an AI agent cannot do for you](/notes/can-an-ai-agent-reconcile-your-data) — a model can prepare and explain a reconciliation, but it cannot be the independent human accountable for approving it.',
      },
      { t: 'h2', text: 'How to leave the trail during the month, not at year-end' },
      {
        t: 'p',
        text: 'The reason year-end audits hurt is that the trail gets reconstructed under pressure, months after the memory faded. The fix is boring and it works: leave the trail as you close each month. None of these steps needs a tool — they need a habit.',
      },
      {
        t: 'ol',
        items: [
          'Save the source with the reconciliation — the bank statement, the processor or payout report, the subledger export you reconciled against. Store it next to the rec, not in someone\'s inbox.',
          'Write one line of explanation per reconciling item, with a reference to its support. "Outstanding check #1042, cleared 4/3" beats "timing" every time.',
          'Log open items and age them. Keep a running list of unresolved differences with a date opened and an owner, so nothing silently becomes a stale item.',
          'Get the review in the same close cycle. A reviewer who signs off three months later is not a control. Book the ten minutes while the detail is fresh.',
          'Store it where a stranger could find it. The test for a clean [audit trail](https://en.wikipedia.org/wiki/Audit_trail) is simple — could someone who has never seen the account follow your reconciliation from the GL back to the source without asking you a single question?',
        ],
      },
      {
        t: 'p',
        text: 'This is the same discipline behind a sound [bank reconciliation](/notes/bank-reconciliation-step-by-step) and a sequenced [month-end tick-and-tie](/notes/tick-and-tie-checklist) — do the work in order, leave evidence at each step. If your systems never shared a clean [primary ID](/notes/what-we-mean-when-we-say-primary-id), the trail is also where you show how you bridged them, which is precisely what an auditor needs in order to trust the match.',
      },
      { t: 'h2', text: 'Do subledgers like AR and AP need to be reconciled to the GL?' },
      {
        t: 'p',
        text: 'Yes — and it is a standard audit ask that surprises people. A NetSuite user asked the exact question — [Is it necessary to "reconcile" subledger reports?](https://reddit.com/r/Netsuite/comments/1huosmu/is_it_necessary_to_reconcile_subledger_reports/) — assuming the aged AR and AP subledgers would always equal the balance sheet. They usually do, and "usually" is the point: when the aged subledger does not tie to its GL control account, something posted to the control account outside the subledger — a manual journal entry, a misposting — and that gap is exactly what an auditor wants explained. Tie the [subledger to the GL](/notes/netsuite-reconciliation-inventory-and-gl) every close and the difference, if any, is a short list instead of a year-end mystery.',
      },
      {
        t: 'p',
        text: 'None of this requires software. It requires leaving a trail you would be willing to hand to a stranger. A reconciliation that explains itself — every item named, supported, and reviewed — is the whole job, whether a person, a spreadsheet, or a tool produces it. Build that habit monthly and the audit becomes a formality instead of an excavation.',
      },
    ],
    faq: [
      {
        q: 'Does a reconciliation have to balance to zero to pass an audit?',
        a: 'No. Auditors expect reconciling items; what matters is that each one is identified, explained, and supported. An unexplained zero is actually weaker than a small difference that is documented and aging toward resolution.',
      },
      {
        q: 'What documentation do auditors want with a reconciliation?',
        a: 'The two balances being compared, the independent source for each, every reconciling item listed with a reference to its supporting document, and evidence that one person prepared it and a different person reviewed it within the close period.',
      },
      {
        q: 'Why can the same person not prepare and review the reconciliation?',
        a: 'Separation of duties. An independent second review is a basic internal control that catches honest errors and deters fraud, and auditors look for evidence that the review actually happened. On a tiny team the reviewer can be an owner or outside accountant, but it should not be the preparer.',
      },
      {
        q: 'What are stale reconciling items and why do they matter?',
        a: 'Differences carried forward for months with no owner and no resolution path. They suggest an unresolved error or possible misstatement, so they draw extra scrutiny. Aging open items every close and resolving the old ones keeps them from piling up.',
      },
      {
        q: 'Do subledgers like AR and AP need to be reconciled to the general ledger?',
        a: 'Yes. Tying the aged AR or AP subledger to its GL control account is a standard month-end and audit step. A gap means something posted to the control account outside the subledger, such as a manual journal entry, and that difference needs to be explained.',
      },
    ],
  },
  {
    slug: 'fuzzy-matching-records',
    title: 'Fuzzy matching records: catching the duplicate the invoice number hides',
    description:
      'A vendor invoice paid twice slips through because the invoice numbers differ slightly. The fix is not sharper eyes — it is matching on the fields that do not drift. How to normalize keys, build a composite match on amount, vendor, and date window, score near-duplicates, and the duplicate-payment test that catches what exact matching misses.',
    keywords: [
      'fuzzy matching',
      'catch duplicate payments',
      'find duplicate invoices excel',
      'reconciliation fuzzy match',
      'composite key matching',
      'duplicate vendor payment',
      'approximate string matching',
    ],
    lead: 'An AP team paid the same vendor invoice twice, and the reason it slipped through is the useful part: ["Because the invoice numbers were slightly different, QuickBooks didn\'t catch it."](https://reddit.com/r/QuickBooks/comments/1nog8xi/small_business_ap_how_do_you_catch_duplicate/) That isn\'t a software failure — it\'s what happens when you match on one raw key and trust it. Exact matching only works when both systems write the key the same way, and they almost never do. Fuzzy matching is the fix, but its job is widely misread: it surfaces look-alike pairs for you to confirm, not to auto-merge anything. Here\'s how to normalize keys so more matches land cleanly, how to match on what doesn\'t drift when the key is hopeless, and the duplicate-payment test that would have caught that doubled invoice.',
    blocks: [
      { t: 'h2', text: 'Why didn\'t the software catch the duplicate?' },
      {
        t: 'p',
        text: 'The honest answer isn\'t "invoice numbers are hard." It\'s that almost every out-of-the-box match does exact, one-to-one matching on a single key. An operator named the mechanism precisely in a thread titled ["Reconciliation tools are just fancy VLOOKUPs and nobody wants to say it"](https://reddit.com/r/Accounting/comments/1smq2rr/reconciliation_tools_are_just_fancy_vlookups_and/): "almost everything still does 1:1 exact matching. Meaning — if your ERP spits out ORD-2024-10042 and your bank statement has 10042, the tool says unmatched." Same defect in the duplicate case: two entries that are really one bill look like two records because one key reads INV-4021 and the other 4021-A. The match did exactly what you asked. You asked the wrong question.',
      },
      {
        t: 'p',
        text: 'The seed thread\'s best answer was honest but not a method. A commenter replied that ["Its hard when the invoice numbers are different, that makes it harder to catch"](https://reddit.com/r/QuickBooks/comments/1nog8xi/small_business_ap_how_do_you_catch_duplicate/) and fell back on a person noticing — "there are only 1-2 AP people and usually they would catch the dupe invoice." That holds until volume, turnover, or a second cost category outruns one person\'s memory, which is exactly how this one got through. The fix isn\'t a sharper pair of eyes. It\'s matching on the fields that don\'t drift.',
      },
      { t: 'h2', text: 'What fuzzy matching is — and the one thing it must not do' },
      {
        t: 'p',
        text: 'Fuzzy matching compares records that aren\'t identical and scores how alike they are, so near-misses surface instead of silently failing an exact-match test. The formal name for the whole problem is [record linkage](https://en.wikipedia.org/wiki/Record_linkage), and the probabilistic flavor is literally called [fuzzy matching](https://en.wikipedia.org/wiki/Fuzzy_matching) — pairs above a similarity threshold are matches, below it are non-matches, and the band in between are "possible matches" a person decides.',
      },
      {
        t: 'p',
        text: 'Here is the discipline that everything else hangs on: a similarity score is a candidate flag, not a verdict. It tells you "these two might be the same — look." It must never auto-merge or auto-clear on its own, because the same machinery that pairs INV-4021 with 4021-A will just as happily pair two genuinely different invoices that happen to share an amount. Surface, then confirm. Skip the confirm and you\'ve only traded missed duplicates for invented ones.',
      },
      { t: 'h2', text: 'Normalize before you match (this does most of the work)' },
      {
        t: 'p',
        text: 'Before any scoring, most "non-matching" keys are just formatted differently. Normalization is the cheap, boring step that turns the majority of your near-misses into clean exact matches. Do it to both sides, into a new helper column, and match on that — leave the raw key untouched so you can always trace back.',
      },
      {
        t: 'table',
        head: ['What drifts', 'Normalize it to', 'Why it matters'],
        rows: [
          ['Leading / trailing spaces', 'Trimmed text', 'A trailing space makes 4021 ≠ "4021 "'],
          ['Upper vs lower case', 'One case', 'inv-4021 and INV-4021 are the same bill'],
          ['Prefixes / suffixes (INV-, -A, /2024)', 'The stable core, often just the digits', 'This is the exact gap that hid the duplicate'],
          ['Leading zeros (0004021)', 'Stripped or padded consistently', 'Text-vs-number formatting flips these silently'],
          ['Separators (- / .)', 'Removed', 'ORD-2024-10042 collapses toward 10042'],
        ],
      },
      {
        t: 'code',
        text: '=TRIM(A2)                                       \' strip stray spaces\n=UPPER(TRIM(A2))                                \' spaces + case in one pass\n=SUBSTITUTE(SUBSTITUTE(UPPER(TRIM(A2)),"INV-",""),"-A","")   \' drop known prefix/suffix\n=VALUE(A2)                                      \' force a number, killing leading-zero drift',
      },
      {
        t: 'p',
        text: 'This is the same clean-key discipline that makes an [XLOOKUP reconciliation](/notes/reconcile-two-files-in-excel-with-xlookup) work at all — XLOOKUP and VLOOKUP do exact matching, so they only reward you when the keys are already identical, and normalizing into a helper column is how you earn that. [TRIM](https://support.microsoft.com/en-us/office/trim-function-410388fa-c5df-49c6-b16c-9e5630b479f9) removes only the space character, so pair it with UPPER and SUBSTITUTE for the rest. The thing you\'re rebuilding here is a stable [primary ID](/notes/what-we-mean-when-we-say-primary-id) — when the systems never shared one, this is the work that fakes one well enough to match on.',
      },
      { t: 'h2', text: 'When the key is hopeless, match on what doesn\'t drift' },
      {
        t: 'p',
        text: 'Sometimes there\'s no recoverable key — the two sides never shared one, or the invoice number is genuinely different on each. Stop trying to fix the key and match on the fields that don\'t move: the amount, the counterparty, and the date within a window. A duplicate payment almost always keeps the amount and the vendor identical even when the invoice number drifts. That\'s the signature you hunt for.',
      },
      {
        t: 'ol',
        items: [
          'Build a composite key from stable fields: normalized vendor + amount + period (month). Concatenate them into one column on both sides.',
          'Sort by that composite key so identical bills sit next to each other.',
          'Flag exact composite collisions. Two rows with the same vendor, same amount, and same period are duplicate candidates regardless of invoice number.',
          'Widen the date to a window, not an exact day. Real duplicates often post a few days apart — compare within plus-or-minus five days rather than on an exact date.',
          'Review each flagged pair by hand. Same bill paid twice, or two real invoices that happen to share an amount? Only a person closes that.',
        ],
      },
      {
        t: 'code',
        text: '\' Composite key on each side:\n=UPPER(TRIM(Vendor)) & "|" & TEXT(Amount,"0.00") & "|" & TEXT(Date,"YYYY-MM")\n\n\' Flag any composite key that appears more than once:\n=COUNTIF(KeyCol,K2)>1',
      },
      {
        t: 'p',
        text: 'Flagging same-key collisions is the same [set-difference logic](/notes/find-missing-rows-in-excel-countif-match) you\'d use to find missing rows — you\'re just hunting the opposite signal: rows that appear too many times instead of too few.',
      },
      { t: 'h2', text: 'Scoring near-duplicates when you can\'t enumerate the rules' },
      {
        t: 'p',
        text: 'Composite keys catch duplicates where you can name the stable fields. When you can\'t — free-text descriptions, customer names, addresses — you need a similarity score: a number from 0 to 1 for how alike two strings are. The standard measures, and where each one fits:',
      },
      {
        t: 'table',
        head: ['Measure', 'Best for', 'How it works'],
        rows: [
          ['[Levenshtein / edit distance](https://en.wikipedia.org/wiki/Levenshtein_distance)', 'Typos and transpositions in codes', 'Counts the single-character edits to turn one string into the other'],
          ['[Jaro–Winkler](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)', 'Short strings like names', 'Rewards a shared prefix; built for record linkage'],
          ['[Jaccard (token overlap)](https://en.wikipedia.org/wiki/Jaccard_index)', 'Reordered words ("Acme Inc" vs "Inc, Acme")', 'Overlap over union of the words; what Power Query uses'],
        ],
      },
      {
        t: 'p',
        text: 'In a spreadsheet you don\'t implement these by hand. [Power Query\'s fuzzy merge](https://learn.microsoft.com/en-us/power-query/merge-queries-fuzzy-match) exposes a [similarity threshold from 0.00 to 1.00, default 0.80](https://learn.microsoft.com/en-us/power-query/fuzzy-matching), where 1.00 allows only exact matches and lower values match more loosely. Turn on "show similarity scores" so you can see why each pair matched, and tune the threshold against your own data rather than trusting the default.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A threshold is a dial between two failure modes, and no setting escapes both. Too loose and you pair invoices that were never the same; too tight and the duplicate you\'re hunting slips through again. Set it to surface candidates generously, then confirm every one by hand. The score decides what you look at — never what you clear.',
      },
      { t: 'h2', text: 'The duplicate-payment test, end to end' },
      {
        t: 'p',
        text: 'Put it together against the original problem: a bill paid twice under slightly different invoice numbers. Here\'s the pass that catches it.',
      },
      {
        t: 'ol',
        items: [
          'Pull both payment runs into one sheet with vendor, amount, invoice number, date, and cost category in columns.',
          'Normalize the vendor and invoice number into helper columns (trim, upper, strip prefixes).',
          'Build the composite key: vendor + amount + month. Ignore the invoice number for this pass — it\'s the field that lied.',
          'COUNTIF the composite key. Anything appearing more than once is a candidate.',
          'For each candidate, widen to a five-day window and read the two rows. Same vendor, same amount, days apart, two different cost categories is the exact fingerprint of this error.',
          'Confirm and resolve by hand: void the duplicate, document which one was real.',
        ],
      },
      {
        t: 'p',
        text: 'This is the failure mode behind a complaint that a reconciliation can say everything matched and still be wrong. One commenter described how auditors found ["duplicate vendor payments that looked clean because amounts offset perfectly."](https://reddit.com/r/Accounting/comments/1stpdxk/tired_of_excel_reconciliations_that_say_matched/) A top-line "MATCHED" only proves the totals tie; it says nothing about whether two line items are secretly the same bill. The duplicate test above is what looks underneath the checkmark.',
      },
      { t: 'h2', text: 'When this stops scaling' },
      {
        t: 'p',
        text: 'A helper column and a COUNTIFS pass are the right tools for a few hundred rows you check monthly — it\'s the [manual method](/notes/how-to-reconcile-two-systems-by-hand) with a normalization step bolted on, and it pairs naturally with a [bank reconciliation](/notes/bank-reconciliation-step-by-step) or a [month-end tick-and-tie](/notes/tick-and-tie-checklist) where a doubled entry is exactly what you\'re watching for. It strains when the same dedup runs every week, when there are thousands of rows, or when "is this really the same vendor" needs judgment a formula can\'t encode. At that point you want the normalization rules and the match logic written down once and run the same way every time, not rebuilt from memory. If you reach for AI there, use it where it\'s actually strong — [describing the normalization rules and explaining candidate pairs](/notes/prompting-ai-to-help-reconcile-two-files) — and keep [the arithmetic and the matching in code you can audit](/notes/can-an-ai-agent-reconcile-your-data), so "these are duplicates" stays a claim you can defend.',
      },
    ],
    faq: [
      {
        q: 'Why didn\'t QuickBooks catch the duplicate invoice?',
        a: 'Because it matched on the invoice number, and the two entries had slightly different numbers. Out-of-the-box matching is exact and one-to-one on a single key, so any drift in that key reads as two separate records. Matching on stable fields instead — vendor, amount, and a date window — catches the duplicate the invoice number hides.',
      },
      {
        q: 'What is fuzzy matching in reconciliation?',
        a: 'Comparing records that are not identical and scoring how similar they are, so near-misses surface instead of silently failing an exact match. It is a form of record linkage. Its output is candidate pairs for a person to confirm, not an automatic merge.',
      },
      {
        q: 'How do I find duplicate payments in Excel?',
        a: 'Normalize the vendor and amount into helper columns, build a composite key of vendor plus amount plus month, and use COUNTIFS to flag any key that appears more than once. Review each flagged pair within a few-day window by hand; a duplicate keeps the amount and vendor even when the invoice number differs.',
      },
      {
        q: 'Should fuzzy matching merge records automatically?',
        a: 'No. A similarity score flags candidates; it should never auto-merge or auto-clear. The same scoring that pairs a mistyped key with its original will also pair two genuinely different records that share an amount. Always confirm by hand before resolving.',
      },
      {
        q: 'What similarity threshold should I use for fuzzy matching?',
        a: 'There is no universal number. In Power Query the default is 0.80, where 1.00 is an exact match and lower values match more loosely. Start generous to surface candidates, turn on similarity scores to see why pairs matched, and tune against your own data — but always confirm matches manually rather than clearing on the score alone.',
      },
    ],
  },
  {
    slug: 'tick-and-tie-checklist',
    title: 'A month-end tick-and-tie checklist (and why the order matters)',
    description:
      'A tool-agnostic, ordered checklist for closing a set of books — what to reconcile first, what depends on what, and why sequence matters more than any single step. Includes a free printable checklist.',
    keywords: [
      'tick and tie checklist',
      'month end close checklist',
      'reconciliation order',
      'qbo cleanup order',
      'balance sheet reconciliation',
      'month end reconciliation steps',
    ],
    lead: '"What order do you do this in?" is the right question — the people asking it have already figured out the thing most checklists skip: sequence isn\'t a preference, it\'s load-bearing. Reconcile a derived account on top of an unverified one and you don\'t fix the error, you just move it somewhere harder to find. Here\'s the order that works, why each step has to come before the next, and a checklist you can print and tick off.',
    blocks: [
      { t: 'h2', text: 'What does "tick and tie" actually mean?' },
      {
        t: 'p',
        text: 'Two small jobs, done to every figure. [Tick](https://en.wiktionary.org/wiki/tick_and_tie) means mark an item once you\'ve checked it — the literal ✓ next to a line you\'ve proven. Tie means trace that figure to the document that proves it: the bank statement, the aging report, the payout file. A close is just tick-and-tie repeated across every account until nothing is left unproven. That\'s the same thing as [reconciliation](https://en.wikipedia.org/wiki/Reconciliation_%28accounting%29), said the way accountants actually say it. The output isn\'t "the books balance" — it\'s a trail where every number points at the thing behind it.',
      },
      { t: 'h2', text: 'Why does the order matter so much?' },
      {
        t: 'p',
        text: 'Because each step assumes the step before it is true. One operator put it exactly right — ["I think sequence matters more than almost anything else"](https://reddit.com/r/Bookkeeping/comments/1st9ob6/what_order_do_you_do_a_qbo_cleanup_in_i_think/) — and the most-upvoted reply was a single tactic ("tie out retained earnings first"), not the whole order. That\'s the gap: people get one good tip and no sequence to hang it on.',
      },
      {
        t: 'p',
        text: 'The rule underneath all of it: work from your most trustworthy anchor outward. The prior period\'s close and the bank statement are facts you didn\'t produce, so they\'re where certainty starts. [Retained earnings](https://en.wikipedia.org/wiki/Retained_earnings) and your subledgers are derived from everything below them, so they can only be right once everything below them is. Verify a derived account while its inputs are still unproven and a clean-looking result tells you nothing — you\'ve confirmed an account against numbers you haven\'t confirmed yet.',
      },
      { t: 'h2', text: 'The tick-and-tie sequence, in order' },
      {
        t: 'p',
        text: 'Top to bottom. Don\'t start a step until the one above it ties.',
      },
      {
        t: 'ol',
        items: [
          'Confirm the opening balance. The prior period is closed and reconciled; this period\'s beginning balances equal last period\'s ending balances. Set the period cutoff so you know exactly which dates you are closing.',
          'Reconcile cash and bank first. Match every bank and credit-card account to its statement until the ending balance ties. Cash errors are the loudest and easiest to spot, so clearing them first removes the most noise.',
          'Clear the clearing accounts. Undeposited funds, payments-in-transit, and payout/settlement clearing accounts should net to roughly zero. A leftover balance is an unfinished match, not a rounding quirk.',
          'Tie subledgers to the GL. AR aging total equals the AR control account; AP aging equals AP; inventory valuation equals the inventory asset account; payroll liabilities tie to the provider.',
          'Reconcile the remaining balance-sheet accounts. Prepaids, accruals, fixed assets and depreciation, loans, and taxes each tie to a schedule or statement.',
          'Post adjusting entries last. Accruals and deferrals go in only after the core accounts are stable. An adjustment refines the close; it does not paper over an account you never reconciled.',
          'Tie out the financials. Confirm the [trial balance](https://en.wikipedia.org/wiki/Trial_balance) has debits equal to credits, that retained earnings rolls forward correctly, and review the P&L for any month-over-month swing you cannot explain.',
          'Keep the evidence. Save each reconciliation with its supporting document attached, and give every open item an owner and an expected clear date.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'When you\'re stuck on where to start, start from the document you didn\'t create. The bank statement and the prior close are external facts; everything else is something your books assert and have to prove. Anchor on the facts and work toward the assertions.',
      },
      { t: 'h2', text: 'Where does each item tie to?' },
      {
        t: 'p',
        text: 'Reconciling means nothing without naming the second source. Every account ties to something independent — here are the usual pairs and the trap that hides in each.',
      },
      {
        t: 'table',
        head: ['Account', 'Tie it to', 'Watch for'],
        rows: [
          ['Bank / credit card', 'The statement', 'Uncleared items mistaken for missing ones'],
          ['Undeposited funds / clearing', 'Actual deposits', 'A stuck balance that never nets to zero'],
          ['Accounts receivable', 'AR aging report', 'Payments booked as sales instead of against invoices'],
          ['Accounts payable', 'AP aging report', 'The same invoice entered twice under slightly different numbers'],
          ['Inventory', 'Inventory valuation report', 'Subledger and GL run as of different dates'],
          ['Retained earnings', 'Prior period + net income', 'A prior period that was never actually closed'],
        ],
      },
      {
        t: 'p',
        text: 'The receivables and payables rows are where a [primary ID](/notes/what-we-mean-when-we-say-primary-id) earns its keep: an invoice number that drifts between systems is exactly how a duplicate payment slips through, and catching missing or doubled rows is the same [set-difference check](/notes/find-missing-rows-in-excel-countif-match) you\'d run on any two lists.',
      },
      { t: 'h2', text: 'A worked example: the payments-versus-invoices trap' },
      {
        t: 'p',
        text: 'Here\'s the mistake that sends people to the order-of-operations question in the first place. A self-taught operator described ["marking all of my payments as sales"](https://reddit.com/r/Bookkeeping/comments/1m83gtc/think_im_finally_understanding_how_to_do_this_can/) and then realizing the payments didn\'t tie to the invoices. They shouldn\'t — a payment settles an invoice, it isn\'t a second sale. Book it that way and revenue is doubled and AR never clears.',
      },
      {
        t: 'p',
        text: 'The clean pattern, which is step 2 and 3 of the sequence doing their job: record the invoice, receive the payment against it into a [clearing account](https://en.wikipedia.org/wiki/Clearing_account) (undeposited funds), then record the actual deposit out of that clearing account, net of any processor fee booked as an expense. The clearing account is what lets a bundled bank deposit reconcile against several individual invoices — and it\'s why [Shopify or processor payouts are their own reconciliation](/notes/reconcile-shopify-orders-against-your-erp), keyed on the payout, not the order.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A reconciliation that "balances" on a wrong opening balance is the most dangerous result there is, because it looks finished. If retained earnings or a subledger ties while the prior period was never closed, you haven\'t proven anything — you\'ve matched this period against an error you inherited. Confirm the anchor before you trust the tie.',
      },
      { t: 'h2', text: 'When the checklist stops scaling' },
      {
        t: 'p',
        text: 'A printed checklist is the right tool for a monthly close you do by hand — it\'s the [manual reconciliation method](/notes/how-to-reconcile-two-systems-by-hand) with an order stamped on it. It starts to strain when the same tie-outs run every week, when subledgers like [inventory and the GL](/notes/netsuite-reconciliation-inventory-and-gl) drift across hundreds of SKUs, or when someone else has to trust the result without redoing it. At that point the sequence still holds — you just want it preserved as a repeatable process rather than re-walked from memory each month. If you reach for help there, keep the [AI on the setup and explanation and the arithmetic in code](/notes/can-an-ai-agent-reconcile-your-data), so the order stays enforced and the numbers stay defensible.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'Free download: a printable month-end tick-and-tie checklist with all eight steps and the tie-to pairs above, ready to copy into your close tracker — [month-end-tick-and-tie-checklist.md](/downloads/month-end-tick-and-tie-checklist.md). No macros, no signup; delete the example accounts and add your own.',
      },
    ],
    faq: [
      {
        q: 'What order should I reconcile accounts in at month-end?',
        a: 'Confirm the opening balance first, then reconcile cash and bank, then clearing accounts, then tie subledgers (AR, AP, inventory, payroll) to the general ledger, then the remaining balance-sheet accounts, then post adjusting entries, and finally tie out the trial balance and retained earnings. Each step assumes the one before it is already correct.',
      },
      {
        q: 'What does tick and tie mean in accounting?',
        a: 'Tick means marking an item once you have verified it. Tie means tracing that figure to the document that supports it, such as a bank statement or aging report. Together they describe reconciling every number on the books back to independent evidence and leaving an audit trail.',
      },
      {
        q: 'Why does my reconciliation balance but still feel wrong?',
        a: 'Usually because it was built on an unverified opening balance or a derived account was checked before its inputs were. A clean result on top of an inherited error still looks finished. Confirm the prior period was actually closed and that cash and clearing accounts tie before trusting anything downstream.',
      },
      {
        q: 'Why should payments not be booked as sales?',
        a: 'A payment settles an existing invoice; it is not a second sale. Booking payments as sales double-counts revenue and leaves accounts receivable uncleared. Record the invoice, receive the payment against it into a clearing account, then record the deposit out of that clearing account net of fees.',
      },
    ],
  },
  {
    slug: 'bank-reconciliation-step-by-step',
    title: 'Bank reconciliation, step by step (and why it never feels done)',
    description:
      'A bank reconciliation is not about making two numbers equal — it is about explaining the gap between your books and the bank with a named list of timing items. The step-by-step method, the two-column adjusted-balance check, and the one workflow habit that turns a 30-minute job into a 3-hour one.',
    keywords: [
      'bank reconciliation',
      'bank reconciliation steps',
      'deposits in transit',
      'outstanding checks',
      'adjusted bank balance',
      'reconcile bank statement',
    ],
    lead: '"Why does bank reconciliation feel like it\'s never truly done?" Because you\'re probably chasing the wrong finish line. Reconciled doesn\'t mean the bank balance equals your book balance — on the day you close, it almost never does. It means the gap between them is fully explained by a short list of timing items you can name: deposits that haven\'t cleared, checks that haven\'t been cashed. Get that list clean and you\'re done, even with a difference still sitting on the page. Here\'s the method, the two-column check that proves it, and the one workflow habit that quietly turns a 30-minute job into a 3-hour one.',
    blocks: [
      { t: 'h2', text: 'What does it mean to reconcile a bank account?' },
      {
        t: 'p',
        text: 'A [bank reconciliation](https://en.wikipedia.org/wiki/Bank_reconciliation) proves that the cash balance in your books and the balance on your bank statement describe the same money — and, where they differ, explains exactly why. The output isn\'t a single matched number. It\'s a short statement: the bank balance, your book balance, and the named adjustments that bridge the two. That bridge is the whole point, and it\'s the part people skip when they decide the job is "make these equal."',
      },
      {
        t: 'p',
        text: 'One practitioner put the correction precisely. To a question about a [gap between the general ledger and the bank](https://reddit.com/r/Bookkeeping/comments/1odbx7w/discrepancy_between_general_ledger_and_bank/), one reply said "your cash GL account should match the bank statement," and a second corrected it: ["I would disagree slightly. The GL account should tie to the bank reconciliation."](https://reddit.com/r/Bookkeeping/comments/1odbx7w/discrepancy_between_general_ledger_and_bank/) That\'s the distinction the whole task hinges on. Your books don\'t equal the statement. Your books equal the statement plus the reconciling items. Miss that and you\'ll chase a difference that was never supposed to be zero.',
      },
      { t: 'h2', text: 'Why does it never feel "done"?' },
      {
        t: 'p',
        text: 'Two reasons, and they\'re different problems with different fixes. The first is timing. [Deposits in transit](https://www.accountingcoach.com/blog/deposit-in-transit) (recorded in your books, not yet on the statement) and [outstanding checks](https://www.accountingcoach.com/blog/outstanding-checks-bank-reconciliation) (written and recorded, not yet cashed) mean the two balances are supposed to differ. Chasing a zero difference is chasing a number that shouldn\'t be zero. The reconciliation is finished when the difference is fully named, not when it disappears.',
      },
      {
        t: 'p',
        text: 'The second is workflow, and it\'s the one that eats the hours. An operator asked, plainly, ["Anyone else spending 3+ hours monthly on reconciliation that should take 30 minutes?"](https://reddit.com/r/QuickBooks/comments/1mgiw71/anyone_else_spending_3_hours_monthly_on/) — and the most-upvoted reply was "Any tips? Just pitch your product and move along." No answer at all. The real answer is buried in a different thread, where the top reply to ["why bank reconciliation feels never done"](https://reddit.com/r/Accounting/comments/1qq2uee/why_does_bank_reconciliation_feel_like_its_never/) was right but terse: "there should be no transactions that use the bank as a source of original entry." Correct. Unexplained. Below is the version with the reasoning attached.',
      },
      { t: 'h2', text: 'The two balances you are actually comparing' },
      {
        t: 'p',
        text: 'Every adjustment on a reconciliation lands on one of two sides: the bank side or the book side. The rule for which is the one [AccountingCoach](https://www.accountingcoach.com/bank-reconciliation/explanation) teaches as "put the item where it isn\'t." If something is on your books but not yet on the statement, it adjusts the bank side. If it\'s on the statement but not yet in your books, it adjusts the book side.',
      },
      {
        t: 'table',
        head: ['Adjustment', 'Which side', 'Why'],
        rows: [
          ['Deposits in transit', 'Add to bank', 'Recorded in your books; not yet on the statement'],
          ['Outstanding checks', 'Subtract from bank', 'Written and recorded; not yet cashed'],
          ['Bank fees / NSF charges', 'Subtract from books', 'On the statement; not yet entered in your books'],
          ['Interest earned', 'Add to books', 'On the statement; not yet entered in your books'],
          ['Auto-debits you missed', 'Subtract from books', 'Cleared the bank; never recorded'],
          ['Book error (typo, duplicate)', 'Fix the books', 'Wrong amount or a doubled entry on your side'],
          ['Bank error (rare)', 'Adjust bank', 'Document it and contact the bank; don\'t plug it'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'The book-side items — fees, interest, NSF, auto-debits — are the ones people forget, and they\'re real journal entries you owe your books, not reconciling notes. Posting them is step 5 below. A reconciliation that "won\'t balance" is very often just an unbooked bank fee.',
      },
      { t: 'h2', text: 'The step-by-step method' },
      {
        t: 'p',
        text: 'Top to bottom. Bank reconciliation is step two of a [month-end close](/notes/tick-and-tie-checklist) for a reason: cash is the account you can prove against an outside document, so you clear it first and build everything else on it.',
      },
      {
        t: 'ol',
        items: [
          'Confirm the opening balance ties. Last month\'s reconciled ending balance equals this month\'s beginning balance, on both the bank and the book side. If the prior reconciliation was wrong, everything this month inherits the error and a clean-looking result proves nothing.',
          'Set the cutoff. Reconcile to the statement\'s closing date, not to "today." Anything dated after the cutoff belongs to next period and is not a discrepancy.',
          'Tick off every deposit. Match each deposit on the statement to a recorded receipt in your books. Receipts on your books with no matching statement line are deposits in transit — list them, do not "fix" them.',
          'Tick off every payment. Match each cleared check and withdrawal to a recorded payment. Recorded payments not yet on the statement are outstanding checks — list them too.',
          'Record the statement-only items. Bank fees, interest, NSF charges, and auto-debits are real entries you have not made yet. Post them to your books now. This is the step that quietly makes most "it won\'t balance" problems disappear.',
          'Compute the two adjusted balances using the formula below.',
          'Confirm they are equal. If adjusted bank equals adjusted book, you are reconciled — the raw difference that remains is just your timing list. If they are not equal, the gap is a real error to find, not a number to journal away.',
          'Keep the reconciliation. Save it with the deposits-in-transit and outstanding-check lists attached; next month\'s opening balance ties back to this one.',
        ],
      },
      {
        t: 'code',
        text: 'Adjusted bank balance = Statement balance + Deposits in transit - Outstanding checks\nAdjusted book balance = Book balance + Interest/credits - Bank fees/NSF/debits\n\nReconciled when:  Adjusted bank balance == Adjusted book balance',
      },
      { t: 'h2', text: 'A worked example: the difference that looks scary and isn\'t' },
      {
        t: 'p',
        text: 'Your general-ledger cash account says 12,400. The statement says 13,950. That\'s 1,550 apart, and the instinct is to panic or to plug it. Don\'t. Walk the two columns instead.',
      },
      {
        t: 'table',
        head: ['Item', 'Amount', 'Effect'],
        rows: [
          ['Statement balance', '13,950', 'Starting point, bank side'],
          ['Deposit in transit (recorded Mar 31, posts Apr 1)', '+2,000', 'Add to bank'],
          ['Outstanding check #1042', '-3,200', 'Subtract from bank'],
          ['Outstanding check #1047', '-400', 'Subtract from bank'],
          ['Adjusted bank balance', '12,350', '13,950 + 2,000 - 3,600'],
          ['Book balance', '12,400', 'Starting point, book side'],
          ['Bank fee on statement, not yet booked', '-50', 'Subtract from books'],
          ['Adjusted book balance', '12,350', '12,400 - 50'],
        ],
      },
      {
        t: 'p',
        text: 'Both adjusted balances land on 12,350, so the account is reconciled. The 1,550 "discrepancy" was four timing items and one unbooked fee — nothing was actually wrong. The raw gap was never the problem; the unexplained part of it was, and there wasn\'t any. Matching the cleared items against your recorded ones is the same [set-difference check](/notes/find-missing-rows-in-excel-countif-match) you\'d run on any two lists, and it lives comfortably in [a spreadsheet](/notes/reconcile-two-files-in-excel-with-xlookup) until the volume outgrows one.',
      },
      { t: 'h2', text: 'The habit that turns 30 minutes into 3 hours' },
      {
        t: 'p',
        text: 'Here\'s the workflow fix the terse answers gesture at. The operator above noted "QB auto-match works maybe 60% of the time," and that number is the tell. When the bank feed is the place your transactions are born, every line arrives uncategorized, and reconciliation becomes data entry and detective work at the same time. You\'re not confirming the month; you\'re building it from the statement, in the worst possible order.',
      },
      {
        t: 'p',
        text: 'Flip it. Record transactions from their source documents when they happen — invoices, bills, customer payments, [processor payouts](/notes/reconcile-shopify-orders-against-your-erp) into a clearing account — so that by the time the feed arrives, the feed only has to confirm what\'s already on your books. Now auto-match is checking your work instead of doing it, the 60% becomes 95%, and the reconciliation is the quick pass it should be. That\'s what "the bank should not be a source of original entry" actually means in practice. It\'s the same discipline as choosing a stable [primary ID](/notes/what-we-mean-when-we-say-primary-id) before you match anything: get the inputs right first, and the comparison gets easy.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A reconciliation forced to balance with an unexplained adjusting entry is worse than one that openly doesn\'t balance. The tempting shortcut on a [messy handover](https://reddit.com/r/Bookkeeping/comments/q1jgjl/bank_reconciliation_nightmare/) — "plugging in an adjustment" to make it tie — just buries the error where the next person won\'t find it. Post journal entries for real statement items like fees and interest. Never journal away a gap you can\'t name.',
      },
      { t: 'h2', text: 'When the monthly bank rec outgrows the checklist' },
      {
        t: 'p',
        text: 'This method is the right tool for one account, or a few, reconciled [by hand](/notes/how-to-reconcile-two-systems-by-hand) each month. It starts to strain when you\'re running many accounts, reconciling daily, or matching bundled processor deposits where a single payout splits across dozens of orders and fees — its own reconciliation, keyed on the payout rather than the order. It also strains when someone else has to trust the result without redoing it, the same way an [inventory subledger has to tie to the GL](/notes/netsuite-reconciliation-inventory-and-gl) at scale. At that point the method doesn\'t change; you just want the timing lists and the match preserved as a repeatable process rather than rebuilt from the feed every month. If you reach for help there, keep the [AI on the setup and explanation and the arithmetic in code](/notes/can-an-ai-agent-reconcile-your-data) — so the reconciling items stay named and the balance stays one you can defend.',
      },
    ],
    faq: [
      {
        q: 'What does it mean for a bank reconciliation to be "done"?',
        a: 'It is done when the gap between your book balance and the bank statement is fully explained by named timing items — deposits in transit and outstanding checks — and you have posted the statement-only items like fees and interest to your books. It does not mean the two balances are literally equal; after adjustments, the adjusted bank balance and adjusted book balance match, and the raw difference that remains is just the timing list.',
      },
      {
        q: 'Why does my book balance not match the bank statement?',
        a: 'Almost always timing. Deposits you recorded have not cleared yet, checks you wrote have not been cashed yet, and fees or interest on the statement have not been entered in your books. These are expected differences, not errors. List the timing items and post the statement-only items, and the adjusted balances will agree.',
      },
      {
        q: 'What is the bank reconciliation formula?',
        a: 'Adjusted bank balance equals the statement balance plus deposits in transit minus outstanding checks. Adjusted book balance equals your book balance plus interest and credits minus bank fees, NSF charges, and missed debits. The account is reconciled when the two adjusted balances are equal.',
      },
      {
        q: 'Why does my bank reconciliation take hours when it should take minutes?',
        a: 'Usually because the bank feed is acting as the source of original entry, so every transaction is categorized and investigated during the reconciliation itself. Record transactions from source documents as they happen, and let the feed only confirm them. Auto-match accuracy climbs and the reconciliation becomes a quick verification pass instead of a rebuild.',
      },
      {
        q: 'Should I post a journal entry to force a reconciliation to balance?',
        a: 'Only for real statement items such as bank fees, interest, or NSF charges. Never post an unexplained plug to make the numbers tie. A forced adjustment hides the underlying error and passes it to whoever reconciles next. If a difference remains after all timing and statement items are accounted for, it is an error to investigate, not to journal away.',
      },
    ],
  },
  {
    slug: 'what-we-mean-when-we-say-primary-id',
    title: 'What a primary ID is, and why every reconciliation depends on it',
    description:
      'A primary ID is the shared key that lets two systems agree they are talking about the same record. How to choose one, and what breaks when you do not.',
    keywords: [
      'primary id',
      'reconciliation key',
      'matching key',
      'join key',
      'record matching',
      'data reconciliation',
    ],
    lead: 'Before you can compare two systems, you have to agree on what counts as the same row. That agreement is the primary ID — the field, or combination of fields, that identifies one record in both systems. Get it right and reconciliation is just arithmetic. Get it wrong and every number downstream is quietly suspect. This is the step people skip, and it\'s the one that bites hardest.',
    blocks: [
      { t: 'h2', text: 'What is a primary ID in reconciliation?' },
      {
        t: 'p',
        text: 'A primary ID is the value you use to match a record in one system against the corresponding record in another. In a sales reconciliation it might be the order number; in inventory it might be SKU plus location; in a [bank reconciliation](https://en.wikipedia.org/wiki/Bank_reconciliation) it might be a transaction reference. The only requirement is that it means the same thing on both sides and points to exactly one record on each.',
      },
      {
        t: 'p',
        text: 'This is different from a [database primary key](https://en.wikipedia.org/wiki/Primary_key). A database primary key is unique within one system. A reconciliation primary ID has to be unique and shared across two systems that were never designed to agree.',
      },
      { t: 'h2', text: 'What makes a good primary ID?' },
      {
        t: 'ul',
        items: [
          'Unique on both sides. One value points to at most one record in each system. If `order_id` appears twice in the export, it is not yet a usable key.',
          'Stable over time. The value does not change after the record is created. Status fields and computed totals make poor keys.',
          'Present in both systems. A perfect key that only one side records cannot match anything.',
          'Same format on both sides, or normalizable to it. `1001`, `#1001`, and `ORD-1001` are the same order to a human and three different keys to a computer.',
        ],
      },
      { t: 'h2', text: 'When one field is not enough: composite keys' },
      {
        t: 'p',
        text: 'Many retail records are only unique in combination. A single SKU is not unique across warehouses; a SKU is unique per location. A line item is unique per order plus line number. When no single field identifies a row, you build a [composite key](https://en.wikipedia.org/wiki/Composite_key) by concatenating fields in a fixed order, for example `sku | location_id`.',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Decide the separator and field order once, and apply it identically on both sides. `sku|loc` and `loc|sku` will never match, even with identical data.',
      },
      { t: 'h2', text: 'What breaks when the primary ID is wrong' },
      {
        t: 'table',
        head: ['Symptom', 'Likely cause'],
        rows: [
          ['Everything shows as a mismatch', 'Key format differs between sides (leading zeros, prefixes, casing)'],
          ['Zero matches on a clean dataset', 'Wrong field chosen, or key missing on one side'],
          ['Duplicate matches, inflated counts', 'Key is not unique; one row matches many'],
          ['Random rows unmatched', 'Whitespace, encoding, or type differences (text 1001 vs number 1001)'],
        ],
      },
      { t: 'h2', text: 'How to validate a primary ID before you trust it' },
      {
        t: 'ol',
        items: [
          'Count rows and count distinct key values on each side. If they differ, the key is not unique there.',
          'Check the overlap: how many keys appear on both sides versus only one.',
          'Normalize formats — trim whitespace, strip prefixes, fix casing and leading zeros — then re-check.',
          'Only then run the comparison.',
        ],
      },
      {
        t: 'p',
        text: 'The discipline is simple: prove the key is unique and shared before you compare a single value. Reconciliation done on a bad key produces confident, wrong answers. Choosing it well is step one of the [manual reconciliation method](/notes/how-to-reconcile-two-systems-by-hand).',
      },
    ],
    faq: [
      {
        q: 'What is the difference between a primary key and a primary ID?',
        a: 'A database primary key guarantees uniqueness inside one system. A reconciliation primary ID is the value you use to match records across two systems. A primary key can serve as a primary ID only if both systems store the same value.',
      },
      {
        q: 'Can a primary ID be more than one field?',
        a: 'Yes. When no single field is unique, you combine fields into a composite key — for example SKU plus location, or order number plus line number — joined in a fixed order with a consistent separator.',
      },
      {
        q: 'Why does my reconciliation show everything as a mismatch?',
        a: 'Most often the key formats differ between systems: leading zeros, prefixes like ORD-, casing, or a text value on one side and a number on the other. Normalize both sides to the same format and re-run before assuming the data itself is wrong.',
      },
    ],
  },
  {
    slug: 'how-to-reconcile-two-systems-by-hand',
    title: 'How to reconcile two systems by hand: a repeatable method',
    description:
      'A step-by-step manual reconciliation method that works for any two data sources — choose a key, normalize, match, classify differences, and keep the evidence.',
    keywords: [
      'manual reconciliation',
      'how to reconcile data',
      'reconciliation process',
      'data matching',
      'reconciliation steps',
      'account reconciliation',
    ],
    lead: 'Reconciliation has a reputation as tedious detective work. The detective part is real; the tedious part is mostly because no one ever showed you the method. There is one — the same method every time, whether you\'re matching orders to payments or inventory to a warehouse feed. Here it is, written so you can run it by hand and always know exactly where you are.',
    blocks: [
      { t: 'h2', text: 'What does it mean to reconcile two systems?' },
      {
        t: 'p',
        text: 'To [reconcile](https://en.wikipedia.org/wiki/Reconciliation_%28accounting%29) is to prove that two independent records of the same thing agree — and, where they do not, to explain why. The output is not just match or no match. It is a classified list: rows that agree, rows that exist on one side only, and rows that exist on both but disagree on a value. Each difference has a reason and a next action.',
      },
      { t: 'h2', text: 'The five steps' },
      { t: 'h3', text: '1. Choose the primary ID' },
      {
        t: 'p',
        text: 'Decide the field, or combination of fields, that identifies the same record on both sides — its [primary ID](/notes/what-we-mean-when-we-say-primary-id). This is the single most important decision; a wrong key makes every later step meaningless.',
      },
      { t: 'h3', text: '2. Normalize both sides' },
      {
        t: 'p',
        text: 'Bring both datasets to the same shape before comparing. Trim whitespace, fix casing, strip prefixes, standardize dates to one format, convert amounts to one unit. Do this to the key first, then to the values you intend to compare.',
      },
      { t: 'h3', text: '3. Match on the key' },
      {
        t: 'p',
        text: 'Join the two sides on the primary ID. Every row now falls into one of three buckets: matched on both sides, present only in A, present only in B. The one-sided rows are your first findings — something was created in one system and never made it to the other.',
      },
      { t: 'h3', text: '4. Compare the matched pairs' },
      {
        t: 'p',
        text: 'For rows that matched, compare the fields that matter — amount, quantity, status, date. Equal values confirm the match. Unequal values are mismatches, and you record both values so the difference is visible, not just flagged.',
      },
      { t: 'h3', text: '5. Classify and decide' },
      {
        t: 'p',
        text: 'Sort every difference by cause and assign an action. The classification is what turns a pile of discrepancies into a closeable list.',
      },
      {
        t: 'table',
        head: ['Category', 'Meaning', 'Typical action'],
        rows: [
          ['Missing in B', 'Exists in A only', 'Investigate why it never synced; create or void'],
          ['Missing in A', 'Exists in B only', 'Same, mirrored'],
          ['Value mismatch', 'Matched but a field differs', 'Correct the wrong side'],
          ['Timing difference', 'Same event, different period', 'Accept; expect it to clear next period'],
          ['Accepted variance', 'Known, tolerated difference', 'Document and move on'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A run that finishes with zero differences is not automatically good news. Check the key first — zero matches and no differences look identical at a glance and mean opposite things.',
      },
      { t: 'h2', text: 'Why keep the evidence?' },
      {
        t: 'p',
        text: 'The valuable artifact of reconciliation is not the final balanced state, it is the trail: which rows matched, which rule classified each difference, and what the two values were. That trail is what lets someone else trust the result without redoing the work — and what lets you answer why three months later.',
      },
      { t: 'h2', text: 'When to stop doing this by hand' },
      {
        t: 'p',
        text: 'The manual method is the right way to learn reconciliation and the right tool for a one-off. It stops scaling when the same comparison runs every week, when datasets grow past what a [spreadsheet](/notes/reconcile-two-files-in-excel-with-xlookup) handles comfortably, or when more than one person needs to trust the result. At that point you want the steps preserved as a repeatable, auditable process rather than a workbook someone rebuilds each month.',
      },
    ],
    faq: [
      {
        q: 'What is the first step in reconciling two data sources?',
        a: 'Choosing the primary ID — the field or fields that identify the same record on both sides. Every later step depends on it, so validate that the key is unique and present on both sides before comparing any values.',
      },
      {
        q: 'What are the three outcomes of matching two datasets?',
        a: 'After joining on the key, every row is either matched on both sides, present only in the first source, or present only in the second. Matched rows are then compared field by field to find value mismatches.',
      },
      {
        q: 'How do you classify reconciliation differences?',
        a: 'Group each difference by cause: missing on one side, value mismatch, timing difference, or accepted variance. Each category maps to a clear next action, which is what makes the result closeable.',
      },
    ],
  },
  {
    slug: 'reconcile-two-files-in-excel-with-xlookup',
    title: 'Reconcile two files in Excel with XLOOKUP (the right way)',
    description:
      'A practical guide to matching two exports in Excel using XLOOKUP and INDEX/MATCH — handling missing rows, value mismatches, and the formatting traps that cause false differences.',
    keywords: [
      'excel reconciliation',
      'xlookup',
      'vlookup reconciliation',
      'compare two excel files',
      'match data excel',
      'excel formulas reconciliation',
    ],
    lead: 'Most reconciliations start in Excel, and XLOOKUP does the heavy lifting. But the formula is the easy part. What actually trips people up is matching cleanly, catching what\'s missing (not just what differs), and not getting fooled by formatting that makes identical numbers look different. That last one has quietly eaten more evenings than any hard formula ever has.',
    blocks: [
      { t: 'h2', text: 'The setup: two sheets, one shared key' },
      {
        t: 'p',
        text: 'Put each export on its own sheet — call them `SystemA` and `SystemB`. Confirm both have a column that identifies the same record: an order number, SKU, or transaction ID. That column is your key. Everything below assumes the key is in column A on each sheet and the value you want to compare (say, an amount) is in column B.',
      },
      { t: 'h2', text: 'Step 1: Does each key exist on the other side?' },
      {
        t: 'p',
        text: 'Before comparing values, find the rows that have no counterpart. [XLOOKUP](https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929) returns its if-not-found argument when there is no match, which is exactly what you want.',
      },
      { t: 'code', text: '=XLOOKUP(A2, SystemB!$A:$A, SystemB!$A:$A, "MISSING")' },
      {
        t: 'p',
        text: 'Drag this down SystemA. Any row showing MISSING exists in A but not in B. Repeat the formula on SystemB pointing at SystemA to catch the rows missing the other way. Those two columns are your one-sided differences — the same set difference you can get with [COUNTIF and MATCH](/notes/find-missing-rows-in-excel-countif-match).',
      },
      { t: 'h2', text: 'Step 2: Where the key matches, do the values agree?' },
      {
        t: 'p',
        text: 'For rows that exist on both sides, pull the other side value and compare. Put this in column C:',
      },
      { t: 'code', text: '=XLOOKUP(A2, SystemB!$A:$A, SystemB!$B:$B, "-")' },
      { t: 'p', text: 'Then in column D, flag the difference:' },
      { t: 'code', text: '=IF(C2="-","no match",IF(ROUND(B2-C2,2)=0,"ok","diff "&TEXT(B2-C2,"0.00")))' },
      {
        t: 'p',
        text: 'Now column D reads ok, no match, or diff 12.50 for every row. Filter to anything that is not ok and you have your working list.',
      },
      { t: 'h2', text: 'The formatting traps that create fake differences' },
      {
        t: 'table',
        head: ['Trap', 'What you see', 'Fix'],
        rows: [
          ['Numbers stored as text', 'Identical values will not match', 'Run the column through `VALUE()`, or multiply by 1'],
          ['Leading zeros lost', '0042 became 42', 'Format key as text before import; compare as text'],
          ['Trailing spaces', '1001 (with space) not equal to 1001', 'Wrap the key in `TRIM()`'],
          ['Hidden prefixes', '#1001 vs 1001', 'Use `SUBSTITUTE()` to remove the prefix on both sides'],
          ['Rounding', '19.999 vs 20.00', 'Compare with `ROUND(...,2)`, never raw'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Build a single clean-key helper column on each sheet — `=TRIM(SUBSTITUTE(A2,"#",""))` — and look up against that, not the raw key. One clean column saves a dozen confused hours.',
      },
      { t: 'h2', text: 'XLOOKUP vs VLOOKUP for reconciliation' },
      {
        t: 'p',
        text: '[VLOOKUP](https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1) still works, but XLOOKUP is better suited to this job: it has a built-in not-found argument (no IFERROR wrapper), it looks left or right without counting columns, and it does not break when someone inserts a column. If you are on an older Excel without XLOOKUP, [INDEX](https://support.microsoft.com/en-us/office/index-function-a5dcf0dd-996d-40a4-a822-b56b061328bd) with [MATCH](https://support.microsoft.com/en-us/office/match-function-e8dffd45-c762-47d6-bf89-533f4a37673a) is the equivalent: `=INDEX(SystemB!$B:$B, MATCH(A2, SystemB!$A:$A, 0))`.',
      },
      { t: 'h2', text: 'Where the spreadsheet method runs out' },
      {
        t: 'p',
        text: 'Formulas reconcile two files just fine. They start to buckle the moment you\'ve got three or more sources, the same comparison every week, a [composite key](/notes/what-we-mean-when-we-say-primary-id), or someone who needs to audit how a number was reached. A workbook saves the answer but not the reasoning — and once other people have to trust that number, the reasoning has to live somewhere more repeatable than a cell formula.',
      },
    ],
    faq: [
      {
        q: 'What is the best Excel function to compare two files?',
        a: 'XLOOKUP is the most reliable for reconciliation because it can return a custom not-found value, look in any direction, and survive inserted columns. INDEX with MATCH is the equivalent on Excel versions without XLOOKUP.',
      },
      {
        q: 'Why do identical-looking values show as different in Excel?',
        a: 'Usually because one is a number and the other is text, or there are trailing spaces, lost leading zeros, or hidden prefixes. Clean the key with TRIM and SUBSTITUTE, convert text-numbers with VALUE, and compare amounts with ROUND.',
      },
      {
        q: 'How do I find rows that exist in one file but not the other?',
        a: 'Use XLOOKUP with a MISSING fallback against the other sheet key column, then run it in both directions. Rows returning MISSING exist on only one side.',
      },
    ],
  },
  {
    slug: 'find-missing-rows-in-excel-countif-match',
    title: 'Finding what is missing: Excel set differences with COUNTIF and MATCH',
    description:
      'How to find rows present in one spreadsheet but not another, and surface mismatches, using COUNTIF, MATCH, and conditional formatting — plus where these formulas quietly fail.',
    keywords: [
      'excel compare two lists',
      'countif missing rows',
      'find differences excel',
      'set difference excel',
      'conditional formatting reconciliation',
      'excel match',
    ],
    lead: '"What\'s in list A but not list B?" is the most common reconciliation question there is — and one spreadsheets actually answer well. The catch: you have to know which formula does what, and where each one quietly lies to you. Here\'s which to reach for, and the trap hiding in each.',
    blocks: [
      { t: 'h2', text: 'The question behind most reconciliations' },
      {
        t: 'p',
        text: 'Reconciliation is, at its core, set arithmetic. You want three sets: rows in both, rows only in A, and rows only in B. Excel can produce all three from a shared key column. The functions to reach for are [COUNTIF](https://support.microsoft.com/en-us/office/countif-function-e0de10c6-f885-4e71-abb4-1f464816df34) and [MATCH](https://support.microsoft.com/en-us/office/match-function-e8dffd45-c762-47d6-bf89-533f4a37673a); conditional formatting makes the result visible.',
      },
      { t: 'h2', text: 'COUNTIF: is this key present over there?' },
      {
        t: 'p',
        text: 'COUNTIF counts how many times a value appears in a range. Zero means absent.',
      },
      { t: 'code', text: '=IF(COUNTIF(SystemB!$A:$A, A2)=0, "only in A", "in both")' },
      {
        t: 'p',
        text: 'Run it down SystemA, then mirror it on SystemB with the ranges swapped. You now have both one-sided sets. COUNTIF is forgiving and readable, which makes it the right default for presence checks.',
      },
      { t: 'h2', text: 'MATCH: where is it, and is it there at all?' },
      {
        t: 'p',
        text: 'MATCH returns the position of a value, or an N/A error if absent. Wrap it to get a clean flag:',
      },
      { t: 'code', text: '=IF(ISNA(MATCH(A2, SystemB!$A:$A, 0)), "missing", "found")' },
      {
        t: 'p',
        text: 'Use MATCH when you will reuse the position (for example to pull a value with [INDEX](https://support.microsoft.com/en-us/office/index-function-a5dcf0dd-996d-40a4-a822-b56b061328bd)). Use COUNTIF when you only care whether it exists — and when you suspect duplicates, because COUNTIF returns a count greater than one where MATCH silently reports only the first hit.',
      },
      { t: 'h2', text: 'See it: conditional formatting for differences' },
      {
        t: 'ol',
        items: [
          'Select the key column on SystemA.',
          'New Rule, then Use a formula, then `=COUNTIF(SystemB!$A:$A, A1)=0`.',
          'Set a fill color. Now every row missing from B is highlighted.',
          'Repeat on SystemB. Two coloured columns, the whole picture at a glance.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'COUNTIF matches on display value and ignores type, so 1001 as a number and 1001 as text can count as equal here but fail an exact value comparison elsewhere. Decide one type for the key and enforce it before you trust any of these results.',
      },
      { t: 'h2', text: 'The duplicate trap' },
      {
        t: 'p',
        text: 'Every formula above assumes the key is unique. If a key repeats, COUNTIF returns 2 or 3, MATCH finds only the first, and any value you pull is the value of whichever row happened to come first. Before comparing, check for duplicates: `=COUNTIF($A:$A, A2)>1` flags them. A repeating key is not a comparison problem, it is a sign the [key is wrong or incomplete](/notes/what-we-mean-when-we-say-primary-id) — often it needs a second field to become unique.',
      },
      { t: 'h2', text: 'Mismatch, not just missing' },
      {
        t: 'p',
        text: 'Presence is half the job; the other half is agreement. For keys found on both sides, compare the value with INDEX and MATCH and a rounded difference, as covered in the [XLOOKUP guide](/notes/reconcile-two-files-in-excel-with-xlookup). The combined output — missing-in-A, missing-in-B, value-mismatch, and matched — is a complete reconciliation, and it is exactly the shape any dedicated tool produces automatically.',
      },
    ],
    faq: [
      {
        q: 'How do I find items in one Excel list but not another?',
        a: 'Add a column with =IF(COUNTIF(OtherSheet!$A:$A, A2)=0,"only here","in both") and run it on both sheets with the ranges swapped. The only-here rows are your set differences.',
      },
      {
        q: 'Should I use COUNTIF or MATCH to compare lists?',
        a: 'Use COUNTIF for a simple presence check and when duplicates may exist, since it counts every occurrence. Use MATCH when you need the row position to pull a value with INDEX. MATCH only reports the first occurrence.',
      },
      {
        q: 'Why are my Excel comparison results wrong?',
        a: 'The usual culprit is a non-unique key (duplicates) or a type mismatch between number and text keys. Check for duplicates with COUNTIF(range, value)>1 and standardize the key type before comparing.',
      },
    ],
  },
  {
    slug: 'can-an-ai-agent-reconcile-your-data',
    title: 'Can an AI agent reconcile your data? What works and what does not',
    description:
      'A grounded look at using AI agents and large language models for data reconciliation — where they genuinely help, where they fail, and how to keep the result trustworthy.',
    keywords: [
      'ai reconciliation',
      'ai agent data',
      'llm reconciliation',
      'automate reconciliation',
      'ai data matching',
      'machine learning reconciliation',
    ],
    lead: '"Can\'t AI just do my reconciliation?" Yes and no — and the people who get burned are the ones who don\'t know which. AI is genuinely great at the judgment parts and genuinely dangerous at the arithmetic. Here\'s exactly where that line sits, so you get the speed without ever trusting a number you can\'t defend.',
    blocks: [
      { t: 'h2', text: 'What AI reconciliation actually means' },
      {
        t: 'p',
        text: 'There are two very different things people mean by AI reconciliation. The first is using a model to help set up and interpret a reconciliation — mapping fields, guessing the key, explaining a difference, drafting a rule. The second is letting a model do the matching and math itself. The first is where todays models shine. The second is where they quietly cause damage.',
      },
      { t: 'h2', text: 'Where AI agents genuinely help' },
      {
        t: 'ul',
        items: [
          'Field mapping. Given two messy exports, a model is good at proposing which column maps to which — that Order # and `order_id` are the same field. You confirm; it saves the tedium.',
          'Key suggestion. A model can spot that SKU alone is not unique and suggest SKU plus location as the [composite key](/notes/what-we-mean-when-we-say-primary-id), then you validate it.',
          'Classifying differences. Sorting a list of discrepancies into timing, fee, and real by their patterns is pattern recognition, which models do well.',
          'Explaining in plain language. Turning row 4471 differs by 12.50 into this order was refunded after settlement — drafting the narrative a human reviews.',
          'Drafting rules. Translating ignore differences under a dollar into a concrete rule you then run deterministically.',
        ],
      },
      { t: 'h2', text: 'Where AI agents fail' },
      {
        t: 'ul',
        items: [
          'Doing the arithmetic. A language model predicts text; it does not compute a reliable sum over ten thousand rows. Matching and totaling must be deterministic code, not model output.',
          'Silent confidence. A model will produce a plausible reconciliation that is wrong, with the same fluent tone as a correct one. There is no I am not sure unless you engineer for it.',
          'Reproducibility. The same prompt can give different answers. A reconciliation has to produce the same result every time it runs on the same data.',
          'Auditability. The AI said so is not evidence. A close needs the row-level trail, which a freeform answer does not provide.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Never let a model be the system that decides whether two numbers are equal. Use it to set up and explain the comparison; run the comparison itself in deterministic code that produces the same answer every time.',
      },
      { t: 'h2', text: 'The pattern that works: AI for setup, code for truth' },
      {
        t: 'p',
        text: 'The reliable division of labor is to let the model do the judgment-heavy, language-heavy work at the edges, and let deterministic logic do the matching and math in the middle. The model proposes the mapping, the key, and the rules; you approve them; an engine applies them identically on every run; the model then helps explain the output. The number is computed by code and is reproducible; the AI made getting there faster without ever being the source of the answer.',
      },
      { t: 'h2', text: 'Questions to ask before trusting an AI reconciliation' },
      {
        t: 'ol',
        items: [
          'Is the matching done by deterministic code or by the model? (It should be code.)',
          'Does the same input always produce the same output?',
          'Can I see the row-level evidence behind every difference?',
          'Did a human approve the key, the mapping, and the rules?',
          'Where the model classified or explained, can I override it?',
        ],
      },
      {
        t: 'p',
        text: 'If the answer to the first two is "the model" and "no," you don\'t have a reconciliation you can defend. You have a confident guess. Keep the AI on setup and explanation, keep the arithmetic in code, and you get both. The [prompt patterns that keep a model in its lane](/notes/prompting-ai-to-help-reconcile-two-files) are the practical version of this.',
      },
    ],
    faq: [
      {
        q: 'Can AI reconcile financial data automatically?',
        a: 'AI helps with the judgment parts — mapping fields, suggesting keys, classifying and explaining differences — but the matching and arithmetic should run as deterministic code. Letting a language model compute the numbers risks confident, unreproducible errors.',
      },
      {
        q: 'Is it safe to use a large language model for reconciliation?',
        a: 'Yes, for setup and explanation, where its language and pattern skills add speed. It is not safe as the thing that decides whether two values are equal, because it can produce plausible wrong answers and different results on re-runs. Keep arithmetic deterministic.',
      },
      {
        q: 'What can AI do better than a human in reconciliation?',
        a: 'Proposing field mappings across messy exports, spotting composite-key candidates, and sorting large lists of differences into likely categories quickly. A human then validates these, which is faster than doing the categorization from scratch.',
      },
    ],
  },
  {
    slug: 'prompting-ai-to-help-reconcile-two-files',
    title: 'Prompting an AI model to help reconcile two files: patterns that work',
    description:
      'Concrete, tool-agnostic prompt patterns for using an AI assistant to map fields, propose keys, classify differences, and explain variance — without letting it do the math.',
    keywords: [
      'ai prompting reconciliation',
      'llm prompt data',
      'reconcile files with ai',
      'prompt patterns data',
      'ai field mapping prompt',
      'ai reconciliation prompt',
    ],
    lead: 'If you\'re going to use an AI assistant for reconciliation, the prompt is where you decide whether it helps or quietly hurts. These are the patterns that keep the model on the work it\'s actually good at — mapping, classifying, explaining — and off the arithmetic it isn\'t. Steal them as-is; they work with any capable model.',
    blocks: [
      { t: 'h2', text: 'The golden rule of reconciliation prompts' },
      {
        t: 'p',
        text: 'Ask the model to reason about structure and language, never to compute the result. Which column maps to which is a good prompt. Reconcile these and tell me the total variance is a bad one — it invites a fluent, unverifiable number. Every pattern below follows from that rule.',
      },
      { t: 'h2', text: 'Pattern 1: Field mapping' },
      {
        t: 'p',
        text: 'Give the model the column headers and a few sample rows from each source, and ask only for the mapping.',
      },
      {
        t: 'code',
        text: 'Here are the headers and 3 sample rows from two exports.\nSOURCE A: order_id, Order Total, Placed On\nSOURCE B: Order #, amount_cents, created_at\nMap each Source A field to its Source B equivalent. For each pair, note\nany format difference (currency units, date format). Do not compute\nanything. List unmapped fields separately.',
      },
      {
        t: 'p',
        text: 'You get a reviewable mapping plus a heads-up that one side is in cents and the other in dollars — which is exactly the kind of trap that causes fake mismatches.',
      },
      { t: 'h2', text: 'Pattern 2: Primary key proposal' },
      {
        t: 'code',
        text: 'These are the columns of a retail inventory export:\nsku, location_id, on_hand, updated_at.\nPropose the minimal set of fields that uniquely identifies a row.\nExplain why a single field is or is not sufficient. Reason from the\nfield meanings; do not assume.',
      },
      {
        t: 'p',
        text: 'The model reasons that sku repeats across locations and proposes sku plus location_id. You still validate by counting distinct keys, but it pointed you at the [composite key](/notes/what-we-mean-when-we-say-primary-id) immediately.',
      },
      { t: 'h2', text: 'Pattern 3: Classifying a list of differences' },
      {
        t: 'p',
        text: 'Once you have computed the differences in code, you can hand the model the list to categorize.',
      },
      {
        t: 'code',
        text: 'Below is a list of reconciliation differences (already computed).\nFor each, classify as: timing, fee/adjustment, value error, or missing\nrecord. Give a one-line reason. Do not change any numbers.\n[paste the computed differences]',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Notice the differences are already computed. The model sorts and explains; it never produces the figures. That single constraint is what keeps the output trustworthy.',
      },
      { t: 'h2', text: 'Pattern 4: Explaining variance to a human' },
      {
        t: 'code',
        text: 'This order reconciles with a 12.50 difference. Context: order placed\nMay 2, refund issued May 9, processor fee 2.9% + 0.30. In two\nsentences, explain the likely cause for a finance reviewer. Flag if\nthe numbers do not support your explanation.',
      },
      {
        t: 'p',
        text: 'This is the model at its best: turning a flagged row into a sentence a reviewer can act on, while being told to flag when the story does not fit the figures.',
      },
      { t: 'h2', text: 'What never to put in a reconciliation prompt' },
      {
        t: 'ul',
        items: [
          'Add these up or what is the total — arithmetic belongs in code.',
          'Decide if these match across a large set — matching belongs in deterministic logic.',
          'Thousands of rows pasted in for the model to process — it will truncate, sample, or hallucinate coverage.',
          'Anything where a wrong, confident answer would be acted on without review.',
        ],
      },
      { t: 'h2', text: 'Putting it together' },
      {
        t: 'p',
        text: 'Used this way, the model is a fast assistant for the setup and the story, and your code or tool is the source of every number. The prompts above are deliberately tool-agnostic — they work with any capable assistant — because the discipline is in what you ask, not which model answers. For where this fits the bigger picture, see [what an AI agent can and cannot reconcile](/notes/can-an-ai-agent-reconcile-your-data).',
      },
    ],
    faq: [
      {
        q: 'How do I prompt an AI to reconcile two files?',
        a: 'Do not ask it to reconcile. Ask it to map fields, propose a primary key, and classify or explain differences you have already computed. Keep the matching and arithmetic in deterministic code, and use the model only for the language and judgment steps.',
      },
      {
        q: 'Why should I not ask an AI to calculate reconciliation totals?',
        a: 'Language models predict text rather than compute, so they can return plausible but wrong totals and different answers on re-runs. Totals and matching must be reproducible, which means they belong in code, not in a model response.',
      },
      {
        q: 'Do these prompt patterns work with any AI assistant?',
        a: 'Yes. The patterns constrain what you ask — mapping, key proposal, classification, explanation — rather than relying on a specific model features, so they transfer across any capable assistant.',
      },
    ],
  },
  {
    slug: 'reconcile-shopify-orders-against-your-erp',
    title: 'Reconciling Shopify orders against your ERP: the fields that drift',
    description:
      'A field-by-field guide to matching Shopify orders with an ERP or accounting system — which identifiers to join on, where totals diverge, and how refunds and payouts complicate it.',
    keywords: [
      'shopify reconciliation',
      'shopify erp',
      'ecommerce order reconciliation',
      'shopify accounting',
      'order to cash shopify',
      'shopify payouts',
    ],
    lead: 'Shopify and your ERP both think they know what an order is worth, and they\'re both right — in their own terms. Which is exactly why the totals almost never match on the first pass. Reconciling them isn\'t hard once you know which identifier to trust and which fields are allowed to disagree. Here\'s both.',
    blocks: [
      { t: 'h2', text: 'Which identifier do you join on?' },
      {
        t: 'p',
        text: 'Shopify exposes several identifiers, and choosing the wrong one is the most common reason a reconciliation falls apart before it starts.',
      },
      {
        t: 'table',
        head: ['Identifier', 'What it is', 'Good key?'],
        rows: [
          ['Order name (#1001)', 'The human-facing number', 'Good, but strip the # and watch prefixes'],
          ['Order ID (numeric)', 'Shopify internal ID', 'Best if your ERP stores it'],
          ['Order number', 'Sequence without prefix', 'Usable; confirm it is unique per store'],
          ['Email / customer', 'Identifies a person, not an order', 'Never — one customer, many orders'],
        ],
      },
      {
        t: 'p',
        text: 'Join on whatever the two systems actually share. If your ERP stored Shopify numeric order ID at import, use it — it never changes and has no formatting. If it only kept the order name, [normalize](/notes/what-we-mean-when-we-say-primary-id) the # and any location prefix on both sides first.',
      },
      { t: 'h2', text: 'Where the totals legitimately diverge' },
      {
        t: 'p',
        text: 'An order total is not one number. Shopify and your [ERP](/notes/netsuite-reconciliation-inventory-and-gl) may each book a different slice, and the differences below are expected, not errors — but only if you account for them explicitly.',
      },
      {
        t: 'ul',
        items: [
          'Taxes. Whether tax is inside or outside the total depends on configuration on both sides.',
          'Shipping. Sometimes a separate line, sometimes folded into the total.',
          'Discounts. Order-level versus line-level discounts can net differently.',
          'Currency rounding. Multi-currency orders round at different points.',
          'Gift cards and store credit. May reduce the Shopify total but appear differently in the ERP.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'Reconcile the components, not just the grand total. Two orders can have matching totals with offsetting errors in tax and shipping — and a matching grand total with wrong parts is a false pass.',
      },
      { t: 'h2', text: 'Refunds, edits, and partial fulfillment' },
      {
        t: 'p',
        text: 'A Shopify order is mutable after creation. It can be edited, partially refunded, partially fulfilled, and refunded again. Each event may or may not flow to the ERP, and on its own schedule. A reconciliation that only looks at order creation will see a clean match and miss that the order was half-refunded yesterday. Compare the current state of both sides, including refund and edit history, not the order as first placed.',
      },
      { t: 'h2', text: 'Payouts are a separate reconciliation' },
      {
        t: 'p',
        text: 'Shopify Payments, or any processor, settles orders into deposits, batched and net of fees — the three-way problem in a retail wrapper. Matching orders to your ERP is one reconciliation; matching [Shopify payouts](https://help.shopify.com/en/manual/payments/shopify-payments/payouts) to your bank is another, with its own key (the payout ID) and its own aggregation. Keep them separate; conflating order totals with deposit amounts is how teams chase a discrepancy that is just the processor fee.',
      },
      { t: 'h2', text: 'A working sequence' },
      {
        t: 'ol',
        items: [
          'Pick the shared order identifier and normalize it on both sides.',
          'Match orders; resolve one-sided orders first (in Shopify but not ERP, and the reverse).',
          'Compare components — subtotal, tax, shipping, discount — not just the total.',
          'Pull in refunds and edits; compare current state, not creation state.',
          'Reconcile payouts to the bank as a separate, batch-level pass.',
        ],
      },
      {
        t: 'p',
        text: 'Run in that order, the Shopify-to-ERP gap resolves into a small set of real differences, and the payout timing noise stays in its own lane where it belongs.',
      },
    ],
    faq: [
      {
        q: 'What field should I use to match Shopify orders to my ERP?',
        a: 'Use whatever both systems store and that uniquely identifies an order — ideally Shopify numeric order ID if your ERP captured it, since it never changes and has no formatting. If only the order name (#1001) is shared, strip the # and any prefix on both sides before matching.',
      },
      {
        q: 'Why do Shopify order totals not match my accounting system?',
        a: 'Because the total is composed of subtotal, tax, shipping, and discounts, and the two systems may book these differently, plus refunds and edits change the order after creation. Reconcile the components and the current state, not just the grand total at order time.',
      },
      {
        q: 'Are Shopify payouts the same as order totals?',
        a: 'No. Payouts are batches of orders settled together, net of processor fees and often on a later date. Reconcile payouts to your bank as a separate pass keyed on the payout ID; do not expect a payout to equal a single order total.',
      },
    ],
  },
  {
    slug: 'netsuite-reconciliation-inventory-and-gl',
    title: 'NetSuite reconciliation: where inventory and the general ledger disagree',
    description:
      'How to reconcile NetSuite against external systems and against itself — matching item records and locations, and tracking down why the inventory subledger and the GL drift apart.',
    keywords: [
      'netsuite reconciliation',
      'netsuite inventory',
      'subledger gl reconciliation',
      'netsuite accounting',
      'inventory valuation',
      'erp reconciliation',
    ],
    lead: 'NetSuite reconciliations come in two flavors: NetSuite against an outside system, and NetSuite against itself — when the inventory subledger and the general ledger quietly stop agreeing. The second one is what costs accountants their evenings. The good news: it has a short list of usual suspects, and once you know them, it stops being a mystery.',
    blocks: [
      { t: 'h2', text: 'The two reconciliations people call NetSuite reconciliation' },
      {
        t: 'p',
        text: 'The first is external: matching NetSuite records against a [storefront](/notes/reconcile-shopify-orders-against-your-erp), a 3PL feed, a bank, or another ERP. That is ordinary [two-system reconciliation](/notes/how-to-reconcile-two-systems-by-hand) — pick a [shared key](/notes/what-we-mean-when-we-say-primary-id), normalize, compare. The second is internal: confirming that NetSuite inventory subledger (what the item records say you hold and what it is worth) ties to the [general ledger](https://en.wikipedia.org/wiki/General_ledger) (what the inventory asset account says). When those drift, the books are wrong even though every individual transaction looks fine.',
      },
      { t: 'h2', text: 'Matching item records across systems' },
      {
        t: 'p',
        text: 'For external reconciliations, the key is usually the item identifier, and NetSuite gives you several.',
      },
      {
        t: 'table',
        head: ['Identifier', 'Notes'],
        rows: [
          ['Internal ID', 'NetSuite own record ID — stable, but rarely stored by other systems'],
          ['Item name/number', 'Human key; watch for hierarchy (Parent : Child) in assembly items'],
          ['UPC / SKU', 'Often the real shared key with storefronts and 3PLs'],
          ['Location', 'Inventory is per location — almost always part of a [composite key](/notes/what-we-mean-when-we-say-primary-id)'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'NetSuite item names can carry the full hierarchy with a colon separator (Apparel : Shirts : SKU123). Decide whether your other system stores the leaf or the full path, and normalize before matching.',
      },
      { t: 'h2', text: 'Why the subledger and GL drift apart' },
      {
        t: 'p',
        text: 'When NetSuite inventory valuation report does not match the inventory asset account in the GL, the cause is almost always one of a short list.',
      },
      {
        t: 'ul',
        items: [
          'Direct journal entries to the inventory GL account that bypass the item subledger. The GL moved; the items did not.',
          'Transactions posted to the wrong period, so the two reports are effectively as-of different dates.',
          'Inventory adjustments or transfers mid-process — counted on one side, not yet posted on the other.',
          'Costing timing — average-cost recalculations that have not fully propagated.',
          'Items set to the wrong asset account, quietly splitting the balance.',
        ],
      },
      { t: 'h2', text: 'How to track down the gap' },
      {
        t: 'ol',
        items: [
          'Run the inventory valuation report and the GL inventory balance as of the exact same date and time. A date mismatch alone explains most apparent gaps.',
          'Compare totals by location and by item category to localize where the drift lives.',
          'In the suspect slice, list GL transactions against that account and flag any without a corresponding inventory transaction — those are the bypassing journal entries.',
          'Check for transactions dated in the period but entered after the cutoff.',
        ],
      },
      {
        t: 'p',
        text: 'The discipline is the same as any reconciliation: same as-of moment on both sides, then narrow by dimension until the difference is a handful of rows you can name. The subledger does not match the GL almost always resolves to a few manual journal entries and a couple of mis-dated transactions.',
      },
      { t: 'h2', text: 'Keep external and internal reconciliations separate' },
      {
        t: 'p',
        text: 'It is tempting to chase a storefront mismatch and a subledger-to-GL gap in the same pass. Do not. They have different keys, different sources of truth, and different fixes. Reconcile NetSuite to the outside world on the item-and-location key; reconcile NetSuite to itself on the as-of-date discipline. Mixing them turns two tractable problems into one intractable one.',
      },
    ],
    faq: [
      {
        q: 'Why does my NetSuite inventory not match the general ledger?',
        a: 'Usually because of direct journal entries to the inventory asset account that bypass the item subledger, transactions posted to the wrong period, or the two reports being run as of different dates. Run both as of the same moment, then narrow by location and item to find the bypassing entries.',
      },
      {
        q: 'What is the best key to reconcile NetSuite items with another system?',
        a: 'The identifier both systems share — often UPC or SKU — combined with location, since inventory is tracked per location. NetSuite internal ID is the most stable key but only works if the other system stored it.',
      },
      {
        q: 'What is the difference between subledger and GL reconciliation in NetSuite?',
        a: 'The subledger is the detailed inventory record from item transactions; the GL is the summarized inventory asset balance. Reconciling them confirms the detail ties to the summary. They drift when entries hit one but not the other, or when periods and dates do not line up.',
      },
    ],
  },
  {
    slug: 'reconcile-your-oms-against-the-source-of-truth',
    title: 'OMS reconciliation: matching order management against the source of truth',
    description:
      'How to reconcile an order management system against the storefront, the ERP, and the warehouse — keeping fulfillment, inventory, and financial truth aligned across an omnichannel operation.',
    keywords: [
      'oms reconciliation',
      'order management system',
      'omnichannel inventory',
      'fulfillment reconciliation',
      'order routing reconciliation',
      'available to promise',
    ],
    lead: 'Your order management system sits in the middle of everything — between the [storefront](/notes/reconcile-shopify-orders-against-your-erp) that takes the order, the warehouses that fill it, and the ERP that books it. That middle seat is exactly why the OMS is where reconciliation breaks: it\'s the one system that has to agree with three others at once. It\'s also the best place to catch a problem before it ships.',
    blocks: [
      { t: 'h2', text: 'What an OMS has to stay reconciled with' },
      {
        t: 'p',
        text: 'An [order management system](https://en.wikipedia.org/wiki/Order_Management_System) ingests orders from sales channels, decides where to fulfill them, tracks inventory across locations, and hands financial outcomes to the ERP. Each of those touch points is a reconciliation surface: orders in versus the channel, inventory versus the warehouses, fulfillments versus what shipped, and financial records versus the ERP. The OMS is correct only when all four agree.',
      },
      {
        t: 'table',
        head: ['Boundary', 'Compare', 'Key'],
        rows: [
          ['Channel to OMS', 'Orders captured vs orders placed', 'Channel order ID'],
          ['OMS to warehouse/3PL', 'Allocations vs actual fulfillments', 'Order + line + location'],
          ['OMS inventory to feeds', 'On-hand vs warehouse counts', 'SKU + facility'],
          ['OMS to ERP', 'Sales/returns vs booked financials', 'Order ID / invoice ID'],
        ],
      },
      { t: 'h2', text: 'Order intake: did every order arrive?' },
      {
        t: 'p',
        text: 'The first reconciliation is the simplest and the most important: every order placed on a channel should appear in the OMS, once. Join channel orders to OMS orders on the channel order ID. One-sided differences mean an order failed to import (revenue at risk) or was duplicated (oversell and double-ship risk). Run this frequently; an order missing from the OMS is invisible to fulfillment until someone complains.',
      },
      { t: 'h2', text: 'Inventory: the hardest one to keep honest' },
      {
        t: 'p',
        text: 'An OMS maintains a view of available-to-promise inventory aggregated across facilities, while each warehouse or 3PL holds the physical truth. These drift constantly — every sale, receipt, adjustment, and transfer is a chance for the OMS view and a facility feed to disagree. Reconcile on SKU plus facility, because an aggregate match can hide offsetting errors: the OMS total looks right while two locations are individually wrong in opposite directions.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Never reconcile omnichannel inventory on SKU alone. The OMS job is knowing where stock is, so a per-facility comparison is the only one that catches the errors that cause mis-routed and cancelled orders.',
      },
      { t: 'h2', text: 'Fulfillment: allocated is not shipped' },
      {
        t: 'p',
        text: 'The OMS decides which location should fill each line; the location then does, or does not, exactly that. Reconciling allocations against actual fulfillments — on order, line, and location — surfaces split shipments that were not recorded, reassignments the OMS did not hear about, and lines marked fulfilled that never shipped. This boundary is where customer-facing failures hide, because the OMS can believe an order is complete while a line sits unshipped.',
      },
      { t: 'h2', text: 'Financial handoff: orders to the ERP' },
      {
        t: 'p',
        text: 'Finally, what the OMS recorded as sold, shipped, and returned must match what the [ERP booked](/notes/netsuite-reconciliation-inventory-and-gl). This is the order-to-cash boundary again, keyed on order or invoice ID, and it is where returns are most likely to fall through — a return processed in the OMS but never credited in the ERP, or the reverse. Reconcile current state including returns, not just original orders.',
      },
      { t: 'h2', text: 'Why the OMS is the reconciliation hub' },
      {
        t: 'p',
        text: 'Because the OMS touches the channel, the warehouse, and the ERP, it is both where discrepancies surface and where they are cheapest to catch — before a mis-routed order ships, before an oversell becomes a cancellation, before a return goes uncredited. Reconciling the OMS against its three neighbors, each on its proper [composite key](/notes/what-we-mean-when-we-say-primary-id), is what keeps an omnichannel operation honest in the one system positioned to see all of it.',
      },
    ],
    faq: [
      {
        q: 'What does an order management system need to be reconciled against?',
        a: 'Four boundaries: the sales channels (every order imported once), the warehouses or 3PLs (inventory and fulfillments), the physical inventory feeds (on-hand per facility), and the ERP (financial records). The OMS is correct only when it agrees with all of them.',
      },
      {
        q: 'Why reconcile omnichannel inventory per facility instead of per SKU?',
        a: 'Because an OMS purpose is knowing where stock is. A SKU-level total can match while individual locations are wrong in offsetting directions, which still causes mis-routed and cancelled orders. Reconciling on SKU plus facility catches those.',
      },
      {
        q: 'Where do OMS reconciliations most often fail?',
        a: 'At fulfillment (the OMS believes a line shipped when it did not, or missed a split shipment) and at the ERP handoff for returns (processed on one side, never credited on the other). Both require comparing current state, including returns, not the order as first placed.',
      },
    ],
  },
]

const bySlug: Record<string, Article> = Object.fromEntries(
  articles.map((a) => [a.slug, a]),
)

export function getArticle(slug: string): Article | undefined {
  return bySlug[slug]
}

export { articles }
