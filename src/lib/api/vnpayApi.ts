import api from "@/lib/axios";

interface VnpayData {
  orderId: number;
  amount: number;
}
interface VnpayResponse {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

export const createPaymentLink = async (data: VnpayData) => {
  const response = await api.post(`/api/vnpay`, data);
  return response.data;
};


export const getPaymentLink = async (queryParams: VnpayResponse) => {
  const response = await api.get(`/api/vnpay`, { params: queryParams });
  return response.data;
};