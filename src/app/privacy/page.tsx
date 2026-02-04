import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | FinFit Blog',
  description: 'Privacy policy for FinFit Blog - how we collect, use, and protect your data.',
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Information We Collect
            </h2>
            <p className="text-muted-foreground">
              FinFit Blog is committed to protecting your privacy. We collect minimal information necessary to provide you with the best user experience:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Analytics data through cookies and similar technologies</li>
              <li>Information you voluntarily provide through contact forms</li>
              <li>Technical information such as IP address and browser type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground">
              We use collected information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Improve our website and user experience</li>
              <li>Analyze traffic and website usage patterns</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you relevant content (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Personalize content and advertisements</li>
            </ul>
            <p className="text-muted-foreground">
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground">
              We may use third-party services for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Website analytics (Google Analytics)</li>
              <li>Social media integration</li>
              <li>Content delivery networks</li>
            </ul>
            <p className="text-muted-foreground">
              These services have their own privacy policies which we recommend reviewing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Data Security
            </h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Your Rights
            </h2>
            <p className="text-muted-foreground">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Children's Privacy
            </h2>
            <p className="text-muted-foreground">
              Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: privacy@finfit.blog<br />
              Website: finfit.blog
            </p>
          </section>

          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}