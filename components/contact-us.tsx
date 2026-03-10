import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast"; // shadcn/ui toast hook
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Show shadcn toast
    toast({
      title: "Thank you!",
      description: "Your message has been sent successfully.",
    });

    // Clear form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-7xl text-amber-950 font-bold mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-foreground/70 mb-8 font-bold">
            Send us a message and we'll get back to you soon
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-2xl shadow-md"
        >
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Message</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              required
              rows={5}
            />
          </div>

          <Button type="submit" className="w-full bg-amber-950 hover:bg-amber-900">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;