import { createFileRoute } from '@tanstack/react-router'
import { PageClose } from '@/components/PageClose'
import { VlPage } from '@/components/VlChrome'
import { WALKTHROUGH_HREF, pageHead } from '@/data/site'
import { useReveal } from '@/components/useReveal'
import { BrainNet } from '@/components/agent/BrainNet'
import { AssistantBubbles } from '@/components/agent/AssistantBubbles'
import {
  AgentChat,
  CallsScene,
  TeachScene,
} from '@/components/agent/AgentScenes'

// The agent and the brain behind it. The brain is the conclusion graph
// (DAR-BE-151): one picture per order across every system, reads planned from
// the rules, causes written once, questions asked only when they can change a
// cause. Parts are live (the shared order read and lookup cache, the in-app
// agent, the CLI); the rest is direction. Every claim is in the Facts register.
export const Route = createFileRoute('/agent')({
  component: AgentPage,
  head: () =>
    pageHead(
      '/agent',
      'The agent — Darpan',
      'Darpan’s agent turns how your team describes the work into checks, explains every break, and learns from your team. Behind it is one brain that reads each system once and asks a question only when the answer matters.',
    ),
})

const layers = [
  {
    n: '1',
    k: 'read per system',
    p: 'Each day the brain plans one pass per kind of record, carrying every field any check needs.',
  },
  {
    n: '1',
    k: 'picture per order',
    p: 'An order, its lines, payments, shipments and returns become one picture, however many systems describe them.',
  },
  {
    n: '1',
    k: 'cause, applied everywhere',
    p: 'A cause like “waiting on its original order” lives on the order, so every check reaches the same answer.',
  },
  {
    n: '0',
    k: 'questions asked twice',
    p: 'A slower lookup runs only when its answer could change the conclusion, once per order, for every check.',
  },
] as const

function AgentPage() {
  useReveal()
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="agent-heading">
        <div className="vl-wrap vl-split vl-agent-hero">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker">The agent</span>
            <h1 className="vl-h2" id="agent-heading">
              One brain. Every order. Every system. Every day.
            </h1>
            <p className="vl-lede">
              Behind Darpan’s agent is a brain that holds your whole business in
              one picture: every order, with everything every system knows about
              it. It writes your checks from plain words, explains each break
              before anyone asks, and learns every cause your team teaches it,
              once and for good.
            </p>
            <div className="vl-hero-cta">
              <a className="vl-cta" href={WALKTHROUGH_HREF}>
                Talk to us <span className="arr">&rarr;</span>
              </a>
              <a className="vl-textlink" href="/tour">
                Watch the agent in the tour <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>
          <div className="vl-split-visual">
            <BrainNet />
          </div>
        </div>
      </section>

      <section className="vl-band" aria-labelledby="agent-tell-heading">
        <div className="vl-wrap vl-split is-flip">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">Writes the checks</span>
            <h2 className="vl-h2" id="agent-tell-heading">
              Say it the way you’d say it out loud.
            </h2>
            <p className="vl-lede">
              Describe how the work should go, in your own words. The agent
              turns it into checks your team reads and approves, including the
              rules nobody ever wrote down.
            </p>
            <p className="vl-lede">
              Nothing runs until your team approves it. And when a rule changes,
              you change the sentence, not the code.
            </p>
          </div>
          <div className="vl-split-visual">
            <AgentChat />
          </div>
        </div>
      </section>

      <section className="vl-band" aria-labelledby="agent-brain-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">The brain behind it</span>
            <h2 className="vl-h2" id="agent-brain-heading">
              Every rule knows what every other rule has seen.
            </h2>
            <p className="vl-lede">
              Most tools give every check its own copy of the data and its own
              guess at what went wrong. Darpan’s brain keeps one of each, so the
              whole morning’s work happens once, together, and nothing is left
              to chance.
            </p>
          </div>
          <div className="vl-caps is-four vl-brain-layers">
            {layers.map((x) => (
              <div className="vl-cap" key={x.k} data-reveal>
                <span className="vl-brain-num">{x.n}</span>
                <div className="k">{x.k}</div>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vl-band" aria-labelledby="agent-learn-heading">
        <div className="vl-wrap vl-split">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">Learns from your team</span>
            <h2 className="vl-h2" id="agent-learn-heading">
              Explain a break once. It remembers for good.
            </h2>
            <p className="vl-lede">
              Most tools flag the same kind of break every day and leave
              someone to work out why, again. The answer lives in one person’s
              head, and when they’re away, the team starts from zero.
            </p>
            <p className="vl-lede">
              With Darpan, the agent asks. The first time someone explains a
              break, it turns that answer into a cause, finds every other order
              that looks the same, explains them all that morning, and keeps
              doing it every day after.
            </p>
            <p className="vl-lede">
              Each explanation makes the brain a little sharper, so fewer breaks
              ever need a person to work them out.
            </p>
          </div>
          <div className="vl-split-visual">
            <TeachScene />
          </div>
        </div>
      </section>

      <section className="vl-band" aria-labelledby="agent-fast-heading">
        <div className="vl-wrap vl-split is-flip">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">Why it’s fast</span>
            <h2 className="vl-h2" id="agent-fast-heading">
              Others check one rule at a time. Darpan checks them all at once.
            </h2>
            <p className="vl-lede">
              Scripts, saved reports and monitoring tools run each check on its
              own, so they ask your systems the same questions again and again.
              Checked rule by rule, one brand’s morning came to about 1,500
              repeat questions. Darpan’s brain asks each one once and shares the
              answer with every check. Fewer questions means the morning run
              finishes sooner and puts less load on your systems, so every break
              is found, explained and assigned before your team starts the day.
            </p>
          </div>
          <div className="vl-split-visual">
            <CallsScene />
          </div>
        </div>
      </section>

      <section className="vl-band" aria-labelledby="agent-where-heading">
        <div className="vl-wrap vl-split">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">Works where you do</span>
            <h2 className="vl-h2" id="agent-where-heading">
              In Darpan, or in the assistant you already use.
            </h2>
            <p className="vl-lede">
              Ask about any break from Claude, ChatGPT or Gemini and get the
              same answer the agent would give, as you and within your
              permissions.
            </p>
            <a className="vl-textlink vl-ai-link" href="/works-with">
              See how it connects <span aria-hidden>&rarr;</span>
            </a>
          </div>
          <div className="vl-split-visual">
            <AssistantBubbles />
          </div>
        </div>
      </section>

      <PageClose
        title="Teach it once, and wake up to answers every day."
        link={{ href: '/tour', label: 'Watch the three-minute tour' }}
      />
    </VlPage>
  )
}
