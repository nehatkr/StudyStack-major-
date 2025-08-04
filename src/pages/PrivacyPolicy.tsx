import React from 'react';
import { Shield, Eye, Database, Lock, Mail, Calendar } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Welcome to StudyStack. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our academic resource sharing platform.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                By using StudyStack, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-blue-600" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Email address and password (for account creation)</li>
                <li>Display name and profile picture</li>
                <li>Phone number (optional, for contributors)</li>
                <li>Bio and other profile information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Academic Content</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Documents you upload (notes, PYQs, syllabus)</li>
                <li>Metadata associated with uploads (subject, semester, tags)</li>
                <li>Comments and ratings you provide</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Usage Information</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Download history and activity logs</li>
                <li>Search queries and filter preferences</li>
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-blue-600" />
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To authenticate users and manage accounts</li>
                <li>To enable resource sharing and collaboration</li>
                <li>To improve our platform and user experience</li>
                <li>To communicate with you about updates and important notices</li>
                <li>To ensure platform security and prevent abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information Sharing</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>With Your Consent:</strong> When you choose to share contact information with uploads</li>
                <li><strong>Public Information:</strong> Content you upload and make publicly available</li>
                <li><strong>Service Providers:</strong> Third-party services that help us operate our platform (Firebase, Google)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication through Firebase</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and user permissions</li>
                <li>Secure file storage and backup systems</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Control the visibility of your contact information</li>
                <li>Opt out of non-essential communications</li>
                <li>Request a copy of your data</li>
                <li>Report privacy concerns or violations</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Authentication cookies to keep you logged in</li>
                <li>Preference cookies for theme and settings</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Performance cookies to optimize loading times</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our platform integrates with third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Firebase (Google):</strong> Authentication, database, and file storage</li>
                <li><strong>Google Sign-In:</strong> Optional authentication method</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                These services have their own privacy policies, which we encourage you to review.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our service is intended for college students and adults. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-blue-600" />
                Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Email:</strong> privacy@studystack.com</li>
                  <li><strong>Address:</strong> StudyStack Privacy Team</li>
                  <li><strong>Response Time:</strong> We aim to respond within 48 hours</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;