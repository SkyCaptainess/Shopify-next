import React from 'react';
import NewsLetter from '@/components/common/NewsLetter';

const Footer = () => {
  return (
    <footer className=" px-6 py-6 bg-gray-200 dark:bg-gray-800 mt-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="mb-4 lg:mb-0">
            <h4 className="font-semibold mb-2 text-gray-600">COMPANY</h4>
            <ul className="text-sm text-gray-500">
              <li className="mb-1">
                <a href="#">{`Terms & Conditions`}</a>
              </li>
              <li className="mb-1">
                <a href="#">About</a>
              </li>
              <li className="mb-1">
                <a href="#">Blog</a>
              </li>
              <li className="mb-1">
                <a href="#">Jobs</a>
              </li>
            </ul>
          </div>
          <div className="mb-4 lg:mb-0">
            <h4 className=" font-semibold mb-2 text-gray-600">LEGAL</h4>
            <ul className="text-sm text-gray-500">
              <li className="mb-1">
                <a href="#">{`Terms & Conditions`}</a>
              </li>
              <li className="mb-1">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="mb-1">
                <a href="#">Shipment Policy</a>
              </li>
              <li className="mb-1">
                <a href="#">Terms Of Sale</a>
              </li>
            </ul>
          </div>
          <div className="mb-4 lg:mb-0">
            <h4 className=" font-semibold mb-2 text-gray-600">SUPPORT</h4>
            <ul className="text-sm text-gray-500">
              <li className="mb-1">
                <a href="#">{`Terms & Conditions`}</a>
              </li>
              <li className="mb-1">
                <a href="#">Pricing</a>
              </li>
              <li className="mb-1">
                <a href="#">Guides</a>
              </li>
            </ul>
          </div>
          <div className="mb-4 lg:mb-0">
            <h4 className=" font-semibold mb-2 text-gray-600">NEWSLETTER</h4>
            <p className="mb-3 text-sm text-gray-500">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <NewsLetter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
