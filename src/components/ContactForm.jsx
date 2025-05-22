// 'use client';
// import { useState } from "react";

// export default function ContactForm() {
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target);

//     const data = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//       message: formData.get("message"),
//     };

//     const res = await fetch("/api/contact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (res.ok) {
//       alert("Message sent successfully ✅");
//       e.target.reset();
//     } else {
//     alert("Failed to send message ❌");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="grid gap-6 bg-slate-950 dark:bg-gray-900 shadow-xl p-8 w-[800px] font-chakra mb-6">
//       <input    
//         type="text"
//         name="name"
//         placeholder="Your Name"
//         className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email Address"
//         className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
//         required
//       />
//       <textarea
//         name="message"
//         placeholder="Your Message"
//         className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white h-36 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-600"
//         required
//       ></textarea>
//       <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition" disabled={loading}>
//         {loading ? "Sending..." : "🚀 Send Message"}
//       </button>
//     </form>
//   );
// }


'use client';
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Message sent successfully ✅");
        e.target.reset();
      } else {
        alert("Failed to send message ❌");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message ❌");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <form 
        onSubmit={handleSubmit} 
        className="grid gap-4 sm:gap-6 bg-slate-950 dark:bg-gray-900 shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto rounded-xl font-chakra mb-6 z-20"
      >
        <input    
          type="text"
          name="name"
          placeholder="Your Name"
          className="p-3  sm:p-4 z-20 bg-transparent text-white text-sm sm:text-base rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-200"
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="p-3 sm:p-4 z-20 bg-transparent text-white text-sm sm:text-base rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-200"
          required
        />
        
        <textarea
          name="message"
          placeholder="Your Message"
          className="p-3 sm:p-4 z-20 bg-transparent text-white text-sm sm:text-base rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white h-32 sm:h-36 lg:h-40 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-200"
          required
        ></textarea>
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:bg-cyan-600 disabled:bg-cyan-400 disabled:cursor-not-allowed text-white py-3 sm:py-4 text-sm sm:text-base font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]" 
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            "🚀 Send Message"
          )}
        </button>
      </form>
    </div>
  );
}