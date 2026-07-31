"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppButton() {
  return (
    <>
      <FloatingWhatsApp
        phoneNumber="+92 320 2184312"
        accountName="Al Wali"
        avatar="/apple-icon.png"
        statusMessage="Typically replies within minutes"
        chatMessage="👋 Hi! How can we help you?"
        placeholder="Type a message..."
        allowClickAway={false}
        notification
        notificationDelay={3000}
      />
    </>
  );
}
