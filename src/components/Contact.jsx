import { FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';

function Contact() {
  return (
    <section className="py-10 px-4" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-10">Contact Me</h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FiMail className="text-orange-500 text-2xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <a href="mailto:tabresh786shaikh@gmail.com" className="text-blue-600 underline">
                  tabresh786shaikh@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiMapPin className="text-orange-500 text-2xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p>Nanded, Maharashtra, India</p>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/tabresh04"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              >
                <FiGithub className="text-xl" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/shaikh-tabresh-3686a926b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              >
                <FiLinkedin className="text-xl" />
                LinkedIn
              </a>
            </div>

            {/* Map */}
            {/* <div className="mt-6 rounded-xl overflow-hidden shadow-md">
              <iframe
                title="Manjram Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.755881791793!2d77.27826267461673!3d18.591401768869967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bccf93d685b6157%3A0x7b04192852a26a61!2sManjram%2C%20Maharashtra%20431305!5e0!3m2!1sen!2sin!4v1713783600000!5m2!1sen!2sin"
                className="w-full h-56"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div> */}
          </div>

          {/* Right: Contact Form */}
          <form
            className="bg-white p-6 rounded-xl shadow-md space-y-5"
            action="https://formsubmit.co/noothing4108@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="New Portfolio Message!" />
            <input type="hidden" name="_autoresponse" value="Thanks for contacting me!" />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
