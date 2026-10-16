# The Revenue Inbox · Case Studies

Copy and build spec for the case studies section of therevenueinbox.com.
For the coding agent: this file is the single source of truth for copy and numbers. Use the copy verbatim. Do not add em dashes, exclamation marks, emoji or all-caps paragraphs anywhere in this section.

---

## 0. Before publishing (Pandush to confirm)

1. **Parking Compliance Systems:** "qualified lead" here means a reply that passed qualification and was handed to a human for a 5-minute callback. The old deck said 50 qualified opportunities a month. The new figure (26 a day) uses a looser definition, so the old number is retired. Confirm "500+ a month" (assumes 20+ sending days).
2. **Networked (meetings):** the "20% ARR growth month after month" claim was removed. Add it back only with a timeframe ("for 4 consecutive months") and a source.
3. **Networked (both studies):** confirm Networked is happy to be named.
4. **Quotes:** every study has a quote slot. Only publish real quotes (a Slack or email line from the client is enough). If there is no real quote, hide the block.

---

## 1. Global elements

### 1.1 Section header (case studies index page)

**Eyebrow:** Case studies

**H1:** Real campaigns. Real clients. Every number from the sending account.

**Subhead:** Six engagements across SaaS, PR tech, parking compliance, recruitment and fundraising. Each one shows the full funnel, from emails sent to meetings held, so you can judge the work yourself.

**Filter chips:** All · SaaS · Hard markets · Fundraising · Recruitment

### 1.2 Index cards (in this order)

| # | Client | Tag | Card headline | Stat chip 1 | Stat chip 2 |
|---|---|---|---|---|---|
| 1 | Parking Compliance Systems | Hard markets | 26 qualified leads a day from parking lot owners | 26 qualified leads / day | 1 in ~100 emails |
| 2 | Spotlight by SkyHigh Creatives | SaaS | 159 qualified opportunities in 90 days | 159 opportunities | 221,400 emails |
| 3 | Networked | SaaS | 81 sales meetings in one month | 81 meetings / month | 34 in one day |
| 4 | GraiAI | SaaS | 12 qualified meetings in the first 3 weeks | 12 meetings | 21 days live |
| 5 | Networked | Fundraising | $1.2M raised from 18 investors in 90 days | $1.2M raised | 132 investor meetings held |
| 6 | Specialist sales recruitment firm | Recruitment | 475 senior sales professionals raised their hand in 30 days | 475 interested | 1 in 115 emails |

### 1.3 Definitions (show as a collapsible "How we count" panel on every case study page)

- **Emails sent:** every email delivered by the sequencer, first touches and follow-ups combined.
- **Reply rate:** replies divided by leads contacted, as reported by Instantly.
- **Positive reply:** a reply showing interest. Not a meeting yet.
- **Qualified opportunity:** a positive reply from a decision-maker at a company that fits the client's ICP, flagged as an opportunity in Instantly.
- **Qualified meeting:** a booked call with a decision-maker that meets the client's qualification criteria.
- **Attended:** the prospect actually showed up.

### 1.4 Shared CTA block (bottom of every page, headline changes per study)

**Button:** Book a strategy call
**Microcopy:** 30 minutes. We'll map your market and tell you honestly if outbound will work for it.

### 1.5 Proof line (small text under each dashboard)

"Totals pulled from the client's Instantly account. Dates shown are the campaign window."

---

## 2. Dashboard build spec (applies to all six)

Each case study gets a native, animated dashboard that replaces the old Instantly screenshot. It should feel live without misrepresenting data.

**Components (all studies):**
- **KPI tiles** (3 or 4): numbers count up from 0 on scroll into view.
- **Funnel:** horizontal bars, sent → replies → positive → qualified → meetings (use only stages the study has). Bars animate left to right. Show conversion % between stages.
- **Volume chart:** daily sends as an area chart, positive replies as a line on a second axis. Draws in on load.
- **Activity feed:** a slow scrolling feed of event rows ("Positive reply · Owner · Private lot operator", "Meeting booked · VP Marketing · Hotel group"). Use role + company type only, never invented company or person names. A small label on the feed reads "Representative events".
- **Status pill:** "Campaign window: [dates]". Do not show a "LIVE" badge on finished campaigns. Only Parking Compliance Systems and GraiAI may show "Running".

**Data rule:** KPI tiles and funnel must equal the totals in this file exactly. If real daily data is not available, the volume chart may be smoothed from the totals, but it must sum to them and follow the ramp described in each study.

Per-study data blocks are at the end of each section as `DASHBOARD DATA`.

### 2.1 "One email from the campaign" component

Every study shows the real first-touch email that ran. Render it as an email card, not a code block:
- A mock inbox header: "From: [client sender]" left blank-styled, "To: {firstname}" and a subject line reading "First touch".
- Body text exactly as written in this file, line breaks preserved. Do not edit wording, punctuation or spacing.
- Merge variables (anything in curly braces) shown as small highlighted pills so readers see the personalization points.
- Caption under the card: "The first email in the sequence, as sent. Merge fields highlighted."
- On hover or tap, a pill shows a tooltip explaining where that data came from (given per study as `Merge field notes`).

---

## 3. Case study 1 · Parking Compliance Systems

**Slug:** `/case-studies/parking-compliance-systems`
**Eyebrow:** Parking Compliance Systems · Parking compliance software · Ongoing
**Logo:** Parking Compliance Systems (parkingcompliancesystems.com)

### H1
26 qualified leads a day from parking lot owners, a market most agencies won't touch

### Subhead
Parking Compliance Systems installs automated parking systems for the people who own parking lots and garages: plate-reading cameras, a payment app and automated enforcement, at zero upfront cost. We turned one of the smallest, least reachable buyer pools in B2B into a daily stream of qualified conversations.

### KPI tiles
- **26** qualified leads per day
- **2,500 to 2,800** emails sent per day
- **~1 in 100** emails becomes a qualified lead
- **5 min** from qualified reply to a human phone call

### Snapshot
- **Client:** Parking Compliance Systems
- **Sells:** Automated parking systems (plate-reading cameras, payment app, automated enforcement) with no install fee, no equipment cost and no monthly fee. The owner keeps the large majority of the lot's revenue.
- **Buyer:** Owners and operators of private lots, garages, mixed-use and third-party managed parking
- **Channels:** Cold email, plus human phone follow-up on every qualified reply
- **Status:** Running

### The situation
Parking Compliance Systems had an offer that makes lot owners money at no cost to them. The problem was reaching them. Parking owners are not on LinkedIn, rarely list a contact on their website and do not appear in the databases most agencies buy from.

Most owners also had no idea a system like this could be installed for free. Nobody was searching for it. Demand had to be created from scratch, inside the inbox.

### The hard part
This is a finite market. In most industries, when a list runs dry you buy another one. Here, there is no other one. Every contact burned by bad data, a spam folder or a weak email is a buyer you cannot replace.

### What we did

**1. We built the list nobody else has.**
No list provider covers this market well, so we built our own. We pulled parking lot and garage locations from Google Maps, then added locations listed on ParkMobile and PayByPhone, the payment apps drivers use at the meter. Each location was traced back to its owner or operator, enriched and verified. The result is the deepest owner and operator database we know of. Because every record started from a physical location, every email could name the exact lot.

**2. We led with the lot and the money, not the software.**
Owners don't wake up wanting software. They care about their property and what it earns. So the first email asks one question about one specific address, then makes an offer that is hard to say no to: the full system installed at zero upfront cost, nothing monthly, and the owner keeps most of the revenue. No feature list. No demo request. Just "worth me sending over how it works?" Each operator type got its own variation: private lots, mixed-use sites and third-party managed.

**3. We made speed the closer.**
Every qualified reply triggers a phone call from a real person within 5 minutes. The owner is still at their desk, still thinking about the email. That call turns interest into a booked conversation before it cools.

**Supporting systems:** the market is treated as one pool rotated in cycles, so no contact is burned in a single blast. Non-responders are re-engaged on a schedule. Deliverability is monitored daily across dedicated infrastructure, because a burned domain here costs leads that can never be replaced.

### One email from the campaign
```
Hi {firstname},

Quick one - do you own the lot on {address}?

Asking, because we can help you install an automated system for it - including plate-reading cameras, payment app, automated enforcement, at zero upfront cost.

No install fee, no equipment cost, nothing monthly - and you keep the large majority of what the lot brings in.

Worth me sending over how it works?

{signature}
```
**Merge field notes:**
- `{address}`: the lot's street address, from Google Maps, ParkMobile and PayByPhone location data.
- `{firstname}`: the owner or operator traced from that location.

**Why it works (one line under the card):** One question about their own property, a no-risk offer, and a low-effort yes.

### Results
- **26** qualified leads every day
- **500+** qualified leads a month
- **~1%** of emails sent turn into a qualified lead
- **Every** qualified lead called by a human within 5 minutes

### What it meant
A market other agencies called "not worth running outbound in" now produces a qualified lead roughly every 100 emails, every day. The system runs on a modest volume of 2,500 to 2,800 sends, so it protects a finite market instead of exhausting it.

If this works with parking lot owners, the maths in a normal market, with better data and buyers who already know the category, is not close.

### Quote slot
[Only a real quote. Hide if empty.]

### Built with
Google Maps scraping · ParkMobile and PayByPhone location data · Apify · Serper · Clay · Apollo · Mailtester Ninja · Instantly · Claude Code

### CTA headline
Selling into a small or hard-to-reach market? Let's map yours.

### DASHBOARD DATA
```
status: running
kpis: { qualified_per_day: 26, sends_per_day_min: 2500, sends_per_day_max: 2800, callback_minutes: 5 }
funnel (daily): sent 2650 → qualified 26 → human call within 5 min 26
chart: 30 days, daily sends 2500-2800 (flat, weekdays), qualified leads 22-30 per day averaging 26
feed roles: Owner · Private lot operator | GM · Parking garage | Operations Director · Third-party parking manager | Owner · Mixed-use property
```

---

## 4. Case study 2 · Spotlight by SkyHigh Creatives

**Slug:** `/case-studies/spotlight-skyhigh-creatives`
**Eyebrow:** Spotlight by SkyHigh Creatives · PR and AI visibility software · Under 90 days
**Logo:** SkyHigh Creatives / Spotlight (skyhighcreatives.com)

### H1
159 qualified opportunities in 90 days for Spotlight, by giving the work away first

### Subhead
Spotlight is the PR and AI-visibility platform built by SkyHigh Creatives, a media agency that has placed stories for 250+ brands since 2017. We took it into aviation, hotels and luxury resorts, where marketing leaders get pitched every day, and made them want to talk.

### KPI tiles
- **159** qualified opportunities
- **221,400** emails sent
- **~53** opportunities per month
- **Under 90** days

### Snapshot
- **Client:** SkyHigh Creatives, for its Spotlight platform
- **Sells:** A platform to pitch the press, track every placement and measure how often AI assistants name your brand
- **Buyer:** Marketing, communications and brand leaders
- **Verticals:** Aviation, hotels, luxury resorts
- **Channels:** Cold email with an AI reply agent, every response human-approved

### The situation
Spotlight is a new category. Buyers were not searching for an AI-visibility platform, so there was no demand to capture. It had to be created.

And the audience was the hardest possible one for a PR product: marketing and brand leaders at airlines, private aviation firms, hotel groups and luxury resorts. These people receive PR pitches all day. Another "quick call?" email would have been deleted on sight.

### The hard part
Asking for a meeting is what every other sender in that inbox does. To get attention, we had to do the opposite.

### What we did

**1. We gave first. We call it the Reverse Lead Magnet.**
The first email offered to write a finished feature on the prospect's company before any talk of placement. Every yes triggered our agent to research the brand and write a real, publish-ready article about it. Free. No call required. The prospect kept the draft either way, and held a finished asset before ever speaking to a salesperson.

**2. The free article was the demo.**
The article showed exactly what Spotlight and SkyHigh produce. Prospects didn't have to imagine the value. They were already holding it. We were the only sender in their inbox who had given something before asking for anything.

**3. We scaled only as fast as deliverability allowed.**
Sending ramped from about 2,000 to over 7,000 emails a day, step by step, only as inbox placement held. Each vertical ran its own angle and its own article format. Every reply was answered within 5 minutes, drafted by the agent and approved by a human before it went out.

**Supporting systems:** up to 8 follow-up touches per prospect and continuous re-engagement of earlier non-responders.

### One email from the campaign
```
Hello {firstname}, would a finished piece on {company} be of use?

Forbes, Bloomberg and Entrepreneur are the desks we write and place {category} features into. Before we discuss placing anything, I would write yours first, free.

Where it gets published is a separate conversation. You keep the draft regardless.

Want me to put it together?

{signature}
```
**Merge field notes:**
- `{company}`: the prospect's brand.
- `{category}`: the vertical, written per segment (aviation, hospitality, luxury travel).

**Why it works (one line under the card):** It gives before it asks, and removes the commitment: "you keep the draft regardless."

### Results

| Metric | Value |
|---|---|
| Emails sent | 221,400 |
| Reply rate | 1.75% |
| Replies | ~3,870 |
| Qualified opportunities | 159 |
| Opportunities per month | ~53 |
| Emails per opportunity | 1 in 1,392 |

### Why the meetings were different
Prospects arrived having already read their article. Calls started at "how do we do more of this" instead of "so what do you do?" People show up for the company that already gave them something.

### What it meant
159 buying conversations with aviation, hotel and luxury resort brands, from a standing start, inside one quarter. The free article is now a permanent part of how SkyHigh sells. It sits on their homepage today as "Get a free article."

### Quote slot
[Only a real quote. Hide if empty.]

### Built with
Apollo · Ocean.io · BuiltWith · SalesQL · Apify · Clay · Mailtester Ninja · Instantly · Claude (reply agent) · Slack (human approval)

### CTA headline
Selling into inboxes everyone else is pitching? Let's build you an offer they can't ignore.

### DASHBOARD DATA
```
status: completed
window: 90 days
kpis: { opportunities: 159, sent: 221400, per_month: 53, days: "<90" }
funnel: sent 221400 → replies 3870 (1.75%) → qualified opportunities 159 (4.1% of replies)
chart: daily sends ramp from ~2000 (week 1) to 7000+ (weeks 8-12), total 221400; opportunities rise with volume, total 159
segments (toggle tabs): Aviation | Hotels | Luxury resorts
feed roles: VP Marketing · Hotel group | Head of Brand · Private aviation | Communications Director · Luxury resort | CMO · Airline
```

---

## 5. Case study 3 · Networked (sales meetings)

**Slug:** `/case-studies/networked-sales-meetings`
**Eyebrow:** Networked · Community platform SaaS · Monthly engagement
**Logo:** Networked (networked.co)

### H1
81 sales meetings in a single month for Networked, with a record 34 in one day

### Subhead
Networked is a community platform used by more than 3,200 communities, from professional associations to creators. We made cold email their main source of sales meetings, at a volume their team had to reorganize around.

### KPI tiles
- **81** sales meetings in one month
- **34** meetings booked in a single day
- **3** new customers closed in one week
- **Near-zero** no-shows

### Snapshot
- **Client:** Networked
- **Sells:** A platform to build, run and monetize an online community, with events, memberships and native mobile apps
- **Buyer:** Businesses and organizations with clients or members to bring together: training and education providers, associations, professional networks and creators
- **Channel:** Cold email only

### The situation
Before working with us, Networked's lead flow came from a mix of channels and none of them were predictable. Some months were busy, others were quiet. That made the pipeline hard to plan and revenue hard to forecast.

### The hard part
Spreading effort across many channels meant none of them got mastered. The goal was one channel that produced meetings every week, at a volume the sales team could rely on.

### What we did

**1. We went all in on one channel.**
Every resource went into cold email. No paid ads, no partnerships, no organic experiments pulling focus. One channel, done properly.

**2. We wrote for the buyer, not the product.**
We built a tight profile of who buys a community platform and why. The copy opened with what the buyer wants for their own clients, a space to connect, share knowledge and learn together, then made it easy to start with a full 14-day trial. Each email was personalized to the prospect's industry and the specific value a community would add for them.

**3. We protected the inbox.**
Dedicated sending infrastructure, managed sender reputation and warm-up meant the emails landed in the primary inbox, not spam, at volume.

**Supporting systems:** every reply answered within 5 minutes, an 8-touch follow-up cadence, and re-engagement campaigns that gave older leads a second and third chance.

### One email from the campaign
```
Hey {firstname}, noticed the awesome work you're doing at {company} in the {industry} space, so I wanted to ask… would you like to create a space where your clients can connect, share knowledge, and improve their learning experience together?

Our platform lets you build a 'custom community app' where clients can collaborate on {personalized value prop}. You can try it out for a full 14-day period until {date}.

Think you can benefit from this?

{signature}
```
**Merge field notes:**
- `{industry}`: the prospect's sector, from enrichment.
- `{personalized value prop}`: written per prospect from their website, describing what their clients would collaborate on.
- `{date}`: a real trial end date, 14 days out, so the offer feels concrete.

**Why it works (one line under the card):** It sells the outcome for their clients, then lowers the risk to zero with a dated free trial.

### Results
- **81** sales meetings in a single month
- **34** meetings booked in one day, a company record
- **20** interested replies within a few days of launch
- **3** customers closed in one week
- **Near-zero** no-shows

### What it meant
The volume was so high that Networked started running group sales sessions to handle it. Their sales calendar went from unpredictable to fully booked, from one channel.

### Quote slot
[Only a real quote. Hide if empty.]

### Built with
Clay · Apollo · Mailtester Ninja · Instantly

### CTA headline
Want a calendar your sales team has to reorganize around? Let's talk.

### DASHBOARD DATA
```
status: completed
window: 1 month
kpis: { meetings_month: 81, record_day: 34, closed_week: 3, no_shows: "near-zero" }
funnel: positive replies → meetings booked 81 → attended (near-zero no-shows)
chart: calendar heatmap of the month, 81 meetings total, one day highlighted at 34 with label "Company record"
feed roles: Founder · Professional association | Community Director · Industry network | Creator · Paid membership community | Executive Director · Nonprofit network
```

---

## 6. Case study 4 · GraiAI

**Slug:** `/case-studies/graiai`
**Eyebrow:** GraiAI · AI research software · First 3 weeks
**Logo:** GraiAI (graiai.io)

### H1
12 qualified meetings in GraiAI's first 3 weeks of outbound

### Subhead
GraiAI is an AI research agent. Researchers affiliated with 80+ institutions, including Georgia Tech, Carnegie Mellon and Cornell, have run more than 1,500 projects on it. This is what the first 21 days of a Revenue Inbox engagement look like, from a cold start.

### KPI tiles
- **12** qualified meetings booked
- **25** opportunities
- **45,000** emails sent
- **21** days live

### Snapshot
- **Client:** GraiAI
- **Sells:** An AI research agent for academic and applied research
- **Buyer:** Researchers, faculty and research teams at universities and research-led organizations
- **Channel:** Cold email
- **Status:** Running

### The situation
GraiAI came to us with no outbound running. No sending infrastructure, no lists, no tested copy. Everything was built from zero.

### Why we're showing a 3-week result
Most case studies show a best month after a year of tuning. This one shows the start. If you're deciding whether to work with us, the first three weeks are what you'll actually experience.

### What we did

**1. We built and warmed the infrastructure for them.**
Domains, mailboxes and warm-up were set up and managed on GraiAI's behalf. They didn't touch a single DNS record.

**2. We built a list around their real buyer.**
Targeting was modelled on the researchers already using GraiAI, then enriched and verified so every email reached an active researcher in a relevant field.

**3. We let the product sell itself.**
Researchers are skeptical of AI claims. So the email leads with proof they respect, the institutions whose researchers already use it, and removes the cost of trying: $100 in credits to test it on their own work.

**4. We launched small and scaled on proof.**
Sending started conservatively and increased only as inbox placement held, reaching 45,000 emails by day 21.

### One email from the campaign
```
Hi {first name}, interested in an AI research agent that helps you {value prop}?

Researchers affiliated with 80+ institutions, including Georgia Tech, Carnegie Mellon and Cornell, have carried out more than 1,500 projects on the platform.

P.S. I'll add $100 in credits so you can test it for yourself.

{signature}
```
**Merge field notes:**
- `{value prop}`: written per researcher from their field and recent work.

**Why it works (one line under the card):** Peer proof researchers trust, plus a free way to test it on their own work.

### Results

| Metric | Value |
|---|---|
| Days live | 21 |
| Emails sent | 45,000 |
| Reply rate | 1.12% |
| Replies | ~500 |
| Opportunities | 25 |
| Qualified meetings booked | 12 |
| Opportunity to meeting | 48% |

### What it meant
Our standard promise is 10 qualified meetings in 30 days. GraiAI passed it in 21. And the campaign is still ramping.

### Quote slot
[Only a real quote. Hide if empty.]

### Built with
Clay · Apollo · Mailtester Ninja · Instantly

### CTA headline
Want to see what your first 3 weeks could look like? Book a call.

### DASHBOARD DATA
```
status: running
window: first 21 days
kpis: { meetings: 12, opportunities: 25, sent: 45000, days: 21 }
funnel: sent 45000 → replies ~504 (1.12%) → opportunities 25 → qualified meetings 12
chart: 21 days, daily sends ramping up, total 45000; meetings as step line reaching 12; dashed horizontal marker at 10 labelled "30-day guarantee"
feed roles: Associate Professor · Engineering | PhD Researcher · Computational biology | Research Lead · Applied AI lab | Postdoctoral Fellow · Economics
```

---

## 7. Case study 5 · Networked (fundraising)

**Slug:** `/case-studies/networked-fundraise`
**Eyebrow:** Networked · Investor outreach · 90 days
**Logo:** Networked (networked.co)

### H1
$1.2M raised from 18 investors in 90 days, with cold email as the only channel

### Subhead
Networked needed to raise capital without a large warm network to lean on. We built an investor outreach system that filled the founder's calendar with investor meetings, up to 18 in a single day.

### KPI tiles
- **$1.2M** raised
- **18** investors closed
- **132** investor meetings held
- **90** days

### Snapshot
- **Client:** Networked
- **Goal:** Raise capital
- **Audience:** Angel investors and funds matching Networked's stage and sector
- **Channel:** Cold email only

### The situation
Fundraising usually runs on warm introductions. Networked's network was limited, and introductions were slow. They needed to get in front of over 100 qualified investors quickly, and a way to manage the follow-up at scale.

### The hard part
Investors get pitched constantly, and most cold pitches never get a reply. The system had to produce real conversations, and then handle more of them than one founder could manage alone.

### What we did

**1. We started from the network they had.**
We mapped the connections of roughly 300 existing contacts and found investors who shared a mutual connection with the founder. Every first email opened with that shared name, so it read like a warm introduction, not a cold pitch.

**2. We ran it in weekly waves.**
Investors were contacted in structured weekly campaigns instead of one big blast, so every wave could be adjusted based on the last.

**3. We ran the founder's calendar.**
Every reply was answered within 5 minutes. Up to 8 follow-up touches recovered investors who didn't respond the first time. About 40% of interested investors booked a meeting.

### One email from the campaign
```
Hi {firstName},

Saw we're both connected with {name} and thought I'd reach out.

I'm building {appName}, a platform where creators can run paid communities, host events, and keep members engaged in one place, similar to Circle and Mighty Networks.

We're looking for an early investor to help us bring it to market. Would you be open to a quick look at what we're building?

{signature}
```
**Merge field notes:**
- `{name}`: a real mutual connection between the founder and the investor, from the mapped network of ~300 contacts.
- `{appName}`: Networked.

**Why it works (one line under the card):** A shared connection turns a cold pitch into a warm one, and naming known comparables makes the business instantly clear.

### Results

| Metric | Value |
|---|---|
| Investors contacted | 22,451 |
| Emails sent (incl. follow-ups) | 67,136 |
| Reply rate | 5.09% |
| Positive replies | 470 |
| Emails per positive reply | 1 in 143 |
| Meetings booked | 188 |
| Meetings held | 132 |
| Investors closed | 18 |
| Capital raised | $1.2M |

### What it meant
At the peak, the founder had up to 18 investor meetings in a single day, and new meetings were being booked a month out. Cold email went from an experiment to the channel that closed the round.

The total cost of the engagement, tools and fees included, came to under 2% of the capital raised.

### Quote slot
[Only a real quote. Hide if empty.]

### Built with
Clay · Apollo · Mailtester Ninja · Instantly

### CTA headline
Raising a round without the warm intros? Let's talk.

### DASHBOARD DATA
```
status: completed
window: 90 days
kpis: { raised: 1200000, investors: 18, meetings_held: 132, days: 90 }
funnel: contacted 22451 → positive replies 470 → booked 188 (40%) → held 132 (70%) → closed 18 (13.6%)
chart: 12 weekly bars of positive replies summing to 470; cumulative capital line reaching $1.2M
calendar widget: one day showing 18 meetings, labelled "Peak day"
feed roles: Angel investor | Partner · Seed fund | Principal · Venture fund | Family office
```

---

## 8. Case study 6 · Sales recruitment (anonymized)

**Slug:** `/case-studies/sales-recruitment`
**Eyebrow:** Specialist sales recruitment firm · Recruitment · 30 days
**Logo:** none. Use a neutral industry icon and the label "Client name withheld at their request."

### H1
475 senior sales professionals raised their hand in 30 days

### Subhead
A specialist recruitment firm that places senior sales talent needed a steady supply of experienced candidates. These people ignore recruiters on LinkedIn. We reached them by email instead.

### KPI tiles
- **475** interested candidates
- **30** days
- **1 in 115** emails produced an interested reply
- **2.45%** reply rate

### Snapshot
- **Client:** Specialist sales recruitment firm (name withheld)
- **Goal:** A daily pipeline of qualified senior sales candidates
- **Audience:** Senior sales professionals, including account executives, sales managers, directors and heads of sales, across corporate and community-led companies
- **Channels:** Work and personal email addresses

### The situation
Senior sales professionals are the most recruited people on LinkedIn. Their inboxes there are full of templated recruiter messages, and most go unread. Our client needed to stand out in an overcrowded hiring market and keep a consistent flow of qualified candidates coming in every day.

### The hard part
The best candidates are not looking. They are busy hitting quota. The outreach had to earn a reply from people who rarely answer recruiters at all.

### What we did

**1. We built tight candidate lists.**
Lists were built around seniority, sales role and company type, so every email went to someone the client could actually place.

**2. We moved off LinkedIn and led with the details.**
Personalized email replaced the LinkedIn messages these candidates had learned to ignore. Instead of a vague "exciting opportunity," every email named the industry, the role, the size of the team they would lead and the pay on offer, and offered to send the full details before asking for a call. We tested work and personal addresses side by side to see where candidates responded best.

**3. We optimized every week.**
Campaigns were adjusted weekly based on the quality of replies, not just the number, so the pipeline improved as it grew.

### One email from the campaign
```
Hi {firstname}

Your experience at {company} caught my eye. We're helping a {industry} company hire a {roleTitle} to lead {teamSize} salespeople, with {compensationRange} on offer.

Would you be open to seeing the details? Happy to send them over before asking for a call.

{signature}
```
**Merge field notes:**
- `{company}`: the candidate's current employer.
- `{roleTitle}`, `{teamSize}`, `{compensationRange}`: pulled from the live role being filled.

**Why it works (one line under the card):** Real numbers up front, and no call required to see them. Senior sellers respect that.

### Results

| Metric | Value |
|---|---|
| Campaign length | 30 days |
| Emails sent | ~54,600 |
| Reply rate | 2.45% |
| Interested candidates | 475 |
| Emails per interested reply | 1 in 115 |

### What it meant
475 experienced sales professionals asked to hear more in a single month. That's a pipeline the client could not have built through LinkedIn alone, from people who almost never reply to recruiters.

### Quote slot
[Only a real quote. Hide if empty.]

### Built with
Clay · Apollo · Mailtester Ninja · Instantly

### CTA headline
Recruiting people who never answer recruiters? Let's talk.

### DASHBOARD DATA
```
status: completed
window: 30 days
kpis: { interested: 475, days: 30, emails_per_interested: 115, reply_rate: 2.45 }
funnel: sent ~54600 → replies ~1340 (2.45%) → interested 475
chart: 30 days of daily interested replies summing to 475, weekly optimization markers on days 7, 14, 21
split toggle: Work email vs Personal email (show labels only unless real split is provided)
feed roles: Account Executive · B2B SaaS | Sales Director · Enterprise software | Head of Sales · Fintech | Sales Manager · Community platform
```
