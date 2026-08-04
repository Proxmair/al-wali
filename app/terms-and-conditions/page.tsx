import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-950 mb-4">
            Terms &amp; Conditions
          </h1>

          <p className="text-lg text-foreground/70 font-semibold">
            Effective Date: July 31, 2026
          </p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-8">
          <div>
            <p>
              Welcome to <strong>Al Wali</strong>. By accessing or using{" "}
              <a
                href="https://www.alwali.store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                www.alwali.store
              </a>
              , you agree to comply with the following Terms &amp; Conditions.
              Please read them carefully before placing an order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              1. General
            </h2>

            <p className="mb-4">
              By using this website, you confirm that you are at least 13 years
              old or are using the website under the supervision of a parent or
              legal guardian.
            </p>

            <p>
              We reserve the right to modify these Terms &amp; Conditions at any
              time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              2. Products
            </h2>

            <p>
              We strive to display our products as accurately as possible.
              However, due to lighting, screen settings, and photography, actual
              product colors or packaging may vary slightly from the images
              shown.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              3. Pricing
            </h2>

            <p className="mb-4">
              All prices displayed on our website are in Pakistani Rupees
              (PKR).
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Prices may change without prior notice.</li>
              <li>We reserve the right to correct pricing errors at any time.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              4. Orders
            </h2>

            <p className="mb-4">
              After placing an order, you will receive an order confirmation.
            </p>

            <p className="mb-4">
              We reserve the right to cancel or refuse any order due to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Incorrect pricing</li>
              <li>Product unavailability</li>
              <li>Suspicious or fraudulent activity</li>
              <li>Incomplete customer information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              5. Shipping
            </h2>

            <p className="mb-4">
              Shipping times are estimates and may vary depending on your
              location, courier operations, weather conditions, or public
              holidays.
            </p>

            <p>
              Al Wali is not responsible for delays caused by third-party
              courier services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              6. Payments
            </h2>

            <p className="mb-4">
              We currently accept Cash on Delivery (COD) only. You can pay for your order when it is delivered to your doorstep.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              7. Returns &amp; Refunds
            </h2>

            <p>
              We offer a hassle-free 7-day return policy. If you're not satisfied with your purchase for any reason, you can return it within 7 days of delivery. The product should be in its original, unopened condition.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              8. Intellectual Property
            </h2>

            <p>
              All content on this website, including logos, product images,
              graphics, text, videos, and designs, is the property of Al Wali
              and may not be copied, reproduced, or used without written
              permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              9. User Conduct
            </h2>

            <p className="mb-4">Users agree not to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide false information.</li>
              <li>Attempt unauthorized access to our systems.</li>
              <li>Use the website for unlawful purposes.</li>
              <li>Interfere with the website's functionality or security.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              10. Limitation of Liability
            </h2>

            <p>
              Al Wali shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our website or
              products, except where required by applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              11. Privacy
            </h2>

            <p className="mb-4">
              Your personal information is handled according to our Privacy
              Policy.
            </p>

            <p>
              By using this website, you agree to the collection and use of
              information as described in our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              12. Governing Law
            </h2>

            <p className="mb-4">
              These Terms &amp; Conditions shall be governed by the laws of the
              Islamic Republic of Pakistan.
            </p>

            <p>
              Any disputes shall be subject to the jurisdiction of the courts of
              Pakistan.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-card">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              13. Contact Information
            </h2>

            <p className="mb-6">
              If you have any questions regarding these Terms &amp; Conditions,
              please contact us:
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
                <strong>WhatsApp:</strong>{" "}
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