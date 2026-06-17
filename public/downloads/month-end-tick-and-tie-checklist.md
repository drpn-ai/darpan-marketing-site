# Month-End Tick-and-Tie Checklist

A tool-agnostic order of operations for closing a set of books. Work top to
bottom — each step assumes the one above it is already true. "Tick" = mark an
item once you've verified it. "Tie" = trace that figure to the document that
proves it.

Print it, or copy it into your close tracker. Delete the notes column and add
your own accounts.

---

## 0. Before you start — confirm the opening balance

- [ ] Prior period is closed and was reconciled (don't build on an unverified opening balance).
- [ ] Beginning balances in the ledger match last period's ending balances.
- [ ] Period cutoff is set: you know exactly which dates this close covers.

## 1. Cash and bank (do this first — errors here are loudest)

- [ ] Every bank account reconciled to its statement, ending balance ties.
- [ ] Every credit card reconciled to its statement.
- [ ] Outstanding/uncleared items listed and explained (in transit, not lost).
- [ ] Bank fees and interest posted.

## 2. Clearing and undeposited-funds accounts (should net to ~zero)

- [ ] Undeposited funds / payments-in-transit cleared to deposits.
- [ ] Payout/settlement clearing accounts (Shopify, Stripe, marketplaces) cleared.
- [ ] Any balance left in a clearing account is identified, not ignored.

## 3. Subledgers tie to the general ledger

- [ ] AR aging total = AR control account in the GL.
- [ ] AP aging total = AP control account in the GL.
- [ ] Inventory valuation = inventory asset account in the GL.
- [ ] Payroll liabilities tie to the payroll provider.

## 4. Remaining balance-sheet accounts

- [ ] Prepaids, accruals, fixed assets / depreciation, loans, taxes — each ties to a schedule or statement.
- [ ] No "miscellaneous" or "ask my accountant" account left with a balance you can't explain.

## 5. Adjusting entries (only after the above are stable)

- [ ] Accruals and deferrals posted to put revenue/expense in the right month.
- [ ] Adjustments refine the close — they don't paper over an unreconciled account.

## 6. Tie out the financials

- [ ] Trial balance: debits = credits.
- [ ] Retained earnings rolls forward correctly from last period + this period's net income.
- [ ] P&L flux reviewed — any month-over-month swing you can't explain gets chased now, not later.

## 7. Keep the evidence

- [ ] Each reconciliation saved with its supporting document attached.
- [ ] Open items have an owner and an expected clear date.
- [ ] Anyone could re-trace this close without redoing it.

---

Backed by real operator threads on r/Bookkeeping ("What order do you do a QBO
cleanup in?" and "Think I'm finally understanding how to do this") — where the
recurring lesson is that sequence matters more than almost anything else.
Tool-agnostic and free to reuse.
