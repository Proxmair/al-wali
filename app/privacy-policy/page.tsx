import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-950 mb-4">
            Privacy Policy
          </h1>

          <p className="text-lg text-foreground/70 font-semibold">
            Effective Date: July 31, 2026
          </p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-8">
          <div>
            <p>
              Welcome to <strong>Al Wali</strong>. Your
              privacy is important to us. This Privacy Policy explains how we
              collect, use, and protect your personal information when you visit
              or make a purchase from{" "}
              <a
                href="https://www.alwali.store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                www.alwali.store
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              1. Information We Collect
            </h2>

            <p className="mb-4">
              When you use our website, we may collect:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Shipping &amp; Billing Address</li>
              <li>Order Details</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              2. How We Use Your Information
            </h2>

            <p className="mb-4">We use your information to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Process and deliver your orders.</li>
              <li>Provide customer support.</li>
              <li>Improve our website and shopping experience.</li>
              <li>Send order confirmations and shipping updates.</li>
              <li>Prevent fraud and maintain website security.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              3. Third-Party Services
            </h2>

            <p className="mb-4">
              We may use trusted third-party services including:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Google Analytics</li>
              <li>Meta Pixel</li>
              <li>Email marketing services</li>
            </ul>

            <p className="mt-4">
              These services may collect information according to their own
              privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              4. Data Security
            </h2>

            <p>
              We take reasonable security measures to protect your personal
              information from unauthorized access, misuse, alteration, or
              disclosure. However, no online system can guarantee 100% security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              5. Data Sharing
            </h2>

            <p className="mb-4">
              We do not sell, rent, or trade your personal information.
            </p>

            <p>
              Your information may only be shared with trusted service providers
              when necessary to process your order or comply with legal
              requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              6. Your Rights
            </h2>

            <p className="mb-4">You may request to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information.</li>
              <li>Correct inaccurate information.</li>
              <li>
                Delete your personal information where legally permitted.
              </li>
              <li>Contact us regarding any privacy concerns.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              7. Children's Privacy
            </h2>

            <p>
              Our website is not intended for children under the age of 13. We
              do not knowingly collect personal information from children.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              8. Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time. Any updates
              will be posted on this page with the revised effective date.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-card">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              9. Contact Us
            </h2>

            <p className="mb-6">
              If you have any questions regarding this Privacy Policy, please
              contact us:
            </p>

            <div className="space-y-2">
              <p>
                <strong>Al Wali</strong>
              </p>

              <p>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.alwali.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://www.alwali.store
                </a>
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:alwali.store3@gmail.com"
                  className="text-primary hover:underline"
                >
                  alwali.store3@gmail.com
                </a>
              </p>

              <p>
                <strong>Phone / WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/923350004779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  03350004779
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;