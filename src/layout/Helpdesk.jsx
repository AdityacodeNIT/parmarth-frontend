import React, { useState } from "react";
import {
  MdEmail,
  MdPhone,
  MdChat,
  MdSearch,
  MdExpandMore,
  MdExpandLess,
  MdCheckCircle,
  MdHelp,
  MdSupportAgent,
} from "react-icons/md";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const Helpdesk = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqs = [
    {
      id: 1,
      category: "Orders",
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'My Orders' section. Click on any order to view detailed tracking information including current status and estimated delivery date.",
    },
    {
      id: 2,
      category: "Orders",
      question: "Can I cancel or modify my order?",
      answer:
        "Orders can be cancelled or modified within 24 hours of placement. Go to 'My Orders', select the order, and click 'Cancel Order' or 'Modify Order'. Once shipped, orders cannot be cancelled.",
    },
    {
      id: 3,
      category: "Payments",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, net banking, and cash on delivery (COD) for eligible orders. All payments are processed securely through our payment gateway.",
    },
    {
      id: 4,
      category: "Payments",
      question: "Is it safe to use my credit card on your site?",
      answer:
        "Yes, absolutely! We use industry-standard SSL encryption and PCI-DSS compliant payment gateways. Your card information is never stored on our servers.",
    },
    {
      id: 5,
      category: "Shipping",
      question: "What are the shipping charges?",
      answer:
        "Shipping charges vary based on your location and order value. Orders above ₹500 qualify for free shipping. Exact charges are calculated at checkout based on your delivery address.",
    },
    {
      id: 6,
      category: "Shipping",
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 3-7 business days. Express delivery (1-3 days) is available for select locations at additional cost. Delivery times may vary during peak seasons.",
    },
    {
      id: 7,
      category: "Returns",
      question: "What is your return policy?",
      answer:
        "We offer a 7-day return policy for most products. Items must be unused, in original packaging with tags intact. Initiate returns from 'My Orders' section. Refunds are processed within 5-7 business days.",
    },
    {
      id: 8,
      category: "Returns",
      question: "How do I return a product?",
      answer:
        "Go to 'My Orders', select the order, click 'Return Item', choose reason, and submit. Our team will arrange pickup. Once received and verified, refund will be initiated to your original payment method.",
    },
    {
      id: 9,
      category: "Account",
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page, enter your registered email, and follow the instructions sent to your email to reset your password.",
    },
    {
      id: 10,
      category: "Account",
      question: "Can I change my registered email or phone number?",
      answer:
        "Yes, you can update your email and phone number from your account settings. For security, you'll need to verify the new email/phone via OTP.",
    },
  ];

  const supportChannels = [
    {
      icon: MdEmail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@ecommerce.com",
      link: "mailto:support@ecommerce.com",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      responseTime: "24 hours",
    },
    {
      icon: MdPhone,
      title: "Phone Support",
      description: "Talk to our team",
      contact: "+91 1800-123-4567",
      link: "tel:+911800123456",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      responseTime: "Immediate",
    },
    {
      icon: MdChat,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available 9 AM - 6 PM",
      link: "#",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      responseTime: "< 5 minutes",
    },
  ];

  const socialLinks = [
    { icon: FaInstagram, name: "Instagram", link: "https://instagram.com", color: "text-pink-500" },
    { icon: FaTwitter, name: "Twitter", link: "https://twitter.com", color: "text-blue-400" },
    { icon: FaFacebook, name: "Facebook", link: "https://facebook.com", color: "text-blue-600" },
    { icon: FaLinkedin, name: "LinkedIn", link: "https://linkedin.com", color: "text-blue-700" },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  const handleFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", contactForm);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <MdSupportAgent className="text-4xl text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to your questions, get support, and learn how to make the most of our platform
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Support Channels */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <MdHelp className="text-primary" />
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <a
                key={index}
                href={channel.link}
                className="block group"
              >
                <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${channel.bgColor} flex items-center justify-center mb-4`}>
                      <channel.icon className={`text-2xl ${channel.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                    <p className="font-medium mb-2">{channel.contact}</p>
                    <Badge variant="secondary" className="text-xs">
                      Response: {channel.responseTime}
                    </Badge>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={searchQuery === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchQuery("")}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={searchQuery === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchQuery(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <Card key={faq.id} className="overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full text-left p-6 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                      </div>
                      {expandedFaq === faq.id ? (
                        <MdExpandLess className="text-2xl text-muted-foreground flex-shrink-0" />
                      ) : (
                        <MdExpandMore className="text-2xl text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <MdHelp className="text-5xl text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  No results found for "{searchQuery}"
                </p>
                <Button
                  variant="link"
                  onClick={() => setSearchQuery("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              </Card>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Still Need Help?</CardTitle>
              <p className="text-muted-foreground">
                Can't find what you're looking for? Send us a message and we'll get back to you.
              </p>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-12">
                  <MdCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    We've received your message and will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleFormChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleFormChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleFormChange}
                      placeholder="Describe your issue or question in detail..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Social Media */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <p className="text-muted-foreground mb-6">
            Follow us on social media for updates, tips, and community support
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center transition-all hover:scale-110"
              >
                <social.icon className={`text-2xl ${social.color}`} />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Helpdesk;
