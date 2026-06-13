import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Pup AI — the rules and conditions for using the app.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-gray-500 text-sm mb-12">Pup AI &mdash; Last updated June 13, 2025</p>

      <div className="prose prose-gray max-w-none space-y-10">

        <p className="text-gray-600 leading-relaxed">
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Pup AI, operated by Pup AI
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By downloading or using Pup AI, you agree to these
          Terms. If you do not agree, do not use the app.
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Description of Service</h2>
          <p className="text-gray-600 leading-relaxed">
            Pup AI is a mobile application that uses AI to identify dog breeds from photos, provide
            health assessments, analyze barking, and offer breed-related information. The service is
            provided for informational and entertainment purposes.
          </p>
          <p className="text-gray-600 mt-3 leading-relaxed">
            <strong>Pup AI is not a substitute for professional veterinary advice.</strong> Always
            consult a licensed veterinarian for health concerns about your pet. Health scan results
            are AI-generated assessments and should not be used as medical diagnoses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Eligibility and Accounts</h2>
          <p className="text-gray-600 leading-relaxed">
            You must be at least 13 years old to use Pup AI. You are responsible for maintaining
            the security of your account and for all activity that occurs under it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Free Tier and Premium Subscription</h2>
          <ul className="space-y-2 text-gray-600 list-disc list-inside leading-relaxed">
            <li>The Premium subscription is billed annually at the price shown at purchase.</li>
            <li>A 7-day free trial is available for new subscribers. You will be charged at the end of the trial unless you cancel before it ends.</li>
            <li>Subscriptions auto-renew unless cancelled at least 24 hours before the renewal date.</li>
            <li>Manage or cancel your subscription through your App Store or Google Play account settings.</li>
            <li>We do not offer refunds for partial subscription periods, except as required by law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Rewarded Advertisements</h2>
          <p className="text-gray-600 leading-relaxed">
            Free users may optionally watch rewarded video ads in exchange for additional scans.
            This is entirely voluntary. We use Google AdMob to serve these ads.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. User Content</h2>
          <p className="text-gray-600 mb-3 leading-relaxed">By posting content to the community feed, you:</p>
          <ul className="space-y-2 text-gray-600 list-disc list-inside leading-relaxed">
            <li>Confirm you own or have rights to the content you post.</li>
            <li>Grant Pup AI a non-exclusive, royalty-free license to display the content within the app.</li>
            <li>Agree not to post content that is offensive, harmful, illegal, or violates third-party rights.</li>
          </ul>
          <p className="text-gray-600 mt-3 leading-relaxed">
            We reserve the right to remove content that violates these Terms without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Prohibited Uses</h2>
          <ul className="space-y-2 text-gray-600 list-disc list-inside leading-relaxed">
            <li>Using the app for any unlawful purpose.</li>
            <li>Attempting to reverse-engineer or tamper with the app.</li>
            <li>Using automated tools to access the service beyond normal use.</li>
            <li>Sharing, selling, or transferring your account.</li>
            <li>Posting content involving animal cruelty or harm.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">
            All content in Pup AI — including the app design, AI models, breed data, and written
            content (excluding user-submitted content) — is owned by or licensed to Pup AI and
            protected by applicable copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Disclaimers</h2>
          <p className="text-gray-600 mb-3 leading-relaxed">
            Pup AI is provided &ldquo;as is&rdquo; without warranties of any kind. We do not warrant that:
          </p>
          <ul className="space-y-2 text-gray-600 list-disc list-inside leading-relaxed">
            <li>Breed identification results will be accurate in all cases.</li>
            <li>Health scan results constitute a veterinary diagnosis.</li>
            <li>The service will be uninterrupted or error-free.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            To the fullest extent permitted by law, Pup AI shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of the app, including reliance
            on breed identification or health assessment results for veterinary decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Termination</h2>
          <p className="text-gray-600 leading-relaxed">
            We may suspend or terminate your account if you violate these Terms. You may delete your
            account at any time by contacting{' '}
            <a href="mailto:support@pupai.app" className="text-amber-500 hover:underline">support@pupai.app</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">11. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms are governed by the laws of Ontario, Canada, without regard to conflict
            of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">12. Changes to These Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these Terms from time to time. Continued use of the app after changes
            are posted constitutes your acceptance of the updated Terms.
          </p>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about these Terms?{' '}
            <a href="mailto:support@pupai.app" className="text-amber-500 hover:underline">support@pupai.app</a>
          </p>
        </section>

      </div>
    </div>
  )
}
