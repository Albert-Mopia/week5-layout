export default function ContactPage() {
  return (
    <section className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold text-gray-950 mb-2">
        Contact Agave Shooters
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Have questions about upcoming tournaments or membership eligibility? Send us a message below.
      </p>

      <form
        action="https://formspree.io/f/xzerejda"
        method="POST"
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#0f4d3a]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="veteran@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#0f4d3a]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            required
            placeholder="How can we help you?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#0f4d3a]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-[#0f4d3a] hover:bg-[#0c3d2e] text-white text-sm font-semibold rounded-md transition-colors"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
