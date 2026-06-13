import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'

export const metadata: Metadata = buildMetadata({
  title: 'How to Transfer WhatsApp to a New Phone — iPhone & Android 2026',
  description:
    'Step-by-step guide to transfer WhatsApp to a new phone in 2026. Move your chats, groups, and media from iPhone to Android, Android to iPhone, or same-platform switch. Keep all your group history.',
  path: '/how-to-transfer-whatsapp-to-new-phone',
  keywords: [
    'how to transfer whatsapp to new phone',
    'transfer whatsapp to new phone',
    'move whatsapp to new phone',
    'whatsapp transfer 2026',
    'switch whatsapp to new phone',
    'transfer whatsapp chats to new phone',
    'move whatsapp groups to new phone',
    'whatsapp backup new phone',
    'android to iphone whatsapp transfer',
    'iphone to android whatsapp',
    'whatsapp chat history new phone',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent('How to Transfer WhatsApp to a New Phone')}&platform=whatsapp`,
})

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Transfer WhatsApp to a New Phone',
  description: 'Complete guide to move WhatsApp chats, groups, and media to a new phone in 2026.',
  totalTime: 'PT15M',
  tool: [
    { '@type': 'HowToTool', name: 'WhatsApp' },
    { '@type': 'HowToTool', name: 'Google Drive or iCloud' },
    { '@type': 'HowToTool', name: 'New smartphone' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Back up WhatsApp on your old phone',
      text: 'On Android: WhatsApp → Settings → Chats → Chat Backup → Back Up. On iPhone: WhatsApp → Settings → Chats → Chat Backup → Back Up Now. Android backs up to Google Drive; iPhone backs up to iCloud.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Install WhatsApp on your new phone',
      text: 'Download WhatsApp from Google Play (Android) or the App Store (iPhone) on your new phone.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Verify your phone number',
      text: 'Open WhatsApp on your new phone and enter the same phone number you used on your old phone. WhatsApp will send a 6-digit SMS verification code.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Restore your chat backup',
      text: 'After verifying your number, WhatsApp will detect your backup on Google Drive (Android) or iCloud (iPhone) and prompt you to restore. Tap Restore to transfer all your chats, groups, and media.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Wait for restore to complete',
      text: 'The restore process can take a few minutes for small backups or up to 30 minutes for large ones. Stay connected to Wi-Fi throughout. All your WhatsApp groups will be restored automatically.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I transfer WhatsApp to a new phone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To transfer WhatsApp to a new phone: 1) Back up on your old phone (Settings → Chats → Chat Backup). 2) Install WhatsApp on the new phone. 3) Verify the same phone number. 4) Restore from backup when prompted. Your WhatsApp groups will transfer automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will my WhatsApp groups transfer to my new phone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When you restore a WhatsApp backup on your new phone, all your WhatsApp groups are included. You will rejoin every group you were in automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I transfer WhatsApp from Android to iPhone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use the official "Move to iOS" app during iPhone setup to transfer WhatsApp from Android to iPhone. Alternatively, WhatsApp now supports direct cross-platform transfers via its built-in Move Chats feature (WhatsApp → Settings → Chats → Move Chats to iPhone/Android).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I transfer WhatsApp from iPhone to Android?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use WhatsApp\'s built-in Move Chats feature: on your iPhone go to WhatsApp → Settings → Chats → Move Chats to Android, then follow the on-screen steps to connect your Android phone via USB-C cable and transfer your history.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to delete WhatsApp from my old phone after transferring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WhatsApp can only be active on one phone per number at a time. Once you activate WhatsApp on your new phone, it will automatically be deactivated on the old phone. You do not need to manually delete it, but you should to avoid confusion.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'WhatsApp Groups', item: `${APP_URL}/whatsapp-groups/education` },
    { '@type': 'ListItem', position: 3, name: 'How to Transfer WhatsApp to New Phone', item: `${APP_URL}/how-to-transfer-whatsapp-to-new-phone` },
  ],
}

const transferMethods = [
  {
    title: 'Same Platform (Android → Android or iPhone → iPhone)',
    badge: 'Easiest',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: '✅',
    steps: [
      'On old phone: WhatsApp → Settings → Chats → Chat Backup → Back Up Now',
      'Confirm backup is stored to Google Drive (Android) or iCloud (iPhone)',
      'Install WhatsApp on new phone and verify your phone number',
      'When prompted, tap Restore Chat History',
      'Wait for restore to complete (keep Wi-Fi on)',
    ],
    note: 'Your Google Drive or iCloud account must be logged in on both phones.',
  },
  {
    title: 'Android → iPhone',
    badge: 'Official Method',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: '📱',
    steps: [
      'On your new iPhone (during initial setup), select Move Data from Android',
      'Download "Move to iOS" app on your Android phone',
      'Follow the on-screen instructions to connect both phones',
      'Select WhatsApp in the data to transfer',
      'Complete setup and verify your number in WhatsApp on iPhone',
    ],
    note: 'This only works during first-time iPhone setup. If you already set up the iPhone, use WhatsApp\'s Move Chats feature instead.',
  },
  {
    title: 'iPhone → Android',
    badge: 'WhatsApp Built-in',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    icon: '🤖',
    steps: [
      'On your iPhone: WhatsApp → Settings → Chats → Move Chats to Android',
      'On your Android phone: WhatsApp → tap Move chats from iPhone',
      'Connect both phones using a USB-C to Lightning cable',
      'Scan the QR code shown on iPhone with your Android phone',
      'Wait for transfer to complete, then verify your number on Android',
    ],
    note: 'Requires a USB-C to Lightning cable. WhatsApp must be the same version on both phones.',
  },
]

export default function HowToTransferWhatsAppPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Breadcrumb crumbs={[
          { name: 'Home', href: '/' },
          { name: 'WhatsApp Groups', href: '/whatsapp-groups/education' },
          { name: 'How to Transfer WhatsApp to New Phone' },
        ]} />

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-4xl">💬</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#25D366]">WhatsApp Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            How to Transfer WhatsApp to a New Phone
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Moving to a new phone? This guide covers every transfer method — same platform, Android to iPhone, and iPhone to Android — so you keep all your WhatsApp chats, groups, and media.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Works on iPhone & Android', 'All groups transfer', 'Keeps chat history', '2026 updated'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-medium border border-[#25D366]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick answer */}
        <div className="mb-8 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-2">Quick Answer</div>
          <p className="text-sm leading-relaxed">
            <strong>Same platform (Android→Android or iPhone→iPhone):</strong> Back up WhatsApp on the old phone → install on new phone → restore from backup. Takes under 15 minutes. <strong>All your groups transfer automatically.</strong>
            <br /><br />
            <strong>Cross-platform:</strong> Use WhatsApp&apos;s built-in <em>Move Chats</em> feature (Settings → Chats → Move Chats to iPhone/Android) or the Move to iOS app during setup.
          </p>
        </div>

        {/* Transfer methods */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6">Transfer Methods by Device</h2>
          <div className="space-y-5">
            {transferMethods.map((method) => (
              <div key={method.title} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <h3 className="font-bold">{method.title}</h3>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${method.badgeColor}`}>
                      {method.badge}
                    </span>
                  </div>
                </div>
                <ol className="space-y-2 mb-4">
                  {method.steps.map((step, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#25D366]/20 text-[#25D366] text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                  💡 {method.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Will my WhatsApp groups transfer to my new phone?',
                a: 'Yes. When you restore a WhatsApp backup on your new phone, all your WhatsApp groups are included. You will rejoin every group you were in automatically — no need to get re-invited.',
              },
              {
                q: 'Can I transfer WhatsApp from Android to iPhone?',
                a: 'Yes. Use the official "Move to iOS" app during iPhone setup. Alternatively, WhatsApp\'s built-in Move Chats feature works after setup: iPhone → WhatsApp → Settings → Chats → Move Chats to Android (initiates from the iPhone side).',
              },
              {
                q: 'Do I lose my WhatsApp groups if I get a new phone?',
                a: 'No — as long as you back up before switching and restore on the new phone. Your groups will be fully restored. If you skip the backup step, you may lose chat history but you will still be a member of your groups.',
              },
              {
                q: 'How long does WhatsApp transfer take?',
                a: 'Same-platform transfers via Google Drive or iCloud typically take 2–20 minutes depending on backup size and internet speed. Cross-platform transfers via USB cable are usually faster, taking 5–15 minutes.',
              },
              {
                q: 'Can I use WhatsApp on two phones at the same time?',
                a: 'WhatsApp now supports linked devices — you can use WhatsApp Web or the desktop app simultaneously. However, the primary phone account can only be active on one phone. WhatsApp\'s Companion Mode (beta) allows a second phone to be linked.',
              },
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 text-center border border-[#25D366]/20">
          <h2 className="text-xl font-bold mb-2">Now That You&apos;re Set Up — Find New Groups</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
            Browse 10,000+ active WhatsApp groups across 50+ categories and 195 countries. Free invite links — no sign-in.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/whatsapp-groups/education" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Browse WhatsApp Groups
            </Link>
            <Link href="/submit" className="px-5 py-2.5 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors">
              Submit Your Group
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
