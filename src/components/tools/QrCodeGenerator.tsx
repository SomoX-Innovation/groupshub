'use client'

import { useState, useEffect, useCallback } from 'react'
import QRCode from 'qrcode'

const TABS = [
  { id: 'url',     label: 'URL',      icon: '🔗' },
  { id: 'text',    label: 'Text',     icon: '📝' },
  { id: 'email',   label: 'Email',    icon: '📧' },
  { id: 'phone',   label: 'Phone',    icon: '📞' },
  { id: 'sms',     label: 'SMS',      icon: '💬' },
  { id: 'wifi',    label: 'WiFi',     icon: '📶' },
  { id: 'vcard',   label: 'Contact',  icon: '👤' },
  { id: 'whatsapp',label: 'WhatsApp', icon: '🟢' },
]

const COLORS = [
  { fg: '#000000', bg: '#ffffff', label: 'Classic' },
  { fg: '#1a1a1a', bg: '#ffffff', label: 'Dark' },
  { fg: '#128C7E', bg: '#ffffff', label: 'WhatsApp' },
  { fg: '#229ED9', bg: '#ffffff', label: 'Telegram' },
  { fg: '#5865F2', bg: '#ffffff', label: 'Discord' },
  { fg: '#ffffff', bg: '#1a1a2e', label: 'Night' },
  { fg: '#0066cc', bg: '#ffffff', label: 'Blue' },
  { fg: '#cc0000', bg: '#ffffff', label: 'Red' },
]

function buildQrValue(tab: string, fields: Record<string, string>): string {
  switch (tab) {
    case 'url':
      return fields.url || ''
    case 'text':
      return fields.text || ''
    case 'email':
      return `mailto:${fields.email || ''}${fields.subject ? `?subject=${encodeURIComponent(fields.subject)}` : ''}${fields.body ? `${fields.subject ? '&' : '?'}body=${encodeURIComponent(fields.body)}` : ''}`
    case 'phone':
      return `tel:${fields.phone || ''}`
    case 'sms':
      return `sms:${fields.phone || ''}${fields.message ? `?body=${encodeURIComponent(fields.message)}` : ''}`
    case 'wifi':
      return `WIFI:T:${fields.security || 'WPA'};S:${fields.ssid || ''};P:${fields.password || ''};;`
    case 'vcard':
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${fields.name || ''}\nTEL:${fields.phone || ''}\nEMAIL:${fields.email || ''}\nORG:${fields.org || ''}\nURL:${fields.url || ''}\nEND:VCARD`
    case 'whatsapp':
      return `https://wa.me/${(fields.phone || '').replace(/\D/g, '')}${fields.message ? `?text=${encodeURIComponent(fields.message)}` : ''}`
    default:
      return ''
  }
}

export function QrCodeGenerator() {
  const [tab, setTab] = useState('url')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [colorIdx, setColorIdx] = useState(0)
  const [size, setSize] = useState(256)
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const setField = (key: string, val: string) => setFields((f) => ({ ...f, [key]: val }))

  const generate = useCallback(async () => {
    const value = buildQrValue(tab, fields)
    if (!value.trim() || value === 'mailto:' || value === 'tel:' || value === 'sms:' || value === 'WIFI:T:WPA;S:;P:;;') {
      setDataUrl(null); setError(''); return
    }
    try {
      const color = COLORS[colorIdx]
      const url = await QRCode.toDataURL(value, {
        width: size, margin: 2,
        color: { dark: color.fg, light: color.bg },
        errorCorrectionLevel: 'H',
      })
      setDataUrl(url); setError('')
    } catch {
      setError('Could not generate QR code.'); setDataUrl(null)
    }
  }, [tab, fields, colorIdx, size])

  useEffect(() => { generate() }, [generate])

  // Reset fields when tab changes
  useEffect(() => { setFields({}) }, [tab])

  const download = () => {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `qr-${tab}.png`
    a.click()
  }

  const copyImage = async () => {
    if (!dataUrl) return
    try {
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    } catch { download() }
  }

  const inputCls = 'w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40'
  const labelCls = 'block text-xs font-semibold text-muted-foreground mb-1'

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left — controls */}
      <div className="space-y-5">

        {/* Type tabs */}
        <div>
          <div className={labelCls}>QR Code Type</div>
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${tab === t.id ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}
              >
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fields per tab */}
        <div className="space-y-3">
          {tab === 'url' && (
            <div>
              <label className={labelCls}>Website URL</label>
              <input className={inputCls} placeholder="https://example.com" value={fields.url || ''} onChange={(e) => setField('url', e.target.value)} />
            </div>
          )}

          {tab === 'text' && (
            <div>
              <label className={labelCls}>Text / Message</label>
              <textarea className={inputCls + ' resize-none'} rows={4} placeholder="Enter any text..." value={fields.text || ''} onChange={(e) => setField('text', e.target.value)} />
            </div>
          )}

          {tab === 'email' && (<>
            <div><label className={labelCls}>Email Address</label><input className={inputCls} placeholder="name@example.com" value={fields.email || ''} onChange={(e) => setField('email', e.target.value)} /></div>
            <div><label className={labelCls}>Subject (optional)</label><input className={inputCls} placeholder="Hello!" value={fields.subject || ''} onChange={(e) => setField('subject', e.target.value)} /></div>
            <div><label className={labelCls}>Body (optional)</label><textarea className={inputCls + ' resize-none'} rows={3} placeholder="Message body..." value={fields.body || ''} onChange={(e) => setField('body', e.target.value)} /></div>
          </>)}

          {tab === 'phone' && (
            <div><label className={labelCls}>Phone Number</label><input className={inputCls} placeholder="+1 555 000 0000" value={fields.phone || ''} onChange={(e) => setField('phone', e.target.value)} /></div>
          )}

          {tab === 'sms' && (<>
            <div><label className={labelCls}>Phone Number</label><input className={inputCls} placeholder="+1 555 000 0000" value={fields.phone || ''} onChange={(e) => setField('phone', e.target.value)} /></div>
            <div><label className={labelCls}>Pre-filled Message (optional)</label><textarea className={inputCls + ' resize-none'} rows={3} placeholder="Hi there!" value={fields.message || ''} onChange={(e) => setField('message', e.target.value)} /></div>
          </>)}

          {tab === 'wifi' && (<>
            <div><label className={labelCls}>Network Name (SSID)</label><input className={inputCls} placeholder="MyWiFiNetwork" value={fields.ssid || ''} onChange={(e) => setField('ssid', e.target.value)} /></div>
            <div><label className={labelCls}>Password</label><input className={inputCls} type="password" placeholder="WiFi password" value={fields.password || ''} onChange={(e) => setField('password', e.target.value)} /></div>
            <div>
              <label className={labelCls}>Security Type</label>
              <select className={inputCls} value={fields.security || 'WPA'} onChange={(e) => setField('security', e.target.value)}>
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (open)</option>
              </select>
            </div>
          </>)}

          {tab === 'vcard' && (<>
            <div><label className={labelCls}>Full Name</label><input className={inputCls} placeholder="John Smith" value={fields.name || ''} onChange={(e) => setField('name', e.target.value)} /></div>
            <div><label className={labelCls}>Phone</label><input className={inputCls} placeholder="+1 555 000 0000" value={fields.phone || ''} onChange={(e) => setField('phone', e.target.value)} /></div>
            <div><label className={labelCls}>Email</label><input className={inputCls} placeholder="john@example.com" value={fields.email || ''} onChange={(e) => setField('email', e.target.value)} /></div>
            <div><label className={labelCls}>Company (optional)</label><input className={inputCls} placeholder="Acme Inc." value={fields.org || ''} onChange={(e) => setField('org', e.target.value)} /></div>
            <div><label className={labelCls}>Website (optional)</label><input className={inputCls} placeholder="https://example.com" value={fields.url || ''} onChange={(e) => setField('url', e.target.value)} /></div>
          </>)}

          {tab === 'whatsapp' && (<>
            <div><label className={labelCls}>WhatsApp Number (with country code)</label><input className={inputCls} placeholder="+1 555 000 0000" value={fields.phone || ''} onChange={(e) => setField('phone', e.target.value)} /></div>
            <div><label className={labelCls}>Pre-filled Message (optional)</label><textarea className={inputCls + ' resize-none'} rows={3} placeholder="Hi! I saw your QR code..." value={fields.message || ''} onChange={(e) => setField('message', e.target.value)} /></div>
          </>)}
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        {/* Color */}
        <div>
          <div className={labelCls}>Color Style</div>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c, i) => (
              <button
                key={i}
                onClick={() => setColorIdx(i)}
                title={c.label}
                className={`w-7 h-7 rounded-full border-2 transition-all ${colorIdx === i ? 'scale-110 border-foreground' : 'border-border'}`}
                style={{ background: `linear-gradient(135deg, ${c.fg} 50%, ${c.bg} 50%)` }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <div className={labelCls}>Size: {size}×{size}px</div>
          <input type="range" min={128} max={512} step={64} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>128px</span><span>512px (print quality)</span></div>
        </div>
      </div>

      {/* Right — preview */}
      <div className="flex flex-col items-center gap-4">
        <div
          className="rounded-2xl border border-border flex items-center justify-center"
          style={{ width: 272, height: 272, background: dataUrl ? COLORS[colorIdx].bg : undefined }}
        >
          {dataUrl ? (
            <img src={dataUrl} alt="Generated QR code" width={248} height={248} className="rounded-xl" />
          ) : (
            <div className="text-center px-6">
              <div className="text-5xl mb-3">⬛</div>
              <p className="text-sm text-muted-foreground">Fill in the fields to generate your QR code</p>
            </div>
          )}
        </div>

        {dataUrl && (
          <div className="flex gap-3 w-full max-w-xs">
            <button onClick={download} className="flex-1 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Download PNG
            </button>
            <button onClick={copyImage} className="flex-1 py-2.5 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors">
              {copied ? 'Copied!' : 'Copy Image'}
            </button>
          </div>
        )}

        {dataUrl && (
          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Free · No watermark · High resolution · Works offline after download
          </p>
        )}
      </div>
    </div>
  )
}
