import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://groupshub.com'

export const metadata: Metadata = buildMetadata({
  title: 'How to Merge Two WhatsApp Groups — Step-by-Step Guide 2026',
  description:
    'WhatsApp does not have a built-in merge feature. Learn the best workarounds to combine two WhatsApp groups into one in 2026 — export contacts, use broadcast lists, or create a new community. Step-by-step guide.',
  path: '/how-to-merge-whatsapp-groups',
  keywords: [
    'how to merge two whatsapp groups',
    'merge whatsapp groups',
    'combine whatsapp groups',
    'merge two whatsapp groups into one',
    'whatsapp group merge',
    'how to combine whatsapp groups',
    'whatsapp groups merge 2026',
    'transfer members whatsapp group',
    'move members to new whatsapp group',
    'whatsapp communities',
  ],
  image: `${APP_URL}/api/og?title=${encodeURIComponent('How to Merge Two WhatsApp Groups')}&platform=whatsapp`,
})

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Merge Two WhatsApp Groups',
  description:
    'WhatsApp does not have a native merge feature. This guide shows you the best workarounds to combine two WhatsApp groups into one.',
  totalTime: 'PT10M',
  tool: [{ '@type': 'HowToTool', name: 'WhatsApp' }, { '@type': 'HowToTool', name: 'Smartphone' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Export contacts from Group 1',
      text: 'Open WhatsApp Group 1. Tap the group name at the top → Members. Manually note down the members, or export the group contact list via your phone contacts app.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Create a new WhatsApp group (or use Group 2)',
      text: 'Either create a brand-new WhatsApp group that will be the merged group, or designate Group 2 as the surviving group. Decide on the name, icon, and description for the merged group.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add all members from Group 1 to the new group',
      text: 'In the merged group, tap the group name → Add Participants. Search for each member from Group 1 and add them. WhatsApp allows up to 1,024 members per group.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Announce the merge in both groups',
      text: 'Post a message in Group 1 and Group 2 explaining the merge and sharing the invite link to the new merged group so anyone you missed can join themselves.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Archive or delete the old group',
      text: 'Once all members have moved, archive or delete Group 1. Go to the group → Group Info → Exit Group → Delete Group.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can you merge two WhatsApp groups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WhatsApp does not have a built-in merge feature. You cannot automatically combine two groups into one. The only way is to manually add members from one group into another, then archive or delete the original.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I combine two WhatsApp groups into one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To combine two WhatsApp groups: 1) Choose the group that will survive. 2) Open the other group and go to Members. 3) Add each member to the surviving group. 4) Share the surviving group invite link in the old group. 5) Delete or archive the old group once all members have moved.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a WhatsApp feature to merge groups automatically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. As of 2026, WhatsApp does not offer an automatic group merge feature. You need to manually re-add members. WhatsApp Communities can help organize multiple sub-groups under one umbrella without merging them.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is WhatsApp Communities and can it replace merging groups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WhatsApp Communities is a feature that lets you group multiple WhatsApp groups under a single community. Instead of merging two groups into one, you can add both groups to a Community so members can see announcements across all groups. This is often a better solution than a full merge.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many members can be in a WhatsApp group?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WhatsApp groups support up to 1,024 members. If you are merging two groups and the combined member count exceeds 1,024, you will need to create multiple groups or use WhatsApp Communities instead.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'WhatsApp Groups', item: `${APP_URL}/whatsapp-groups` },
    { '@type': 'ListItem', position: 3, name: 'How to Merge WhatsApp Groups', item: `${APP_URL}/how-to-merge-whatsapp-groups` },
  ],
}

const steps = [
  {
    num: '1',
    title: 'Export contacts from Group 1',
    body: 'Open WhatsApp Group 1. Tap the group name at the top → Members. Note down or screenshot the member list. You will need to add each person manually to the merged group.',
    tip: 'If you have admin rights, you can see all member phone numbers in the group info screen.',
  },
  {
    num: '2',
    title: 'Decide which group survives (or create a new one)',
    body: 'You have three options: keep Group 1, keep Group 2, or create a brand-new group as the merged destination. Most admins keep Group 2 if it has more active members or a better name.',
    tip: 'Update the group name, description, and icon to reflect the merged identity before announcing.',
  },
  {
    num: '3',
    title: 'Add all members from Group 1',
    body: 'In the surviving group, tap the group name → Add Participants. Search for each member from Group 1 and add them one by one. WhatsApp allows up to 1,024 members per group.',
    tip: 'Only admins can add members. Make sure you have admin rights in the surviving group first.',
  },
  {
    num: '4',
    title: 'Share the merged group invite link in both old groups',
    body: 'Post an announcement in both Group 1 and Group 2 explaining the merge. Include the invite link to the new group so any members you missed can join on their own.',
    tip: 'Get the invite link from the surviving group → Group Info → Invite to Group via Link.',
  },
  {
    num: '5',
    title: 'Archive or delete the old group',
    body: 'Once the transition is complete, delete or archive Group 1. Go to the group → Group Info → Exit Group. If you are the only admin, WhatsApp will automatically promote another member as admin before you can leave.',
    tip: 'Archive keeps the chat history accessible. Delete removes it permanently for you.',
  },
]

export default function HowToMergeWhatsAppGroupsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Breadcrumb crumbs={[
          { name: 'Home', href: '/' },
          { name: 'WhatsApp Groups', href: '/whatsapp-groups/education' },
          { name: 'How to Merge WhatsApp Groups' },
        ]} />

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-4xl">💬</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#25D366]">WhatsApp Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            How to Merge Two WhatsApp Groups
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            WhatsApp does not have a built-in merge feature — but there is a simple manual workaround.
            This guide shows you exactly how to combine two WhatsApp groups into one in 2026, step by step.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['5 minutes', 'No third-party apps', 'Works on iPhone & Android', '2026 updated'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-medium border border-[#25D366]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Key answer box — what AI engines will cite */}
        <div className="mb-8 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-2">Quick Answer</div>
          <p className="text-sm leading-relaxed">
            <strong>WhatsApp does not have a native merge feature.</strong> To merge two groups: choose the surviving group,
            manually add all members from the old group via Add Participants, share the surviving group&apos;s invite link
            in the old group so members can join themselves, then archive or delete the old group.
            Alternatively, use <strong>WhatsApp Communities</strong> to link both groups under one umbrella without merging.
          </p>
        </div>

        {/* Steps */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6">Step-by-Step: How to Merge WhatsApp Groups</h2>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.num} className="glass-card rounded-2xl p-5 flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center text-sm font-bold">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{step.body}</p>
                  <div className="text-xs text-[#25D366] bg-[#25D366]/10 rounded-lg px-3 py-1.5 inline-block">
                    💡 {step.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alternative: WhatsApp Communities */}
        <section className="mb-10 glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">Better Alternative: Use WhatsApp Communities</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Instead of merging two groups into one, consider using <strong>WhatsApp Communities</strong> — a feature
            that lets you group multiple WhatsApp groups under a single community with a shared announcement channel.
            Both groups keep their identities, but members can see announcements across all sub-groups.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { title: 'No member limit worries', desc: 'Both groups keep their own 1,024 member limits' },
              { title: 'Shared announcements', desc: 'Post to all sub-groups from one place' },
              { title: 'Keeps chat history', desc: 'No need to delete or lose old messages' },
              { title: 'Easier to manage', desc: 'One community, multiple focused sub-groups' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-muted/40 p-3">
                <div className="text-xs font-semibold mb-0.5">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            To create a Community: open WhatsApp → tap Communities (tab at the top) → New Community → add your existing groups.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can you merge two WhatsApp groups?',
                a: 'WhatsApp does not have a built-in merge feature. You cannot automatically combine two groups into one. The only way is to manually add members from one group into another, then archive or delete the original group.',
              },
              {
                q: 'Is there a WhatsApp feature to merge groups automatically?',
                a: 'No. As of 2026, WhatsApp does not offer an automatic group merge feature. You need to manually re-add members. WhatsApp Communities can help organize multiple sub-groups under one umbrella without needing to merge them.',
              },
              {
                q: 'What is WhatsApp Communities?',
                a: 'WhatsApp Communities groups multiple WhatsApp groups under a single community with a shared announcement channel. Instead of merging two groups into one, you can add both to a Community so members share announcements. This is often a better solution than a full merge.',
              },
              {
                q: 'How many members can be in a WhatsApp group?',
                a: 'WhatsApp groups support up to 1,024 members. If merging two groups would exceed 1,024 combined members, you will need to split them or use WhatsApp Communities instead.',
              },
              {
                q: 'Do I need to be an admin to merge WhatsApp groups?',
                a: 'Yes. You need to be an admin in both the old group (to see and invite members) and the surviving group (to add participants). If you are not an admin, ask the group admin to perform the merge.',
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
          <h2 className="text-xl font-bold mb-2">Looking for WhatsApp Groups to Join?</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
            Browse 10,000+ active WhatsApp groups across 50+ categories and 195 countries. Free invite links, no sign-in.
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
