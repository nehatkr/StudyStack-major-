import React from 'react';
import { FileText, Users, Shield, AlertTriangle, Scale, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Welcome to StudyStack, an academic resource sharing platform designed for college students. These Terms of Service ("Terms") govern your use of our website and services.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                By accessing or using StudyStack, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>You must be at least 13 years old to use our service</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You agree to use the service for lawful purposes only</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                User Accounts
              </h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Account Creation</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>You may create an account using email/password or Google sign-in</li>
                <li>You must provide accurate and current information</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">User Roles</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Viewers:</strong> Can browse, download, and comment on resources</li>
                <li><strong>Contributors:</strong> Can upload resources in addition to viewer privileges</li>
                <li>Users can switch between roles at any time</li>
              </ul>
            </section>

            {/* Content and Uploads */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Content and Uploads</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Acceptable Content</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Contributors may upload academic materials including:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Class notes and study materials</li>
                <li>Previous year question papers (PYQs)</li>
                <li>Official syllabus documents</li>
                <li>Educational resources and references</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Content Guidelines</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Content must be educational and relevant to academic studies</li>
                <li>You must have the right to share the content you upload</li>
                <li>Content must not violate copyright or intellectual property rights</li>
                <li>No inappropriate, offensive, or harmful content</li>
                <li>No spam, advertisements, or commercial content</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Content Ownership</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>You retain ownership of content you upload</li>
                <li>You grant us a license to store, display, and distribute your content</li>
                <li>You are responsible for ensuring you have rights to uploaded content</li>
                <li>We may remove content that violates these terms</li>
              </ul>
            </section>

            {/* Prohibited Activities */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
                Prohibited Activities
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You agree not to engage in any of the following activities:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Uploading copyrighted material without permission</li>
                <li>Sharing inappropriate, offensive, or harmful content</li>
                <li>Attempting to hack, disrupt, or damage the platform</li>
                <li>Creating fake accounts or impersonating others</li>
                <li>Spamming or sending unsolicited communications</li>
                <li>Using the platform for commercial purposes without permission</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Interfering with other users' experience</li>
              </ul>
            </section>

            {/* Privacy and Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-blue-600" />
                Privacy and Data
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Your privacy is important to us - see our Privacy Policy for details</li>
                <li>You control the visibility of your contact information</li>
                <li>We collect and use data as described in our Privacy Policy</li>
                <li>You can delete your account and data at any time</li>
                <li>We implement security measures to protect your information</li>
              </ul>
            </section>

            {/* Ratings and Comments */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ratings and Comments</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Users can rate and comment on uploaded resources</li>
                <li>Ratings and comments should be honest and constructive</li>
                <li>No abusive, offensive, or inappropriate comments</li>
                <li>We reserve the right to remove inappropriate ratings or comments</li>
                <li>Contributors can view feedback on their uploads</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>StudyStack and its features are protected by intellectual property laws</li>
                <li>You may not copy, modify, or distribute our platform without permission</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Report any copyright violations to us immediately</li>
                <li>We will respond to valid DMCA takedown requests</li>
              </ul>
            </section>

            {/* Service Availability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Service Availability</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>We strive to maintain high service availability</li>
                <li>Occasional maintenance and updates may cause temporary downtime</li>
                <li>We do not guarantee uninterrupted service</li>
                <li>We may modify or discontinue features with notice</li>
                <li>Critical updates will be communicated to users</li>
              </ul>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Disclaimers</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">Important Notice:</p>
                <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>The service is provided "as is" without warranties</li>
                  <li>We do not guarantee the accuracy of uploaded content</li>
                  <li>Users are responsible for verifying information</li>
                  <li>We are not liable for any damages from service use</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Scale className="h-6 w-6 mr-2 text-blue-600" />
                Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability is limited to the amount you paid for the service</li>
                <li>We are not responsible for third-party content or services</li>
                <li>Users assume responsibility for their use of the platform</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Termination</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>You may terminate your account at any time</li>
                <li>We may suspend or terminate accounts for violations of these Terms</li>
                <li>Upon termination, your access to the service will cease</li>
                <li>Some provisions of these Terms survive termination</li>
                <li>We will handle data deletion according to our Privacy Policy</li>
              </ul>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to modify these Terms at any time. We will:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Notify users of significant changes via email or platform notice</li>
                <li>Update the "Last updated" date at the top of this page</li>
                <li>Provide reasonable notice before changes take effect</li>
                <li>Consider continued use as acceptance of updated Terms</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300">
                These Terms are governed by and construed in accordance with applicable laws. Any disputes will be resolved through appropriate legal channels in the jurisdiction where StudyStack operates.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-blue-600" />
                Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Email:</strong> legal@studystack.com</li>
                  <li><strong>Address:</strong> StudyStack Legal Team</li>
                  <li><strong>Response Time:</strong> We aim to respond within 48 hours</li>
                </ul>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">Acknowledgment</p>
                <p className="text-blue-700 dark:text-blue-300">
                  By using StudyStack, you acknowledge that you have read these Terms of Service and agree to be bound by them. Thank you for being part of our academic community!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;