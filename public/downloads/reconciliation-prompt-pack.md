# Reconciliation Prompt Pack

The directions an AI assistant actually needs to help you reconcile two files —
copy-paste, in order, tool-agnostic. Works with any capable assistant that can
write and run code (a code interpreter / data-analysis tool). The discipline is
in what you ask, not which model answers.

## The one rule

The model may parse the files, propose the join key, write the matching code,
run it, and explain the result. It must **never** be the thing that decides
whether two numbers are equal. Code does the matching and the math; the model
does the language and the judgment around it.

Confirm the output between each step before you paste the next prompt. Replace
`system_a.csv`, `system_b.csv`, and `order_id` with your real filenames and key.

---

## Prompt 0 — standing instructions (paste once, at the top)

```
You are helping me reconcile two data files. Follow these rules for the whole
session:
- Never state a total, count, or difference unless it was printed by code you
  just ran. If you didn't run code for a number, don't give the number.
- Read all ID/key columns as text. Never let an ID become a float.
- Do the matching and arithmetic in code (Python/pandas). Use prose only to
  explain what the code printed.
- When unsure, stop and ask. Do not guess a key, a mapping, or a number.
```

## Prompt 1 — census the files before matching anything

```
Here are two files: system_a.csv and system_b.csv.
Do NOT reconcile them yet. First, for each file, run code that prints:
- the column names
- the row count
- 3 sample rows
Then list, side by side, which column in A looks like it maps to which column
in B. Flag any format differences (currency units, date formats, casing).
Do not compute differences yet.
```

## Prompt 2 — propose the join key (and justify it)

```
Propose the minimal set of columns that uniquely identifies a row in each file.
Explain why a single column is or isn't enough. If no single column is unique,
propose a composite key. Then run code that counts distinct keys vs. total rows
in each file and prints whether the proposed key is actually unique. Reason from
the column meanings; do not assume.
```

## Prompt 3 — write the merge as code I can read

```
Write Python (pandas) that:
- reads both files with every ID column as text (dtype=str)
- does an OUTER merge on <KEY>, with indicator=True and validate="one_to_one"
- prints the count of left_only, right_only, and both
Show me the code first. Don't run it until I say go.
```

## Prompt 4 — show only the real differences

```
Go. After the merge, for rows present in BOTH files, compute the difference in
the <AMOUNT> column in code. Print ONLY the rows where the difference is nonzero,
sorted largest-first. Do not summarize the numbers in prose. Also print the full
left_only and right_only rows — those are the missing records, not noise.
```

## Prompt 5 — classify the differences (model earns its keep)

```
Here is the list of nonzero differences you just printed. Do NOT change any
numbers. For each row, classify the likely cause as one of: timing,
fee/adjustment, value error, or missing record. Give a one-line reason per row
based on the columns available. Flag any you can't classify with confidence.
```

## Prompt 6 — explain one exception to a human

```
Take row <KEY=...>. Context: <e.g. order placed May 2, refund issued May 9,
processor fee 2.9% + 0.30>. In two sentences, explain the most likely cause of
the difference for a finance reviewer. If the numbers don't support your
explanation, say so instead of forcing one.
```

## Prompt 7 — verification you run yourself

```
Print three things so I can check your work:
- the row census again (left_only + right_only + both = total)
- the sum of <AMOUNT> in each original file, before the merge
- 3 specific rows traced end to end, including one that should NOT match
```
Compare the two file totals to a number you already trust (a gross sales figure,
a known deposit, last month's balance). If the totals don't tie, stop — the
merge dropped or doubled something.

---

## What the pack does NOT do

It doesn't make the model trustworthy at arithmetic — it routes every number
through code so you never have to trust it. It doesn't replace a repeatable
system once the same reconciliation runs every week. And it can't reconcile data
you don't have: if a platform nets fees or holds a reserve, you still need the
settlement report.

Backed by real operator threads — r/FPandA ("AI solutions require very clear
directions") and r/BusinessIntelligence (agentic accuracy drifts without
maintained instructions). Tool-agnostic and free to reuse. Nothing to buy.
