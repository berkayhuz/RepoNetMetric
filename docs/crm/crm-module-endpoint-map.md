# CRM Module Endpoint Map

This document summarizes source-visible endpoint availability in `services/crm/src/NetMetric.CRM.API/Controllers` for crm-web planning.

| Module                          | Folder                   | Controller Visible                | List Visible | Detail Visible | Mutation Visible | Frontend Status  | Recommended Next Phase                    |
| ------------------------------- | ------------------------ | --------------------------------- | ------------ | -------------- | ---------------- | ---------------- | ----------------------------------------- |
| Dashboard                       | AnalyticsReporting       | Yes (`AnalyticsController`)       | Partial      | Partial        | No               | read_only        | Keep read-only; add role dashboards later |
| Customer Management - Customers | CustomerManagement       | Yes                               | Yes          | Yes            | Yes              | active           | Implemented                               |
| Customer Management - Companies | CustomerManagement       | Yes                               | Yes          | Yes            | Yes              | active           | Implemented                               |
| Customer Management - Contacts  | CustomerManagement       | Yes                               | Yes          | Yes            | Yes              | active           | Implemented                               |
| Address Management              | CustomerManagement       | Yes (`AddressesController`)       | No           | No             | Yes              | active           | Implemented in detail pages               |
| Customer Intelligence           | CustomerIntelligence     | Yes                               | No           | Partial        | Yes              | contract_pending | Add read-only intelligence workspace      |
| Lead Management                 | LeadManagement           | Yes                               | Yes          | Yes            | Yes              | active           | Implemented                               |
| Deal Management                 | DealManagement           | Yes                               | Yes          | Yes            | Yes              | contract_pending | Deals list/detail phase                   |
| Opportunity Management          | OpportunityManagement    | Yes                               | Yes          | Yes            | Yes              | read_only        | Implemented (read-only)                   |
| Pipeline Management             | PipelineManagement       | Yes                               | Yes          | Yes            | Yes              | read_only        | Implemented (read-only)                   |
| Quote Management                | QuoteManagement          | Yes                               | Yes          | Yes            | Yes              | contract_pending | Quotes list/detail phase                  |
| Sales Forecasting               | SalesForecasting         | Yes                               | Partial      | Partial        | Yes              | contract_pending | Forecast workspace phase                  |
| Product Catalog                 | ProductCatalog           | Yes                               | Yes          | Yes            | Yes              | contract_pending | Catalog list/detail phase                 |
| Support Inbox Integration       | SupportInboxIntegration  | Yes                               | Partial      | Partial        | Yes              | contract_pending | Support inbox timeline phase              |
| Ticket Management               | TicketManagement         | Yes                               | Yes          | Yes            | Yes              | contract_pending | Tickets list/detail phase                 |
| Ticket SLA Management           | TicketSlaManagement      | Yes                               | Yes          | Partial        | Yes              | contract_pending | SLA policy phase                          |
| Ticket Workflow Management      | TicketWorkflowManagement | Not explicit in controller naming | Unknown      | Unknown        | Unknown          | coming_soon      | Confirm concrete routes first             |
| Marketing Automation            | MarketingAutomation      | Yes                               | Partial      | Partial        | Yes              | contract_pending | Marketing workspace phase                 |
| Omnichannel                     | Omnichannel              | Yes                               | Yes          | Yes            | Yes              | contract_pending | Omnichannel conversation phase            |
| Calendar Sync                   | CalendarSync             | Yes                               | Partial      | Partial        | Yes              | contract_pending | Calendar sync workspace phase             |
| Contract Lifecycle              | ContractLifecycle        | Yes                               | No           | Yes            | Yes              | contract_pending | Contracts detail/create phase             |
| Document Management             | DocumentManagement       | Yes                               | Yes          | Yes            | Yes              | contract_pending | Documents list/detail phase               |
| Finance Operations              | FinanceOperations        | Yes                               | No           | Yes            | Yes              | contract_pending | Finance order phase                       |
| Integration Hub                 | IntegrationHub           | Yes                               | Partial      | Partial        | Yes              | contract_pending | Integrations workspace phase              |
| Knowledge Base Management       | KnowledgeBaseManagement  | Yes                               | Yes          | Yes            | Yes              | contract_pending | Knowledge base phase                      |
| Work Management                 | WorkManagement           | Yes                               | Partial      | Partial        | Yes              | contract_pending | Tasks/activities scope alignment          |
| Workflow Automation             | WorkflowAutomation       | Yes                               | Yes          | Yes            | Yes              | contract_pending | Workflow rules phase                      |
| Artificial Intelligence         | ArtificialIntelligence   | Yes                               | Partial      | Partial        | Yes              | contract_pending | AI provider workspace phase               |
| Tag Management                  | TagManagement            | Yes                               | No           | No             | Yes              | contract_pending | Tags management phase                     |
| Tenant Management               | TenantManagement         | Yes                               | No           | Partial        | Yes              | contract_pending | Tenant settings phase                     |

Notes:

- "Partial" means non-standard workspace/summary endpoints are source-visible but not yet mapped into crm-web list/detail patterns.
- "Unknown" indicates module folder visibility without a clearly mapped dedicated controller surface in `NetMetric.CRM.API` route naming.
- crm-web implements lead CRUD plus opportunity/pipeline read-only, and keeps remaining non-implemented modules as route shells.
