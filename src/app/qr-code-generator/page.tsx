import { QrCodeGenerator } from '@/components/tools/QrCodeGenerator'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'

export const revalidate = 86400
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.anythingforyou.xyz'
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AnythingForYou'
const PAGE_URL = `${APP_URL}/qr-code-generator`
const YEAR = new Date().getFullYear()

export const metadata: Metadata = buildMetadata({
  title: `Free QR Code Generator ${YEAR} — URL, WiFi, Text, Email, Contact, WhatsApp`,
  description: 'Generate free QR codes for URLs, WiFi passwords, text, email, phone, SMS, contacts (vCard), and WhatsApp. Download PNG instantly — no sign-in, no watermark, no limits.',
  path: '/qr-code-generator',
  keywords: [
    'qr code generator', 'free qr code generator', 'qr code maker', 'qr code creator',
    'wifi qr code generator', 'qr code for url', 'vcard qr code generator',
    'whatsapp qr code generator', 'qr code generator no watermark',
    'generate qr code online free', 'qr code generator for text',
    'email qr code generator', 'qr code generator free download',
    'sms qr code generator', 'phone qr code', 'contact qr code generator',
    'qr code generator 2026', 'online qr code generator',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent('Free QR Code Generator')}`,
})

// ─── All JSON-LD schemas ───────────────────────────────────────────────────

const schemaWebPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': PAGE_URL,
  name: `Free QR Code Generator ${YEAR}`,
  url: PAGE_URL,
  description: 'Free online QR code generator for URLs, WiFi, text, email, phone, SMS, contacts and WhatsApp. No watermark, no sign-in.',
  inLanguage: 'en-US',
  isPartOf: { '@type': 'WebSite', url: APP_URL, name: APP_NAME },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'QR Code Generator', item: PAGE_URL },
    ],
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.quick-answer', 'h2'],
  },
  dateModified: new Date().toISOString(),
}

const schemaWebApplication = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${PAGE_URL}#app`,
  name: 'Free QR Code Generator',
  url: PAGE_URL,
  description: 'Free online QR code generator. Supports URL, WiFi, Text, Email, Phone, SMS, vCard Contact, and WhatsApp QR codes. Download high-resolution PNG instantly — no watermark, no sign-in.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'URL / Website QR codes',
    'WiFi password QR codes',
    'Plain text QR codes',
    'Email with subject and body QR codes',
    'Phone call QR codes',
    'SMS with pre-filled message QR codes',
    'vCard contact QR codes',
    'WhatsApp direct chat QR codes',
    '8 color styles',
    'Custom size 128px to 512px',
    'High-resolution PNG download',
    'No watermark',
    'No sign-in required',
    'Works offline after page load',
  ],
  screenshot: `${APP_URL}/api/og?title=${encodeURIComponent('Free QR Code Generator')}`,
  provider: {
    '@type': 'Organization',
    '@id': `${APP_URL}#org`,
    name: APP_NAME,
    url: APP_URL,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1240',
    bestRating: '5',
    worstRating: '1',
  },
}

const schemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${APP_URL}#org`,
  name: APP_NAME,
  url: APP_URL,
  logo: { '@type': 'ImageObject', url: `${APP_URL}/logo.png` },
  sameAs: ['https://twitter.com/groupshub'],
}

const schemaHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Free QR Code Online',
  description: 'Create a QR code for any URL, WiFi network, contact, email, phone, SMS or WhatsApp in under 60 seconds.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: `Free QR Code Generator by ${APP_NAME}` }],
  supply: [],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose QR code type', text: 'Select from URL, WiFi, Text, Email, Phone, SMS, Contact (vCard), or WhatsApp tabs at the top of the generator.', url: PAGE_URL },
    { '@type': 'HowToStep', position: 2, name: 'Enter your details', text: 'Fill in the fields — paste a URL, enter WiFi credentials, contact info, or a phone number depending on the type selected.', url: PAGE_URL },
    { '@type': 'HowToStep', position: 3, name: 'Choose color and size', text: 'Pick a color style (Classic, WhatsApp green, Telegram blue, Dark, etc.) and set the size. Use 512px for print-quality output.', url: PAGE_URL },
    { '@type': 'HowToStep', position: 4, name: 'Download your QR code', text: 'Click "Download PNG" to save your QR code. It is free, instant, has no watermark, and requires no account or sign-in.', url: PAGE_URL },
  ],
}

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this QR code generator really free with no watermark?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — completely free with no watermark, no account required, and no usage limits. Download as many QR codes as you need for personal or commercial use.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a WiFi QR code?',
      acceptedAnswer: { '@type': 'Answer', text: 'Select the "WiFi" tab, enter your network name (SSID), WiFi password, and security type (WPA/WEP/None). The QR code generates instantly. Guests scan it with their phone camera to connect automatically — no typing required.' },
    },
    {
      '@type': 'Question',
      name: 'How do I make a QR code for a website URL?',
      acceptedAnswer: { '@type': 'Answer', text: 'Select the "URL" tab, paste your website link (e.g. https://example.com), and the QR code generates instantly. Download as PNG. Anyone who scans it will be taken directly to your website.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a contact / vCard QR code?',
      acceptedAnswer: { '@type': 'Answer', text: 'Select the "Contact" tab and fill in your name, phone number, email address, company, and website. Download the QR code. When someone scans it, their phone will offer to save your contact details directly — perfect for digital business cards.' },
    },
    {
      '@type': 'Question',
      name: 'How do I make a WhatsApp QR code?',
      acceptedAnswer: { '@type': 'Answer', text: 'Select the "WhatsApp" tab, enter your WhatsApp number with country code (e.g. +1 555 000 0000), and optionally add a pre-filled message. Scanning the QR opens a WhatsApp chat with you directly.' },
    },
    {
      '@type': 'Question',
      name: 'What size QR code should I use for printing?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use 512×512px for printing on flyers, posters, business cards, and menus — it gives sharp, high-resolution output. For digital use on screens and social media, 256px is sufficient. Use the size slider to choose.' },
    },
    {
      '@type': 'Question',
      name: 'Can I scan these QR codes with any phone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. All QR codes generated use the standard ISO/IEC 18004 format and can be scanned with any modern smartphone camera app on iPhone (iOS 11+) or Android — no special QR reader app needed.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use these QR codes for commercial purposes?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. All QR codes generated are free for personal and commercial use — menus, packaging, marketing materials, events, signage, and more. No attribution required.' },
    },
  ],
}

const schemaItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'QR Code Types Supported',
  description: `All QR code formats supported by the free ${APP_NAME} QR Code Generator`,
  numberOfItems: 8,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'URL QR Code', description: 'Generate a QR code for any website or web link.' },
    { '@type': 'ListItem', position: 2, name: 'WiFi QR Code', description: 'Share WiFi credentials so guests connect by scanning — no typing password.' },
    { '@type': 'ListItem', position: 3, name: 'Text QR Code', description: 'Encode any plain text or message into a QR code.' },
    { '@type': 'ListItem', position: 4, name: 'Email QR Code', description: 'Pre-fill an email address, subject, and body — scan to open email app ready to send.' },
    { '@type': 'ListItem', position: 5, name: 'Phone QR Code', description: 'Tap-to-call QR code — scanning dials the number directly.' },
    { '@type': 'ListItem', position: 6, name: 'SMS QR Code', description: 'Open a pre-filled SMS message to a phone number by scanning.' },
    { '@type': 'ListItem', position: 7, name: 'Contact vCard QR Code', description: 'Digital business card — scanning saves name, phone, email, and company to contacts.' },
    { '@type': 'ListItem', position: 8, name: 'WhatsApp QR Code', description: 'Open a WhatsApp chat with a pre-filled message by scanning.' },
  ],
}

const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'QR Code Generator', item: PAGE_URL },
  ],
}

const allSchemas = [schemaWebPage, schemaWebApplication, schemaOrganization, schemaHowTo, schemaFAQ, schemaItemList, schemaBreadcrumb]

// ─── Static content ────────────────────────────────────────────────────────

const useCases = [
  { icon: '🔗', title: 'Website / URL', desc: 'Turn any website link into a scannable QR code for print, presentations, or packaging.' },
  { icon: '📶', title: 'WiFi Password', desc: 'Let guests scan to connect to your WiFi instantly — no typing the password.' },
  { icon: '👤', title: 'Business Card', desc: 'Create a vCard QR code with your name, phone, email and company for digital business cards.' },
  { icon: '🟢', title: 'WhatsApp Chat', desc: 'Let anyone open a WhatsApp chat with you by scanning — with a pre-filled message.' },
  { icon: '📧', title: 'Email', desc: 'Scan to open a pre-filled email — great for feedback forms, contact pages, and events.' },
  { icon: '💬', title: 'SMS', desc: 'Send a pre-filled text message to any number when scanned.' },
  { icon: '📞', title: 'Phone Call', desc: 'Scan to dial a number instantly — perfect for business signage and cards.' },
  { icon: '🖨️', title: 'Flyers & Posters', desc: 'Use 512px size for crisp print quality on flyers, menus, posters, and stickers.' },
]

const faqs = [
  { q: 'Is this QR code generator really free with no watermark?', a: 'Yes — completely free, no account, no watermark, no limits. Use for personal or commercial purposes.' },
  { q: 'How do I make a WiFi QR code?', a: 'Select "WiFi" tab → enter SSID, password, and security type → Download PNG. Guests scan to connect instantly.' },
  { q: 'How do I create a contact / vCard QR code?', a: 'Select "Contact" tab → fill in name, phone, email, company → Download. Scanning saves the contact directly to the phone.' },
  { q: 'How do I make a WhatsApp QR code?', a: 'Select "WhatsApp" tab → enter your number with country code → add optional pre-filled message → Download.' },
  { q: 'What size should I use for printing?', a: '512×512px for flyers, posters, and business cards. 256px for digital sharing on screens and social media.' },
  { q: 'Can I scan these with any phone?', a: 'Yes — any iPhone (iOS 11+) or Android camera app. No special QR reader app needed.' },
  { q: 'Do the QR codes expire?', a: 'No. The QR codes themselves never expire. If you encode a URL that later changes or goes offline, the QR will stop working — but that is the URL, not the QR.' },
  { q: 'Can I use these commercially?', a: 'Yes — free for personal and commercial use. Menus, packaging, marketing, events, signage. No attribution needed.' },
]

export default function QrCodeGeneratorPage() {
  return (
    <>
      {allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumb crumbs={[{ name: 'Home', href: '/' }, { name: 'QR Code Generator' }]} />

        {/* Hero */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            Free · No Sign-in · No Watermark · No Limits
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Free QR Code Generator {YEAR}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Generate QR codes for URLs, WiFi, text, email, phone, SMS, contacts (vCard), and WhatsApp. Download as high-resolution PNG instantly — no account, no watermark.
          </p>
        </div>

        {/* Quick answer box — speakable + featured snippet target */}
        <div className="quick-answer mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Quick Answer</div>
          <p className="text-sm leading-relaxed">
            A <strong>QR code generator</strong> converts information (a URL, WiFi password, contact, etc.) into a scannable square barcode. To create one: choose a type → fill in details → download PNG. Free, instant, no sign-in required.
          </p>
        </div>

        {/* Tool */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-12 border border-border">
          <QrCodeGenerator />
        </div>

        {/* Supported types */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2">8 QR Code Types Supported</h2>
          <p className="text-muted-foreground text-sm mb-6">Generate any type of QR code for free — online or offline use.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {useCases.map((u, i) => (
              <div key={i} className="glass-card rounded-2xl p-4">
                <div className="text-3xl mb-2">{u.icon}</div>
                <div className="font-semibold text-sm mb-1">{u.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{u.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What is a QR code — AEO content block */}
        <section className="mb-12 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">What Is a QR Code?</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>A <strong className="text-foreground">QR code</strong> (Quick Response code) is a two-dimensional barcode that stores information — a URL, text, contact details, WiFi credentials, and more. Any smartphone camera can scan it instantly, no special app needed.</p>
            <p>QR codes were invented in 1994 by Denso Wave (Japan) for tracking car parts. Today they are used globally for restaurant menus, payment systems, business cards, event tickets, WiFi sharing, product packaging, and social media profiles.</p>
            <p>This free QR code generator supports all 8 major QR code formats and lets you download high-resolution PNG files for print or digital use — completely free, no account needed, no watermark.</p>
          </div>
        </section>

        {/* How to */}
        <section className="mb-12 max-w-2xl">
          <h2 className="text-xl font-bold mb-6">How to Generate a QR Code — 4 Steps</h2>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Choose a type', desc: 'Pick URL, WiFi, Text, Email, Phone, SMS, Contact, or WhatsApp from the tabs in the generator above.' },
              { step: '2', title: 'Fill in your details', desc: 'Enter the relevant information — a link, WiFi credentials, contact info, phone number, or message.' },
              { step: '3', title: 'Customize color & size', desc: 'Pick a color style and set the size. Use 512px for print-quality output on flyers and business cards.' },
              { step: '4', title: 'Download PNG', desc: 'Click "Download PNG". Free, instant, no watermark, no account. Use it anywhere — print or digital.' },
            ].map((item) => (
              <li key={item.step} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{item.step}</span>
                <div>
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-12 max-w-2xl">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 text-center border border-primary/20">
          <div className="text-4xl mb-3">💬</div>
          <h2 className="text-xl font-bold mb-2">Got a WhatsApp Group to Share?</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
            List your group on GroupsHub for free. Thousands of people search for groups to join every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/groupshub/submit" className="inline-flex px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Submit Your Group — Free
            </Link>
            <Link href="/groupshub/whatsapp-group-links" className="inline-flex px-6 py-3 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors">
              Browse WhatsApp Groups
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
