import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Pup AI — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-12">Pup AI &mdash; Last updated June 13, 2025</p>

      <div className="prose prose-gray max-w-none space-y-10">

        <p className="text-gray-600 leading-relaxed">
          Pup AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a mobile application that uses artificial
          intelligence to identify dog breeds from photos and provide pet care information. This Privacy
          Policy explains what information we collect, how we use it, and your rights regarding that
          information. By using Pup AI you agree to this policy.
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
          <ul className="space-y-2 text-gray-600 list-disc list-inside leading-relaxed">
            <li><strong>Account information</strong> — your name and email address when you create an account.</li>
            <li><strong>Photos</strong> — images you submit for breed identification, health scanning, or community posts. Photos are processed by our AI and are not stored permanently unless you post them to the community feed.</li>
            <li><strong>Audio recordings</strong> — short clips for the Bark Analyzer feature. Processed for analysis only and not stored after a result is returned.</li>
            <li><strong>Scan history</strong> — breed scan results (name, confidence score, date), stored on your device and, for signed-in users, on our servers.</li>
            <li><strong>Usage data</strong> — how you use the app, including features accessed and scan counts.</li>
            <li><strong>Device identifiers</strong> — anonymous identifiers used by our subscription and analytics providers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <ul className="space-y-2 text-gray-600 list-disc list-inside leading-relaxed">
            <li>To provide breed identification, health scanning, bark analysis, and expert chat features.</li>
            <li>To manage your account and subscription status.</li>
            <li>To enforce daily scan limits for free users.</li>
            <li>To display your scan history and saved results.</li>
            <li>To send optional push notifications about care tips (you can turn these off at any time).</li>
            <li>To display relevant product recommendations via Amazon affiliate links.</li>
            <li>To show rewarded video ads to free users who opt in for a bonus scan.</li>
            <li>To improve and personalize the app experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Third-Party Services</h2>
          <p className="text-gray-600 mb-3 leading-relaxed">Pup AI uses the following third-party services, each with their own privacy policies:</p>
          <ul className="space-y-2 text-gray-600 list-disc list-inside leading-relaxed">
            <li><strong>Firebase (Google)</strong> — authentication and backend services.</li>
            <li><strong>Supabase</strong> — database storage for user accounts, scan history, and community posts.</li>
            <li><strong>RevenueCat</strong> — subscription and purchase management.</li>
            <li><strong>Google AdMob</strong> — rewarded video ads shown to free users who opt in.</li>
            <li><strong>Amazon Associates</strong> — affiliate product links on breed result pages.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Camera and Microphone Access</h2>
          <p className="text-gray-600 leading-relaxed">
            Pup AI requests camera access to capture photos for breed scanning and microphone access
            exclusively for the Bark Analyzer. We do not record or transmit camera or microphone input
            for any purpose beyond the specific feature you are actively using. You can revoke these
            permissions at any time in your device settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
          <p className="text-gray-600 leading-relaxed">
            Scan results are stored locally on your device until you delete them. For signed-in users,
            history is also stored on our servers until you delete your account. Audio and photo data
            submitted for AI analysis is not stored after the result is returned.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We use encrypted connections (HTTPS/TLS) and secure cloud infrastructure to protect your
            data. No method of internet transmission is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Children&apos;s Privacy</h2>
          <p className="text-gray-600 leading-relaxed">
            Pup AI is not directed at children under 13. We do not knowingly collect personal
            information from children under 13. Contact us if you believe a child has provided us
            with personal information and we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Your Rights</h2>
          <p className="text-gray-600 mb-3 leading-relaxed">You have the right to:</p>
          <ul className="space-y-2 text-gray-600 list-disc list-inside leading-relaxed">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your account and associated data.</li>
            <li>Opt out of push notifications at any time through your device settings.</li>
          </ul>
          <p className="text-gray-600 mt-3 leading-relaxed">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:support@pupai.app" className="text-amber-500 hover:underline">support@pupai.app</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this policy from time to time. We will notify you of material changes by
            updating the date at the top of this page. Continued use of Pup AI after changes are
            posted constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about this Privacy Policy?{' '}
            <a href="mailto:support@pupai.app" className="text-amber-500 hover:underline">support@pupai.app</a>
          </p>
        </section>

      </div>
    </div>
  )
}
