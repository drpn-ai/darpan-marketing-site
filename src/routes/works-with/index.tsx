import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { AI_CLIENTS, SYSTEM_GROUPS } from '@/data/works-with'
import { WALKTHROUGH_HREF, pageHead } from '@/data/site'

export const Route = createFileRoute('/works-with/')({
  component: WorksWithPage,
  head: () =>
    pageHead(
      '/works-with',
      'Integrations — Darpan',
      'Darpan reads the storefront, order system, ERP and databases you already run, and works with Claude, ChatGPT, Gemini and any AI assistant that speaks MCP.',
    ),
})

function WorksWithPage() {
  return (
    <VlPage>
      <section
        className="vl-band is-plain"
        aria-labelledby="works-with-heading"
      >
        <div className="vl-wrap">
          <div className="vl-sec-head">
            <span className="vl-kicker">Integrations</span>
            <h1 className="vl-h2" id="works-with-heading">
              Darpan fits around what you already run.
            </h1>
            <p className="vl-lede">
              Connect your storefront, order system and ERP, and your first
              list of breaks arrives the next morning. Nothing to replace,
              nothing to rebuild.
            </p>
          </div>

          <h2 className="vl-ww-h">Your stack</h2>
          <div className="vl-stack">
            {SYSTEM_GROUPS.map((group) => (
              <div className="vl-stack-group" key={group.kind}>
                <h3>{group.kind}</h3>
                <ul className="vl-chips">
                  {group.systems.map((system) => (
                    <li key={system}>{system}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="vl-ww-foot">
            Missing one? Darpan can easily connect with anything that has an
            API, a database or a file export.
          </p>

          <div className="vl-ai">
            <div>
              <h2 className="vl-ww-h is-first">And with your AI</h2>
              <p className="vl-ai-lede">
                Sign in once with the Darpan CLI, and the assistant your team
                uses every day can open findings, look up an order and start a
                run, as you and within your permissions.
              </p>
              <ul className="vl-chips">
                {AI_CLIENTS.map((client) => (
                  <li key={client}>{client}</li>
                ))}
              </ul>
            </div>
            <div
              className="vl-term"
              role="img"
              aria-label="A terminal: darpan login, then adding Darpan to Claude, then asking which refunds from yesterday never reached NetSuite."
            >
              <span className="vl-term-dots" aria-hidden />
              <code>
                <span className="is-dim">$</span>
                {' darpan login\n'}
                <span className="is-dim">$</span>
                {' claude mcp add darpan -- darpan mcp\n\n'}
                <span className="is-ask">&gt;</span>
                {' Which refunds from yesterday\n  never reached NetSuite?'}
              </code>
            </div>
          </div>

          <p className="vl-page-cta">
            <a className="vl-cta" href={WALKTHROUGH_HREF}>
              Talk to us <span className="arr">&rarr;</span>
            </a>
            <a className="vl-textlink" href="/tour">
              Watch the three-minute tour <span aria-hidden>&#8599;</span>
            </a>
          </p>
        </div>
      </section>
    </VlPage>
  )
}
