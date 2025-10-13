export interface Transaction {
  id: number;
  bank_id: number;
  bank_name?: string;
  account_number?: string;
  transaction_date: string;
  description: string;
  amount: number;
  transaction_type?: string;
  category?: string;
  source_filename?: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionFilter {
  bank_id?: number;
  start_date?: string;
  end_date?: string;
  min_amount?: number;
  max_amount?: number;
  transaction_type?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export interface TransactionResponse {
  data: Transaction[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
