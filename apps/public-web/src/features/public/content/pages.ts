export type PublicPageContent = {
  badge?: string;
  title: string;
  lead: string;
  description: string;
  highlights: Array<{ title: string; description: string }>;
};

export const pageContent = {
  home: {
    badge: "Enterprise CRM Platform",
    title: "Scale customer operations with a unified NetMetric platform.",
    lead: "Run authentication, account governance, CRM workflows, internal tools, and API integrations from one governed operational stack.",
    description:
      "NetMetric is the enterprise platform for identity, account operations, CRM execution, and API-powered customer lifecycle automation.",
    highlights: [
      {
        title: "Identity at the edge",
        description: "Dedicated auth domain with secure session and access controls.",
      },
      {
        title: "Revenue-ready CRM",
        description: "Pipeline, lifecycle, and renewal operations built for distributed teams.",
      },
      {
        title: "Governed tooling",
        description: "Internal tools and account controls aligned with enterprise policy.",
      },
    ],
  },
  product: {
    badge: "Product",
    title: "A complete platform for customer lifecycle execution.",
    lead: "Connect identity, account controls, CRM activities, and internal tools in one enterprise workspace.",
    description:
      "NetMetric product capabilities for enterprise-grade customer lifecycle management.",
    highlights: [
      {
        title: "Workspace governance",
        description: "Policy-aware controls for teams, roles, and sensitive actions.",
      },
      {
        title: "Operational visibility",
        description: "Shared metrics and activity traces across product modules.",
      },
      {
        title: "Composable architecture",
        description: "Deploy only the capabilities your teams need.",
      },
    ],
  },
  crm: {
    badge: "CRM",
    title: "Operate pipeline, accounts, and retention from one CRM core.",
    lead: "Built for enterprise execution with consistent data, access boundaries, and scalable workflows.",
    description: "NetMetric CRM capabilities for pipeline management and account growth.",
    highlights: [
      {
        title: "Pipeline confidence",
        description: "Stage management with accountable ownership and clean handoffs.",
      },
      {
        title: "Account intelligence",
        description: "Unify relationship context, engagement, and risk signals.",
      },
      {
        title: "Lifecycle workflows",
        description: "Drive onboarding, renewal, and expansion with predictable playbooks.",
      },
    ],
  },
  tools: {
    badge: "Tools",
    title: "Deliver internal tooling without sacrificing governance.",
    lead: "Launch operational tools that inherit NetMetric identity, authorization, and audit patterns.",
    description: "NetMetric internal tools platform for secure operational workflows.",
    highlights: [
      {
        title: "Shared access control",
        description: "Use centralized roles and permissions for every tool surface.",
      },
      {
        title: "Reusable UX baseline",
        description: "Compose approved UI patterns and keep teams aligned.",
      },
      {
        title: "Operational speed",
        description: "Shorten delivery cycles for business-critical internal apps.",
      },
    ],
  },
  developers: {
    badge: "Developers",
    title: "Build on APIs designed for enterprise integrations.",
    lead: "Ship secure automations and custom workflows with predictable contracts and platform-level controls.",
    description: "NetMetric developer platform with enterprise API capabilities.",
    highlights: [
      { title: "Stable contracts", description: "Versioned APIs with clear behavior boundaries." },
      {
        title: "Access governance",
        description: "Scoped credentials and operational safety controls.",
      },
      {
        title: "Automation ready",
        description: "Integrate CRM and account workflows into your systems.",
      },
    ],
  },
  security: {
    badge: "Security",
    title: "Security controls built into every layer.",
    lead: "NetMetric enforces strong defaults for identity, transport, browser security, and operational governance.",
    description: "NetMetric enterprise security posture and controls.",
    highlights: [
      {
        title: "Browser hardening",
        description: "Strict response headers and safe defaults across public surfaces.",
      },
      {
        title: "Identity boundaries",
        description: "Dedicated authentication domain and controlled session behavior.",
      },
      {
        title: "Operational safeguards",
        description: "Governed access patterns for teams and automation.",
      },
    ],
  },
  pricing: {
    badge: "Pricing",
    title: "Pricing designed for growing enterprise operations.",
    lead: "Choose a plan aligned to team scale, governance depth, and platform integration needs.",
    description: "NetMetric pricing overview for enterprise CRM and platform usage.",
    highlights: [
      { title: "Foundation", description: "Core CRM and platform workflows for emerging teams." },
      {
        title: "Growth",
        description: "Advanced controls for multi-team operations and reporting.",
      },
      {
        title: "Enterprise",
        description: "Custom governance, integrations, and operational support.",
      },
    ],
  },
  about: {
    badge: "About",
    title: "We build durable systems for customer operations teams.",
    lead: "NetMetric helps companies unify identity, CRM execution, and operational tooling without chaos.",
    description: "About NetMetric and the mission behind the enterprise platform.",
    highlights: [
      {
        title: "Platform mindset",
        description: "Designed for long-term maintainability and governance.",
      },
      {
        title: "Operational empathy",
        description: "Built for the real pace of cross-functional teams.",
      },
      {
        title: "Engineering discipline",
        description: "Strong defaults, clear contracts, and reliable delivery.",
      },
    ],
  },
  contact: {
    badge: "Contact",
    title: "Talk with the NetMetric team.",
    lead: "Share your platform goals and we will help map the right architecture and rollout path.",
    description: "Contact NetMetric for product, sales, and partnership inquiries.",
    highlights: [
      { title: "Sales", description: "Plan enterprise onboarding and deployment scope." },
      {
        title: "Partnerships",
        description: "Discuss integration and strategic collaboration opportunities.",
      },
      { title: "Support", description: "Route implementation and operational questions quickly." },
    ],
  },
  status: {
    badge: "Status",
    title: "Service status and platform availability.",
    lead: "Track the operational health of NetMetric services and planned maintenance windows.",
    description: "NetMetric service status and operational updates.",
    highlights: [
      {
        title: "Live status",
        description: "Current availability for auth, account, CRM, and tools domains.",
      },
      {
        title: "Incident history",
        description: "Review resolved incidents and operational timelines.",
      },
      { title: "Maintenance windows", description: "Plan around scheduled platform updates." },
    ],
  },
  privacy: {
    badge: "Privacy",
    title: "Privacy commitments for enterprise operations.",
    lead: "NetMetric treats customer and operational data with strict governance and transparent handling practices.",
    description: "NetMetric privacy commitments and data handling principles.",
    highlights: [
      {
        title: "Data minimization",
        description: "Collect only the data required for platform operations.",
      },
      {
        title: "Access boundaries",
        description: "Limit internal access through role-based controls.",
      },
      {
        title: "Transparent controls",
        description: "Clear policy surfaces for customer data management.",
      },
    ],
  },
  terms: {
    badge: "Terms",
    title: "Terms for use of NetMetric platform services.",
    lead: "These terms define responsible usage, security obligations, and service boundaries.",
    description: "NetMetric terms and service usage responsibilities.",
    highlights: [
      {
        title: "Service boundaries",
        description: "Clear responsibilities for customer and provider operations.",
      },
      { title: "Acceptable use", description: "Guidelines for secure and lawful platform usage." },
      {
        title: "Reliability expectations",
        description: "Operational standards and support commitments.",
      },
    ],
  },
  cookies: {
    badge: "Cookies",
    title: "Cookie usage and browser storage practices.",
    lead: "NetMetric uses essential browser storage only where needed for secure and reliable platform behavior.",
    description: "NetMetric cookie and browser storage policy overview.",
    highlights: [
      {
        title: "Essential cookies",
        description: "Used for secure session continuity and sign-in workflows.",
      },
      {
        title: "No unnecessary tracking",
        description: "No third-party marketing trackers on this public website.",
      },
      {
        title: "Control and clarity",
        description: "Documented behavior for all browser-side storage usage.",
      },
    ],
  },
} satisfies Record<string, PublicPageContent>;

export type PublicPageKey = keyof typeof pageContent;

export function getPageContent(key: PublicPageKey): PublicPageContent {
  return pageContent[key];
}
