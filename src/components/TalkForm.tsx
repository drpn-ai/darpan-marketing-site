import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

// Netlify Forms, TanStack Start pattern (.claude/skills/netlify-forms-tanstack):
// the form is registered by the static skeleton public/talk-form.html, and we
// POST to that file's path so the request reaches Netlify's form handler
// instead of the SSR fallback. Field names must match the skeleton.
const FORM_NAME = 'talk'
const EMPTY = { name: '', email: '', company: '', systems: '', 'bot-field': '' }

type Fields = typeof EMPTY
type Status = 'idle' | 'sending' | 'sent' | 'failed'

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

export function TalkForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields({ ...fields, [e.target.name]: e.target.value })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/talk-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...fields }),
      })
      setStatus(res.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <p className="vl-lede" role="status">
        Thanks. We&rsquo;ll write back from hello@drpn.ai.
      </p>
    )
  }

  return (
    <form
      className="vl-form"
      name={FORM_NAME}
      onSubmit={onSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p hidden>
        <label>
          Leave this empty
          <input name="bot-field" value={fields['bot-field']} onChange={onChange} />
        </label>
      </p>
      <label>
        Name
        <input
          name="name"
          autoComplete="name"
          required
          value={fields.name}
          onChange={onChange}
        />
      </label>
      <label>
        Work email
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={fields.email}
          onChange={onChange}
        />
      </label>
      <label>
        Company
        <input
          name="company"
          autoComplete="organization"
          value={fields.company}
          onChange={onChange}
        />
      </label>
      <label>
        Which systems do you run?
        <textarea
          name="systems"
          rows={3}
          placeholder="Shopify, NetSuite, a WMS…"
          value={fields.systems}
          onChange={onChange}
        />
      </label>
      <div>
        <button className="vl-cta" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}{' '}
          <span className="arr">&rarr;</span>
        </button>
      </div>
      {status === 'failed' ? (
        <p className="vl-form-error" role="alert">
          That didn&rsquo;t send. Email{' '}
          <a href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough">
            hello@drpn.ai
          </a>{' '}
          and we&rsquo;ll pick it up from there.
        </p>
      ) : null}
    </form>
  )
}
