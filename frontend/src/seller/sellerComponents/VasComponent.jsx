import React from "react";
import img2 from "../../assets/vas.png";

export function Vas() {
  return (
    <div className="bg-[#FFF7EE] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
          {/* Left Text Section */}
          <div className="md:w-3/5 w-full p-8 text-gray-800">
            <h1 className="text-3xl font-bold text-[#C45A28] mb-6">
              Craftmaven Value Added Services (VAS)
            </h1>

            {/* Account Management */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#C45A28] mb-4">
                Account Management
              </h2>
              <p className="mb-4">
                Unlock the power of <strong>Paid Account Management (PAM)</strong> services
                to efficiently manage your business on <strong>Craftmaven</strong>. With PAM,
                you'll have a dedicated <strong>Craftmaven Account Manager</strong> who is
                expertly trained to provide guidance and support whenever you need it.
              </p>
              <p className="mb-4">
                Your Account Manager will help optimise your product selection, improve
                delivery speed, set competitive pricing, and much more. Tap into their
                expertise to attract and retain more customers, and propel your business to
                new heights of success.
              </p>
              <p>
                Benefit from personalised assistance and elevate your selling journey with
                Craftmaven’s Paid Account Management services.
              </p>
            </section>

            {/* Premium Catalogue Services */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#C45A28] mb-4">
                Premium Catalogue Services
              </h2>
              <p className="mb-4">
                In the competitive e-commerce landscape, standing out is crucial for your
                products’ success. That’s where <strong>Craftmaven Premium Catalogue
                Services</strong> comes in — a comprehensive solution to elevate your product
                listings and make them shine.
              </p>
              <p className="mb-4">
                By leveraging this service, you can maximise visibility and appeal,
                resulting in higher sales and stronger customer engagement.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-2 text-[#C45A28]">
                Services Offered:
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Model/Product photo shoot</li>
                <li>Model/Product video shoot</li>
                <li>Rich product description</li>
                <li>360° video/product shoot</li>
                <li>Augmented Reality (AR)</li>
                <li className="text-[#C45A28] cursor-pointer font-medium hover:underline">
                  Download Catalogue Brochure
                </li>
              </ul>
            </section>

            {/* Craftmaven Ignite Program */}
            <section>
              <h2 className="text-2xl font-semibold text-[#C45A28] mb-4">
                Craftmaven Ignite Program
              </h2>
              <p className="mb-4">
                For new Craftmaven sellers, it’s natural to have questions and concerns.
                That’s where the <strong>Craftmaven Ignite Program</strong> comes in — a paid
                program designed to kickstart your online selling journey.
              </p>
              <p className="mb-4">
                With Ignite, you’ll gain access to valuable resources, training, and
                personalised support to navigate the world of online selling on Craftmaven
                with confidence.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-2 text-[#C45A28]">
                Features of the Ignite Program:
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Image editing</li>
                <li>Catalogue creation support</li>
                <li>Exclusive webinar trainings</li>
                <li>Free* Ad credits and more</li>
                <li className="text-[#C45A28] cursor-pointer font-medium hover:underline">
                  Download Ignite Brochure
                </li>
              </ul>
            </section>
          </div>

          {/* Right Image Section */}
          <div className="md:w-2/5 w-full">
            <img
              src={img2}
              alt="Craftmaven Value Added Services"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
