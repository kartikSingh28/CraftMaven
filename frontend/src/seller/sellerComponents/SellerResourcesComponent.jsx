import {
  PackageCheck,
  Megaphone,
  ShoppingBag,
  GraduationCap,
  UserCheck,
  Smartphone,
} from "lucide-react";

export function SellerResourcesComponent() {
  return (
    <section className="py-16 px-6 text-gray-700" style={{ backgroundColor: "#FFF8F0" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#C65A2E] mb-4">
          Access Our Tools to Grow Faster on CraftMaven
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl">
          We understand that your online business may require additional
          support from time to time, and we've got you covered. With your
          CraftMaven account, you gain access to a range of tools designed
          to help grow your online business.
        </p>

        <ul className="space-y-8">
          <li className="flex items-start gap-4">
            <PackageCheck className="w-8 h-8 text-[#C65A2E] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Fulfilment by CraftMaven
              </h3>
              <p>
                Worried about storing, packing, and delivering your products?
                Let CraftMaven handle it all for you.{" "}
                <a href="#" className="text-[#C65A2E] hover:underline">
                  Learn More
                </a>
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <Megaphone className="w-8 h-8 text-[#C65A2E] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                CraftMaven Ads
              </h3>
              <p>
                Want your products to stand out and reach the right customers?
                Boost your visibility with CraftMaven Ads.{" "}
                <a href="#" className="text-[#C65A2E] hover:underline">
                  Learn More
                </a>
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <ShoppingBag className="w-8 h-8 text-[#C65A2E] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Craft Fests
              </h3>
              <p>
                Participate in India’s biggest handmade shopping festivals
                like the Diwali Craft Fest and New Year Bazaar.{" "}
                <a href="#" className="text-[#C65A2E] hover:underline">
                  Learn More
                </a>
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <GraduationCap className="w-8 h-8 text-[#C65A2E] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Learning Center
              </h3>
              <p>
                Explore tutorials, exclusive webinars, and learning resources
                to help you sell smarter.{" "}
                <a href="#" className="text-[#C65A2E] hover:underline">
                  Learn More
                </a>
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <UserCheck className="w-8 h-8 text-[#C65A2E] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Account Management
              </h3>
              <p>
                Get expert insights on product pricing, performance, and growth
                strategies from our account managers.{" "}
                <a href="#" className="text-[#C65A2E] hover:underline">
                  Learn More
                </a>
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <Smartphone className="w-8 h-8 text-[#C65A2E] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Mobile App
              </h3>
              <p>
                Manage your CraftMaven seller account anytime, anywhere using
                the Seller Hub App on Android and iOS.{" "}
                <a href="#" className="text-[#C65A2E] hover:underline">
                  Learn More
                </a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
