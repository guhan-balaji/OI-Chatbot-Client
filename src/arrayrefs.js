const menu = [ //NOTE: title should match exactly with dialogflow fulfillment value.
    {
        id: "SelectApp", 
        title: "App",
        options: ["Lease", "Enterprise Configuration", "Fixed Asset", "Financial Instruments"]
    },
    {
        id: "LeaseSelectOpMode",
        title: "Lease",
        options: ["Lease Explorer", "Data Load", "Report"]
    },
    {
        id: "LeaseDataLoadOptions",
        title: "Data Load",
        options: ["CSV Upload", "Load Status"]
    },
    {
        id: "LeaseCsvUploadProcessOptions",
        title: "CSV Upload", 
        options: ["Lease Asset Master Setup", "Modifications"]
    },
    {
        id: "ReportOptions",
        title: "Report",
        options: ["A/C Posting", "Schedule Detail Report", "Schedule Summary Report"]
    }
]

const forms = ["Lease Asset Master Setup"]

export default menu;
export {forms};