import { SellerNavbar } from "../SellerNavbar";


export function Policy() {
    return (
        <>
            <SellerNavbar />
            
            {/* The main content div for the policy, with all the correct styling */}
            <div className="bg-craft-light-bg text-gray-700 pt-24 px-6 md:px-16 space-y-6 min-h-screen">
                
                {/* Title: CraftMaven Privacy Policy (Craft: Dark Green, Maven: Terracotta) */}
                <h1 className="text-3xl font-bold">
                    <span className="text-craft-dark-green">Craft</span>
                    <span className="text-craft-terracotta">Maven</span> Privacy Policy
                </h1>
                
                {/* Effective Date: A slightly muted color, using gray-600/700 */}
                <p className="text-gray-600">Effective Date: October 2025</p>

                <p>
                    At <span className="font-semibold text-craft-dark-green">Craft</span><span className="font-semibold text-craft-terracotta">Maven</span>, your privacy is important to us. 
                    This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or mobile app.
                </p>

                {/* Headings: Dark Green */}
                <h2 className="text-2xl font-semibold text-craft-dark-green">1. Information We Collect</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Account Information:</strong> Name, email, phone number, delivery address, and payment details.</li>
                    <li><strong>Order and Transaction Data:</strong> Products purchased, browsing behavior, and purchase history.</li>
                    <li><strong>Communication Data:</strong> Messages you send to us, feedback, and queries.</li>
                    <li><strong>Device & Usage Information:</strong> IP address, browser type, and device information.</li>
                    <li><strong>Optional Information:</strong> Participation in surveys, loyalty programs, or promotions.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-craft-dark-green">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Process orders and payments.</li>
                    <li>Deliver products and provide customer support.</li>
                    <li>Send updates, offers, and promotional communications (with your consent).</li>
                    <li>Improve our website, services, and shopping experience.</li>
                    <li>Prevent fraud and enforce our policies.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-craft-dark-green">3. Sharing of Information</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Our service providers for order fulfillment, payment processing, or customer support.</li>
                    <li>Business partners for marketing, promotions, or loyalty programs.</li>
                    <li>Legal authorities if required by law.</li>
                    <li>We do not sell your personal data to third parties.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-craft-dark-green">4. Cookies and Tracking</h2>
                <p>
                    We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze site usage. 
                    You can manage or disable cookies in your browser settings.
                </p>

                <h2 className="text-2xl font-semibold text-craft-dark-green">5. Your Rights</h2>
                <p>
                    You can access, update, or delete your personal information and opt-out of promotional communications at any time.
                    To exercise your rights, contact us at <span className="text-craft-terracotta font-semibold">privacy@craftmaven.com</span>.
                </p>

                <h2 className="text-2xl font-semibold text-craft-dark-green">6. Data Security</h2>
                <p>
                    We use reasonable physical, technical, and administrative safeguards to protect your information. However, no system is completely secure.
                </p>

                <h2 className="text-2xl font-semibold text-craft-dark-green">7. Children’s Privacy</h2>
                <p>
                    Our platform is not intended for children under 18. We do not knowingly collect personal data from children.
                </p>

                <h2 className="text-2xl font-semibold text-craft-dark-green">8. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. The latest version will be available on our website.
                </p>

                <h2 className="text-2xl font-semibold text-craft-dark-green">9. Contact Us</h2>
                <p>
                    For questions or concerns, contact: <br />
                    <span className="font-semibold text-craft-dark-green">Craft</span>
                    <span className="font-semibold text-craft-terracotta">Maven</span><br />
                    Email: <a href="mailto:privacy@craftmaven.com" className="text-craft-terracotta underline">privacy@craftmaven.com</a><br />
                    Address: 123 Artisan Lane, Maker City, MA 01234
                </p>
            </div>
        </>
    );
}
