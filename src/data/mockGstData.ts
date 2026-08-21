import { GstKpis, GstReturnRow, GstBreakdownStat } from "@/types/gst";

export const mockGstKpis: GstKpis = {
  totalSalesTaxable: 628450,
  totalSalesTrendPct: 18.6,
  totalGstCollected: 57862,
  gstCollectedTrendPct: 17.2,
  totalGstPaid: 34268,
  gstPaidTrendPct: 14.3,
  netGstPayable: 23594,
  netGstPayableTrendPct: 21.1,
};

export const mockGstBreakdown: GstBreakdownStat[] = [
  { label: "Taxable Sales", amount: 628450 },
  { label: "CGST Collected", amount: 28931 },
  { label: "SGST Collected", amount: 28931 },
  { label: "IGST Collected", amount: 0 },
  { label: "Taxable Purchases", amount: 342680 },
  { label: "CGST Paid", amount: 17134 },
  { label: "SGST Paid", amount: 17134 },
  { label: "IGST Paid", amount: 0 },
];

// Replace with `GET /api/gst/returns?returnType=&gstType=&status=&page=`
export const mockGstReturns: GstReturnRow[] = [
  {
    id: "gst-jul-2026",
    returnPeriod: "Jul 2026",
    returnType: "GSTR-1",
    dueDate: "11 Aug 2026",
    gstCollected: 57862,
    gstPaid: 34268,
    netPayable: 23594,
    status: "due-soon",
    statusLabel: "Due in 1 day",
    filedOn: null,
  },
  {
    id: "gst-jun-2026",
    returnPeriod: "Jun 2026",
    returnType: "GSTR-3B",
    dueDate: "20 Jul 2026",
    gstCollected: 52145,
    gstPaid: 32110,
    netPayable: 20035,
    status: "filed",
    statusLabel: "Filed",
    filedOn: "19 Jul 2026",
  },
  {
    id: "gst-may-2026",
    returnPeriod: "May 2026",
    returnType: "GSTR-3B",
    dueDate: "20 Jun 2026",
    gstCollected: 47832,
    gstPaid: 29560,
    netPayable: 18272,
    status: "filed",
    statusLabel: "Filed",
    filedOn: "19 Jun 2026",
  },
  {
    id: "gst-apr-2026",
    returnPeriod: "Apr 2026",
    returnType: "GSTR-3B",
    dueDate: "20 May 2026",
    gstCollected: 45210,
    gstPaid: 27890,
    netPayable: 17320,
    status: "filed",
    statusLabel: "Filed",
    filedOn: "19 May 2026",
  },
  {
    id: "gst-mar-2026",
    returnPeriod: "Mar 2026",
    returnType: "GSTR-3B",
    dueDate: "20 Apr 2026",
    gstCollected: 43680,
    gstPaid: 26450,
    netPayable: 17230,
    status: "filed",
    statusLabel: "Filed",
    filedOn: "19 Apr 2026",
  },
];

export const mockGstReturnTypeOptions = ["All", "GSTR-1", "GSTR-3B"];
export const mockGstTypeOptions = ["All", "CGST", "SGST", "IGST"];
