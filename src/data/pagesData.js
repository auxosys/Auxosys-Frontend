// Generates a generic details object
const generateDetails = (title, type) => ({
  title,
  description: `Auxosys provides premium ${title} tailored to your business needs, ensuring scalability and long-term success.`,
  features: [
    { title: "Enterprise-Grade Architecture", desc: `Robust foundation for your ${type} requirements.` },
    { title: "Seamless Integration", desc: "Easily integrates with your existing workflows and systems." },
    { title: "Advanced Analytics", desc: "Gain actionable insights with our integrated data solutions." }
  ],
  benefits: [
    "Significantly reduce operational costs",
    "Accelerate time to market",
    "Ensure compliance and robust security",
    "Scale effortlessly as your business grows"
  ]
});

export const PRODUCTS_DATA = [
  { slug: "ai-workspace", ...generateDetails("AI Workspace & Intelligent Agents", "product") },
  { slug: "cxp", ...generateDetails("Customer Experience Platform (CXP)", "product") },
  { slug: "whatsapp", ...generateDetails("WhatsApp Business Platform", "product") },
  { slug: "learning", ...generateDetails("Learning & Training Platform", "product") },
  { slug: "healthcare", ...generateDetails("Healthcare Operations Suite", "product") },
  { slug: "business-ops", ...generateDetails("Business Operations Suite", "product") },
  { slug: "workforce", ...generateDetails("People & Workforce Hub", "product") },
  { slug: "inventory", ...generateDetails("Inventory & Supply Management", "product") },
  { slug: "collaboration", ...generateDetails("Project & Team Collaboration Suite", "product") },
  { slug: "enterprise-blockchain-platform", ...generateDetails("Enterprise Blockchain Platform", "product") },
  { slug: "dao-management-platform", ...generateDetails("DAO Management Platform", "product") },
  { slug: "digital-asset-tokenization-platform", ...generateDetails("Digital Asset Tokenization Platform", "product") },
];

export const SERVICES_DATA = [
  { slug: "digital-strategy-consulting", ...generateDetails("Digital Strategy Consulting", "service") },
  { slug: "product-strategy-and-roadmapping", ...generateDetails("Product Strategy & Roadmapping", "service") },
  { slug: "ux-research-and-product-design", ...generateDetails("UX Research & Product Design", "service") },
  { slug: "marketing-and-gtm-strategy", ...generateDetails("Marketing & GTM Strategy", "service") },
  { slug: "operations-and-process-optimization", ...generateDetails("Operations & Process Optimization", "service") },
  { slug: "business-analytics", ...generateDetails("Business Analytics", "service") },
  { slug: "custom-software-development", ...generateDetails("Custom Software Development", "service") },
  { slug: "saas-product-development", ...generateDetails("SaaS Product Development", "service") },
  { slug: "enterprise-applications", ...generateDetails("Enterprise Applications", "service") },
  { slug: "web-development", ...generateDetails("Web Development", "service") },
  { slug: "mobile-app-development", ...generateDetails("Mobile App Development", "service") },
  { slug: "api-development", ...generateDetails("API Development", "service") },
  { slug: "ai-and-intelligent-automation", ...generateDetails("AI & Intelligent Automation", "service") },
  { slug: "cloud-services", ...generateDetails("Cloud Services", "service") },
  { slug: "crm-and-erp-solutions", ...generateDetails("CRM & ERP Solutions", "service") },
  { slug: "whatsapp-business-solutions", ...generateDetails("WhatsApp Business Solutions", "service") },
  { slug: "cybersecurity", ...generateDetails("Cybersecurity", "service") },
  { slug: "devops-and-integrations", ...generateDetails("DevOps & Integrations", "service") },
  { slug: "smart-contract-development", ...generateDetails("Smart Contract Development", "service") },
  { slug: "dapp-development", ...generateDetails("dApp Development", "service") },
  { slug: "enterprise-blockchain-solutions", ...generateDetails("Enterprise Blockchain Solutions", "service") },
  { slug: "crypto-wallet-development", ...generateDetails("Crypto Wallet Development", "service") },
  { slug: "tokenization-solutions", ...generateDetails("Tokenization Solutions", "service") },
  { slug: "web3-integration", ...generateDetails("Web3 Integration", "service") }
];

export const INDUSTRIES_DATA = [
  { slug: "healthcare-and-life-sciences", ...generateDetails("Healthcare & Life Sciences", "industry") },
  { slug: "retail-and-e-commerce", ...generateDetails("Retail & E-Commerce", "industry") },
  { slug: "manufacturing-and-industrial", ...generateDetails("Manufacturing & Industrial", "industry") },
  { slug: "banking-finance-and-insurance", ...generateDetails("Banking, Finance & Insurance", "industry") },
  { slug: "education-and-edtech", ...generateDetails("Education & EdTech", "industry") },
  { slug: "logistics-and-supply-chain", ...generateDetails("Logistics & Supply Chain", "industry") },
  { slug: "hospitality-and-travel", ...generateDetails("Hospitality & Travel", "industry") },
  { slug: "real-estate-and-construction", ...generateDetails("Real Estate & Construction", "industry") },
  { slug: "energy-and-utilities", ...generateDetails("Energy & Utilities", "industry") },
  { slug: "agriculture-and-agritech", ...generateDetails("Agriculture & AgriTech", "industry") },
  { slug: "blockchain-and-web3", ...generateDetails("Blockchain & Web3", "industry") }
];
