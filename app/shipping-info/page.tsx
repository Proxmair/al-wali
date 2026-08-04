import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-950 mb-4">
            Shipping Policy
          </h1>

          <p className="text-lg text-foreground/70 font-semibold">
            Effective Date: August 1, 2026
          </p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-8">
          <div>
            <p>
              Thank you for shopping with <strong>Al Wali</strong>. We are
              committed to delivering your order safely and as quickly as
              possible.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              1. Order Processing
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Orders are processed within 1–2 business days after
                confirmation.
              </li>
              <li>
                Orders placed on weekends or public holidays will be processed
                on the next business day.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              2. Shipping Coverage
            </h2>

            <p>
              We currently deliver across Pakistan through our trusted courier
              partners.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              3. Estimated Delivery Time
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Karachi: 1–3 business days</li>
              <li>Major Cities: 2–4 business days</li>
              <li>Other Areas: 3–7 business days</li>
            </ul>

            <p className="mt-4">
              Delivery times are estimates and may vary depending on courier
              operations, weather conditions, or public holidays.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              4. Shipping Charges
            </h2>

            <p>
              Shipping charges (if applicable) will be displayed during
              checkout before you complete your order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              5. Order Tracking
            </h2>

            <p>
              Once your order is dispatched, you will receive an order number. You can track your order through our website using the "Track Order" option in the navigation bar by entering your order number.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              6. Delivery Attempts
            </h2>

            <p>
              Please ensure that the provided shipping address and phone number
              are accurate. If a delivery attempt is unsuccessful due to
              incorrect information or customer unavailability, additional
              delivery charges may apply.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              7. Delays
            </h2>

            <p>
              While we aim to deliver orders within the estimated timeframe, Al
              Wali is not responsible for delays caused by courier companies,
              weather conditions, natural disasters, or other circumstances
              beyond our control.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-card">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              8. Contact Us
            </h2>

            <p className="mb-6">
              If you have any questions regarding shipping or your order status,
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