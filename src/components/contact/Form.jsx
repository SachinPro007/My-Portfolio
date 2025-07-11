import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

function Form({ itemVariants }) {
  const { themeColors } = useSelector((state) => state.themeReducer);
  const form = useRef();
  const [status, setStatus] = useState(null); // null, 'success', or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputValue = [
    { name: "your_name", placeholder: "Your Name" },
    { name: "your_email", placeholder: "Your Email" },
    { name: "subject", placeholder: "Subject" },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    emailjs
      .sendForm(
        "service_a0f3apm", // EmailJS service ID
        "template_r55v18y", // EmailJS template ID
        form.current,
        {
          publicKey: "C4-lqD5NF19-WgYUq", // EmailJS publicKey
        }
      )
      .then(() => {
        "service_a0f3apm", // EmailJS service ID
          "template_ujk5y3i", // EmailJS template ID
          form.current,
          {
            publicKey: "C4-lqD5NF19-WgYUq", // EmailJS publicKey
          };
      })
      .then(
        () => {
          setStatus("success");
          setIsSubmitting(false);
          form.current.reset(); // Reset the form after successful submission
        },
        (error) => {
          setStatus("error");
          setIsSubmitting(false);
          console.log("FAILED...", error.text);
        }
      );
  };

  // Status message component
  const StatusMessage = () => {
    if (!status) return null;

    const config = {
      success: {
        icon: "✓",
        message: "Message sent successfully!",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        borderColor: "border-green-300",
      },
      error: {
        icon: "✕",
        message: "Failed to send message. Please try again.",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        borderColor: "border-red-300",
      },
    };

    const { icon, message, bgColor, textColor, borderColor } = config[status];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 mb-6 rounded-lg border ${bgColor} ${textColor} ${borderColor} flex items-center`}
      >
        <span className="text-xl mr-3 font-bold">{icon}</span>
        <span>{message}</span>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="rounded-2xl p-8 shadow-xl transition-all duration-500 hover:shadow-2xl"
      style={{
        backgroundColor: themeColors.cardBg,
        border: `1px solid ${themeColors.border}`,
      }}
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
    >
      <h3
        className="text-2xl font-semibold mb-6"
        style={{ color: themeColors.primaryColor }}
      >
        Send a Message
      </h3>

      <StatusMessage />

      <form ref={form} className="space-y-6" onSubmit={sendEmail}>
        {inputValue.map((elem, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <input
              type={elem.placeholder === "Your Email" ? "email" : "text"}
              name={elem.name}
              placeholder={elem.placeholder}
              required
              disabled={isSubmitting}
              className="w-full px-5 py-3 rounded-lg text-sm bg-transparent focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-70"
              style={{
                border: `1px solid ${themeColors.border}`,
                color: themeColors.text,
                boxShadow: `0 2px 4px ${themeColors.border}20`,
              }}
            />
          </motion.div>
        ))}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <textarea
            rows="5"
            placeholder="Your Message"
            name="message"
            required
            disabled={isSubmitting}
            className="w-full px-5 py-3 rounded-lg text-sm bg-transparent focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-70"
            style={{
              border: `1px solid ${themeColors.border}`,
              color: themeColors.text,
              boxShadow: `0 2px 4px ${themeColors.border}20`,
              caretColor: themeColors.text,
            }}
          ></textarea>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg font-medium transition-all duration-300 relative"
          style={{
            backgroundColor: isSubmitting
              ? `${themeColors.primaryColor}80`
              : themeColors.primaryColor,
            color: "#fff",
            boxShadow: `0 4px 6px ${themeColors.primaryColor}40`,
          }}
          variants={itemVariants}
          whileHover={
            !isSubmitting
              ? {
                  scale: 1.02,
                  boxShadow: `0 6px 8px ${themeColors.primaryColor}60`,
                }
              : {}
          }
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </div>
          ) : (
            <>
              Send Message
              <span className="ml-2">→</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default Form;
