export interface OverallStats {
  total_transactions: number;
  total_amount: number;
  total_income: number;
  total_expenses: number;
  avg_transaction_amount: number;
  bank_count: number;
  date_range_start: string;
  date_range_end: string;
}

export interface MonthlySummary {
  year: number;
  month: number;
  month_name: string;
  transaction_count: number;
  total_amount: number;
  income: number;
  expenses: number;
  net_amount: number;
}

export interface BankSummary {
  bank_id: number;
  bank_name: string;
  transaction_count: number;
  total_amount: number;
  income: number;
  expenses: number;
  avg_transaction: number;
  first_transaction_date: string;
  last_transaction_date: string;
}

export interface DateRangeAnalysis {
  start_date: string;
  end_date: string;
  transaction_count: number;
  total_amount: number;
  daily_average: number;
  by_bank: BankBreakdown[];
}

export interface BankBreakdown {
  bank_name: string;
  transaction_count: number;
  total_amount: number;
}

export interface AmountDistribution {
  range_label: string;
  min_amount: number;
  max_amount: number;
  transaction_count: number;
  total_amount: number;
  percentage: number;
}
