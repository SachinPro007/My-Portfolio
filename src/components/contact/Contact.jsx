import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import Form from "./Form";

const ContactSection = () => {
  const { themeColors } = useSelector((state) => state.themeReducer);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: themeColors.bg }}
      className="overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto px-4 py-24">
        <SectionHeader
          highlight={"Get In Touch"}
          subtitle={`Have a project in mind or want to discuss opportunities? I'd love to hear from you.`}
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Contact Form */}
          <Form itemVariants={itemVariants} />

          {/* Contact Info */}
          <motion.div className="space-y-10" variants={containerVariants}>
            {[
              {
                icon: "Mail",
                title: "Email",
                value: "mrsachinsehrawat07@gmail.com",
                href: "mailto:mrsachinsehrawat07@gmail.com",
              },
              {
                icon: "Phone",
                title: "Phone",
                value: "+91-8307326657",
                href: "tel:+918307326657",
              },
              {
                icon: "MapPin",
                title: "Location",
                value: "Sector 128, Noida, Uttar Pradesh",
              },
            ].map((item, i) => (
              <motion.div
                className="flex items-start gap-5 group"
                key={i}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="p-3 rounded-xl shadow-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
                  style={{
                    backgroundColor: `${themeColors.primaryColor}20`,
                    color: themeColors.primaryColor,
                  }}
                >
                  <i className="block w-6 h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {item.icon === "Mail" && (
                        <>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </>
                      )}
                      {item.icon === "Phone" && (
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.14.84.37 1.67.7 2.81a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.14.33 1.97.56 2.81.7A2 2 0 0 1 22 16.92z" />
                      )}
                      {item.icon === "MapPin" && (
                        <>
                          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </>
                      )}
                    </svg>
                  </i>
                </div>
                <div>
                  <h4
                    className="text-sm uppercase tracking-wider mb-1"
                    style={{ color: themeColors.summeryText }}
                  >
                    {item.title}
                  </h4>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-lg font-medium hover:underline transition-all duration-300"
                      style={{ color: themeColors.text }}
                    >
                      {item.value}
                      <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <p
                      className="text-lg font-medium"
                      style={{ color: themeColors.text }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div
              className="rounded-xl overflow-hidden h-52 w-full border relative"
              style={{
                backgroundColor: themeColors.border,
                border: `1px solid ${themeColors.border}`,
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.568392793973!2d77.35048037479706!3d28.5226305757249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce79e37f37571%3A0x6660ea69a78adc0f!2sPavilion%20Court%20Tower%205%20%26%206!5e0!3m2!1sen!2sin!4v1759723361732!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
