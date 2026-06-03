import React from "react";

function DocsPage() {
  return (
    <div className="min-h-screen text-gray-800">
      <div className=" space-y-8">

        {/* Prerequisites */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
          <p className="text-sm mb-3">
            Before you begin, ensure you have the following installed:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="border p-2 rounded bg-gray-50">Node.js (v14 or higher)</li>
            <li className="border p-2 rounded bg-gray-50">npm or yarn package manager</li>
            <li className="border p-2 rounded bg-gray-50">
              [Any other specific tools/dependencies]
            </li>
          </ul>
        </section>

        {/* Installation */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Installation</h2>
          <ol className="list-decimal ml-5 text-sm space-y-2">
            <li>Clone the repository or download the template</li>
            <li>Navigate to the project directory</li>
            <li>
              Install dependencies:
              <div className="bg-gray-900 text-green-400 p-3 mt-2 rounded text-sm">
                npm install
              </div>
            </li>
          </ol>
        </section>

        {/* Run App */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Run the app</h2>
          <p className="text-sm mb-2">
            To start the development server:
          </p>
          <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
            npm run dev
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
          <ol className="list-decimal ml-5 text-sm space-y-2">
            <li>
              Review the main entry point in{" "}
              <span className="text-red-500">src/js/main.js</span>
            </li>
            <li>Customize components according to your needs</li>
            <li>
              Build for production:
              <div className="bg-gray-900 text-green-400 p-3 mt-2 rounded text-sm">
                npm run build
              </div>
            </li>
          </ol>
        </section>

        {/* Project Structure */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Project Structure</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded text-sm whitespace-pre">
{`imap/
├── src/
│   ├── assets/        # Static assets
│   │   ├── images/    # Images
│   │   ├── js/        # JS
│   │   └── scss/      # CSS and styling
│   ├── pages/         # All Pages
│   ├── vite.config.js # Config files
├── package.json       # Project dependencies
├── README.md          # Documentation
└── .gitignore         # Git ignore file`}
          </div>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Support</h2>
          <p className="text-sm">
            For issues or questions, please refer to the documentation or create an issue in the repository. 
            Also you can contact us at{" "}
            <span className="text-blue-500 underline cursor-pointer">
              CodesCandy
            </span>.
          </p>
        </section>

      </div>
    </div>
  );
}

export default DocsPage;