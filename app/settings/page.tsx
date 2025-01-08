"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import MobileNav from "../components/layouts/mobile-nav";
import Image from "next/image";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = () => {
    alert("User data updated!");
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src="https://via.placeholder.com/80"
              alt="User"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-lg p-2 mb-2 text-lg"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-lg p-2 text-lg"
              />
            </div>
          </div>
          <button
            onClick={handleUpdate}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            Update Information
          </button>
        </section>

        {/* Contact Us Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-gray-500" />
              <Link
                href="mailto:officialeazyplan@gmail.com"
                className="text-blue-500"
              >
                officialeazyplan@gmail.com
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <FaWhatsapp className="text-green-500" />
              <Link
                href="https://wa.me/09155003700"
                className="text-green-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                +234 915 5003 700
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <FaFacebook className="text-blue-600" />
              <Link
                href="https://facebook.com"
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <FaTwitter className="text-blue-400" />
              <Link
                href="https://twitter.com"
                className="text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <FaInstagram className="text-pink-500" />
              <Link
                href="https://instagram.com"
                className="text-pink-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
            </div>
          </div>
        </section>

        {/* Legal Section (Privacy Policy, Terms & Conditions) */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Legal</h2>
          <div className="space-y-4">
            <div>
              <Link
                href="/privacy-policy"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
            <div>
              <Link
                href="/terms-conditions"
                className="text-blue-500 hover:underline"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </section>

        {/* Logout Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <button className="w-full py-3 bg-red-500 text-white rounded-lg text-lg">
            Logout
          </button>
        </section>
      </div>

      <MobileNav />
    </>
  );
};

export default SettingsPage;
