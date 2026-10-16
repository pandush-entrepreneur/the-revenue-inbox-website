# Google setup

## Website implementation

Measurement ID: `G-7B80MZJWGJ`, supplied by Pandush. The shared page builder includes analytics.js on the homepage, case pages, blog and author pages. The runtime activates only on therevenueinbox.com/www.therevenueinbox.com and skips noindex documents. Local and review traffic is excluded. A single GA4 config command supplies the automatic page view; there is no second manual page_view.

Custom events use the site's existing event bus:

| Event | Meaning | Extra parameters |
|---|---|---|
| cta_click | Strategy-call link clicked, not a booked call | location |
| strategy_call_booked | Calendly embed reports event_scheduled | location |
| video_play | Testimonial play initiated, not completed viewing | video |
| faq_open | FAQ expanded | question |
| roi_toggle | ROI model adjusted | contract_value, close_rate |
| pricing_toggle | Appointment volume adjusted | appointments, total |
| article_calculator | Article cost model adjusted | appointments, total |
| template_copy | Template successfully copied | template |
| case_filter | Case index filtered | category |
| campaign_segment | Case activity segment changed | segment |

Every custom event includes page_path and send_to. Slider events are debounced for 350ms. Only allowlisted primitive fields are forwarded. Calendly payloads, invitee details, appointment identifiers, names and email addresses are not forwarded. Page URLs retain standard UTM parameters; other query parameters and fragments are removed from the configured page_location. Referrer queries are removed. Google Signals and ad-personalization signals are disabled in the code. This is implementation documentation, not a review of account-side privacy, collection or consent settings.

Calendly's official JavaScript embed loads only after a booking click. It emits the documented scheduled event. The parent validates origin and iframe source and deduplicates the event identifier in memory. The identifier is not sent to GA4. Script failure falls back to the direct iframe; that fallback and direct external bookings do not have verified completion tracking. A browser-reported booking is not an attended or ICP-qualified meeting. Real completion receipt still needs confirmation from an actual booking in GA4; tests do not create appointments.

## Search Console

Pandush reports that the Domain property `therevenueinbox.com` is already verified under the account described as pandushlice.com. Public DNS was independently checked on 16 October 2026 and contains the exact supplied verification record. No DNS record, ownership or Google account was changed. DNS presence alone does not grant this agent access to private Search Console reports.

The public sitemap is https://www.therevenueinbox.com/sitemap.xml and currently lists 16 canonical pages. It is declared in robots.txt. Published articles are index,follow. These checks do not prove Google indexation. The sitemap's actual Search Console submission status, Page Indexing report and URL Inspection results have not yet been inspected in the account.

## Account connection and remaining actions

This environment has no available signed-in Google browser or connected Google reporting account. Windsor.ai was found as an optional reporting connection, not installed or connected on the user's behalf. Connect it with the owning Google account, then choose this Search Console property and the GA4 property containing G-7B80MZJWGJ. This enables report access where supported; do not assume it grants sitemap submission or Analytics-admin write operations.

In the owning Google account, complete these steps, or give the same checklist to an agent with actual authenticated access:

1. Search Console: select the existing Domain property. In Sitemaps, inspect the existing submission first. If absent, submit `https://www.therevenueinbox.com/sitemap.xml`; if already successful, leave it. Record the submitted/last-read status and any errors.
2. Inspect the homepage, /blog and a published article with URL Inspection. Record index status, Google-selected canonical and crawl status. Request indexing for a small number of newly published URLs if needed; do not repeatedly submit every URL.
3. GA4: open the property whose Web stream Measurement ID is `G-7B80MZJWGJ`. Verify a real visit in Realtime/DebugView. Do not treat successful browser transport alone as proof of the correct property's report contents.
4. In GA4 Admin > Product links > Search Console Links, link the verified Domain property to the matching Web stream. An existing correct link should be retained. This needs the appropriate GA4 Editor/verified-owner permissions.
5. In GA4's event/key-event administration, configure `strategy_call_booked` as a key event. Keep cta_click as a secondary action; do not label it an appointment. Confirm a genuine booking later, without creating fake appointments for analytics tests.
6. If desired, publish GA4's Search Console report collection from Reports > Library. Linking does not automatically make that collection visible.

Do not create a duplicate Search Console property or change the existing verification token. Do not send passwords, recovery codes or private credentials in chat.

## References

- [Google: page views](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Google: custom events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Google: Search Console linking](https://support.google.com/analytics/answer/10737381?hl=en)
- [Google: sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Calendly: official embed and events](https://calendly.com/help/advanced-calendly-embed-for-developers)
