const menu = [
  //NOTE: title should match exactly with dialogflow fulfillment value.
  {
    id: "SelectApp",
    title: "App",
    options: [
      "Lease",
      "Enterprise Configurations",
      "Fixed Asset",
      "Financial Instruments",
      "ERP Finance APIs",
    ],
  },
  {
    id: "LeaseSelectOpMode",
    title: "Lease",
    options: ["Lease Explorer", "Data Load", "Report"],
  },
  {
    id: "LeaseDataLoadOptions",
    title: "Data Load",
    options: ["CSV Upload", "Load Status"],
  },
  {
    id: "LeaseCsvUploadProcessOptions",
    title: "CSV Upload",
    options: ["Lease Asset Master Setup", "Modifications"],
  },
  {
    id: "ReportOptions",
    title: "Report",
    options: [
      "A/C Posting",
      "Schedule Detail Report",
      "Schedule Summary Report",
    ],
  },
];

const forms = ["Lease Asset Master Setup"];

export default menu;
export { forms };

// // Apps
// [
//     {
//         "name": "Lease",
//         "id": null,
//         "desc": "IFRS 16 / ASC 842 / GASB 17 / INDAS 116",
//         "system": "Audire"
//     },
//     {
//         "name": "Financial_Instruments",
//         "id": null,
//         "desc": "IFRS 9 / ASC 845",
//         "system": "Audire"
//     },
//     {
//         "name": "Enterprise_Configurations",
//         "id": null,
//         "desc": "Exchange Rate upload,.etc.",
//         "system": "Audire"
//     },
//     {
//         "name": "ERP_Finance_APIs",
//         "id": null,
//         "desc": "Interfaces & Massive Upload for Finance",
//         "system": "ERP"
//     }
// ]

// // Process

// // Lease
// [
//     {
//         "process": "Lease_Asset_Master_Setup",
//         "system": "Audire",
//         "short_text": "Lease Asset Master",
//         "Order": null,
//         "process_code": "LAMS"
//     }
// ]

// // Enterprise_Configurations

// [
//     {
//         "process": "Exchange_Rate_Master",
//         "system": "Audire",
//         "short_text": "Exchange Rate Master",
//         "Order": null,
//         "process_code": "EXR"
//     },
//     {
//         "process": "Parallel_Ledger_Accounting",
//         "system": "Audire",
//         "short_text": "Parallel Ledger Accounting",
//         "Order": null,
//         "process_code": "PLA"
//     },
//     {
//         "process": "WF_Structure",
//         "system": "Audire",
//         "short_text": "WF Structure",
//         "Order": null,
//         "process_code": "WFS"
//     }
// ]
// // ERP_Finance_APIs

// [
//     {
//         "process": "LAS07A_Lease_Accounting_Decrease_in_Scope",
//         "system": "ERP",
//         "short_text": "Lease Accounting - Decrease in Scope",
//         "Order": null,
//         "process_code": "LAS07A"
//     },
//     {
//         "process": "LAS01A_Lease_Accounting_Inception_Transition",
//         "system": "ERP",
//         "short_text": "Lease Accounting - Inception or Transition",
//         "Order": null,
//         "process_code": "LAS01A"
//     },
//     {
//         "process": "LAS03A_Lease_Accounting_Interest",
//         "system": "ERP",
//         "short_text": "Lease Accounting - Interest",
//         "Order": null,
//         "process_code": "LAS03A"
//     },
//     {
//         "process": "LAS08A_Lease_Accounting_NoDecrease_in_Scope",
//         "system": "ERP",
//         "short_text": "Lease Accounting - No Decrease in Scope",
//         "Order": null,
//         "process_code": "LAS08A"
//     },
//     {
//         "process": "LAS02A_Lease_Accounting_Depreciation",
//         "system": "ERP",
//         "short_text": "Lease Accounting - Depreciation",
//         "Order": null,
//         "process_code": "LAS02A"
//     },
//     {
//         "process": "LAS06A_Lease_Accounting_Modification_Setup",
//         "system": "ERP",
//         "short_text": "Lease Accounting - Modification Setup",
//         "Order": null,
//         "process_code": "LAS06A"
//     },
//     {
//         "process": "LAS04A_Lease_Accounting_Reduce_Liability",
//         "system": "ERP",
//         "short_text": "Lease Accounting - Reduce Liability",
//         "Order": null,
//         "process_code": "LAS04A"
//     },
//     {
//         "process": "LAS05A_Lease_Accounting_Rent_Posting",
//         "system": "ERP",
//         "short_text": "Lease Accounting - Rent Posting",
//         "Order": null,
//         "process_code": "LAS05A"
//     }
// ]
