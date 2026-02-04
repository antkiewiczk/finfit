import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | FinFit Blog',
  description: 'Terms of service for FinFit Blog - rules and guidelines for using our website.',
}

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using FinFit Blog, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Use License
            </h2>
            <p className="text-muted-foreground">
              Permission is granted to temporarily download one copy of the materials on FinFit Blog for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on FinFit Blog</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Content
            </h2>
            <p className="text-muted-foreground">
              The content on FinFit Blog is for informational purposes only. While we strive to provide accurate and up-to-date information, we make no warranties about the completeness, reliability, or accuracy of any information.
            </p>
            <p className="text-muted-foreground">
              Always consult with qualified professionals before making financial or health decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Disclaimer
            </h2>
            <p className="text-muted-foreground">
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>excludes all representations and warranties relating to this website and its contents or which are or may be provided by any affiliates or any other third party</li>
              <li>excludes all liability for damages arising out of or in connection with your use of this website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Financial and Health Advice
            </h2>
            <p className="text-muted-foreground">
              The content on FinFit Blog is not intended as financial or medical advice. Always consult with qualified professionals before making decisions about your finances or health.
            </p>
            <p className="text-muted-foreground">
              We are not responsible for any actions taken based on information provided on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              All content, including text, images, graphics, and other materials on FinFit Blog is the property of FinFit Blog or its content suppliers and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              User Conduct
            </h2>
            <p className="text-muted-foreground">
              You agree not to use our website to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>violate any applicable laws or regulations</li>
              <li>infringe on intellectual property rights</li>
              <li>transmit harmful, offensive, or inappropriate content</li>
              <li>attempt to gain unauthorized access to our systems</li>
              <li>interfere with or disrupt the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Privacy
            </h2>
            <p className="text-muted-foreground">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of this website, to understand our practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Links to Other Websites
            </h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              In no event shall FinFit Blog, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Termination
            </h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Governing Law
            </h2>
            <p className="text-muted-foreground">
              These terms shall be interpreted and governed by the laws of the jurisdiction in which our main office operates, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Changes to Terms
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. If we do, we will post the updated terms on this page and update the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Contact Information
            </h2>
            <p className="text-muted-foreground">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: legal@finfit.blog<br />
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