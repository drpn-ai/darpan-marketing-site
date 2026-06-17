# Reddit Reply Playbook

How we show up in the threads our corpus already tracks. The goal is simple and
it is not traffic: **be the most genuinely helpful comment in the thread.** A
link is a rare exception, never the point. If a reply only makes sense because
it ends in a link, it's the wrong reply.

This is the discipline the daily publisher follows when it stages reply drafts,
and the rules a human follows before pasting anything into Reddit. Nothing here
auto-posts — every draft is staged for manual review and posting.

---

## The one rule that matters

**Write the reply as if you were never allowed to link anything.** Deliver the
whole answer in the comment. Then, and only then, ask whether a link would add
something the comment couldn't. Almost always the answer is no, and that's fine.

A redditor who actually knows the subject and helps for free is worth more to us
over a year than a hundred dropped links — because that's the reputation that
makes the occasional link land instead of getting flagged.

---

## Help-only vs. help-plus-link: the decision

Default is **help-only, no link.** A link is allowed only when *every* box below
is checked. Miss one — no link.

- [ ] **Big, high-intent question.** Substantial thread (real engagement / many comments), a specific question many people search — not a quick one-off.
- [ ] **Near-exact match.** A published article answers *this* question almost precisely — not "adjacent," not "related background."
- [ ] **The comment already stands alone.** Remove the link and the reply is still a complete, useful answer. The link is "fuller write-up if useful," never "the answer is over there."
- [ ] **Cadence is clean.** We have NOT linked this article (or any of our links) in this subreddit recently. Space links out across days and across subs — never the same URL twice in one sub in a short window, never more than one of our links live in a sub at a time.
- [ ] **The sub allows it.** The subreddit doesn't ban links / self-promotion in comments. Check the sub rules first.

If all five hold: add **one** link, at the end, with a light disclosure (below).
If you're on the fence, don't link. Helpful-with-no-link is never the wrong call.

### Sizing the reply to the question

| Question size | Reply shape | Link? |
|---|---|---|
| Quick / narrow ("how do I enter X in QBO?") | 2–4 sentences, direct, just solve it | Never |
| Medium ("why don't my payouts match?") | A short walk-through: name the cause, give the steps | Almost never |
| Big / weakly-answered, exact-match article exists | Full answer in-comment, then optionally one link as "more detail" | Only if all 5 boxes check |

---

## Disclosure (required whenever we link)

When the link points to our own site, say so plainly. Reddit communities forgive
self-promotion that's disclosed and genuinely useful; they punish the kind that
pretends to be a neutral stranger. One honest clause is enough:

> "...full write-up here if it helps — fair warning, it's on the site of the tool I work on, but it's tool-agnostic and there's nothing to buy: [link]"

Keep it casual and true. Never imply you're an unaffiliated bystander. Never
link a page that's a pitch — only the teaching articles.

---

## Voice on Reddit (dialed from "Not a Big Deal")

Same spine as `VOICE_GUIDE.md`, dialed further toward a real person typing fast
in a comment box. Read the guide each run; then:

- **Sound like a redditor, not a brand.** Lowercase is fine. Contractions, sentence fragments, a dry aside — all fine. No "Great question!", no "I hope this helps!", no bullet-point brochure, no em-dash-heavy polish that reads like marketing.
- **Match the thread.** Mirror the OP's terms and the sub's register (r/Accounting talks differently than r/smallbusiness). Answer the actual question asked, not the one we wish they asked.
- **Lead with the useful part.** First sentence solves something. No throat-clearing.
- **Earn trust with specifics.** A concrete number, the actual order of steps, the real gotcha. That's what reads as "this person has done this," which is the whole game.
- **No buzzwords, no fake cheer, no selling.** If a sentence could come from a vendor's landing page, delete it.
- **Never paste the same comment twice.** Reddit flags duplicate text. Every reply is written fresh for that thread.

---

## What never to do

- Don't auto-post. Drafts are staged; a human posts.
- Don't link a page with a CTA / pricing — teaching articles only.
- Don't link the same article repeatedly, or more than one of our links per sub at a time.
- Don't post a reply whose only purpose is the link.
- Don't invent experience, numbers, or quotes. If we don't know, we don't answer.
- Don't comment in a sub whose rules forbid it.
- Don't argue or get defensive if someone calls the link out — thank them, leave the help, drop the link.

---

## Picking threads to draft for (daily)

From the same corpus the article run uses (`research/data/recon_questions.md`,
`recon_reddit_digest.md`), prefer threads that are:

1. **Genuinely unanswered or weakly answered** — where a good comment actually helps someone, and isn't piling onto a solved thread.
2. **On-topic for our knowledge** — reconciliation, month-end, payouts, inventory/data sync, the things our articles cover.
3. **A spread of subs** — don't stack all drafts in one subreddit.

Most drafts will be help-only. A link draft should be the exception, not one per
run.

---

## Draft format (what the daily task stages)

Staged to `docs/marketing-daily/reddit-replies/<YYYY-MM-DD>.md`, one block per
thread:

```
### <thread title>
- URL: <thread url from corpus>
- Sub: r/<sub> · size signal: <comments / pain score from corpus>
- Decision: help-only  |  help + link
- (if link) Article: /writing/<slug> · why it's an exact match: <one line> · last link to r/<sub>: <date or "none on record">

REPLY DRAFT:
<the comment, written fresh, Reddit-native, complete without the link>
```

Public article URL form for manual posting: `https://drpn.ai/writing/<slug>`
(confirm the live domain before posting). The reply text in the draft uses that
full URL only when the decision is help+link; help-only drafts contain no URL.

---

## The honest caveat

Reddit is not a distribution channel we control, and treating it like one is how
accounts die. This works only as long as the comments are real help first. The
day a thread would be better served by a comment that *doesn't* mention us, that's
the comment we write.
