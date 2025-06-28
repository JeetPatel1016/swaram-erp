import { supabase } from "@/lib/supabase";

const ACADEMIC_YEAR_MONTHS = [
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
];

// Utility to get short month label from Date
const getMonthLabel = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "short" });
};

const initTotalsMap = () =>
  Object.fromEntries(ACADEMIC_YEAR_MONTHS.map((month) => [month, 0]));

type MetricObj = {
  total: number;
  outstanding: number;
  collectedThisMonth: number;
  pendingStudents: number;
  percentPaid: number;
};

export const reportKeys = {
  getFeeReports: () => ["fee-reports"],
  getMonthlyChartData: () => ["monthly-chart"],
};

export const reportsFns = {
  getFeeReportsFn: async () => {
    // Initializing metrics for registeration and installments.

    const regObj: MetricObj = {
      total: 0,
      outstanding: 0,
      pendingStudents: 0,
      collectedThisMonth: 0,
      percentPaid: 0,
    };

    const instObj: MetricObj = {
      total: 0,
      outstanding: 0,
      pendingStudents: 0,
      collectedThisMonth: 0,
      percentPaid: 0,
    };
    // Helper for current month metric
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);

    // Fetching reg Data
    const { data: regData, error: regError } = await supabase
      .from("student_registeration_fees")
      .select("registeration_fee, is_paid, created_at");

    if (regError) throw regError;

    // Calculating Registration data.
    if (regData && regData.length) {
      const regPendingRows = regData.filter((r) => !r.is_paid);
      const regPending = regPendingRows.reduce(
        (a, b) => a + b.registeration_fee,
        0
      );
      const regTotal = regData.reduce((a, b) => a + b.registeration_fee, 0);

      const regThisMonth = regData
        .filter(
          (r) => r.is_paid && new Date(r.created_at!) >= currentMonthStart
        )
        .reduce((a, b) => a + b.registeration_fee, 0);
      // setting new values
      regObj.outstanding = regPending;
      regObj.total = regTotal;
      regObj.pendingStudents = regPendingRows.length;
      regObj.percentPaid = (1 - regPending / regTotal) * 100;
      regObj.collectedThisMonth = regThisMonth;
    }

    // Fetching installment data
    const { data: instData, error: instError } = await supabase
      .from("student_installments")
      .select(
        "fee_summary_id, installment_amount, payment_status, due_date, created_at"
      );

    if (instError) throw instError;

    // Calculating Installment data
    if (instData && instData.length) {
      const pendingRows = instData.filter(
        (i) => i.payment_status !== "Completed"
      );
      const paidRows = instData.filter((i) => i.payment_status === "Completed");

      const total = instData.reduce(
        (sum, row) => sum + (row.installment_amount || 0),
        0
      );
      const outstanding = pendingRows.reduce(
        (sum, row) => sum + (row.installment_amount || 0),
        0
      );

      const collectedThisMonth = paidRows
        .filter((row) => new Date(row.created_at!) >= currentMonthStart)
        .reduce((sum, row) => sum + (row.installment_amount || 0), 0);

      // Unique pending students (distinct fee_summary_id count with unpaid installments)
      const pendingStudentIds = new Set(
        pendingRows.map((row) => row.fee_summary_id)
      );

      // setting new values
      instObj.total = total;
      instObj.outstanding = outstanding;
      instObj.collectedThisMonth = collectedThisMonth;
      instObj.pendingStudents = pendingStudentIds.size;
      instObj.percentPaid = total ? (1 - outstanding / total) * 100 : 0;
    }

    // Returning all data
    return { registeration: regObj, installments: instObj };
  },
  getMonthlyChartData: async () => {
    // Fetching records
    const { data: regData, error: regError } = await supabase
      .from("student_registeration_fees")
      .select("registeration_fee, is_paid, created_at");
    const { data: instData, error: instError } = await supabase
      .from("student_installments")
      .select(
        "payment_status, installment_amount, created_at, receipts(payment_date) "
      );
    if (regError) throw regError;
    if (regError) throw instError;

    // Aggregating Data
    // 3️⃣ Aggregate registration
    const regTotals = initTotalsMap();
    (regData || [])
      .filter((r) => r.is_paid && r.created_at)
      .forEach((r) => {
        const month = getMonthLabel(r.created_at!);
        regTotals[month] += r.registeration_fee || 0;
      });

    // 4️⃣ Aggregate installment
    const instTotals = initTotalsMap();
    (instData || [])
      .filter((i) => i.payment_status === "Completed" && i.created_at)
      .forEach((i) => {
        const month = getMonthLabel(i.created_at);
        instTotals[month] += i.installment_amount || 0;
      });

    return {
      registeration: ACADEMIC_YEAR_MONTHS.map((month) => ({
        month,
        Fees: regTotals[month],
      })),
      installments: ACADEMIC_YEAR_MONTHS.map((month) => ({
        month,
        Fees: instTotals[month],
      })),
    };
  },
};
