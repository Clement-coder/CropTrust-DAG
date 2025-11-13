import {
  useReadCropTrustGetCrop,
  useReadCropTrustGetOrder,
  useReadCropTrustTotalCrops,
  useWriteCropTrustCancelOrder,
  useWriteCropTrustConfirmOrder,
  useWriteCropTrustListCrop,
  useWriteCropTrustPurchaseCrop,
  useWriteCropTrustWithdrawFunds,
} from '../src/generated';
import { useWaitForTransactionReceipt } from 'wagmi';

export function useCropTrust() {
  // listCrop
  const { writeContractAsync: listCrop, data: listCropTxHash, isPending: isListingCrop, error: listCropError } =
    useWriteCropTrustListCrop();

  const { isLoading: isListCropConfirming, isSuccess: isListCropConfirmed } =
    useWaitForTransactionReceipt({ hash: listCropTxHash });

  // purchaseCrop
  const { writeContractAsync: purchaseCrop, data: purchaseCropTxHash, isPending: isPurchasingCrop, error: purchaseCropError } =
    useWriteCropTrustPurchaseCrop();

  const { isLoading: isPurchaseCropConfirming, isSuccess: isPurchaseCropConfirmed } =
    useWaitForTransactionReceipt({ hash: purchaseCropTxHash });

  // confirmOrder
  const { writeContractAsync: confirmOrder, data: confirmOrderTxHash, isPending: isConfirmingOrder, error: confirmOrderError } =
    useWriteCropTrustConfirmOrder();

  const { isLoading: isConfirmOrderConfirming, isSuccess: isConfirmOrderConfirmed } =
    useWaitForTransactionReceipt({ hash: confirmOrderTxHash });

  // cancelOrder
  const { writeContractAsync: cancelOrder, data: cancelOrderTxHash, isPending: isCancellingOrder, error: cancelOrderError } =
    useWriteCropTrustCancelOrder();

  const { isLoading: isCancelOrderConfirming, isSuccess: isCancelOrderConfirmed } =
    useWaitForTransactionReceipt({ hash: cancelOrderTxHash });

  // withdrawFunds
  const { writeContractAsync: withdrawFunds, data: withdrawFundsTxHash, isPending: isWithdrawingFunds, error: withdrawFundsError } =
    useWriteCropTrustWithdrawFunds();

  const { isLoading: isWithdrawFundsConfirming, isSuccess: isWithdrawFundsConfirmed } =
    useWaitForTransactionReceipt({ hash: withdrawFundsTxHash });

  return {
    // Functions
    listCrop,
    purchaseCrop,
    confirmOrder,
    cancelOrder,
    withdrawFunds,
    useReadCropTrustGetCrop,
    useReadCropTrustGetOrder,
    useReadCropTrustTotalCrops,

    // States for listCrop
    isListingCrop,
    isListCropConfirming,
    isListCropConfirmed,
    listCropError,

    // States for purchaseCrop
    isPurchasingCrop,
    isPurchaseCropConfirming,
    isPurchaseCropConfirmed,
    purchaseCropError,

    // States for confirmOrder
    isConfirmingOrder,
    isConfirmOrderConfirming,
    isConfirmOrderConfirmed,
    confirmOrderError,

    // States for cancelOrder
    isCancellingOrder,
    isCancelOrderConfirming,
    isCancelOrderConfirmed,
    cancelOrderError,

    // States for withdrawFunds
    isWithdrawingFunds,
    isWithdrawFundsConfirming,
    isWithdrawFundsConfirmed,
    withdrawFundsError,
  };
}
